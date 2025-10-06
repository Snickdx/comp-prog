# Frequency Counting Arrays

Frequency counting arrays are a simple yet powerful technique for counting occurrences of elements in a dataset. By using arrays to store counts, we can achieve O(1) lookup time for frequency queries.

## How It Works

The technique uses an array where:
- Index represents the element value
- Value at index represents the frequency/count of that element

## Basic Implementation

```cpp
#include <vector>
#include <algorithm>
using namespace std;

vector<int> countFrequencies(vector<int>& arr) {
    if (arr.empty()) return {};
    
    // Find the maximum value to determine array size
    int maxVal = *max_element(arr.begin(), arr.end());
    vector<int> freq(maxVal + 1, 0);
    
    // Count frequencies
    for (int num : arr) {
        freq[num]++;
    }
    
    return freq;
}

int getFrequency(vector<int>& freq, int value) {
    if (value < freq.size()) {
        return freq[value];
    }
    return 0;
}
```

## Example: Character Frequency in String

**Problem**: Count the frequency of each character in a string and find the most frequent character.

**Sample Input**: `text = "hello world"`

**Sample Output**: 
- Character frequencies: h=1, e=1, l=3, o=2, space=1, w=1, r=1, d=1
- Most frequent character: 'l' (appears 3 times)

```cpp
#include <string>
#include <vector>
using namespace std;

vector<int> charFrequency(string text) {
    // For ASCII characters (0-127)
    vector<int> freq(128, 0);
    
    for (char c : text) {
        freq[c]++;
    }
    
    return freq;
}

char mostFrequentChar(string text) {
    vector<int> freq = charFrequency(text);
    int maxFreq = *max_element(freq.begin(), freq.end());
    
    for (int i = 0; i < freq.size(); i++) {
        if (freq[i] == maxFreq) {
            return (char)i;
        }
    }
    return '\0';
}
```

## Advanced Applications

### Counting Sort

**Problem**: Sort an array of integers using counting sort (efficient for small integer ranges).

**Sample Input**: `arr = [4, 2, 2, 8, 3, 3, 1]`

**Sample Output**: `[1, 2, 2, 3, 3, 4, 8]`

```cpp
#include <vector>
#include <algorithm>
using namespace std;

vector<int> countingSort(vector<int>& arr) {
    if (arr.empty()) return {};
    
    int maxVal = *max_element(arr.begin(), arr.end());
    vector<int> freq(maxVal + 1, 0);
    
    // Count frequencies
    for (int num : arr) {
        freq[num]++;
    }
    
    // Reconstruct sorted array
    vector<int> result;
    for (int i = 0; i < freq.size(); i++) {
        for (int j = 0; j < freq[i]; j++) {
            result.push_back(i);
        }
    }
    
    return result;
}
```

### Finding Duplicates

**Problem**: Find all duplicate elements in an array using frequency counting.

**Sample Input**: `arr = [1, 2, 3, 2, 4, 3, 5]`

**Sample Output**: `[2, 3]` (elements that appear more than once)

```cpp
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> findDuplicates(vector<int>& arr) {
    unordered_map<int, int> freq;
    vector<int> duplicates;
    
    for (int num : arr) {
        freq[num]++;
        if (freq[num] == 2) {  // First duplicate
            duplicates.push_back(num);
        }
    }
    
    return duplicates;
}
```

## Use Cases

- **Sorting**: Counting sort for small integer ranges
- **Duplicate Detection**: Finding repeated elements
- **Anagram Detection**: Comparing character frequencies
- **Mode Finding**: Finding most frequent elements
- **Data Analysis**: Statistical analysis of datasets

## Space-Time Tradeoffs

### Array-based (when values are small integers)
- **Time**: O(n) for counting, O(1) for lookup
- **Space**: O(max_value) for frequency array

### Hash Map-based (for arbitrary values)
- **Time**: O(n) for counting, O(1) average for lookup
- **Space**: O(unique_values) for hash map

## Optimization Tips

1. **Range Optimization**: Use arrays only when value range is small
2. **Memory Efficiency**: Consider using hash maps for sparse data
3. **Batch Operations**: Process multiple queries together
4. **Lazy Evaluation**: Compute frequencies only when needed
