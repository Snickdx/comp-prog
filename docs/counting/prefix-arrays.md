# Prefix / Difference Arrays

Prefix arrays and difference arrays are powerful techniques for efficiently answering range queries. Prefix arrays precompute cumulative sums, while difference arrays enable efficient range updates.

## Prefix Arrays

Prefix arrays store cumulative sums, allowing O(1) range sum queries.

### Implementation

**Problem**: Build a prefix array to enable O(1) range sum queries.

**Sample Input**: `arr = [1, 2, 3, 4, 5]`

**Sample Output**: 
- Prefix array: `[0, 1, 3, 6, 10, 15]`
- Range sum(1,3): `9` (2+3+4)

```cpp
#include <vector>
using namespace std;

vector<int> buildPrefixArray(vector<int>& arr) {
    int n = arr.size();
    vector<int> prefix(n + 1, 0);
    
    for (int i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + arr[i];
    }
    
    return prefix;
}

int rangeSum(vector<int>& prefix, int left, int right) {
    return prefix[right + 1] - prefix[left];
}
```

### Example Usage

```cpp
vector<int> arr = {1, 2, 3, 4, 5};
vector<int> prefix = buildPrefixArray(arr);
// prefix = {0, 1, 3, 6, 10, 15}

// Sum from index 1 to 3 (inclusive)
int sum_1_3 = rangeSum(prefix, 1, 3);  // 2 + 3 + 4 = 9
```

## Difference Arrays

Difference arrays enable efficient range updates by storing differences between consecutive elements.

### Implementation

**Problem**: Perform range updates efficiently using difference arrays.

**Sample Input**: 
- Initial array: `[0, 0, 0, 0, 0]`
- Range update: add 5 to indices 1-3

**Sample Output**: `[0, 5, 5, 5, 0]`

```cpp
#include <vector>
using namespace std;

vector<int> buildDifferenceArray(vector<int>& arr) {
    int n = arr.size();
    vector<int> diff(n, 0);
    diff[0] = arr[0];
    
    for (int i = 1; i < n; i++) {
        diff[i] = arr[i] - arr[i - 1];
    }
    
    return diff;
}

void rangeUpdate(vector<int>& diff, int left, int right, int value) {
    diff[left] += value;
    if (right + 1 < diff.size()) {
        diff[right + 1] -= value;
    }
}

vector<int> reconstructArray(vector<int>& diff) {
    vector<int> arr(diff.size(), 0);
    arr[0] = diff[0];
    
    for (int i = 1; i < diff.size(); i++) {
        arr[i] = arr[i - 1] + diff[i];
    }
    
    return arr;
}
```

### Example: Range Updates

```cpp
// Original array
vector<int> arr = {1, 2, 3, 4, 5};
vector<int> diff = buildDifferenceArray(arr);

// Add 2 to elements from index 1 to 3
rangeUpdate(diff, 1, 3, 2);

// Reconstruct the updated array
vector<int> updatedArr = reconstructArray(diff);
// Result: {1, 4, 5, 6, 5}
```

## Advanced Applications

### 2D Prefix Arrays

```cpp
#include <vector>
using namespace std;

vector<vector<int>> build2DPrefix(vector<vector<int>>& matrix) {
    int rows = matrix.size(), cols = matrix[0].size();
    vector<vector<int>> prefix(rows + 1, vector<int>(cols + 1, 0));
    
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            prefix[i + 1][j + 1] = matrix[i][j] + 
                                   prefix[i][j + 1] + 
                                   prefix[i + 1][j] - 
                                   prefix[i][j];
        }
    }
    
    return prefix;
}

int rectangleSum(vector<vector<int>>& prefix, int r1, int c1, int r2, int c2) {
    return prefix[r2 + 1][c2 + 1] - 
           prefix[r1][c2 + 1] - 
           prefix[r2 + 1][c1] + 
           prefix[r1][c1];
}
```

### Multiple Range Updates

```cpp
#include <vector>
using namespace std;

vector<int> multipleRangeUpdates(vector<int>& diff, 
                                vector<tuple<int, int, int>>& updates) {
    /*
    updates: vector of (left, right, value) tuples
    */
    for (auto& update : updates) {
        int left, right, value;
        tie(left, right, value) = update;
        rangeUpdate(diff, left, right, value);
    }
    
    return reconstructArray(diff);
}
```

## Use Cases

- **Range Sum Queries**: Fast sum queries over ranges
- **Range Updates**: Efficient bulk updates
- **Subarray Problems**: Maximum subarray, subarray with given sum
- **2D Problems**: Rectangle sum queries, image processing
- **Cumulative Analysis**: Running totals, moving averages

## Complexity Analysis

### Prefix Arrays
- **Build Time**: O(n)
- **Query Time**: O(1)
- **Space**: O(n)

### Difference Arrays
- **Build Time**: O(n)
- **Update Time**: O(1) per range update
- **Reconstruction Time**: O(n)
- **Space**: O(n)

## Optimization Tips

1. **Memory Layout**: Use contiguous memory for better cache performance
2. **Batch Operations**: Process multiple queries together
3. **Lazy Reconstruction**: Only reconstruct when final array is needed
4. **Modular Arithmetic**: Handle overflow with modular operations
