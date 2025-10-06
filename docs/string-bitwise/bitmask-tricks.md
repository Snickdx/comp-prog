# Bitmask Tricks

Bitmask tricks involve using binary representations and bitwise operations to efficiently solve problems that involve subsets, state representation, and combinatorial optimization. These techniques are particularly powerful for problems with small state spaces that can be represented as integers.

## Basic Bitwise Operations

Understanding fundamental bitwise operations is crucial for bitmask techniques:

```cpp
#include <iostream>
using namespace std;

void demonstrateBitwiseOps() {
    int a = 5;  // Binary: 101
    int b = 3;  // Binary: 011
    
    cout << "a = " << a << " (binary: " << bitset<8>(a) << ")" << endl;
    cout << "b = " << b << " (binary: " << bitset<8>(b) << ")" << endl;
    
    // Basic operations
    cout << "a & b = " << (a & b) << " (AND)" << endl;
    cout << "a | b = " << (a | b) << " (OR)" << endl;
    cout << "a ^ b = " << (a ^ b) << " (XOR)" << endl;
    cout << "~a = " << (~a) << " (NOT)" << endl;
    cout << "a << 1 = " << (a << 1) << " (Left shift)" << endl;
    cout << "a >> 1 = " << (a >> 1) << " (Right shift)" << endl;
}
```

## Common Bitmask Operations

### Setting, Clearing, and Toggling Bits

```cpp
#include <iostream>
using namespace std;

class BitmaskUtils {
public:
    // Set the i-th bit (0-indexed)
    static int setBit(int mask, int i) {
        return mask | (1 << i);
    }
    
    // Clear the i-th bit
    static int clearBit(int mask, int i) {
        return mask & ~(1 << i);
    }
    
    // Toggle the i-th bit
    static int toggleBit(int mask, int i) {
        return mask ^ (1 << i);
    }
    
    // Check if the i-th bit is set
    static bool isBitSet(int mask, int i) {
        return (mask & (1 << i)) != 0;
    }
    
    // Count number of set bits
    static int countSetBits(int mask) {
        int count = 0;
        while (mask) {
            count += mask & 1;
            mask >>= 1;
        }
        return count;
    }
    
    // Get the lowest set bit
    static int getLowestSetBit(int mask) {
        return mask & (-mask);
    }
    
    // Remove the lowest set bit
    static int removeLowestSetBit(int mask) {
        return mask & (mask - 1);
    }
    
    // Check if mask is a power of 2
    static bool isPowerOfTwo(int mask) {
        return mask > 0 && (mask & (mask - 1)) == 0;
    }
};
```

## Subset Generation

### Generate All Subsets

**Problem**: Generate all possible subsets of an array using bitmask techniques.

**Sample Input**: `arr = [1, 2, 3]`

**Sample Output**: 
```
All subsets: [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]
Subsets of size 2: [[1,2], [1,3], [2,3]]
```

```cpp
#include <vector>
#include <iostream>
using namespace std;

vector<vector<int>> generateAllSubsets(vector<int>& arr) {
    int n = arr.size();
    vector<vector<int>> subsets;
    
    // Generate all 2^n subsets
    for (int mask = 0; mask < (1 << n); mask++) {
        vector<int> subset;
        for (int i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                subset.push_back(arr[i]);
            }
        }
        subsets.push_back(subset);
    }
    
    return subsets;
}

// Generate subsets of specific size
vector<vector<int>> generateSubsetsOfSize(vector<int>& arr, int k) {
    int n = arr.size();
    vector<vector<int>> subsets;
    
    for (int mask = 0; mask < (1 << n); mask++) {
        if (__builtin_popcount(mask) == k) {  // Count set bits
            vector<int> subset;
            for (int i = 0; i < n; i++) {
                if (mask & (1 << i)) {
                    subset.push_back(arr[i]);
                }
            }
            subsets.push_back(subset);
        }
    }
    
    return subsets;
}
```

## Traveling Salesman Problem (TSP)

The TSP is a classic example where bitmasks represent visited cities:

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

class TSP {
private:
    vector<vector<int>> dist;
    vector<vector<int>> dp;
    int n;
    
public:
    int solveTSP(vector<vector<int>>& distance) {
        n = distance.size();
        dist = distance;
        dp.assign(1 << n, vector<int>(n, -1));
        
        return tsp(1, 0);  // Start from city 0, only city 0 visited
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
            if (!(mask & (1 << next))) {  // If city not visited
                int newMask = mask | (1 << next);
                int cost = dist[pos][next] + tsp(newMask, next);
                minCost = min(minCost, cost);
            }
        }
        
        return dp[mask][pos] = minCost;
    }
};
```

## Dynamic Programming with Bitmasks

### Assignment Problem

```cpp
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class AssignmentProblem {
public:
    int solveAssignment(vector<vector<int>>& cost) {
        int n = cost.size();
        vector<int> dp(1 << n, INT_MAX);
        dp[0] = 0;  // Base case: no assignments made
        
        for (int mask = 0; mask < (1 << n); mask++) {
            int assigned = __builtin_popcount(mask);
            
            for (int i = 0; i < n; i++) {
                if (!(mask & (1 << i))) {  // If task i not assigned
                    int newMask = mask | (1 << i);
                    dp[newMask] = min(dp[newMask], dp[mask] + cost[assigned][i]);
                }
            }
        }
        
        return dp[(1 << n) - 1];
    }
};
```

## State Space Search

### N-Queens Problem

```cpp
#include <vector>
#include <iostream>
using namespace std;

class NQueens {
private:
    int n;
    vector<int> queens;
    
public:
    int solveNQueens(int boardSize) {
        n = boardSize;
        queens.resize(n);
        return backtrack(0, 0, 0, 0);
    }
    
private:
    int backtrack(int row, int colMask, int diag1Mask, int diag2Mask) {
        if (row == n) {
            return 1;  // Found a valid solution
        }
        
        int solutions = 0;
        
        for (int col = 0; col < n; col++) {
            int pos = 1 << col;
            int diag1 = 1 << (row + col);
            int diag2 = 1 << (row - col + n - 1);
            
            // Check if position is safe
            if (!(colMask & pos) && !(diag1Mask & diag1) && !(diag2Mask & diag2)) {
                queens[row] = col;
                solutions += backtrack(row + 1, 
                                    colMask | pos, 
                                    diag1Mask | diag1, 
                                    diag2Mask | diag2);
            }
        }
        
        return solutions;
    }
};
```

## Advanced Bitmask Techniques

### Fast Subset Iteration

```cpp
#include <vector>
using namespace std;

// Iterate through all subsets of a set
void iterateSubsets(int set) {
    for (int subset = set; subset; subset = (subset - 1) & set) {
        // Process subset
        cout << "Subset: " << bitset<8>(subset) << endl;
    }
}

// Iterate through all supersets of a set
void iterateSupersets(int set, int universe) {
    for (int superset = set; superset <= universe; superset = (superset + 1) | set) {
        // Process superset
        cout << "Superset: " << bitset<8>(superset) << endl;
    }
}
```

### Bit Manipulation Tricks

```cpp
#include <iostream>
using namespace std;

class AdvancedBitTricks {
public:
    // Swap two numbers without temporary variable
    static void swap(int& a, int& b) {
        a ^= b;
        b ^= a;
        a ^= b;
    }
    
    // Check if number is even/odd
    static bool isEven(int n) {
        return (n & 1) == 0;
    }
    
    // Get absolute value without branching
    static int abs(int n) {
        int mask = n >> 31;  // All 1s if negative, all 0s if positive
        return (n + mask) ^ mask;
    }
    
    // Find the next power of 2
    static int nextPowerOfTwo(int n) {
        n--;
        n |= n >> 1;
        n |= n >> 2;
        n |= n >> 4;
        n |= n >> 8;
        n |= n >> 16;
        return n + 1;
    }
    
    // Reverse bits
    static unsigned int reverseBits(unsigned int n) {
        n = ((n & 0xAAAAAAAA) >> 1) | ((n & 0x55555555) << 1);
        n = ((n & 0xCCCCCCCC) >> 2) | ((n & 0x33333333) << 2);
        n = ((n & 0xF0F0F0F0) >> 4) | ((n & 0x0F0F0F0F) << 4);
        n = ((n & 0xFF00FF00) >> 8) | ((n & 0x00FF00FF) << 8);
        n = ((n & 0xFFFF0000) >> 16) | ((n & 0x0000FFFF) << 16);
        return n;
    }
};
```

## Use Cases

### Optimization Problems
- **Traveling Salesman Problem**: Representing visited cities
- **Assignment Problems**: Tracking assigned tasks
- **Scheduling Problems**: Representing time slots or resources
- **Graph Coloring**: Representing color assignments

### Combinatorial Problems
- **Subset Generation**: All possible combinations
- **Permutation Problems**: State representation
- **Partition Problems**: Dividing sets into groups
- **Coverage Problems**: Selecting minimum sets

### State Space Search
- **Game States**: Chess, checkers, tic-tac-toe
- **Puzzle Solving**: 15-puzzle, sliding puzzles
- **Constraint Satisfaction**: N-queens, sudoku
- **Path Finding**: With state constraints

## Complexity Analysis

### Time Complexity
- **Subset Generation**: O(2^n) for n elements
- **TSP with Bitmask DP**: O(n² × 2^n)
- **Assignment Problem**: O(n² × 2^n)
- **Bit Operations**: O(1) for most operations

### Space Complexity
- **Bitmask DP**: O(2^n × n) for state space
- **Subset Storage**: O(2^n) for all subsets
- **Bit Operations**: O(1) additional space

## Optimization Tips

1. **Use Built-in Functions**: `__builtin_popcount()`, `__builtin_clz()`, etc.
2. **Precompute Powers**: Store 2^i values for efficiency
3. **Memory Optimization**: Use bit manipulation instead of boolean arrays
4. **Early Pruning**: Skip impossible states early
5. **State Compression**: Combine multiple boolean states into single integers
6. **Cache Optimization**: Use bitmasks as array indices for better cache locality
