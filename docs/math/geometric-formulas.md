# Geometric Formulas

Essential geometric formulas for points, lines, circles, polygons, and 3D geometry commonly used in competitive programming and computational geometry problems.

## Basic Point Operations

### Distance Between Two Points

**Problem**: Calculate the distance between two points in 2D or 3D space.

**Sample Input**: 
- 2D: `P1(0, 0)`, `P2(3, 4)`
- 3D: `P1(0, 0, 0)`, `P2(1, 2, 2)`

**Sample Output**: 
- 2D: `5.0` (3-4-5 right triangle)
- 3D: `3.0` (√(1² + 2² + 2²) = √9 = 3)

```cpp
#include <cmath>
using namespace std;

// 2D Distance
double distance2D(double x1, double y1, double x2, double y2) {
    return sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

// 3D Distance
double distance3D(double x1, double y1, double z1, double x2, double y2, double z2) {
    return sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) + (z2 - z1) * (z2 - z1));
}

// Using point structures
struct Point2D {
    double x, y;
    Point2D(double x, double y) : x(x), y(y) {}
    
    double distanceTo(const Point2D& other) const {
        return sqrt((x - other.x) * (x - other.x) + (y - other.y) * (y - other.y));
    }
};
```

### Midpoint of Two Points

**Problem**: Find the midpoint between two points.

**Sample Input**: `P1(0, 0)`, `P2(6, 8)`

**Sample Output**: `(3, 4)`

```cpp
Point2D midpoint(const Point2D& p1, const Point2D& p2) {
    return Point2D((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
}
```

## Line Operations

### Line Equation (Ax + By + C = 0)

**Problem**: Convert two points to line equation form.

**Sample Input**: `P1(1, 2)`, `P2(3, 4)`

**Sample Output**: `x - y + 1 = 0` (A=1, B=-1, C=1)

```cpp
struct Line {
    double A, B, C; // Ax + By + C = 0
    
    Line(double A, double B, double C) : A(A), B(B), C(C) {}
    
    // Create line from two points
    static Line fromPoints(const Point2D& p1, const Point2D& p2) {
        double A = p2.y - p1.y;
        double B = p1.x - p2.x;
        double C = p2.x * p1.y - p1.x * p2.y;
        return Line(A, B, C);
    }
    
    // Distance from point to line
    double distanceToPoint(const Point2D& p) const {
        return abs(A * p.x + B * p.y + C) / sqrt(A * A + B * B);
    }
};
```

### Point-Line Distance

**Problem**: Calculate the shortest distance from a point to a line.

**Sample Input**: 
- Line: `x - y + 1 = 0`
- Point: `(2, 3)`

**Sample Output**: `0.707` (√2/2)

```cpp
double pointToLineDistance(const Point2D& point, const Line& line) {
    return abs(line.A * point.x + line.B * point.y + line.C) / 
           sqrt(line.A * line.A + line.B * line.B);
}
```

### Line Intersection

**Problem**: Find the intersection point of two lines.

**Sample Input**: 
- Line 1: `x + y = 3`
- Line 2: `x - y = 1`

**Sample Output**: `(2, 1)`

```cpp
Point2D lineIntersection(const Line& l1, const Line& l2) {
    double det = l1.A * l2.B - l2.A * l1.B;
    if (abs(det) < 1e-9) {
        // Lines are parallel
        return Point2D(0, 0); // No intersection
    }
    
    double x = (l1.B * l2.C - l2.B * l1.C) / det;
    double y = (l2.A * l1.C - l1.A * l2.C) / det;
    return Point2D(x, y);
}
```

## Circle Operations

### Circle Area and Circumference

**Problem**: Calculate area and circumference of a circle.

**Sample Input**: `radius = 5`

**Sample Output**: 
- Area: `78.54`
- Circumference: `31.42`

```cpp
struct Circle {
    Point2D center;
    double radius;
    
    Circle(Point2D center, double radius) : center(center), radius(radius) {}
    
    double area() const {
        return M_PI * radius * radius;
    }
    
    double circumference() const {
        return 2 * M_PI * radius;
    }
    
    // Check if point is inside circle
    bool contains(const Point2D& point) const {
        return center.distanceTo(point) <= radius;
    }
};
```

### Circle-Circle Intersection

**Problem**: Check if two circles intersect and find intersection points.

**Sample Input**: 
- Circle 1: center `(0, 0)`, radius `3`
- Circle 2: center `(4, 0)`, radius `2`

**Sample Output**: `true` (circles intersect)

```cpp
bool circlesIntersect(const Circle& c1, const Circle& c2) {
    double distance = c1.center.distanceTo(c2.center);
    return distance <= (c1.radius + c2.radius) && 
           distance >= abs(c1.radius - c2.radius);
}

vector<Point2D> circleIntersectionPoints(const Circle& c1, const Circle& c2) {
    vector<Point2D> points;
    double d = c1.center.distanceTo(c2.center);
    
    if (d > c1.radius + c2.radius || d < abs(c1.radius - c2.radius)) {
        return points; // No intersection
    }
    
    if (d == 0 && c1.radius == c2.radius) {
        return points; // Infinite intersections
    }
    
    double a = (c1.radius * c1.radius - c2.radius * c2.radius + d * d) / (2 * d);
    double h = sqrt(c1.radius * c1.radius - a * a);
    
    Point2D p2 = Point2D(
        c1.center.x + a * (c2.center.x - c1.center.x) / d,
        c1.center.y + a * (c2.center.y - c1.center.y) / d
    );
    
    points.push_back(Point2D(
        p2.x + h * (c2.center.y - c1.center.y) / d,
        p2.y - h * (c2.center.x - c1.center.x) / d
    ));
    
    points.push_back(Point2D(
        p2.x - h * (c2.center.y - c1.center.y) / d,
        p2.y + h * (c2.center.x - c1.center.x) / d
    ));
    
    return points;
}
```

## Polygon Operations

### Polygon Area (Shoelace Formula)

**Problem**: Calculate the area of a polygon using the shoelace formula.

**Sample Input**: `[(0,0), (4,0), (4,4), (0,4)]` (square)

**Sample Output**: `16.0`

```cpp
double polygonArea(const vector<Point2D>& vertices) {
    int n = vertices.size();
    if (n < 3) return 0;
    
    double area = 0;
    for (int i = 0; i < n; i++) {
        int j = (i + 1) % n;
        area += vertices[i].x * vertices[j].y;
        area -= vertices[j].x * vertices[i].y;
    }
    return abs(area) / 2.0;
}
```

### Point in Polygon (Ray Casting)

**Problem**: Determine if a point is inside a polygon.

**Sample Input**: 
- Polygon: `[(0,0), (4,0), (4,4), (0,4)]`
- Point: `(2, 2)`

**Sample Output**: `true` (point is inside)

```cpp
bool pointInPolygon(const Point2D& point, const vector<Point2D>& polygon) {
    int n = polygon.size();
    bool inside = false;
    
    for (int i = 0, j = n - 1; i < n; j = i++) {
        if (((polygon[i].y > point.y) != (polygon[j].y > point.y)) &&
            (point.x < (polygon[j].x - polygon[i].x) * (point.y - polygon[i].y) / 
                      (polygon[j].y - polygon[i].y) + polygon[i].x)) {
            inside = !inside;
        }
    }
    return inside;
}
```

### Convex Hull Area

**Problem**: Calculate the area of a convex hull.

**Sample Input**: `[(0,0), (2,0), (1,2), (0,1)]`

**Sample Output**: `2.5`

```cpp
double convexHullArea(const vector<Point2D>& points) {
    if (points.size() < 3) return 0;
    
    // Sort points by x-coordinate, then by y-coordinate
    vector<Point2D> sortedPoints = points;
    sort(sortedPoints.begin(), sortedPoints.end(), 
         [](const Point2D& a, const Point2D& b) {
             return a.x < b.x || (a.x == b.x && a.y < b.y);
         });
    
    // Build lower hull
    vector<Point2D> hull;
    for (const auto& point : sortedPoints) {
        while (hull.size() >= 2 && 
               crossProduct(hull[hull.size()-2], hull[hull.size()-1], point) <= 0) {
            hull.pop_back();
        }
        hull.push_back(point);
    }
    
    // Build upper hull
    int lowerSize = hull.size();
    for (int i = sortedPoints.size() - 2; i >= 0; i--) {
        while (hull.size() > lowerSize && 
               crossProduct(hull[hull.size()-2], hull[hull.size()-1], sortedPoints[i]) <= 0) {
            hull.pop_back();
        }
        hull.push_back(sortedPoints[i]);
    }
    
    return polygonArea(hull);
}

// Helper function for cross product
double crossProduct(const Point2D& O, const Point2D& A, const Point2D& B) {
    return (A.x - O.x) * (B.y - O.y) - (A.y - O.y) * (B.x - O.x);
}
```

## 3D Geometry

### 3D Distance and Midpoint

**Problem**: Calculate distance and midpoint in 3D space.

**Sample Input**: `P1(0, 0, 0)`, `P2(3, 4, 5)`

**Sample Output**: 
- Distance: `7.071` (√(3² + 4² + 5²) = √50)
- Midpoint: `(1.5, 2, 2.5)`

```cpp
struct Point3D {
    double x, y, z;
    Point3D(double x, double y, double z) : x(x), y(y), z(z) {}
    
    double distanceTo(const Point3D& other) const {
        return sqrt((x - other.x) * (x - other.x) + 
                   (y - other.y) * (y - other.y) + 
                   (z - other.z) * (z - other.z));
    }
    
    Point3D midpoint(const Point3D& other) const {
        return Point3D((x + other.x) / 2, (y + other.y) / 2, (z + other.z) / 2);
    }
};
```

### Sphere Volume and Surface Area

**Problem**: Calculate volume and surface area of a sphere.

**Sample Input**: `radius = 3`

**Sample Output**: 
- Volume: `113.10`
- Surface Area: `113.10`

```cpp
struct Sphere {
    Point3D center;
    double radius;
    
    Sphere(Point3D center, double radius) : center(center), radius(radius) {}
    
    double volume() const {
        return (4.0 / 3.0) * M_PI * radius * radius * radius;
    }
    
    double surfaceArea() const {
        return 4 * M_PI * radius * radius;
    }
};
```

## Common Geometric Formulas

### Triangle Area (Heron's Formula)

**Problem**: Calculate triangle area using side lengths.

**Sample Input**: `a = 3, b = 4, c = 5`

**Sample Output**: `6.0`

```cpp
double triangleArea(double a, double b, double c) {
    double s = (a + b + c) / 2;
    return sqrt(s * (s - a) * (s - b) * (s - c));
}
```

### Triangle Area (Cross Product)

**Problem**: Calculate triangle area using coordinates.

**Sample Input**: `A(0,0), B(3,0), C(0,4)`

**Sample Output**: `6.0`

```cpp
double triangleArea(const Point2D& A, const Point2D& B, const Point2D& C) {
    return abs((B.x - A.x) * (C.y - A.y) - (C.x - A.x) * (B.y - A.y)) / 2.0;
}
```

### Angle Between Vectors

**Problem**: Calculate the angle between two vectors.

**Sample Input**: `v1(1,0), v2(0,1)`

**Sample Output**: `90°` (π/2 radians)

```cpp
double angleBetweenVectors(const Point2D& v1, const Point2D& v2) {
    double dot = v1.x * v2.x + v1.y * v2.y;
    double mag1 = sqrt(v1.x * v1.x + v1.y * v1.y);
    double mag2 = sqrt(v2.x * v2.x + v2.y * v2.y);
    
    double cosAngle = dot / (mag1 * mag2);
    return acos(max(-1.0, min(1.0, cosAngle))); // Clamp to avoid numerical errors
}
```

## Use Cases

### Competitive Programming
- **Geometry Problems**: Distance, area, intersection calculations
- **Convex Hull**: Finding the minimal convex polygon
- **Closest Pair**: Finding the closest pair of points
- **Line Intersection**: Determining if lines intersect

### Real-World Applications
- **Computer Graphics**: Rendering and transformations
- **Robotics**: Path planning and obstacle avoidance
- **GIS**: Geographic information systems
- **Game Development**: Collision detection and physics

## Implementation Tips

1. **Precision**: Use `double` for most calculations, `long double` for high precision
2. **Epsilon**: Use small epsilon values (1e-9) for floating-point comparisons
3. **Edge Cases**: Handle parallel lines, collinear points, and degenerate cases
4. **Coordinate Systems**: Choose appropriate coordinate systems for the problem
5. **Numerical Stability**: Use stable algorithms to avoid precision errors
6. **Integer Coordinates**: Use integer arithmetic when possible to avoid floating-point errors
