# Meet-in-the-Middle

Meet-in-the-middle is an optimization technique that splits the search space in half, solves each half independently, and then combines the results. This approach can reduce exponential time complexity from O(2^n) to O(2^(n/2)), making it feasible to solve problems that would otherwise be intractable.

## How It Works

1. **Split**: Divide the problem into two equal or nearly equal parts
2. **Solve Independently**: Solve each part separately using brute force
3. **Combine**: Merge the results from both parts to find the final solution

## Basic Template

```cpp
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

// Template for meet-in-the-middle
vector<int> solveMeetInMiddle(vector<int>& data) {
    int n = data.size();
    int mid = n / 2;
    
    // Split into two halves
    vector<int> left(data.begin(), data.begin() + mid);
    vector<int> right(data.begin() + mid, data.end());
    
    // Solve each half independently
    vector<int> leftResults = solveHalf(left);
    vector<int> rightResults = solveHalf(right);
    
    // Combine results
    return combineResults(leftResults, rightResults);
}
```

## Example: Subset Sum Problem

**Problem**: Find if there exists a subset that sums to a target value using meet-in-the-middle.

**Sample Input**: 
- `arr = [1, 2, 3, 4, 5, 6]`
- `target = 9`

**Sample Output**: `true` (subsets like [1,2,6], [3,6], [4,5] sum to 9)

```cpp
#include <vector>
#include <unordered_set>
#include <algorithm>
using namespace std;

class SubsetSumMeetInMiddle {
public:
    bool subsetSum(vector<int>& arr, int target) {
        int n = arr.size();
        int mid = n / 2;
        
        // Generate all possible sums for left half
        vector<int> leftSums = generateSums(arr, 0, mid);
        
        // Generate all possible sums for right half
        vector<int> rightSums = generateSums(arr, mid, n);
        
        // Check if target can be achieved
        for (int leftSum : leftSums) {
            if (leftSum == target) return true;
            
            // Check if right half has target - leftSum
            if (binary_search(rightSums.begin(), rightSums.end(), target - leftSum)) {
                return true;
            }
        }
        
        return false;
    }
    
private:
    vector<int> generateSums(vector<int>& arr, int start, int end) {
        vector<int> sums;
        int n = end - start;
        
        // Generate all 2^n possible sums
        for (int mask = 0; mask < (1 << n); mask++) {
            int sum = 0;
            for (int i = 0; i < n; i++) {
                if (mask & (1 << i)) {
                    sum += arr[start + i];
                }
            }
            sums.push_back(sum);
        }
        
        sort(sums.begin(), sums.end());
        return sums;
    }
};
```

## Example: 4-Sum Problem

**Problem**: Find all unique quadruplets that sum to a target value.

**Sample Input**: 
- `nums = [1, 0, -1, 0, -2, 2]`
- `target = 0`

**Sample Output**: 
```
[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]
```

```cpp
#include <vector>
#include <unordered_map>
#include <set>
using namespace std;

class FourSumMeetInMiddle {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        int n = nums.size();
        if (n < 4) return {};
        
        sort(nums.begin(), nums.end());
        set<vector<int>> result;
        
        // Split into two halves
        int mid = n / 2;
        
        // Generate all pairs from left half
        unordered_map<int, vector<pair<int, int>>> leftPairs;
        for (int i = 0; i < mid; i++) {
            for (int j = i + 1; j < mid; j++) {
                int sum = nums[i] + nums[j];
                leftPairs[sum].push_back({i, j});
            }
        }
        
        // Generate all pairs from right half
        unordered_map<int, vector<pair<int, int>>> rightPairs;
        for (int i = mid; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int sum = nums[i] + nums[j];
                rightPairs[sum].push_back({i, j});
            }
        }
        
        // Combine results
        for (auto& leftPair : leftPairs) {
            int leftSum = leftPair.first;
            int targetRightSum = target - leftSum;
            
            if (rightPairs.find(targetRightSum) != rightPairs.end()) {
                for (auto& left : leftPair.second) {
                    for (auto& right : rightPairs[targetRightSum]) {
                        vector<int> quadruplet = {
                            nums[left.first], nums[left.second],
                            nums[right.first], nums[right.second]
                        };
                        sort(quadruplet.begin(), quadruplet.end());
                        result.insert(quadruplet);
                    }
                }
            }
        }
        
        return vector<vector<int>>(result.begin(), result.end());
    }
};
```

## Advanced Applications

### Closest Subset Sum

```cpp
#include <vector>
#include <algorithm>
using namespace std;

class ClosestSubsetSum {
public:
    int closestSubsetSum(vector<int>& arr, int target) {
        int n = arr.size();
        int mid = n / 2;
        
        // Generate all possible sums for both halves
        vector<int> leftSums = generateSums(arr, 0, mid);
        vector<int> rightSums = generateSums(arr, mid, n);
        
        sort(leftSums.begin(), leftSums.end());
        sort(rightSums.begin(), rightSums.end());
        
        int closest = INT_MAX;
        
        // For each sum in left half, find closest in right half
        for (int leftSum : leftSums) {
            int remaining = target - leftSum;
            
            // Binary search for closest value
            auto it = lower_bound(rightSums.begin(), rightSums.end(), remaining);
            
            if (it != rightSums.end()) {
                closest = min(closest, abs(target - (leftSum + *it)));
            }
            if (it != rightSums.begin()) {
                closest = min(closest, abs(target - (leftSum + *(it - 1))));
            }
        }
        
        return closest;
    }
    
private:
    vector<int> generateSums(vector<int>& arr, int start, int end) {
        vector<int> sums;
        int n = end - start;
        
        for (int mask = 0; mask < (1 << n); mask++) {
            int sum = 0;
            for (int i = 0; i < n; i++) {
                if (mask & (1 << i)) {
                    sum += arr[start + i];
                }
            }
            sums.push_back(sum);
        }
        
        return sums;
    }
};
```

### Maximum XOR Subset

```cpp
#include <vector>
#include <unordered_set>
using namespace std;

class MaxXORSubset {
public:
    int maxXORSubset(vector<int>& arr) {
        int n = arr.size();
        int mid = n / 2;
        
        // Generate all possible XORs for both halves
        vector<int> leftXORs = generateXORs(arr, 0, mid);
        vector<int> rightXORs = generateXORs(arr, mid, n);
        
        int maxXOR = 0;
        
        // Try all combinations
        for (int leftXOR : leftXORs) {
            for (int rightXOR : rightXORs) {
                maxXOR = max(maxXOR, leftXOR ^ rightXOR);
            }
        }
        
        return maxXOR;
    }
    
private:
    vector<int> generateXORs(vector<int>& arr, int start, int end) {
        vector<int> xors;
        int n = end - start;
        
        for (int mask = 0; mask < (1 << n); mask++) {
            int xorSum = 0;
            for (int i = 0; i < n; i++) {
                if (mask & (1 << i)) {
                    xorSum ^= arr[start + i];
                }
            }
            xors.push_back(xorSum);
        }
        
        return xors;
    }
};
```

## Use Cases

### Optimization Problems
- **Subset Sum**: Finding subsets that sum to a target
- **Knapsack Variants**: When the problem can be split into two parts
- **Partition Problems**: Dividing sets into two equal parts
- **Closest Pair**: Finding closest elements in high dimensions

### Search Problems
- **4-Sum and Higher**: Finding k-tuples that sum to target
- **Maximum XOR**: Finding maximum XOR of subsets
- **Palindrome Partitioning**: When the problem has symmetric structure
- **Graph Problems**: Finding paths or cycles in large graphs

### Mathematical Problems
- **Integer Factorization**: When the factors can be split
- **Discrete Logarithm**: Cryptographic applications
- **Lattice Problems**: Finding shortest vectors
- **Combinatorial Optimization**: When the search space can be halved

## Complexity Analysis

### Time Complexity
- **Standard Brute Force**: O(2^n)
- **Meet-in-the-Middle**: O(2^(n/2) × log(2^(n/2))) = O(2^(n/2) × n)
- **Space Complexity**: O(2^(n/2)) for storing intermediate results

### When to Use Meet-in-the-Middle
- Problem can be naturally split into two independent parts
- Each part can be solved independently
- Results can be efficiently combined
- Standard brute force would be too slow (n > 20-25)

## Optimization Tips

1. **Choose Split Point**: Optimize where to split the problem
2. **Sort Results**: Sort one half for efficient binary search
3. **Use Hash Maps**: For O(1) lookup when combining results
4. **Prune Early**: Eliminate impossible combinations early
5. **Memory Management**: Be careful with memory usage for large halves
6. **Parallel Processing**: Each half can be solved in parallel
