# Top-Down & Bottom-Up Dynamic Programming

Dynamic Programming can be implemented using two main approaches: Top-Down (memoization) and Bottom-Up (tabulation). Each approach has its advantages and is suitable for different scenarios.

## Top-Down (Memoization)

Top-down DP starts with the main problem and recursively breaks it down into smaller subproblems, storing results to avoid recomputation.

### Implementation

**Problem**: Calculate Fibonacci numbers using top-down memoization to avoid redundant calculations.

**Sample Input**: `n = 10`

**Sample Output**: `55` (10th Fibonacci number)

```cpp
#include <unordered_map>
using namespace std;

unordered_map<int, long long> memo;

long long fibonacciMemo(int n) {
    if (memo.find(n) != memo.end()) {
        return memo[n];
    }
    
    if (n <= 1) {
        return n;
    }
    
    memo[n] = fibonacciMemo(n - 1) + fibonacciMemo(n - 2);
    return memo[n];
}
```

### Example: Longest Common Subsequence

**Problem**: Find the length of the longest common subsequence between two strings using memoization.

**Sample Input**: 
- `s1 = "ABCDGH"`
- `s2 = "AEDFHR"`

**Sample Output**: `3` (LCS: "ADH")

```cpp
#include <string>
#include <unordered_map>
using namespace std;

unordered_map<string, int> memo;

int lcsMemo(string s1, string s2, int i, int j) {
    string key = to_string(i) + "," + to_string(j);
    if (memo.find(key) != memo.end()) {
        return memo[key];
    }
    
    if (i == 0 || j == 0) {
        return 0;
    }
    
    int result;
    if (s1[i - 1] == s2[j - 1]) {
        result = 1 + lcsMemo(s1, s2, i - 1, j - 1);
    } else {
        result = max(lcsMemo(s1, s2, i - 1, j),
                    lcsMemo(s1, s2, i, j - 1));
    }
    
    memo[key] = result;
    return result;
}
```

## Bottom-Up (Tabulation)

Bottom-up DP solves smaller subproblems first and builds up to the main problem using iterative approaches.

### Implementation

**Problem**: Calculate Fibonacci numbers using bottom-up tabulation approach.

**Sample Input**: `n = 10`

**Sample Output**: `55` (10th Fibonacci number)

```cpp
#include <vector>
using namespace std;

long long fibonacciTab(int n) {
    if (n <= 1) {
        return n;
    }
    
    vector<long long> dp(n + 1, 0);
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}
```

### Example: Longest Common Subsequence

**Problem**: Find the length of the longest common subsequence between two strings using bottom-up tabulation.

**Sample Input**: 
- `s1 = "ABCDGH"`
- `s2 = "AEDFHR"`

**Sample Output**: `3` (LCS: "ADH")

```cpp
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int lcsTab(string s1, string s2) {
    int m = s1.length(), n = s2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}
```

## Comparison

| Aspect | Top-Down | Bottom-Up |
|--------|----------|-----------|
| **Approach** | Recursive | Iterative |
| **Memory** | Only computes needed states | Computes all states |
| **Stack Space** | Uses recursion stack | No recursion |
| **Debugging** | Easier to trace | More complex |
| **Space Optimization** | Harder to optimize | Easier to optimize |

## Space Optimization

### Rolling Array Technique

**Problem**: Calculate Fibonacci numbers using space-optimized bottom-up approach with rolling array.

**Sample Input**: `n = 10`

**Sample Output**: `55` (10th Fibonacci number)

```cpp
#include <vector>
using namespace std;

long long fibonacciOptimized(int n) {
    if (n <= 1) {
        return n;
    }
    
    long long prev2 = 0, prev1 = 1;
    
    for (int i = 2; i <= n; i++) {
        long long current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}
```

### 2D to 1D Optimization

**Problem**: Find the length of the longest common subsequence using space-optimized 2D to 1D approach.

**Sample Input**: 
- `s1 = "ABCDGH"`
- `s2 = "AEDFHR"`

**Sample Output**: `3` (LCS: "ADH")

```cpp
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int lcsOptimized(string s1, string s2) {
    int m = s1.length(), n = s2.length();
    if (m < n) {
        swap(s1, s2);
        swap(m, n);
    }
    
    vector<int> prev(n + 1, 0);
    vector<int> curr(n + 1, 0);
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1]) {
                curr[j] = 1 + prev[j - 1];
            } else {
                curr[j] = max(prev[j], curr[j - 1]);
            }
        }
        prev = curr;
    }
    
    return prev[n];
}
```

## When to Use Each Approach

### Use Top-Down When:
- Problem has complex state transitions
- Not all states need to be computed
- Recursive structure is natural
- Memory is not a constraint

### Use Bottom-Up When:
- Need to optimize space complexity
- All states must be computed
- Iterative approach is clearer
- Stack overflow is a concern

## Common Patterns

### State Transition Patterns
1. **Linear DP**: States depend on previous states
2. **Interval DP**: States represent intervals
3. **Tree DP**: States represent tree nodes
4. **Bitmask DP**: States use bit representations

### Optimization Techniques
1. **Rolling Arrays**: Reduce space from O(n) to O(1)
2. **Coordinate Compression**: Reduce state space
3. **Monotonic Queue**: Optimize transitions
4. **Convex Hull Trick**: Optimize specific functions
