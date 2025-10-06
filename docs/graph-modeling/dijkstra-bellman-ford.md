# Dijkstra & Bellman-Ford Algorithms

Dijkstra's algorithm and Bellman-Ford algorithm are fundamental shortest path algorithms for weighted graphs. They differ in their assumptions about edge weights and their time complexity, making them suitable for different types of problems.

## Dijkstra's Algorithm

Dijkstra's algorithm finds the shortest path from a source vertex to all other vertices in a graph with non-negative edge weights. It uses a greedy approach with a priority queue.

### How It Works

1. **Initialize**: Set distance to source as 0, all others as infinity
2. **Priority Queue**: Use a min-heap to always process the vertex with minimum distance
3. **Relaxation**: For each vertex, update distances to its neighbors if a shorter path is found
4. **Greedy Choice**: Always process the unvisited vertex with minimum distance

### Basic Implementation

**Problem**: Find shortest distances from a source vertex to all other vertices using Dijkstra's algorithm.

**Sample Input**: 
- Graph: `{0: [(1,4), (2,1)], 1: [(3,1)], 2: [(1,2), (3,5)], 3: []}`
- Source: `0`

**Sample Output**: `[0, 3, 1, 4]` (Shortest distances from 0 to all vertices)

```cpp
#include <vector>
#include <queue>
#include <climits>
using namespace std;

class Dijkstra {
public:
    vector<int> shortestPath(vector<vector<pair<int, int>>>& graph, int source) {
        int n = graph.size();
        vector<int> dist(n, INT_MAX);
        vector<bool> visited(n, false);
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        
        dist[source] = 0;
        pq.push({0, source});
        
        while (!pq.empty()) {
            int u = pq.top().second;
            pq.pop();
            
            if (visited[u]) continue;
            visited[u] = true;
            
            for (auto& edge : graph[u]) {
                int v = edge.first;
                int weight = edge.second;
                
                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    pq.push({dist[v], v});
                }
            }
        }
        
        return dist;
    }
};
```

### Dijkstra with Path Reconstruction

**Problem**: Find shortest path and reconstruct the actual path from source to destination.

**Sample Input**: 
- Graph: `{0: [(1,4), (2,1)], 1: [(3,1)], 2: [(1,2), (3,5)], 3: []}`
- Source: `0`, Destination: `3`

**Sample Output**: 
- Distance: `4`
- Path: `[0, 2, 1, 3]`

```cpp
#include <vector>
#include <queue>
#include <climits>
using namespace std;

class DijkstraWithPath {
public:
    pair<int, vector<int>> shortestPath(vector<vector<pair<int, int>>>& graph, 
                                       int source, int destination) {
        int n = graph.size();
        vector<int> dist(n, INT_MAX);
        vector<int> parent(n, -1);
        vector<bool> visited(n, false);
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        
        dist[source] = 0;
        pq.push({0, source});
        
        while (!pq.empty()) {
            int u = pq.top().second;
            pq.pop();
            
            if (visited[u]) continue;
            visited[u] = true;
            
            if (u == destination) break;
            
            for (auto& edge : graph[u]) {
                int v = edge.first;
                int weight = edge.second;
                
                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    parent[v] = u;
                    pq.push({dist[v], v});
                }
            }
        }
        
        // Reconstruct path
        vector<int> path;
        if (dist[destination] != INT_MAX) {
            int current = destination;
            while (current != -1) {
                path.push_back(current);
                current = parent[current];
            }
            reverse(path.begin(), path.end());
        }
        
        return {dist[destination], path};
    }
};
```

## Bellman-Ford Algorithm

Bellman-Ford algorithm finds shortest paths from a source vertex to all other vertices, even with negative edge weights. It can also detect negative cycles.

### How It Works

1. **Initialize**: Set distance to source as 0, all others as infinity
2. **Relaxation**: For each edge, try to improve the distance to the destination
3. **Repeat**: Perform relaxation V-1 times (where V is number of vertices)
4. **Negative Cycle Check**: If one more relaxation improves any distance, negative cycle exists

### Basic Implementation

**Problem**: Find shortest distances using Bellman-Ford algorithm, handling negative weights.

**Sample Input**: 
- Graph: `{0: [(1,4), (2,1)], 1: [(3,1)], 2: [(1,2), (3,5)], 3: []}`
- Source: `0`

**Sample Output**: `[0, 3, 1, 4]` (Shortest distances from 0 to all vertices)

```cpp
#include <vector>
#include <climits>
using namespace std;

class BellmanFord {
public:
    vector<int> shortestPath(vector<vector<pair<int, int>>>& graph, int source) {
        int n = graph.size();
        vector<int> dist(n, INT_MAX);
        dist[source] = 0;
        
        // Relax all edges V-1 times
        for (int i = 0; i < n - 1; i++) {
            for (int u = 0; u < n; u++) {
                if (dist[u] != INT_MAX) {
                    for (auto& edge : graph[u]) {
                        int v = edge.first;
                        int weight = edge.second;
                        
                        if (dist[u] + weight < dist[v]) {
                            dist[v] = dist[u] + weight;
                        }
                    }
                }
            }
        }
        
        return dist;
    }
    
    bool hasNegativeCycle(vector<vector<pair<int, int>>>& graph) {
        int n = graph.size();
        vector<int> dist(n, 0); // Start with all distances as 0
        
        // Relax all edges V times
        for (int i = 0; i < n; i++) {
            for (int u = 0; u < n; u++) {
                for (auto& edge : graph[u]) {
                    int v = edge.first;
                    int weight = edge.second;
                    
                    if (dist[u] + weight < dist[v]) {
                        if (i == n - 1) {
                            return true; // Negative cycle detected
                        }
                        dist[v] = dist[u] + weight;
                    }
                }
            }
        }
        
        return false;
    }
};
```

## Advanced Applications

### All-Pairs Shortest Path (Floyd-Warshall)

**Problem**: Find shortest distances between all pairs of vertices.

**Sample Input**: 
```
Distance matrix:
   0   4   1 INF
 INF   0   1   1
 INF   2   0   5
 INF INF INF   0
```

**Sample Output**: 
```
   0   3   1   4
 INF   0   1   1
 INF   2   0   3
 INF INF INF   0
```

```cpp
#include <vector>
#include <algorithm>
using namespace std;

class FloydWarshall {
public:
    vector<vector<int>> allPairsShortestPath(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<vector<int>> dist = graph;
        
        // Floyd-Warshall algorithm
        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (dist[i][k] != INT_MAX && dist[k][j] != INT_MAX) {
                        dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
                    }
                }
            }
        }
        
        return dist;
    }
};
```

### Shortest Path with K Stops

**Problem**: Find cheapest flight route with at most K stops.

**Sample Input**: 
- Flights: `[[0,1,100],[1,2,100],[0,2,500]]`
- Source: `0`, Destination: `2`, Stops: `1`

**Sample Output**: `200` (Route: 0 → 1 → 2 with 1 stop)

```cpp
#include <vector>
#include <queue>
#include <climits>
using namespace std;

class ShortestPathKStops {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        vector<vector<pair<int, int>>> graph(n);
        
        // Build adjacency list
        for (auto& flight : flights) {
            graph[flight[0]].push_back({flight[1], flight[2]});
        }
        
        // {cost, city, stops_remaining}
        priority_queue<vector<int>, vector<vector<int>>, greater<vector<int>>> pq;
        pq.push({0, src, k + 1});
        
        while (!pq.empty()) {
            auto current = pq.top();
            pq.pop();
            
            int cost = current[0];
            int city = current[1];
            int stops = current[2];
            
            if (city == dst) {
                return cost;
            }
            
            if (stops > 0) {
                for (auto& edge : graph[city]) {
                    int nextCity = edge.first;
                    int nextCost = edge.second;
                    pq.push({cost + nextCost, nextCity, stops - 1});
                }
            }
        }
        
        return -1;
    }
};
```

## Comparison and Use Cases

### Dijkstra vs Bellman-Ford

| Aspect | Dijkstra | Bellman-Ford |
|--------|----------|--------------|
| **Edge Weights** | Non-negative only | Negative weights allowed |
| **Time Complexity** | O((V + E) log V) | O(VE) |
| **Space Complexity** | O(V) | O(V) |
| **Negative Cycles** | Cannot detect | Can detect |
| **Best For** | Dense graphs, non-negative weights | Sparse graphs, negative weights |

### When to Use Each Algorithm

**Use Dijkstra when:**
- All edge weights are non-negative
- You need the shortest path from one source
- Graph is dense (many edges)
- You need optimal time complexity

**Use Bellman-Ford when:**
- Graph may have negative edge weights
- You need to detect negative cycles
- Graph is sparse (few edges)
- You need to find shortest paths from one source

**Use Floyd-Warshall when:**
- You need shortest paths between all pairs
- Graph is small (V ≤ 400)
- You need to detect negative cycles in the entire graph

## Use Cases

### Real-World Applications
- **GPS Navigation**: Finding shortest routes
- **Network Routing**: Optimizing data packet paths
- **Social Networks**: Finding shortest connection paths
- **Game AI**: Pathfinding in games
- **Resource Allocation**: Optimizing resource distribution

### Competitive Programming
- **Shortest Path Problems**: Standard shortest path queries
- **Negative Cycle Detection**: Finding problematic cycles
- **All-Pairs Shortest Path**: When you need all distances
- **Constrained Shortest Path**: With additional constraints
- **Graph Optimization**: Various graph optimization problems

## Complexity Analysis

### Time Complexity
- **Dijkstra**: O((V + E) log V) with binary heap
- **Bellman-Ford**: O(VE)
- **Floyd-Warshall**: O(V³)

### Space Complexity
- **Dijkstra**: O(V) for distance array and priority queue
- **Bellman-Ford**: O(V) for distance array
- **Floyd-Warshall**: O(V²) for distance matrix

## Optimization Tips

1. **Choose Right Algorithm**: Use Dijkstra for non-negative weights, Bellman-Ford for negative weights
2. **Data Structures**: Use appropriate priority queue implementations
3. **Early Termination**: Stop when destination is reached (for single-source)
4. **Path Reconstruction**: Store parent pointers for path recovery
5. **Negative Cycle Detection**: Always check for negative cycles with Bellman-Ford
6. **Memory Management**: Use adjacency lists for sparse graphs, matrices for dense graphs
