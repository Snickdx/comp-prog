# Bitmask Dynamic Programming

Bitmask DP is a powerful technique that uses binary representations to represent states in dynamic programming problems. It's particularly useful for subset problems, state space optimization, and problems where you need to track which elements have been used or visited.

## How It Works

Bitmask DP uses integers to represent sets, where each bit position indicates whether an element is included (1) or excluded (0). This allows for efficient state representation and transitions.

## Basic Concepts

### Bitmask Operations

```cpp
#include <iostream>
using namespace std;

void demonstrateBitmaskOps() {
    int mask = 0b1010; // Binary: 1010 (elements 1 and 3 are set)
    
    // Check if element i is set
    bool isSet = (mask & (1 << i)) != 0;
    
    // Set element i
    mask |= (1 << i);
    
    // Unset element i
    mask &= ~(1 << i);
    
    // Toggle element i
    mask ^= (1 << i);
    
    // Count set bits
    int count = __builtin_popcount(mask);
    
    // Get all subsets of a mask
    for (int subset = mask; subset; subset = (subset - 1) & mask) {
        // Process subset
    }
}
```

## Classic Problems

### Traveling Salesman Problem (TSP)

**Problem**: Find the shortest route that visits each city exactly once and returns to the starting city.

**Sample Input**: 
```
Distance matrix:
   0  10  15  20
  10   0  35  25
  15  35   0  30
  20  25  30   0
```

**Sample Output**: `80` (Route: 0 → 1 → 3 → 2 → 0)

```cpp
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class TSPBitmask {
private:
    vector<vector<int>> dist;
    vector<vector<int>> dp;
    int n;
    
public:
    int solveTSP(vector<vector<int>>& distance) {
        n = distance.size();
        dist = distance;
        dp.assign(1 << n, vector<int>(n, -1));
        
        return tsp(1, 0); // Start from city 0, only city 0 visited
    }
    
private:
    int tsp(int mask, int pos) {
        // If all cities visited, return to start
        if (mask == (1 << n) - 1) {
            return dist[pos][0];
        }
        
        if (dp[mask][pos] != -1) {
            return dp[mask][pos];
        }
        
        int minCost = INT_MAX;
        
        // Try visiting each unvisited city
        for (int next = 0; next < n; next++) {
            if (!(mask & (1 << next))) { // If city not visited
                int newMask = mask | (1 << next);
                int cost = dist[pos][next] + tsp(newMask, next);
                minCost = min(minCost, cost);
            }
        }
        
        return dp[mask][pos] = minCost;
    }
};
```

### Assignment Problem

**Problem**: Assign n tasks to n workers such that each task is assigned to exactly one worker and the total cost is minimized.

**Sample Input**: 
```
Cost matrix:
[9, 2, 7, 8]
[6, 4, 3, 7]
[5, 8, 1, 8]
[7, 6, 9, 4]
```

**Sample Output**: `13` (Minimum cost assignment)

```cpp
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class AssignmentProblem {
public:
    int minCostAssignment(vector<vector<int>>& cost) {
        int n = cost.size();
        vector<int> dp(1 << n, INT_MAX);
        dp[0] = 0; // Base case: no assignments made
        
        for (int mask = 0; mask < (1 << n); mask++) {
            int assigned = __builtin_popcount(mask);
            
            for (int i = 0; i < n; i++) {
                if (!(mask & (1 << i))) { // If task i not assigned
                    int newMask = mask | (1 << i);
                    dp[newMask] = min(dp[newMask], dp[mask] + cost[assigned][i]);
                }
            }
        }
        
        return dp[(1 << n) - 1];
    }
};
```

## Advanced Applications

### Subset Sum with Bitmask

**Problem**: Find if there exists a subset that sums to a target value using bitmask DP.

**Sample Input**: 
- `arr = [1, 2, 3, 4, 5]`
- `target = 9`

**Sample Output**: `true` (subsets like [2,3,4], [1,3,5], [4,5] sum to 9)

```cpp
#include <vector>
#include <unordered_set>
using namespace std;

class SubsetSumBitmask {
public:
    bool subsetSum(vector<int>& arr, int target) {
        int n = arr.size();
        unordered_set<int> possibleSums;
        possibleSums.insert(0);
        
        for (int mask = 1; mask < (1 << n); mask++) {
            int sum = 0;
            for (int i = 0; i < n; i++) {
                if (mask & (1 << i)) {
                    sum += arr[i];
                }
            }
            possibleSums.insert(sum);
            
            if (sum == target) {
                return true;
            }
        }
        
        return false;
    }
    
    vector<vector<int>> getAllSubsets(vector<int>& arr, int target) {
        int n = arr.size();
        vector<vector<int>> result;
        
        for (int mask = 1; mask < (1 << n); mask++) {
            int sum = 0;
            vector<int> subset;
            
            for (int i = 0; i < n; i++) {
                if (mask & (1 << i)) {
                    sum += arr[i];
                    subset.push_back(arr[i]);
                }
            }
            
            if (sum == target) {
                result.push_back(subset);
            }
        }
        
        return result;
    }
};
```

### Hamiltonian Path

**Problem**: Find if there exists a path that visits each vertex exactly once in a directed graph.

**Sample Input**: 
- Graph: `{0: [1, 2], 1: [2], 2: [0, 3], 3: []}`
- Start: `0`

**Sample Output**: `true` (Path: 0 → 1 → 2 → 3)

```cpp
#include <vector>
#include <unordered_set>
using namespace std;

class HamiltonianPath {
private:
    vector<vector<int>> graph;
    vector<vector<int>> dp;
    int n;
    
public:
    bool hasHamiltonianPath(vector<vector<int>>& adjList) {
        n = adjList.size();
        graph = adjList;
        dp.assign(1 << n, vector<int>(n, -1));
        
        // Try starting from each vertex
        for (int start = 0; start < n; start++) {
            if (hamiltonianPath(1 << start, start)) {
                return true;
            }
        }
        
        return false;
    }
    
private:
    bool hamiltonianPath(int mask, int pos) {
        // If all vertices visited
        if (mask == (1 << n) - 1) {
            return true;
        }
        
        if (dp[mask][pos] != -1) {
            return dp[mask][pos];
        }
        
        // Try visiting each unvisited neighbor
        for (int next : graph[pos]) {
            if (!(mask & (1 << next))) {
                int newMask = mask | (1 << next);
                if (hamiltonianPath(newMask, next)) {
                    return dp[mask][pos] = true;
                }
            }
        }
        
        return dp[mask][pos] = false;
    }
};
```

### Partition into Equal Sum Subsets

**Problem**: Partition an array into k equal sum subsets using bitmask DP.

**Sample Input**: 
- `nums = [4, 3, 2, 3, 5, 2, 1]`
- `k = 4`

**Sample Output**: `true` (Can partition into 4 subsets of sum 5 each)

```cpp
#include <vector>
#include <algorithm>
using namespace std;

class PartitionEqualSubsets {
public:
    bool canPartitionKSubsets(vector<int>& nums, int k) {
        int sum = 0;
        for (int num : nums) {
            sum += num;
        }
        
        if (sum % k != 0) return false;
        
        int target = sum / k;
        int n = nums.size();
        
        // Sort in descending order for better pruning
        sort(nums.begin(), nums.end(), greater<int>());
        
        vector<int> dp(1 << n, -1);
        dp[0] = 0;
        
        for (int mask = 0; mask < (1 << n); mask++) {
            if (dp[mask] == -1) continue;
            
            for (int i = 0; i < n; i++) {
                if (!(mask & (1 << i))) {
                    int newMask = mask | (1 << i);
                    int newSum = dp[mask] + nums[i];
                    
                    if (newSum <= target) {
                        dp[newMask] = (newSum == target) ? 0 : newSum;
                    }
                }
            }
        }
        
        return dp[(1 << n) - 1] == 0;
    }
};
```

## Optimization Techniques

### State Space Reduction

```cpp
#include <vector>
#include <unordered_map>
using namespace std;

class OptimizedBitmaskDP {
private:
    unordered_map<int, int> memo;
    
public:
    int solveOptimized(vector<int>& data) {
        memo.clear();
        return solve(0, 0);
    }
    
private:
    int solve(int mask, int pos) {
        if (pos >= data.size()) {
            return evaluateMask(mask);
        }
        
        if (memo.find(mask) != memo.end()) {
            return memo[mask];
        }
        
        int result = 0;
        
        // Option 1: Don't include current element
        result = max(result, solve(mask, pos + 1));
        
        // Option 2: Include current element
        int newMask = mask | (1 << pos);
        result = max(result, solve(newMask, pos + 1));
        
        return memo[mask] = result;
    }
    
    int evaluateMask(int mask) {
        // Evaluate the current mask configuration
        return __builtin_popcount(mask);
    }
};
```

### Iterative Bottom-Up Approach

```cpp
#include <vector>
#include <algorithm>
using namespace std;

class IterativeBitmaskDP {
public:
    int solveIterative(vector<int>& data) {
        int n = data.size();
        vector<int> dp(1 << n, 0);
        
        // Base case: empty set
        dp[0] = 0;
        
        // Fill DP table
        for (int mask = 1; mask < (1 << n); mask++) {
            for (int i = 0; i < n; i++) {
                if (mask & (1 << i)) {
                    int prevMask = mask ^ (1 << i);
                    dp[mask] = max(dp[mask], dp[prevMask] + data[i]);
                }
            }
        }
        
        return dp[(1 << n) - 1];
    }
};
```

## Use Cases

### Optimization Problems
- **Traveling Salesman**: Finding shortest tour through all cities
- **Assignment Problems**: Optimal task-worker assignments
- **Knapsack Variants**: Subset selection with constraints
- **Scheduling**: Optimal task scheduling with dependencies

### Graph Problems
- **Hamiltonian Path/Cycle**: Visiting each vertex exactly once
- **Vertex Cover**: Minimum set covering all edges
- **Clique Problems**: Finding maximum cliques
- **Path Problems**: Finding optimal paths with constraints

### Combinatorial Problems
- **Subset Selection**: Choosing optimal subsets
- **Partition Problems**: Dividing sets optimally
- **Matching Problems**: Optimal pairings
- **Covering Problems**: Covering sets with minimum subsets

## Complexity Analysis

### Time Complexity
- **Basic TSP**: O(n² × 2^n)
- **Assignment Problem**: O(n² × 2^n)
- **General Bitmask DP**: O(2^n × n) where n is the number of elements
- **Space Complexity**: O(2^n × n) for memoization

### When to Use Bitmask DP
- Problem involves selecting subsets from a set
- State can be represented as a bitmask
- Number of elements is small (typically n ≤ 20-25)
- Need to track which elements have been used/visited
- Problem has overlapping subproblems

## Optimization Tips

1. **Prune Impossible States**: Skip states that can't lead to valid solutions
2. **Use Built-in Functions**: `__builtin_popcount()`, `__builtin_clz()`, etc.
3. **Memory Optimization**: Use 1D arrays when possible
4. **State Ordering**: Process states in a specific order for better cache performance
5. **Early Termination**: Stop when optimal solution is found
6. **Compression**: Use smaller data types when possible
