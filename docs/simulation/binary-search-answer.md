# Binary Search on Answer

Binary search on answer is a powerful optimization technique that uses binary search to find the optimal parameter value when the problem has monotonic properties. Instead of searching through a sorted array, we search through the space of possible answers.

## How It Works

The technique works when:
1. We can determine if a given answer is feasible (too small, too large, or optimal)
2. The feasibility function is monotonic (if answer X is feasible, then X+1 is also feasible, or vice versa)
3. We're looking for the minimum/maximum feasible answer

## Basic Template

```cpp
#include <vector>
#include <algorithm>
using namespace std;

// Template for binary search on answer
int binarySearchAnswer(int left, int right, function<bool(int)> isFeasible) {
    int result = -1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (isFeasible(mid)) {
            result = mid;
            right = mid - 1;  // Search for smaller feasible answer
        } else {
            left = mid + 1;   // Search for larger answer
        }
    }
    
    return result;
}

// For finding maximum feasible answer
int binarySearchMaxAnswer(int left, int right, function<bool(int)> isFeasible) {
    int result = -1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (isFeasible(mid)) {
            result = mid;
            left = mid + 1;   // Search for larger feasible answer
        } else {
            right = mid - 1;  // Search for smaller answer
        }
    }
    
    return result;
}
```

## Example: Minimum Capacity to Ship Packages

**Problem**: Given weights of packages and days, find the minimum capacity of a ship to ship all packages within the given days.

**Sample Input**: 
- `weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`
- `days = 5`

**Sample Output**: `15` (Can ship in 5 days with capacity 15)

```cpp
#include <vector>
#include <algorithm>
using namespace std;

class ShipPackages {
public:
    int shipWithinDays(vector<int>& weights, int days) {
        int left = *max_element(weights.begin(), weights.end());
        int right = accumulate(weights.begin(), weights.end(), 0);
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (canShip(weights, days, mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        return left;
    }
    
private:
    bool canShip(vector<int>& weights, int days, int capacity) {
        int currentWeight = 0;
        int daysNeeded = 1;
        
        for (int weight : weights) {
            if (currentWeight + weight > capacity) {
                daysNeeded++;
                currentWeight = weight;
            } else {
                currentWeight += weight;
            }
        }
        
        return daysNeeded <= days;
    }
};
```

## Example: Koko Eating Bananas

**Problem**: Koko can eat at most h bananas. Find the minimum eating speed to finish all bananas in h hours.

**Sample Input**: 
- `piles = [3, 6, 7, 11]`
- `h = 8`

**Sample Output**: `4` (Eating speed of 4 bananas per hour)

```cpp
#include <vector>
#include <algorithm>
using namespace std;

class EatingBananas {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        int left = 1;
        int right = *max_element(piles.begin(), piles.end());
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (canFinish(piles, h, mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        return left;
    }
    
private:
    bool canFinish(vector<int>& piles, int h, int speed) {
        int hours = 0;
        
        for (int pile : piles) {
            hours += (pile + speed - 1) / speed;  // Ceiling division
        }
        
        return hours <= h;
    }
};
```

## Example: Split Array Largest Sum

**Problem**: Split an array into m non-empty continuous subarrays and minimize the largest sum among these subarrays.

**Sample Input**: 
- `nums = [7, 2, 5, 10, 8]`
- `m = 2`

**Sample Output**: `18` (Split: [7,2,5] and [10,8], sums are 14 and 18)

```cpp
#include <vector>
#include <algorithm>
using namespace std;

class SplitArray {
public:
    int splitArray(vector<int>& nums, int m) {
        int left = *max_element(nums.begin(), nums.end());
        int right = accumulate(nums.begin(), nums.end(), 0);
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (canSplit(nums, m, mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        return left;
    }
    
private:
    bool canSplit(vector<int>& nums, int m, int maxSum) {
        int subarrays = 1;
        int currentSum = 0;
        
        for (int num : nums) {
            if (currentSum + num > maxSum) {
                subarrays++;
                currentSum = num;
            } else {
                currentSum += num;
            }
        }
        
        return subarrays <= m;
    }
};
```

## Advanced Applications

### Finding Kth Smallest Element in Sorted Matrix

```cpp
#include <vector>
#include <algorithm>
using namespace std;

class KthSmallestInMatrix {
public:
    int kthSmallest(vector<vector<int>>& matrix, int k) {
        int n = matrix.size();
        int left = matrix[0][0];
        int right = matrix[n-1][n-1];
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (countLessOrEqual(matrix, mid) < k) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        return left;
    }
    
private:
    int countLessOrEqual(vector<vector<int>>& matrix, int target) {
        int n = matrix.size();
        int count = 0;
        int row = n - 1;
        int col = 0;
        
        while (row >= 0 && col < n) {
            if (matrix[row][col] <= target) {
                count += row + 1;
                col++;
            } else {
                row--;
            }
        }
        
        return count;
    }
};
```

### Median of Two Sorted Arrays

```cpp
#include <vector>
#include <algorithm>
using namespace std;

class MedianOfTwoArrays {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        if (nums1.size() > nums2.size()) {
            return findMedianSortedArrays(nums2, nums1);
        }
        
        int m = nums1.size();
        int n = nums2.size();
        int left = 0, right = m;
        
        while (left <= right) {
            int partitionX = (left + right) / 2;
            int partitionY = (m + n + 1) / 2 - partitionX;
            
            int maxLeftX = (partitionX == 0) ? INT_MIN : nums1[partitionX - 1];
            int minRightX = (partitionX == m) ? INT_MAX : nums1[partitionX];
            
            int maxLeftY = (partitionY == 0) ? INT_MIN : nums2[partitionY - 1];
            int minRightY = (partitionY == n) ? INT_MAX : nums2[partitionY];
            
            if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
                if ((m + n) % 2 == 0) {
                    return (max(maxLeftX, maxLeftY) + min(minRightX, minRightY)) / 2.0;
                } else {
                    return max(maxLeftX, maxLeftY);
                }
            } else if (maxLeftX > minRightY) {
                right = partitionX - 1;
            } else {
                left = partitionX + 1;
            }
        }
        
        return 0.0;
    }
};
```

## Common Problem Patterns

### 1. Minimize Maximum Value
```cpp
// Find minimum possible maximum value
int minimizeMax(vector<int>& arr, int k) {
    int left = 0;
    int right = *max_element(arr.begin(), arr.end());
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (isFeasible(arr, k, mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}
```

### 2. Maximize Minimum Value
```cpp
// Find maximum possible minimum value
int maximizeMin(vector<int>& arr, int k) {
    int left = *min_element(arr.begin(), arr.end());
    int right = *max_element(arr.begin(), arr.end());
    
    while (left < right) {
        int mid = left + (right - left + 1) / 2;
        if (isFeasible(arr, k, mid)) {
            left = mid;
        } else {
            right = mid - 1;
        }
    }
    return left;
}
```

### 3. Find Exact Value
```cpp
// Find exact value that satisfies condition
int findExactValue(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}
```

## Use Cases

### Optimization Problems
- **Capacity Planning**: Finding minimum capacity for given constraints
- **Resource Allocation**: Optimizing resource usage
- **Scheduling**: Finding optimal time slots or deadlines
- **Load Balancing**: Distributing load optimally

### Search Problems
- **Parameter Tuning**: Finding optimal parameter values
- **Threshold Finding**: Determining critical values
- **Range Queries**: Finding values in specific ranges
- **Feasibility Testing**: Checking if solutions exist

### Mathematical Problems
- **Root Finding**: Finding roots of equations
- **Optimization**: Finding minima/maxima
- **Approximation**: Finding approximate solutions
- **Convergence**: Iterative improvement

## Complexity Analysis

### Time Complexity
- **Binary Search**: O(log n) where n is the search space size
- **Feasibility Check**: Depends on the problem (usually O(n) or O(n log n))
- **Overall**: O(f(n) × log n) where f(n) is the feasibility check complexity

### Space Complexity
- **Binary Search**: O(1) additional space
- **Feasibility Check**: Depends on the problem requirements
- **Overall**: Usually O(1) or O(n) depending on feasibility check

## Optimization Tips

1. **Choose Appropriate Bounds**: Set left and right bounds carefully
2. **Avoid Integer Overflow**: Use `left + (right - left) / 2` instead of `(left + right) / 2`
3. **Handle Edge Cases**: Consider empty arrays, single elements, etc.
4. **Optimize Feasibility Check**: Make the feasibility function as efficient as possible
5. **Use Appropriate Comparison**: Choose between `<` and `<=` based on problem requirements
6. **Consider Floating Point**: For decimal answers, use appropriate precision
