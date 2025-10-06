# Disjoint Set Union (DSU)

Disjoint Set Union (DSU), also known as Union-Find, is a data structure that efficiently manages a collection of disjoint sets. It provides fast operations for finding which set an element belongs to and for merging two sets together.

## Basic Operations

1. **Find**: Determine which set an element belongs to
2. **Union**: Merge two sets into one
3. **Connected**: Check if two elements are in the same set

## Basic Implementation

**Problem**: Implement DSU with path compression and union by rank optimizations.

**Sample Input**: 
- Operations: `union(0,1)`, `union(2,3)`, `find(0)`, `find(2)`, `connected(0,2)`

**Sample Output**: 
- `find(0) = 0`, `find(2) = 2`, `connected(0,2) = false`

```cpp
#include <vector>
using namespace std;

class DisjointSetUnion {
private:
    vector<int> parent;
    vector<int> rank;
    int components;
    
public:
    DisjointSetUnion(int n) : parent(n), rank(n, 0), components(n) {
        iota(parent.begin(), parent.end(), 0);
    }
    
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // Path compression
        }
        return parent[x];
    }
    
    void unionSets(int x, int y) {
        int px = find(x);
        int py = find(y);
        
        if (px == py) return; // Already in same set
        
        // Union by rank
        if (rank[px] < rank[py]) {
            parent[px] = py;
        } else if (rank[px] > rank[py]) {
            parent[py] = px;
        } else {
            parent[py] = px;
            rank[px]++;
        }
        
        components--;
    }
    
    bool connected(int x, int y) {
        return find(x) == find(y);
    }
    
    int getComponents() {
        return components;
    }
};
```

## Advanced Applications

### Minimum Spanning Tree (Kruskal's Algorithm)

**Problem**: Find the minimum spanning tree using Kruskal's algorithm with DSU.

**Sample Input**: 
- Edges: `[(0,1,4), (0,2,1), (1,2,2), (1,3,5), (2,3,3)]` (u, v, weight)

**Sample Output**: 
- MST edges: `[(0,2,1), (1,2,2), (2,3,3)]`
- Total weight: `6`

```cpp
#include <vector>
#include <algorithm>
using namespace std;

struct Edge {
    int u, v, weight;
    Edge(int u, int v, int w) : u(u), v(v), weight(w) {}
};

class KruskalMST {
public:
    vector<Edge> findMST(vector<Edge>& edges, int vertices) {
        // Sort edges by weight
        sort(edges.begin(), edges.end(), 
             [](const Edge& a, const Edge& b) {
                 return a.weight < b.weight;
             });
        
        DisjointSetUnion dsu(vertices);
        vector<Edge> mst;
        
        for (const Edge& edge : edges) {
            if (!dsu.connected(edge.u, edge.v)) {
                dsu.unionSets(edge.u, edge.v);
                mst.push_back(edge);
            }
        }
        
        return mst;
    }
    
    int mstWeight(vector<Edge>& edges, int vertices) {
        vector<Edge> mst = findMST(edges, vertices);
        int totalWeight = 0;
        for (const Edge& edge : mst) {
            totalWeight += edge.weight;
        }
        return totalWeight;
    }
};
```

### Number of Islands

**Problem**: Count the number of connected components (islands) in a 2D grid.

**Sample Input**: 
```
Grid:
1 1 0 0 0
1 1 0 0 0
0 0 1 0 0
0 0 0 1 1
```

**Sample Output**: `3` (Three connected components)

```cpp
#include <vector>
using namespace std;

class NumberOfIslands {
private:
    int rows, cols;
    vector<vector<int>> directions = {{-1,0}, {1,0}, {0,-1}, {0,1}};
    
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty() || grid[0].empty()) return 0;
        
        rows = grid.size();
        cols = grid[0].size();
        
        DisjointSetUnion dsu(rows * cols);
        int waterCount = 0;
        
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == '1') {
                    int current = i * cols + j;
                    
                    // Check all 4 directions
                    for (auto& dir : directions) {
                        int ni = i + dir[0];
                        int nj = j + dir[1];
                        
                        if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && 
                            grid[ni][nj] == '1') {
                            int neighbor = ni * cols + nj;
                            dsu.unionSets(current, neighbor);
                        }
                    }
                } else {
                    waterCount++;
                }
            }
        }
        
        return dsu.getComponents() - waterCount;
    }
};
```

### Redundant Connection

**Problem**: Find the edge that can be removed to make the graph a tree.

**Sample Input**: 
- Edges: `[[1,2], [1,3], [2,3]]`

**Sample Output**: `[2,3]` (The redundant edge)

```cpp
class RedundantConnection {
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        DisjointSetUnion dsu(n + 1);
        
        for (const auto& edge : edges) {
            int u = edge[0];
            int v = edge[1];
            
            if (dsu.connected(u, v)) {
                return edge; // This edge creates a cycle
            }
            
            dsu.unionSets(u, v);
        }
        
        return {}; // No redundant edge found
    }
};
```

## Advanced DSU Features

### DSU with Size Tracking

**Problem**: Track the size of each connected component.

**Sample Input**: 
- Operations: `union(0,1)`, `union(1,2)`, `getSize(0)`

**Sample Output**: 
- `getSize(0) = 3` (Component containing 0, 1, 2 has size 3)

```cpp
class DSUWithSize {
private:
    vector<int> parent;
    vector<int> size;
    
public:
    DSUWithSize(int n) : parent(n), size(n, 1) {
        iota(parent.begin(), parent.end(), 0);
    }
    
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }
    
    void unionSets(int x, int y) {
        int px = find(x);
        int py = find(y);
        
        if (px == py) return;
        
        // Always attach smaller tree to larger tree
        if (size[px] < size[py]) {
            parent[px] = py;
            size[py] += size[px];
        } else {
            parent[py] = px;
            size[px] += size[py];
        }
    }
    
    int getSize(int x) {
        return size[find(x)];
    }
    
    bool connected(int x, int y) {
        return find(x) == find(y);
    }
};
```

### DSU with Rollback

**Problem**: Support rollback operations to undo previous unions.

**Sample Input**: 
- Operations: `union(0,1)`, `union(1,2)`, `rollback()`, `find(0)`

**Sample Output**: 
- After rollback: `find(0) = 0`, `find(2) = 2` (Not connected)

```cpp
class DSUWithRollback {
private:
    vector<int> parent;
    vector<int> rank;
    vector<pair<int, int>> history; // Store operations for rollback
    
public:
    DSUWithRollback(int n) : parent(n), rank(n, 0) {
        iota(parent.begin(), parent.end(), 0);
    }
    
    int find(int x) {
        if (parent[x] != x) {
            return find(parent[x]);
        }
        return x;
    }
    
    void unionSets(int x, int y) {
        int px = find(x);
        int py = find(y);
        
        if (px == py) return;
        
        // Store the operation for potential rollback
        history.push_back({px, py});
        
        if (rank[px] < rank[py]) {
            parent[px] = py;
        } else if (rank[px] > rank[py]) {
            parent[py] = px;
        } else {
            parent[py] = px;
            rank[px]++;
        }
    }
    
    void rollback() {
        if (history.empty()) return;
        
        auto [px, py] = history.back();
        history.pop_back();
        
        parent[px] = px;
        parent[py] = py;
        rank[px] = 0;
        rank[py] = 0;
    }
    
    bool connected(int x, int y) {
        return find(x) == find(y);
    }
};
```

### DSU with Distance to Root

**Problem**: Track the distance from each node to its root.

**Sample Input**: 
- Operations: `union(0,1)`, `union(1,2)`, `getDistance(0,2)`

**Sample Output**: 
- `getDistance(0,2) = 2` (Distance from 0 to 2 through root)

```cpp
class DSUWithDistance {
private:
    vector<int> parent;
    vector<int> distance;
    
public:
    DSUWithDistance(int n) : parent(n), distance(n, 0) {
        iota(parent.begin(), parent.end(), 0);
    }
    
    int find(int x) {
        if (parent[x] != x) {
            int root = find(parent[x]);
            distance[x] += distance[parent[x]];
            parent[x] = root;
        }
        return parent[x];
    }
    
    void unionSets(int x, int y, int weight = 1) {
        int px = find(x);
        int py = find(y);
        
        if (px == py) return;
        
        parent[px] = py;
        distance[px] = distance[y] - distance[x] + weight;
    }
    
    int getDistance(int x, int y) {
        if (find(x) != find(y)) return -1; // Not connected
        
        return abs(distance[x] - distance[y]);
    }
    
    bool connected(int x, int y) {
        return find(x) == find(y);
    }
};
```

## Use Cases

### Graph Problems
- **Connectivity**: Check if two vertices are connected
- **Cycle Detection**: Detect cycles in undirected graphs
- **Minimum Spanning Tree**: Kruskal's algorithm
- **Connected Components**: Find all connected components

### Grid Problems
- **Number of Islands**: Count connected components in 2D grid
- **Maze Problems**: Check connectivity in mazes
- **Flood Fill**: Connected region problems
- **Union-Find on Grid**: 2D connectivity problems

### Network Problems
- **Network Connectivity**: Check if network is connected
- **Redundant Connections**: Find edges that can be removed
- **Critical Connections**: Find bridges in network
- **Component Analysis**: Analyze network components

### Optimization Problems
- **Clustering**: Group similar elements
- **Partitioning**: Divide elements into groups
- **Matching**: Find optimal pairings
- **Scheduling**: Group related tasks

## Complexity Analysis

### Time Complexity
- **Find (with path compression)**: O(α(n)) amortized
- **Union (with union by rank)**: O(α(n)) amortized
- **Connected**: O(α(n)) amortized
- **α(n)**: Inverse Ackermann function (practically constant)

### Space Complexity
- **Basic DSU**: O(n) for parent and rank arrays
- **With Size Tracking**: O(n) for additional size array
- **With Rollback**: O(n + m) where m is number of operations

## Optimization Tips

1. **Path Compression**: Always use path compression in find operation
2. **Union by Rank**: Use union by rank for better performance
3. **Early Termination**: Stop when all elements are connected
4. **Memory Management**: Use appropriate data structures for your use case
5. **Batch Operations**: Process multiple unions together when possible
6. **Rollback Support**: Add rollback only when needed (adds overhead)

## Common Patterns

### Standard DSU Pattern
```cpp
DisjointSetUnion dsu(n);
for (auto& edge : edges) {
    if (!dsu.connected(edge.u, edge.v)) {
        dsu.unionSets(edge.u, edge.v);
        // Process the edge
    }
}
```

### Component Counting Pattern
```cpp
DisjointSetUnion dsu(n);
// Perform all unions
int components = dsu.getComponents();
```

### Cycle Detection Pattern
```cpp
DisjointSetUnion dsu(n);
for (auto& edge : edges) {
    if (dsu.connected(edge.u, edge.v)) {
        // Cycle detected
        return edge;
    }
    dsu.unionSets(edge.u, edge.v);
}
```
