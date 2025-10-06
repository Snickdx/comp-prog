# Convex Hull

The convex hull is the smallest convex polygon that contains all given points. It's a fundamental problem in computational geometry with applications in optimization, computer graphics, and spatial analysis.

## What is a Convex Hull?

A convex hull of a set of points is the smallest convex polygon that contains all the points. A polygon is convex if any line segment joining two points inside the polygon lies entirely within the polygon.

## Basic Concepts

### Point Orientation

```cpp
#include <vector>
#include <algorithm>
using namespace std;

struct Point {
    double x, y;
    Point(double x, double y) : x(x), y(y) {}
    
    bool operator<(const Point& other) const {
        if (x != other.x) return x < other.x;
        return y < other.y;
    }
    
    bool operator==(const Point& other) const {
        return x == other.x && y == other.y;
    }
};

// Orientation of three points
// Returns: 0 = collinear, 1 = counterclockwise, -1 = clockwise
int orientation(Point p, Point q, Point r) {
    double val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (abs(val) < 1e-9) return 0;  // Collinear
    return (val > 0) ? 1 : -1;      // Counterclockwise or clockwise
}

// Distance between two points
double distance(Point p, Point q) {
    double dx = p.x - q.x;
    double dy = p.y - q.y;
    return sqrt(dx * dx + dy * dy);
}
```

## Graham Scan Algorithm

**Problem**: Find the convex hull of a set of points using Graham Scan algorithm.

**Sample Input**: 
- Points: `[(0,0), (1,1), (2,2), (3,1), (2,0), (1,2)]`

**Sample Output**: 
- Convex hull: `[(0,0), (2,0), (3,1), (2,2), (1,2)]`

```cpp
#include <vector>
#include <algorithm>
#include <stack>
using namespace std;

class GrahamScan {
public:
    vector<Point> convexHull(vector<Point>& points) {
        int n = points.size();
        if (n < 3) return points;
        
        // Find the bottom-most point (and leftmost in case of tie)
        int bottom = 0;
        for (int i = 1; i < n; i++) {
            if (points[i].y < points[bottom].y || 
                (points[i].y == points[bottom].y && points[i].x < points[bottom].x)) {
                bottom = i;
            }
        }
        
        // Swap bottom point with first point
        swap(points[0], points[bottom]);
        
        // Sort points by polar angle with respect to bottom point
        Point p0 = points[0];
        sort(points.begin() + 1, points.end(), [p0](const Point& a, const Point& b) {
            int o = orientation(p0, a, b);
            if (o == 0) {
                return distance(p0, a) < distance(p0, b);
            }
            return o == 1;
        });
        
        // Remove collinear points (keep only the farthest)
        vector<Point> filtered;
        filtered.push_back(points[0]);
        
        for (int i = 1; i < n; i++) {
            while (i < n - 1 && orientation(p0, points[i], points[i + 1]) == 0) {
                i++;
            }
            filtered.push_back(points[i]);
        }
        
        if (filtered.size() < 3) return filtered;
        
        // Build convex hull
        stack<Point> hull;
        hull.push(filtered[0]);
        hull.push(filtered[1]);
        hull.push(filtered[2]);
        
        for (int i = 3; i < filtered.size(); i++) {
            while (hull.size() > 1) {
                Point top = hull.top();
                hull.pop();
                Point nextToTop = hull.top();
                
                if (orientation(nextToTop, top, filtered[i]) == 1) {
                    hull.push(top);
                    break;
                }
            }
            hull.push(filtered[i]);
        }
        
        // Convert stack to vector
        vector<Point> result;
        while (!hull.empty()) {
            result.push_back(hull.top());
            hull.pop();
        }
        reverse(result.begin(), result.end());
        
        return result;
    }
};
```

## Andrew's Monotone Chain Algorithm

**Problem**: Find the convex hull using Andrew's Monotone Chain algorithm (alternative to Graham Scan).

**Sample Input**: 
- Points: `[(0,0), (1,1), (2,2), (3,1), (2,0), (1,2)]`

**Sample Output**: 
- Convex hull: `[(0,0), (2,0), (3,1), (2,2), (1,2)]`

```cpp
#include <vector>
#include <algorithm>
using namespace std;

class MonotoneChain {
public:
    vector<Point> convexHull(vector<Point>& points) {
        int n = points.size();
        if (n < 3) return points;
        
        // Sort points by x-coordinate (and y-coordinate as tiebreaker)
        sort(points.begin(), points.end());
        
        // Build lower hull
        vector<Point> lower;
        for (int i = 0; i < n; i++) {
            while (lower.size() >= 2 && 
                   orientation(lower[lower.size() - 2], lower[lower.size() - 1], points[i]) <= 0) {
                lower.pop_back();
            }
            lower.push_back(points[i]);
        }
        
        // Build upper hull
        vector<Point> upper;
        for (int i = n - 1; i >= 0; i--) {
            while (upper.size() >= 2 && 
                   orientation(upper[upper.size() - 2], upper[upper.size() - 1], points[i]) <= 0) {
                upper.pop_back();
            }
            upper.push_back(points[i]);
        }
        
        // Remove duplicate points
        lower.pop_back();
        upper.pop_back();
        
        // Combine lower and upper hulls
        lower.insert(lower.end(), upper.begin(), upper.end());
        
        return lower;
    }
};
```

## Advanced Applications

### Convex Hull of Circles

**Problem**: Find the convex hull of circles (approximated as polygons).

**Sample Input**: 
- Circles: `[(0,0,1), (2,0,1), (1,2,1)]` (center_x, center_y, radius)

**Sample Output**: 
- Convex hull vertices of the union of circles

```cpp
#include <vector>
#include <cmath>
using namespace std;

struct Circle {
    double x, y, radius;
    Circle(double x, double y, double r) : x(x), y(y), radius(r) {}
};

class CircleConvexHull {
public:
    vector<Point> convexHull(vector<Circle>& circles) {
        vector<Point> points;
        
        // Generate points on circle boundaries
        for (const Circle& circle : circles) {
            int numPoints = 16; // Number of points per circle
            for (int i = 0; i < numPoints; i++) {
                double angle = 2 * M_PI * i / numPoints;
                double x = circle.x + circle.radius * cos(angle);
                double y = circle.y + circle.radius * sin(angle);
                points.push_back(Point(x, y));
            }
        }
        
        // Find convex hull of all points
        MonotoneChain chain;
        return chain.convexHull(points);
    }
};
```

### Convex Hull with Collinear Points

**Problem**: Handle collinear points properly in convex hull computation.

**Sample Input**: 
- Points: `[(0,0), (1,1), (2,2), (3,3), (1,0), (2,0)]`

**Sample Output**: 
- Convex hull: `[(0,0), (3,3), (2,0), (1,0)]`

```cpp
class ConvexHullWithCollinear {
public:
    vector<Point> convexHull(vector<Point>& points) {
        int n = points.size();
        if (n < 3) return points;
        
        // Find bottom-most point
        int bottom = 0;
        for (int i = 1; i < n; i++) {
            if (points[i].y < points[bottom].y || 
                (points[i].y == points[bottom].y && points[i].x < points[bottom].x)) {
                bottom = i;
            }
        }
        
        swap(points[0], points[bottom]);
        Point p0 = points[0];
        
        // Sort by polar angle
        sort(points.begin() + 1, points.end(), [p0](const Point& a, const Point& b) {
            int o = orientation(p0, a, b);
            if (o == 0) {
                return distance(p0, a) < distance(p0, b);
            }
            return o == 1;
        });
        
        // Remove collinear points (keep only the farthest)
        vector<Point> filtered;
        filtered.push_back(points[0]);
        
        for (int i = 1; i < n; i++) {
            while (i < n - 1 && orientation(p0, points[i], points[i + 1]) == 0) {
                i++;
            }
            filtered.push_back(points[i]);
        }
        
        if (filtered.size() < 3) return filtered;
        
        // Build hull
        vector<Point> hull;
        hull.push_back(filtered[0]);
        hull.push_back(filtered[1]);
        
        for (int i = 2; i < filtered.size(); i++) {
            while (hull.size() > 1 && 
                   orientation(hull[hull.size() - 2], hull[hull.size() - 1], filtered[i]) != 1) {
                hull.pop_back();
            }
            hull.push_back(filtered[i]);
        }
        
        return hull;
    }
};
```

### Convex Hull Area and Perimeter

**Problem**: Calculate the area and perimeter of a convex hull.

**Sample Input**: 
- Points: `[(0,0), (2,0), (2,2), (0,2)]`

**Sample Output**: 
- Area: `4`
- Perimeter: `8`

```cpp
class ConvexHullMetrics {
public:
    double calculateArea(vector<Point>& hull) {
        if (hull.size() < 3) return 0;
        
        double area = 0;
        int n = hull.size();
        
        for (int i = 0; i < n; i++) {
            int j = (i + 1) % n;
            area += hull[i].x * hull[j].y - hull[j].x * hull[i].y;
        }
        
        return abs(area) / 2.0;
    }
    
    double calculatePerimeter(vector<Point>& hull) {
        if (hull.size() < 2) return 0;
        
        double perimeter = 0;
        int n = hull.size();
        
        for (int i = 0; i < n; i++) {
            int j = (i + 1) % n;
            perimeter += distance(hull[i], hull[j]);
        }
        
        return perimeter;
    }
};
```

## Use Cases

### Computational Geometry
- **Point Set Analysis**: Analyzing properties of point sets
- **Polygon Operations**: Intersection, union, and difference of polygons
- **Voronoi Diagrams**: Building Voronoi diagrams
- **Delaunay Triangulation**: Creating Delaunay triangulations

### Computer Graphics
- **Collision Detection**: Efficient collision detection between objects
- **Rendering**: Optimizing rendering of complex shapes
- **Shape Analysis**: Analyzing and comparing shapes
- **Mesh Generation**: Generating meshes for 3D objects

### Optimization
- **Linear Programming**: Finding feasible regions
- **Resource Allocation**: Optimizing resource distribution
- **Facility Location**: Finding optimal facility locations
- **Path Planning**: Planning optimal paths around obstacles

### Spatial Analysis
- **GIS Applications**: Geographic information systems
- **Map Analysis**: Analyzing geographic data
- **Terrain Analysis**: Analyzing terrain features
- **Urban Planning**: Planning urban development

## Complexity Analysis

### Time Complexity
- **Graham Scan**: O(n log n) due to sorting
- **Monotone Chain**: O(n log n) due to sorting
- **Gift Wrapping**: O(nh) where h is number of hull points
- **Quick Hull**: O(n log n) average case, O(n²) worst case

### Space Complexity
- **All Algorithms**: O(n) for storing points and hull
- **Graham Scan**: O(n) for stack
- **Monotone Chain**: O(n) for lower and upper hulls

## Algorithm Comparison

| Algorithm | Time Complexity | Space Complexity | Advantages | Disadvantages |
|-----------|----------------|------------------|------------|---------------|
| **Graham Scan** | O(n log n) | O(n) | Simple, stable | Requires sorting |
| **Monotone Chain** | O(n log n) | O(n) | No trigonometric functions | More complex |
| **Gift Wrapping** | O(nh) | O(n) | Simple, no sorting | Slow for many points |
| **Quick Hull** | O(n log n) avg | O(n) | Fast average case | O(n²) worst case |

## Optimization Tips

1. **Choose Right Algorithm**: Use Graham Scan for general cases, Monotone Chain for simplicity
2. **Handle Collinear Points**: Remove or handle collinear points properly
3. **Coordinate Precision**: Use appropriate precision for floating-point calculations
4. **Early Termination**: Stop when hull is complete
5. **Memory Management**: Use appropriate data structures for your use case
6. **Parallel Processing**: Process independent parts in parallel when possible
