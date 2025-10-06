# Sweep Line Algorithm

The sweep line algorithm is a powerful technique in computational geometry that processes geometric events in a sorted order. It's particularly useful for solving problems involving line intersections, point-in-polygon queries, and other geometric computations.

## How It Works

The sweep line algorithm works by:
1. **Sort Events**: Sort all geometric events (points, line endpoints, etc.) by their x-coordinate
2. **Sweep**: Move a vertical line from left to right across the plane
3. **Process Events**: At each event, update the active set and check for intersections or other conditions
4. **Maintain State**: Keep track of the current state as the sweep line moves

## Basic Concepts

### Event Processing

```cpp
#include <vector>
#include <set>
#include <algorithm>
using namespace std;

struct Point {
    double x, y;
    Point(double x, double y) : x(x), y(y) {}
};

struct Event {
    double x;
    int type; // 0: start, 1: end, 2: intersection
    int id;
    Event(double x, int type, int id) : x(x), type(type), id(id) {}
    
    bool operator<(const Event& other) const {
        if (x != other.x) return x < other.x;
        return type < other.type;
    }
};
```

## Classic Problems

### Line Segment Intersection

**Problem**: Find all intersection points between line segments using sweep line algorithm.

**Sample Input**: 
- Segments: `[(0,0,2,2), (1,1,3,1), (0,2,2,0)]`

**Sample Output**: 
- Intersections: `[(1,1), (1.5,1.5)]`

```cpp
#include <vector>
#include <set>
#include <algorithm>
using namespace std;

struct Segment {
    Point start, end;
    int id;
    Segment(Point s, Point e, int id) : start(s), end(e), id(id) {}
};

class LineSegmentIntersection {
private:
    vector<Segment> segments;
    set<Segment*> activeSegments;
    vector<Point> intersections;
    
public:
    vector<Point> findIntersections(vector<Segment>& segs) {
        segments = segs;
        intersections.clear();
        
        vector<Event> events;
        
        // Create events for segment endpoints
        for (int i = 0; i < segments.size(); i++) {
            if (segments[i].start.x < segments[i].end.x) {
                events.push_back(Event(segments[i].start.x, 0, i));
                events.push_back(Event(segments[i].end.x, 1, i));
            } else {
                events.push_back(Event(segments[i].end.x, 0, i));
                events.push_back(Event(segments[i].start.x, 1, i));
            }
        }
        
        sort(events.begin(), events.end());
        
        for (const Event& event : events) {
            if (event.type == 0) {
                // Start of segment
                handleSegmentStart(event.id);
            } else {
                // End of segment
                handleSegmentEnd(event.id);
            }
        }
        
        return intersections;
    }
    
private:
    void handleSegmentStart(int segId) {
        Segment* seg = &segments[segId];
        
        // Check intersections with active segments
        for (Segment* active : activeSegments) {
            Point intersection = findIntersection(*seg, *active);
            if (isValidIntersection(intersection)) {
                intersections.push_back(intersection);
            }
        }
        
        activeSegments.insert(seg);
    }
    
    void handleSegmentEnd(int segId) {
        Segment* seg = &segments[segId];
        activeSegments.erase(seg);
    }
    
    Point findIntersection(const Segment& s1, const Segment& s2) {
        // Implementation of line intersection
        // Returns intersection point or invalid point
        return Point(0, 0); // Placeholder
    }
    
    bool isValidIntersection(const Point& p) {
        // Check if intersection is valid
        return true; // Placeholder
    }
};
```

### Rectangle Union Area

**Problem**: Find the total area covered by a union of rectangles using sweep line.

**Sample Input**: 
- Rectangles: `[(0,0,2,2), (1,1,3,3), (2,0,4,1)]` (x1, y1, x2, y2)

**Sample Output**: `8` (Total area covered by union)

```cpp
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

struct Rectangle {
    double x1, y1, x2, y2;
    Rectangle(double x1, double y1, double x2, double y2) 
        : x1(x1), y1(y1), x2(x2), y2(y2) {}
};

class RectangleUnion {
private:
    struct Event {
        double x;
        int type; // 0: start, 1: end
        double y1, y2;
        Event(double x, int type, double y1, double y2) 
            : x(x), type(type), y1(y1), y2(y2) {}
        
        bool operator<(const Event& other) const {
            return x < other.x;
        }
    };
    
public:
    double unionArea(vector<Rectangle>& rectangles) {
        vector<Event> events;
        
        // Create events for rectangle edges
        for (const Rectangle& rect : rectangles) {
            events.push_back(Event(rect.x1, 0, rect.y1, rect.y2));
            events.push_back(Event(rect.x2, 1, rect.y1, rect.y2));
        }
        
        sort(events.begin(), events.end());
        
        map<double, int> activeIntervals; // y-coordinate -> count
        double totalArea = 0;
        double prevX = 0;
        
        for (const Event& event : events) {
            if (!activeIntervals.empty()) {
                double width = event.x - prevX;
                double height = getActiveHeight(activeIntervals);
                totalArea += width * height;
            }
            
            if (event.type == 0) {
                // Start of rectangle
                activeIntervals[event.y1]++;
                activeIntervals[event.y2]--;
            } else {
                // End of rectangle
                activeIntervals[event.y1]--;
                activeIntervals[event.y2]++;
            }
            
            prevX = event.x;
        }
        
        return totalArea;
    }
    
private:
    double getActiveHeight(const map<double, int>& intervals) {
        double height = 0;
        int count = 0;
        double prevY = 0;
        
        for (const auto& interval : intervals) {
            if (count > 0) {
                height += interval.first - prevY;
            }
            count += interval.second;
            prevY = interval.first;
        }
        
        return height;
    }
};
```

## Advanced Applications

### Closest Pair of Points

**Problem**: Find the closest pair of points in a 2D plane using sweep line.

**Sample Input**: 
- Points: `[(0,0), (1,1), (2,2), (3,3), (4,4)]`

**Sample Output**: 
- Closest pair: `[(0,0), (1,1)]`
- Distance: `1.414`

```cpp
#include <vector>
#include <set>
#include <algorithm>
#include <cmath>
using namespace std;

class ClosestPair {
public:
    pair<Point, Point> findClosestPair(vector<Point>& points) {
        if (points.size() < 2) return {Point(0,0), Point(0,0)};
        
        // Sort points by x-coordinate
        sort(points.begin(), points.end(), [](const Point& a, const Point& b) {
            return a.x < b.x;
        });
        
        double minDist = INFINITY;
        Point p1, p2;
        
        set<Point> activePoints;
        
        for (int i = 0; i < points.size(); i++) {
            Point current = points[i];
            
            // Remove points that are too far away
            auto it = activePoints.begin();
            while (it != activePoints.end()) {
                if (current.x - it->x > minDist) {
                    it = activePoints.erase(it);
                } else {
                    break;
                }
            }
            
            // Check points in the active set
            for (const Point& point : activePoints) {
                double dist = distance(current, point);
                if (dist < minDist) {
                    minDist = dist;
                    p1 = current;
                    p2 = point;
                }
            }
            
            activePoints.insert(current);
        }
        
        return {p1, p2};
    }
    
private:
    double distance(const Point& a, const Point& b) {
        double dx = a.x - b.x;
        double dy = a.y - b.y;
        return sqrt(dx * dx + dy * dy);
    }
};
```

### Point-in-Polygon Query

**Problem**: Determine if a point lies inside a polygon using sweep line.

**Sample Input**: 
- Polygon: `[(0,0), (2,0), (2,2), (0,2)]` (square)
- Point: `(1,1)`

**Sample Output**: `true` (Point is inside the polygon)

```cpp
#include <vector>
#include <algorithm>
using namespace std;

class PointInPolygon {
public:
    bool isInsidePolygon(vector<Point>& polygon, Point query) {
        int n = polygon.size();
        bool inside = false;
        
        for (int i = 0; i < n; i++) {
            Point p1 = polygon[i];
            Point p2 = polygon[(i + 1) % n];
            
            if (rayIntersectsSegment(query, p1, p2)) {
                inside = !inside;
            }
        }
        
        return inside;
    }
    
private:
    bool rayIntersectsSegment(Point p, Point a, Point b) {
        if (a.y > b.y) swap(a, b);
        
        if (p.y < a.y || p.y >= b.y) return false;
        if (p.x >= max(a.x, b.x)) return false;
        if (p.x < min(a.x, b.x)) return true;
        
        double intersectionX = a.x + (p.y - a.y) * (b.x - a.x) / (b.y - a.y);
        return p.x < intersectionX;
    }
};
```

### Skyline Problem

**Problem**: Find the skyline of a city given building heights using sweep line.

**Sample Input**: 
- Buildings: `[(1,3,3), (2,4,4), (5,2,6), (6,1,7)]` (left, height, right)

**Sample Output**: 
- Skyline: `[(1,3), (2,4), (4,0), (5,2), (6,1), (7,0)]`

```cpp
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

struct Building {
    int left, height, right;
    Building(int l, int h, int r) : left(l), height(h), right(r) {}
};

class Skyline {
public:
    vector<pair<int, int>> getSkyline(vector<Building>& buildings) {
        vector<pair<int, int>> result;
        
        // Create events for building edges
        vector<pair<int, int>> events; // x, height (negative for end)
        
        for (const Building& building : buildings) {
            events.push_back({building.left, building.height});
            events.push_back({building.right, -building.height});
        }
        
        sort(events.begin(), events.end());
        
        map<int, int> activeHeights; // height -> count
        int prevHeight = 0;
        
        for (const auto& event : events) {
            int x = event.first;
            int height = event.second;
            
            if (height > 0) {
                // Start of building
                activeHeights[height]++;
            } else {
                // End of building
                activeHeights[-height]--;
                if (activeHeights[-height] == 0) {
                    activeHeights.erase(-height);
                }
            }
            
            int currentHeight = activeHeights.empty() ? 0 : activeHeights.rbegin()->first;
            
            if (currentHeight != prevHeight) {
                result.push_back({x, currentHeight});
                prevHeight = currentHeight;
            }
        }
        
        return result;
    }
};
```

## Use Cases

### Computational Geometry
- **Line Intersection**: Finding intersection points between line segments
- **Point-in-Polygon**: Determining if points lie inside polygons
- **Closest Pair**: Finding the closest pair of points
- **Area Calculations**: Computing areas of complex shapes

### Computer Graphics
- **Rendering**: Efficient rendering of geometric objects
- **Collision Detection**: Detecting collisions between objects
- **Visibility**: Determining what's visible from a viewpoint
- **Clipping**: Clipping objects to viewport boundaries

### Spatial Data Analysis
- **Range Queries**: Finding objects in a given range
- **Nearest Neighbor**: Finding closest objects
- **Spatial Indexing**: Organizing spatial data efficiently
- **Map Overlay**: Combining multiple map layers

### Competitive Programming
- **Geometric Problems**: Solving geometry-based problems
- **Optimization**: Finding optimal geometric configurations
- **Enumeration**: Counting geometric objects
- **Transformation**: Applying geometric transformations

## Complexity Analysis

### Time Complexity
- **Line Segment Intersection**: O(n log n + k) where k is number of intersections
- **Rectangle Union**: O(n log n)
- **Closest Pair**: O(n log n)
- **Point-in-Polygon**: O(n) for single query
- **Skyline**: O(n log n)

### Space Complexity
- **Most Algorithms**: O(n) for storing events and active sets
- **Closest Pair**: O(n) for active point set
- **Rectangle Union**: O(n) for active intervals

## Optimization Tips

1. **Event Sorting**: Sort events efficiently by x-coordinate
2. **Active Set Management**: Use appropriate data structures (set, map)
3. **Early Termination**: Stop when no more intersections are possible
4. **Coordinate Compression**: Compress coordinates for better performance
5. **Spatial Indexing**: Use spatial data structures for large datasets
6. **Parallel Processing**: Process independent events in parallel
