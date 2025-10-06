# Two Pointer / Sliding Window

Two pointer and sliding window techniques are efficient methods for solving problems involving arrays or sequences. They maintain a dynamic range or window while processing data, often achieving O(n) time complexity.

## Two Pointer Technique

Two pointers move through the array from different positions, typically from both ends or at different speeds.

### Basic Template

**Problem**: Implement a general two-pointer technique for array processing.

**Sample Input**: `arr = [1, 2, 3, 4, 5, 6]`

**Sample Output**: Processes pairs from both ends moving inward

```cpp
#include <vector>
using namespace std;

void twoPointers(vector<int>& arr) {
    int left = 0, right = arr.size() - 1;
    
    while (left < right) {
        // Process current pair
        if (conditionMet(arr[left], arr[right])) {
            // Handle the case
            left++;
            right--;
        } else if (arr[left] < arr[right]) {
            left++;
        } else {
            right--;
        }
    }
}
```

### Example: Two Sum (Sorted Array)

**Problem**: Find two numbers in a sorted array that add up to a target sum.

**Sample Input**: 
- `arr = [2, 7, 11, 15]`
- `target = 9`

**Sample Output**: `[0, 1]` (indices of 2 and 7)

```python
def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    
    while left < right:
        current_sum = arr[left] + arr[right]
        
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    
    return None
```

## Sliding Window Technique

A sliding window maintains a subarray/substring of variable or fixed size while moving through the array.

### Fixed Size Window

**Problem**: Find the maximum sum of any subarray of fixed size k.

**Sample Input**: 
- `arr = [1, 4, 2, 10, 23, 3, 1, 0, 20]`
- `k = 4`

**Sample Output**: `39` (subarray [4, 2, 10, 23])

```python
def sliding_window_fixed(arr, k):
    if len(arr) < k:
        return []
    
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    for i in range(k, len(arr)):
        window_sum = window_sum - arr[i-k] + arr[i]
        max_sum = max(max_sum, window_sum)
    
    return max_sum
```

### Variable Size Window

**Problem**: Find the minimum length subarray with sum greater than or equal to target.

**Sample Input**: 
- `arr = [2, 3, 1, 2, 4, 3]`
- `target = 7`

**Sample Output**: `2` (subarray [4, 3] has sum 7)

```python
def sliding_window_variable(arr, target):
    left = 0
    window_sum = 0
    min_length = float('inf')
    
    for right in range(len(arr)):
        window_sum += arr[right]
        
        while window_sum >= target:
            min_length = min(min_length, right - left + 1)
            window_sum -= arr[left]
            left += 1
    
    return min_length if min_length != float('inf') else 0
```

## Common Applications

### Maximum Subarray Sum

```python
def max_subarray_sum(arr):
    max_sum = current_sum = arr[0]
    
    for i in range(1, len(arr)):
        current_sum = max(arr[i], current_sum + arr[i])
        max_sum = max(max_sum, current_sum)
    
    return max_sum
```

### Longest Substring Without Repeating Characters

```python
def longest_unique_substring(s):
    char_set = set()
    left = 0
    max_length = 0
    
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)
    
    return max_length
```

### Container With Most Water

```python
def max_area(height):
    left, right = 0, len(height) - 1
    max_area = 0
    
    while left < right:
        width = right - left
        current_area = width * min(height[left], height[right])
        max_area = max(max_area, current_area)
        
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return max_area
```

## Advanced Patterns

### Fast and Slow Pointers

```python
def detect_cycle(head):
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        
        if slow == fast:
            return True
    
    return False
```

### Three Pointers

```python
def three_sum(nums):
    nums.sort()
    result = []
    
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]:
            continue
        
        left, right = i + 1, len(nums) - 1
        
        while left < right:
            current_sum = nums[i] + nums[left] + nums[right]
            
            if current_sum == 0:
                result.append([nums[i], nums[left], nums[right]])
                
                while left < right and nums[left] == nums[left+1]:
                    left += 1
                while left < right and nums[right] == nums[right-1]:
                    right -= 1
                
                left += 1
                right -= 1
            elif current_sum < 0:
                left += 1
            else:
                right -= 1
    
    return result
```

## When to Use Each Technique

### Use Two Pointers When:
- Array is sorted
- Need to find pairs/triplets
- Working with palindromes
- Need to partition array

### Use Sliding Window When:
- Working with subarrays/substrings
- Need to find optimal window size
- Problem involves contiguous elements
- Need to maintain running statistics

## Complexity Analysis

- **Time Complexity**: Usually O(n) for single pass
- **Space Complexity**: Usually O(1) for two pointers, O(k) for sliding window where k is window size

## Optimization Tips

1. **Early Termination**: Stop when condition is met
2. **Skip Duplicates**: Avoid processing duplicate elements
3. **Boundary Checks**: Always check array bounds
4. **State Maintenance**: Keep track of window state efficiently
5. **Memory Optimization**: Use variables instead of data structures when possible
