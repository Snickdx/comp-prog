# DP on Trees and Graphs

Dynamic Programming on trees and graphs involves applying DP techniques to solve optimization problems on tree and graph structures. These problems often require considering different states and transitions based on the structure of the tree or graph.

## Tree DP Concepts

### Tree Traversal for DP

Trees have a natural recursive structure that makes them ideal for DP. The key is to process children before parents (post-order) or parents before children (pre-order).

### Common Tree DP Patterns

1. **Rooted Tree DP**: Solve for each subtree rooted at a node
2. **Rerooting DP**: Efficiently compute answers for all possible roots
3. **Tree Decomposition**: Break tree into smaller components

## Classic Tree DP Problems

### Maximum Path Sum in Binary Tree

**Problem**: Find the maximum path sum in a binary tree where a path is any sequence of nodes from some starting node to any node in the tree along parent-child connections.

**Sample Input**: 
```
    1
   / \
  2   3
 / \
4   5
```

**Sample Output**: `15` (Path: 4 → 2 → 5, sum = 4 + 2 + 5 = 11, but including 1 → 3 gives 15)

```cpp
#include <algorithm>
#include <climits>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class MaxPathSum {
private:
    int maxSum;
    
public:
    int maxPathSum(TreeNode* root) {
        maxSum = INT_MIN;
        maxPathDown(root);
        return maxSum;
    }
    
private:
    int maxPathDown(TreeNode* node) {
        if (!node) return 0;
        
        // Get maximum path sum from left and right subtrees
        int left = max(0, maxPathDown(node->left));
        int right = max(0, maxPathDown(node->right));
        
        // Update global maximum (path through current node)
        maxSum = max(maxSum, left + right + node->val);
        
        // Return maximum path sum ending at current node
        return max(left, right) + node->val;
    }
};
```

### House Robber III (Tree Version)

**Problem**: Rob houses arranged in a binary tree where connected houses cannot be robbed simultaneously.

**Sample Input**: 
```
    3
   / \
  2   3
   \   \
    3   1
```

**Sample Output**: `7` (Rob houses 3, 3, 1 = 3 + 3 + 1 = 7)

```cpp
#include <vector>
#include <algorithm>
using namespace std;

class HouseRobberTree {
public:
    int rob(TreeNode* root) {
        vector<int> result = robHelper(root);
        return max(result[0], result[1]);
    }
    
private:
    // Returns [rob_current, not_rob_current]
    vector<int> robHelper(TreeNode* node) {
        if (!node) {
            return {0, 0};
        }
        
        vector<int> left = robHelper(node->left);
        vector<int> right = robHelper(node->right);
        
        // If we rob current node, we cannot rob children
        int robCurrent = node->val + left[1] + right[1];
        
        // If we don't rob current node, we can choose to rob or not rob children
        int notRobCurrent = max(left[0], left[1]) + max(right[0], right[1]);
        
        return {robCurrent, notRobCurrent};
    }
};
```

### Tree Diameter

**Problem**: Find the diameter of a tree (longest path between any two nodes).

**Sample Input**: 
```
    1
   / \
  2   3
 / \
4   5
```

**Sample Output**: `3` (Path: 4 → 2 → 1 → 3, length = 3)

```cpp
#include <vector>
#include <algorithm>
using namespace std;

class TreeDiameter {
private:
    int diameter;
    
public:
    int diameterOfBinaryTree(TreeNode* root) {
        diameter = 0;
        height(root);
        return diameter;
    }
    
private:
    int height(TreeNode* node) {
        if (!node) return 0;
        
        int leftHeight = height(node->left);
        int rightHeight = height(node->right);
        
        // Update diameter (path through current node)
        diameter = max(diameter, leftHeight + rightHeight);
        
        // Return height of subtree rooted at current node
        return 1 + max(leftHeight, rightHeight);
    }
};
```

## Graph DP Problems

### Shortest Path in DAG

**Problem**: Find shortest paths from a source to all vertices in a Directed Acyclic Graph.

**Sample Input**: 
- Graph: `{0: [(1,5), (2,3)], 1: [(3,2)], 2: [(3,1)], 3: []}`
- Source: `0`

**Sample Output**: `[0, 5, 3, 4]` (Shortest distances from 0 to all vertices)

```cpp
#include <vector>
#include <queue>
#include <climits>
using namespace std;

class ShortestPathDAG {
public:
    vector<int> shortestPath(vector<vector<pair<int, int>>>& graph, int source) {
        int n = graph.size();
        vector<int> dist(n, INT_MAX);
        dist[source] = 0;
        
        // Topological sort
        vector<int> topo = topologicalSort(graph);
        
        // Process vertices in topological order
        for (int u : topo) {
            if (dist[u] != INT_MAX) {
                for (auto& edge : graph[u]) {
                    int v = edge.first;
                    int weight = edge.second;
                    dist[v] = min(dist[v], dist[u] + weight);
                }
            }
        }
        
        return dist;
    }
    
private:
    vector<int> topologicalSort(vector<vector<pair<int, int>>>& graph) {
        int n = graph.size();
        vector<int> inDegree(n, 0);
        
        // Calculate in-degrees
        for (int u = 0; u < n; u++) {
            for (auto& edge : graph[u]) {
                inDegree[edge.first]++;
            }
        }
        
        // Kahn's algorithm
        queue<int> q;
        for (int i = 0; i < n; i++) {
            if (inDegree[i] == 0) {
                q.push(i);
            }
        }
        
        vector<int> result;
        while (!q.empty()) {
            int u = q.front();
            q.pop();
            result.push_back(u);
            
            for (auto& edge : graph[u]) {
                int v = edge.first;
                inDegree[v]--;
                if (inDegree[v] == 0) {
                    q.push(v);
                }
            }
        }
        
        return result;
    }
};
```

### Longest Path in DAG

**Problem**: Find the longest path in a Directed Acyclic Graph.

**Sample Input**: 
- Graph: `{0: [1, 2], 1: [3], 2: [3], 3: []}`

**Sample Output**: `3` (Longest path length)

```cpp
#include <vector>
#include <algorithm>
using namespace std;

class LongestPathDAG {
private:
    vector<int> memo;
    vector<vector<int>> graph;
    
public:
    int longestPath(vector<vector<int>>& adjList) {
        int n = adjList.size();
        graph = adjList;
        memo.assign(n, -1);
        
        int maxPath = 0;
        for (int i = 0; i < n; i++) {
            maxPath = max(maxPath, dfs(i));
        }
        
        return maxPath;
    }
    
private:
    int dfs(int node) {
        if (memo[node] != -1) {
            return memo[node];
        }
        
        int maxPath = 0;
        for (int neighbor : graph[node]) {
            maxPath = max(maxPath, 1 + dfs(neighbor));
        }
        
        return memo[node] = maxPath;
    }
};
```

## Advanced Tree DP

### Rerooting DP

**Problem**: For each node as root, find the sum of distances to all other nodes.

**Sample Input**: 
```
    0
   / \
  1   2
 / \
3   4
```

**Sample Output**: `[6, 8, 12, 10, 10]` (Sum of distances for each node as root)

```cpp
#include <vector>
using namespace std;

class RerootingDP {
private:
    vector<vector<int>> graph;
    vector<int> subtreeSize;
    vector<int> sumDistances;
    int n;
    
public:
    vector<int> sumOfDistancesInTree(int n, vector<vector<int>>& edges) {
        this->n = n;
        graph.resize(n);
        subtreeSize.resize(n);
        sumDistances.resize(n);
        
        // Build adjacency list
        for (auto& edge : edges) {
            graph[edge[0]].push_back(edge[1]);
            graph[edge[1]].push_back(edge[0]);
        }
        
        // First DFS: calculate subtree sizes and distances from root
        dfs1(0, -1);
        
        // Second DFS: reroot and calculate distances for all nodes
        dfs2(0, -1);
        
        return sumDistances;
    }
    
private:
    void dfs1(int node, int parent) {
        subtreeSize[node] = 1;
        sumDistances[node] = 0;
        
        for (int child : graph[node]) {
            if (child != parent) {
                dfs1(child, node);
                subtreeSize[node] += subtreeSize[child];
                sumDistances[node] += sumDistances[child] + subtreeSize[child];
            }
        }
    }
    
    void dfs2(int node, int parent) {
        for (int child : graph[node]) {
            if (child != parent) {
                // Reroot: move from node to child
                sumDistances[child] = sumDistances[node] - subtreeSize[child] + (n - subtreeSize[child]);
                dfs2(child, node);
            }
        }
    }
};
```

### Tree Decomposition DP

**Problem**: Find maximum independent set in a tree.

**Sample Input**: 
```
    1
   / \
  2   3
 / \
4   5
```

**Sample Output**: `3` (Maximum independent set: {1, 4, 5})

```cpp
#include <vector>
#include <algorithm>
using namespace std;

class MaxIndependentSet {
public:
    int maxIndependentSet(TreeNode* root) {
        vector<int> result = maxIndependentSetHelper(root);
        return max(result[0], result[1]);
    }
    
private:
    // Returns [include_current, exclude_current]
    vector<int> maxIndependentSetHelper(TreeNode* node) {
        if (!node) {
            return {0, 0};
        }
        
        vector<int> left = maxIndependentSetHelper(node->left);
        vector<int> right = maxIndependentSetHelper(node->right);
        
        // Include current node: cannot include children
        int include = node->val + left[1] + right[1];
        
        // Exclude current node: can choose to include or exclude children
        int exclude = max(left[0], left[1]) + max(right[0], right[1]);
        
        return {include, exclude};
    }
};
```

## Use Cases

### Tree Problems
- **Path Problems**: Finding optimal paths in trees
- **Subtree Problems**: Optimizing over subtrees
- **Tree Decomposition**: Breaking trees into components
- **Rerooting**: Computing answers for all possible roots

### Graph Problems
- **DAG Problems**: Shortest/longest paths in DAGs
- **Tree-like Graphs**: Problems on graphs with tree structure
- **Component Problems**: Optimizing over connected components
- **Flow Problems**: Network flow optimizations

### Optimization Problems
- **Resource Allocation**: Optimal distribution in tree/graph structures
- **Scheduling**: Optimal scheduling with dependencies
- **Matching**: Optimal matching in bipartite graphs
- **Covering**: Minimum covering problems

## Complexity Analysis

### Time Complexity
- **Tree DP**: O(n) where n is number of nodes
- **Graph DP**: O(V + E) for DAG problems
- **Rerooting DP**: O(n) for rerooting all nodes
- **General Graph DP**: Depends on problem structure

### Space Complexity
- **Tree DP**: O(n) for recursion stack and memoization
- **Graph DP**: O(V) for memoization
- **Rerooting DP**: O(n) for storing results

## Optimization Tips

1. **Choose Root Wisely**: Select root that simplifies the problem
2. **Use Post-order**: Process children before parents in tree DP
3. **Memoization**: Cache results for repeated subproblems
4. **State Compression**: Use bitmasks for small state spaces
5. **Pruning**: Skip impossible states early
6. **Iterative Approach**: Use bottom-up when possible to avoid stack overflow
