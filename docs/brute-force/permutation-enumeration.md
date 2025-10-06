# Permutation Enumeration

Permutation enumeration involves generating and working with all possible arrangements of elements. This technique is essential for problems that require exploring different orderings or arrangements of a given set of elements.

## Types of Permutations

### 1. All Permutations
Generate all possible arrangements of n distinct elements.

### 2. Permutations with Repetition
Generate arrangements where elements can be repeated.

### 3. Partial Permutations (k-permutations)
Generate arrangements of k elements chosen from n elements.

### 4. Permutations with Constraints
Generate arrangements that satisfy specific conditions.

## Basic Permutation Generation

### Recursive Approach

**Problem**: Generate all permutations of an array using recursion.

**Sample Input**: `arr = [1, 2, 3]`

**Sample Output**: 
```
[1, 2, 3]
[1, 3, 2]
[2, 1, 3]
[2, 3, 1]
[3, 1, 2]
[3, 2, 1]
```

```cpp
#include <vector>
#include <algorithm>
using namespace std;

class PermutationGenerator {
public:
    vector<vector<int>> generatePermutations(vector<int>& arr) {
        vector<vector<int>> result;
        vector<int> current;
        vector<bool> used(arr.size(), false);
        
        generatePermutationsHelper(arr, current, used, result);
        return result;
    }
    
private:
    void generatePermutationsHelper(vector<int>& arr, vector<int>& current, 
                                   vector<bool>& used, vector<vector<int>>& result) {
        if (current.size() == arr.size()) {
            result.push_back(current);
            return;
        }
        
        for (int i = 0; i < arr.size(); i++) {
            if (!used[i]) {
                used[i] = true;
                current.push_back(arr[i]);
                generatePermutationsHelper(arr, current, used, result);
                current.pop_back();
                used[i] = false;
            }
        }
    }
};
```

### Iterative Approach (Heap's Algorithm)

**Problem**: Generate all permutations iteratively using Heap's algorithm.

**Sample Input**: `arr = [1, 2, 3]`

**Sample Output**: All 6 permutations of [1, 2, 3]

```cpp
#include <vector>
#include <algorithm>
using namespace std;

class IterativePermutation {
public:
    vector<vector<int>> generatePermutations(vector<int>& arr) {
        vector<vector<int>> result;
        int n = arr.size();
        vector<int> c(n, 0);
        
        result.push_back(arr);
        
        int i = 0;
        while (i < n) {
            if (c[i] < i) {
                if (i % 2 == 0) {
                    swap(arr[0], arr[i]);
                } else {
                    swap(arr[c[i]], arr[i]);
                }
                result.push_back(arr);
                c[i]++;
                i = 0;
            } else {
                c[i] = 0;
                i++;
            }
        }
        
        return result;
    }
};
```

## Next Permutation (Lexicographic Order)

**Problem**: Find the next lexicographically greater permutation.

**Sample Input**: `arr = [1, 2, 3]`

**Sample Output**: `[1, 3, 2]` (next permutation in lexicographic order)

```cpp
#include <vector>
#include <algorithm>
using namespace std;

class NextPermutation {
public:
    bool nextPermutation(vector<int>& arr) {
        int n = arr.size();
        int i = n - 2;
        
        // Find the largest index i such that arr[i] < arr[i + 1]
        while (i >= 0 && arr[i] >= arr[i + 1]) {
            i--;
        }
        
        if (i < 0) {
            return false; // No next permutation exists
        }
        
        // Find the largest index j such that arr[i] < arr[j]
        int j = n - 1;
        while (arr[j] <= arr[i]) {
            j--;
        }
        
        // Swap arr[i] and arr[j]
        swap(arr[i], arr[j]);
        
        // Reverse the suffix starting at arr[i + 1]
        reverse(arr.begin() + i + 1, arr.end());
        
        return true;
    }
    
    vector<vector<int>> allPermutations(vector<int>& arr) {
        vector<vector<int>> result;
        sort(arr.begin(), arr.end());
        
        do {
            result.push_back(arr);
        } while (nextPermutation(arr));
        
        return result;
    }
};
```

## Partial Permutations (k-permutations)

**Problem**: Generate all permutations of k elements chosen from n elements.

**Sample Input**: 
- `arr = [1, 2, 3, 4]`
- `k = 2`

**Sample Output**: 
```
[1, 2], [1, 3], [1, 4], [2, 1], [2, 3], [2, 4], 
[3, 1], [3, 2], [3, 4], [4, 1], [4, 2], [4, 3]
```

```cpp
#include <vector>
using namespace std;

class PartialPermutation {
public:
    vector<vector<int>> generateKPermutations(vector<int>& arr, int k) {
        vector<vector<int>> result;
        vector<int> current;
        vector<bool> used(arr.size(), false);
        
        generateKPermutationsHelper(arr, k, current, used, result);
        return result;
    }
    
private:
    void generateKPermutationsHelper(vector<int>& arr, int k, vector<int>& current,
                                   vector<bool>& used, vector<vector<int>>& result) {
        if (current.size() == k) {
            result.push_back(current);
            return;
        }
        
        for (int i = 0; i < arr.size(); i++) {
            if (!used[i]) {
                used[i] = true;
                current.push_back(arr[i]);
                generateKPermutationsHelper(arr, k, current, used, result);
                current.pop_back();
                used[i] = false;
            }
        }
    }
};
```

## Permutations with Repetition

**Problem**: Generate all permutations when elements can be repeated.

**Sample Input**: `arr = [1, 1, 2]`

**Sample Output**: 
```
[1, 1, 2], [1, 2, 1], [2, 1, 1]
```

```cpp
#include <vector>
#include <unordered_map>
using namespace std;

class PermutationWithRepetition {
public:
    vector<vector<int>> generatePermutationsWithRep(vector<int>& arr) {
        vector<vector<int>> result;
        vector<int> current;
        unordered_map<int, int> count;
        
        // Count frequency of each element
        for (int num : arr) {
            count[num]++;
        }
        
        generatePermutationsWithRepHelper(count, current, arr.size(), result);
        return result;
    }
    
private:
    void generatePermutationsWithRepHelper(unordered_map<int, int>& count, 
                                          vector<int>& current, int remaining,
                                          vector<vector<int>>& result) {
        if (remaining == 0) {
            result.push_back(current);
            return;
        }
        
        for (auto& pair : count) {
            if (pair.second > 0) {
                pair.second--;
                current.push_back(pair.first);
                generatePermutationsWithRepHelper(count, current, remaining - 1, result);
                current.pop_back();
                pair.second++;
            }
        }
    }
};
```

## Advanced Applications

### Permutation-based Problems

**Problem**: Find the kth permutation in lexicographic order.

**Sample Input**: 
- `n = 3` (elements 1, 2, 3)
- `k = 3`

**Sample Output**: `[2, 1, 3]` (3rd permutation)

```cpp
#include <vector>
#include <string>
using namespace std;

class KthPermutation {
public:
    string getKthPermutation(int n, int k) {
        vector<int> numbers;
        vector<int> factorial(n + 1, 1);
        
        // Calculate factorials
        for (int i = 1; i <= n; i++) {
            factorial[i] = factorial[i - 1] * i;
            numbers.push_back(i);
        }
        
        string result = "";
        k--; // Convert to 0-based indexing
        
        for (int i = 1; i <= n; i++) {
            int index = k / factorial[n - i];
            result += to_string(numbers[index]);
            numbers.erase(numbers.begin() + index);
            k -= index * factorial[n - i];
        }
        
        return result;
    }
};
```

### Circular Permutations

**Problem**: Generate all circular permutations (rotations are considered the same).

**Sample Input**: `arr = [1, 2, 3]`

**Sample Output**: 
```
[1, 2, 3], [1, 3, 2]
```
(Note: [2, 3, 1] and [3, 1, 2] are rotations of [1, 2, 3])

```cpp
#include <vector>
#include <set>
using namespace std;

class CircularPermutation {
public:
    vector<vector<int>> generateCircularPermutations(vector<int>& arr) {
        set<vector<int>> uniquePerms;
        vector<vector<int>> allPerms = generateAllPermutations(arr);
        
        for (auto& perm : allPerms) {
            vector<int> normalized = normalizeCircular(perm);
            uniquePerms.insert(normalized);
        }
        
        return vector<vector<int>>(uniquePerms.begin(), uniquePerms.end());
    }
    
private:
    vector<int> normalizeCircular(vector<int>& arr) {
        int n = arr.size();
        int minIndex = 0;
        
        // Find the index of minimum element
        for (int i = 1; i < n; i++) {
            if (arr[i] < arr[minIndex]) {
                minIndex = i;
            }
        }
        
        // Rotate to start with minimum element
        vector<int> result;
        for (int i = 0; i < n; i++) {
            result.push_back(arr[(minIndex + i) % n]);
        }
        
        return result;
    }
    
    vector<vector<int>> generateAllPermutations(vector<int>& arr) {
        // Implementation of permutation generation
        // (using any of the methods above)
        return {};
    }
};
```

## Use Cases

### Combinatorial Problems
- **Arrangement Problems**: Finding optimal arrangements
- **Scheduling**: Arranging tasks or events
- **Routing**: Finding optimal paths or tours
- **Assignment**: Assigning resources to tasks

### Optimization Problems
- **Traveling Salesman**: Finding shortest tour
- **Job Scheduling**: Optimizing task sequences
- **Resource Allocation**: Optimal distribution
- **Layout Problems**: Arranging objects optimally

### Mathematical Problems
- **Group Theory**: Studying symmetry groups
- **Combinatorics**: Counting arrangements
- **Probability**: Calculating permutation probabilities
- **Cryptography**: Generating keys or codes

## Complexity Analysis

### Time Complexity
- **All Permutations**: O(n! × n) for generating and storing
- **Next Permutation**: O(n) for finding next permutation
- **k-Permutations**: O(P(n,k) × k) where P(n,k) = n!/(n-k)!
- **With Repetition**: O(n^r) where r is the number of positions

### Space Complexity
- **Recursive**: O(n) for recursion stack
- **Iterative**: O(1) additional space (excluding output)
- **Storage**: O(n! × n) for storing all permutations

## Optimization Tips

1. **Use Iterative Methods**: Avoid recursion overhead when possible
2. **Generate on Demand**: Don't store all permutations if not needed
3. **Prune Early**: Stop generating when constraints are violated
4. **Use Next Permutation**: For lexicographic order without storing all
5. **Handle Duplicates**: Use frequency counting for repeated elements
6. **Memory Management**: Be careful with large permutation spaces
