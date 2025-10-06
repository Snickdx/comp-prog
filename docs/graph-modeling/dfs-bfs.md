# DFS / BFS

Depth-First Search (DFS) and Breadth-First Search (BFS) are fundamental graph traversal algorithms. They differ in their exploration strategy and are suited for different types of problems.

## Depth-First Search (DFS)

DFS explores as far as possible along each branch before backtracking. It uses a stack (either explicit or implicit through recursion).

### Recursive Implementation

**Problem**: Traverse a graph using depth-first search recursively.

**Sample Input**: 
- Graph: `{0: [1, 2], 1: [3], 2: [4], 3: [], 4: []}`
- Start node: `0`

**Sample Output**: `0 1 3 2 4` (DFS traversal order)

```cpp
#include <vector>
#include <unordered_set>
using namespace std;

void dfsRecursive(vector<vector<int>>& graph, int start, unordered_set<int>& visited) {
    visited.insert(start);
    cout << start << " ";  // Process node
    
    for (int neighbor : graph[start]) {
        if (visited.find(neighbor) == visited.end()) {
            dfsRecursive(graph, neighbor, visited);
        }
    }
}
```

### Iterative Implementation

**Problem**: Traverse a graph using depth-first search iteratively with a stack.

**Sample Input**: 
- Graph: `{0: [1, 2], 1: [3], 2: [4], 3: [], 4: []}`
- Start node: `0`

**Sample Output**: `0 2 4 1 3` (DFS traversal order)

```cpp
#include <vector>
#include <stack>
#include <unordered_set>
using namespace std;

void dfsIterative(vector<vector<int>>& graph, int start) {
    unordered_set<int> visited;
    stack<int> stk;
    stk.push(start);
    
    while (!stk.empty()) {
        int node = stk.top();
        stk.pop();
        
        if (visited.find(node) == visited.end()) {
            visited.insert(node);
            cout << node << " ";  // Process node
            
            // Add neighbors to stack (reverse order for same traversal)
            for (int i = graph[node].size() - 1; i >= 0; i--) {
                int neighbor = graph[node][i];
                if (visited.find(neighbor) == visited.end()) {
                    stk.push(neighbor);
                }
            }
        }
    }
}
```

## Breadth-First Search (BFS)

BFS explores all nodes at the current depth before moving to the next level. It uses a queue to maintain the order of exploration.

### Implementation

**Problem**: Traverse a graph using breadth-first search to explore level by level.

**Sample Input**: 
- Graph: `{0: [1, 2], 1: [3], 2: [4], 3: [], 4: []}`
- Start node: `0`

**Sample Output**: `0 1 2 3 4` (BFS traversal order)

```cpp
#include <vector>
#include <queue>
#include <unordered_set>
using namespace std;

void bfs(vector<vector<int>>& graph, int start) {
    unordered_set<int> visited;
    queue<int> q;
    q.push(start);
    visited.insert(start);
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        cout << node << " ";  // Process node
        
        for (int neighbor : graph[node]) {
            if (visited.find(neighbor) == visited.end()) {
                visited.insert(neighbor);
                q.push(neighbor);
            }
        }
    }
}
```

## Applications

### DFS Applications
- **Path Finding**: Finding any path between two nodes
- **Cycle Detection**: Detecting cycles in directed/undirected graphs
- **Topological Sorting**: Ordering nodes based on dependencies
- **Connected Components**: Finding all connected components
- **Maze Solving**: Exploring maze paths

### BFS Applications
- **Shortest Path**: Finding shortest path in unweighted graphs
- **Level Order Traversal**: Processing nodes level by level
- **Minimum Spanning Tree**: Prim's algorithm
- **Social Network Analysis**: Finding degrees of separation
- **Web Crawling**: Exploring web pages systematically

## Example: Finding Shortest Path

```cpp
#include <vector>
#include <queue>
#include <unordered_set>
using namespace std;

vector<int> shortestPathBFS(vector<vector<int>>& graph, int start, int end) {
    if (start == end) {
        return {start};
    }
    
    unordered_set<int> visited;
    queue<pair<int, vector<int>>> q;
    q.push({start, {start}});
    visited.insert(start);
    
    while (!q.empty()) {
        auto [node, path] = q.front();
        q.pop();
        
        for (int neighbor : graph[node]) {
            if (neighbor == end) {
                path.push_back(neighbor);
                return path;
            }
            
            if (visited.find(neighbor) == visited.end()) {
                visited.insert(neighbor);
                vector<int> newPath = path;
                newPath.push_back(neighbor);
                q.push({neighbor, newPath});
            }
        }
    }
    
    return {};  // No path found
}
```

## Example: Cycle Detection

```cpp
#include <vector>
#include <unordered_set>
using namespace std;

bool hasCycleDFS(vector<vector<int>>& graph) {
    unordered_set<int> visited;
    unordered_set<int> recStack;
    
    function<bool(int)> dfs = [&](int node) -> bool {
        visited.insert(node);
        recStack.insert(node);
        
        for (int neighbor : graph[node]) {
            if (visited.find(neighbor) == visited.end()) {
                if (dfs(neighbor)) {
                    return true;
                }
            } else if (recStack.find(neighbor) != recStack.end()) {
                return true;
            }
        }
        
        recStack.erase(node);
        return false;
    };
    
    for (int node = 0; node < graph.size(); node++) {
        if (visited.find(node) == visited.end()) {
            if (dfs(node)) {
                return true;
            }
        }
    }
    
    return false;
}
```

## Complexity Analysis

### Time Complexity
- **DFS**: O(V + E) where V is vertices, E is edges
- **BFS**: O(V + E) where V is vertices, E is edges

### Space Complexity
- **DFS**: O(V) for recursion stack or explicit stack
- **BFS**: O(V) for queue and visited set

## When to Use Each

### Use DFS When:
- Need to explore all possible paths
- Memory is limited (uses less memory than BFS)
- Looking for any solution (not necessarily shortest)
- Working with tree-like structures

### Use BFS When:
- Need shortest path in unweighted graphs
- Want to explore nodes level by level
- Need to find minimum distance
- Working with social networks or similar structures

## Advanced Variations

### Bidirectional BFS
```python
def bidirectional_bfs(graph, start, end):
    if start == end:
        return [start]
    
    visited_start = {start: [start]}
    visited_end = {end: [end]}
    queue_start = deque([start])
    queue_end = deque([end])
    
    while queue_start and queue_end:
        # Expand from start
        node = queue_start.popleft()
        for neighbor in graph[node]:
            if neighbor in visited_end:
                return visited_start[node] + visited_end[neighbor][::-1]
            if neighbor not in visited_start:
                visited_start[neighbor] = visited_start[node] + [neighbor]
                queue_start.append(neighbor)
        
        # Expand from end
        node = queue_end.popleft()
        for neighbor in graph[node]:
            if neighbor in visited_start:
                return visited_start[neighbor] + visited_end[node][::-1]
            if neighbor not in visited_end:
                visited_end[neighbor] = visited_end[node] + [neighbor]
                queue_end.append(neighbor)
    
    return None
```
