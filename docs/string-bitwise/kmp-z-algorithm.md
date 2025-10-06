# KMP / Z Algorithm

The Knuth-Morris-Pratt (KMP) and Z algorithms are efficient pattern matching algorithms that find all occurrences of a pattern in a text string. Both algorithms achieve linear time complexity O(n + m) where n is the text length and m is the pattern length.

## KMP Algorithm

The KMP algorithm uses a failure function (also called LPS - Longest Proper Prefix which is also a Suffix) to avoid unnecessary character comparisons.

### How It Works

1. **Preprocessing**: Build a failure function that determines the longest proper prefix of the pattern that is also a suffix
2. **Matching**: Use the failure function to skip characters that are guaranteed to match

### KMP Implementation

```cpp
#include <vector>
#include <string>
using namespace std;

// Build failure function (LPS array)
vector<int> buildFailureFunction(string pattern) {
    int m = pattern.length();
    vector<int> lps(m, 0);
    int len = 0;  // Length of the previous longest prefix suffix
    
    for (int i = 1; i < m; i++) {
        if (pattern[i] == pattern[len]) {
            len++;
            lps[i] = len;
        } else {
            if (len != 0) {
                len = lps[len - 1];
                i--;  // Don't increment i
            } else {
                lps[i] = 0;
            }
        }
    }
    
    return lps;
}

// Find all occurrences of pattern in text
vector<int> kmpSearch(string text, string pattern) {
    vector<int> lps = buildFailureFunction(pattern);
    vector<int> matches;
    
    int n = text.length();
    int m = pattern.length();
    int i = 0;  // Index for text
    int j = 0;  // Index for pattern
    
    while (i < n) {
        if (pattern[j] == text[i]) {
            i++;
            j++;
        }
        
        if (j == m) {
            matches.push_back(i - j);  // Pattern found at position i-j
            j = lps[j - 1];
        } else if (i < n && pattern[j] != text[i]) {
            if (j != 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    
    return matches;
}
```

## Z Algorithm

The Z algorithm builds a Z-array where Z[i] represents the length of the longest substring starting from position i that is also a prefix of the string.

### Z Algorithm Implementation

```cpp
#include <vector>
#include <string>
using namespace std;

// Build Z-array for a string
vector<int> buildZArray(string s) {
    int n = s.length();
    vector<int> z(n, 0);
    
    int l = 0, r = 0;  // Left and right boundaries of the Z-box
    
    for (int i = 1; i < n; i++) {
        if (i <= r) {
            z[i] = min(r - i + 1, z[i - l]);
        }
        
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) {
            z[i]++;
        }
        
        if (i + z[i] - 1 > r) {
            l = i;
            r = i + z[i] - 1;
        }
    }
    
    return z;
}

// Find all occurrences of pattern in text using Z algorithm
vector<int> zSearch(string text, string pattern) {
    string combined = pattern + "$" + text;
    vector<int> z = buildZArray(combined);
    vector<int> matches;
    
    int m = pattern.length();
    
    for (int i = m + 1; i < z.size(); i++) {
        if (z[i] == m) {
            matches.push_back(i - m - 1);
        }
    }
    
    return matches;
}
```

## Example: Pattern Matching

**Problem**: Find all occurrences of a pattern string in a text string.

**Sample Input**: 
- `text = "ABABDABACDABABCABAB"`
- `pattern = "ABABCABAB"`

**Sample Output**: 
- KMP matches at positions: `10`
- Z algorithm matches at positions: `10`

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    string text = "ABABDABACDABABCABAB";
    string pattern = "ABABCABAB";
    
    // Using KMP
    vector<int> kmpMatches = kmpSearch(text, pattern);
    cout << "KMP matches at positions: ";
    for (int pos : kmpMatches) {
        cout << pos << " ";
    }
    cout << endl;
    
    // Using Z algorithm
    vector<int> zMatches = zSearch(text, pattern);
    cout << "Z algorithm matches at positions: ";
    for (int pos : zMatches) {
        cout << pos << " ";
    }
    cout << endl;
    
    return 0;
}
```

## Advanced Applications

### Multiple Pattern Matching

**Problem**: Find all occurrences of multiple patterns in a text string.

**Sample Input**: 
- `text = "ushers"`
- `patterns = ["he", "she", "his", "hers"]`

**Sample Output**: 
```
[
  {"he", [1]},
  {"she", [2]},
  {"his", []},
  {"hers", [3]}
]
```

```cpp
#include <vector>
#include <string>
using namespace std;

// Find all patterns in text using KMP
vector<pair<string, vector<int>>> findMultiplePatterns(string text, vector<string> patterns) {
    vector<pair<string, vector<int>>> results;
    
    for (string pattern : patterns) {
        vector<int> matches = kmpSearch(text, pattern);
        results.push_back({pattern, matches});
    }
    
    return results;
}
```

### Longest Common Substring

**Problem**: Find the longest common substring between two strings.

**Sample Input**: 
- `s1 = "ABABC"`
- `s2 = "BABCA"`

**Sample Output**: `"BABC"`

```cpp
#include <string>
#include <vector>
using namespace std;

string longestCommonSubstring(string s1, string s2) {
    string combined = s1 + "$" + s2;
    vector<int> z = buildZArray(combined);
    
    int maxLen = 0;
    int startPos = 0;
    
    for (int i = s1.length() + 1; i < z.size(); i++) {
        if (z[i] > maxLen) {
            maxLen = z[i];
            startPos = i - s1.length() - 1;
        }
    }
    
    return s2.substr(startPos, maxLen);
}
```

## Use Cases

- **Text Search**: Finding all occurrences of a pattern in text
- **DNA Sequence Analysis**: Pattern matching in biological sequences
- **Plagiarism Detection**: Finding similar text patterns
- **String Compression**: LZ77 and similar algorithms
- **Regular Expression Matching**: Building regex engines

## Complexity Analysis

### KMP Algorithm
- **Time Complexity**: O(n + m) for preprocessing and searching
- **Space Complexity**: O(m) for the failure function

### Z Algorithm
- **Time Complexity**: O(n + m) for building Z-array and searching
- **Space Complexity**: O(n + m) for the Z-array

## When to Use Which Algorithm

### Use KMP when:
- You need to find all occurrences of a single pattern
- Memory usage is a concern (KMP uses less space)
- You need the failure function for other applications

### Use Z Algorithm when:
- You need to find the longest common prefix at each position
- You're working with multiple pattern matching
- You need to find palindromes or other string properties

## Optimization Tips

1. **Early Termination**: Stop searching if only the first occurrence is needed
2. **Memory Optimization**: Use Z algorithm for single-pass applications
3. **Pattern Preprocessing**: Cache failure functions for repeated pattern searches
4. **String Concatenation**: Minimize string operations in the Z algorithm
