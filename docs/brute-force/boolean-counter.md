# Boolean Counter Enumeration

Boolean counter enumeration is a systematic approach to generating all possible combinations using binary representations and bit manipulation. This technique is particularly useful when you need to explore all subsets of a given set.

## How It Works

The technique uses the binary representation of numbers to represent different combinations:
- Each bit position represents whether an element is included (1) or excluded (0)
- Numbers from 0 to 2^n - 1 represent all possible subsets of n elements

## Algorithm

```cpp
#include <vector>
using namespace std;

vector<vector<int>> generateSubsets(vector<int>& elements) {
    int n = elements.size();
    vector<vector<int>> subsets;
    
    // Generate all possible subsets using bit manipulation
    for (int i = 0; i < (1 << n); i++) {  // 2^n combinations
        vector<int> subset;
        for (int j = 0; j < n; j++) {
            if (i & (1 << j)) {  // Check if j-th bit is set
                subset.push_back(elements[j]);
            }
        }
        subsets.push_back(subset);
    }
    
    return subsets;
}
```

## Example: Subset Sum Problem

**Problem**: Given an array of integers and a target sum, find any subset that adds up to the target sum.

**Sample Input**: `arr = [3, 1, 4, 2]`, `target = 6`
**Sample Output**: `[3, 1, 2]` (or `[4, 2]`)

```cpp
#include <vector>
using namespace std;

vector<int> subsetSum(vector<int>& arr, int target) {
    int n = arr.size();
    
    for (int i = 0; i < (1 << n); i++) {
        int currentSum = 0;
        vector<int> subset;
        
        for (int j = 0; j < n; j++) {
            if (i & (1 << j)) {
                currentSum += arr[j];
                subset.push_back(arr[j]);
            }
        }
        
        if (currentSum == target) {
            return subset;
        }
    }
    
    return {};  // No subset found
}
```

## Use Cases

- **Subset Problems**: Finding all subsets that satisfy certain conditions
- **Combination Generation**: Generating all possible combinations of elements
- **Knapsack Problems**: Exploring all possible item selections
- **Permutation Problems**: When combined with other techniques

## Complexity

- **Time Complexity**: O(2^n × n) for generating all subsets
- **Space Complexity**: O(2^n) for storing all subsets

## Optimization Tips

1. **Early Termination**: Stop when you find the first valid solution
2. **Pruning**: Skip combinations that can't lead to valid solutions
3. **Bit Manipulation**: Use efficient bit operations for checking set membership
4. **Memoization**: Cache results for repeated subproblems when applicable
