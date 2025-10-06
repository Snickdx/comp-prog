# Trie / Aho-Corasick

Trie (prefix tree) and Aho-Corasick are powerful data structures for string processing, particularly useful for multiple pattern matching and prefix-based operations. The Aho-Corasick algorithm extends the trie with failure links for efficient multiple pattern matching.

## Trie Data Structure

A trie is a tree-like data structure where each node represents a character, and paths from root to leaves represent strings.

### Basic Trie Implementation

```cpp
#include <unordered_map>
#include <string>
#include <vector>
using namespace std;

class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
    bool isEndOfWord;
    string word;  // Store the complete word at end nodes
    
    TrieNode() : isEndOfWord(false) {}
};

class Trie {
private:
    TrieNode* root;
    
public:
    Trie() {
        root = new TrieNode();
    }
    
    // Insert a word into the trie
    void insert(string word) {
        TrieNode* current = root;
        
        for (char c : word) {
            if (current->children.find(c) == current->children.end()) {
                current->children[c] = new TrieNode();
            }
            current = current->children[c];
        }
        
        current->isEndOfWord = true;
        current->word = word;
    }
    
    // Search for a word in the trie
    bool search(string word) {
        TrieNode* current = root;
        
        for (char c : word) {
            if (current->children.find(c) == current->children.end()) {
                return false;
            }
            current = current->children[c];
        }
        
        return current->isEndOfWord;
    }
    
    // Check if any word starts with the given prefix
    bool startsWith(string prefix) {
        TrieNode* current = root;
        
        for (char c : prefix) {
            if (current->children.find(c) == current->children.end()) {
                return false;
            }
            current = current->children[c];
        }
        
        return true;
    }
    
    // Get all words with the given prefix
    vector<string> getWordsWithPrefix(string prefix) {
        vector<string> result;
        TrieNode* current = root;
        
        // Navigate to the prefix node
        for (char c : prefix) {
            if (current->children.find(c) == current->children.end()) {
                return result;  // No words with this prefix
            }
            current = current->children[c];
        }
        
        // DFS to collect all words from this node
        collectWords(current, result);
        return result;
    }
    
private:
    void collectWords(TrieNode* node, vector<string>& result) {
        if (node->isEndOfWord) {
            result.push_back(node->word);
        }
        
        for (auto& pair : node->children) {
            collectWords(pair.second, result);
        }
    }
};
```

## Aho-Corasick Algorithm

The Aho-Corasick algorithm extends the trie with failure links to efficiently find all occurrences of multiple patterns in a text.

### Aho-Corasick Implementation

```cpp
#include <unordered_map>
#include <string>
#include <vector>
#include <queue>
using namespace std;

class AhoCorasickNode {
public:
    unordered_map<char, AhoCorasickNode*> children;
    AhoCorasickNode* failure;
    vector<string> output;  // Patterns that end at this node
    bool isEndOfWord;
    
    AhoCorasickNode() : failure(nullptr), isEndOfWord(false) {}
};

class AhoCorasick {
private:
    AhoCorasickNode* root;
    
public:
    AhoCorasick() {
        root = new AhoCorasickNode();
    }
    
    // Build the trie with patterns
    void buildTrie(vector<string> patterns) {
        for (string pattern : patterns) {
            insertPattern(pattern);
        }
        buildFailureLinks();
    }
    
    // Insert a single pattern
    void insertPattern(string pattern) {
        AhoCorasickNode* current = root;
        
        for (char c : pattern) {
            if (current->children.find(c) == current->children.end()) {
                current->children[c] = new AhoCorasickNode();
            }
            current = current->children[c];
        }
        
        current->isEndOfWord = true;
        current->output.push_back(pattern);
    }
    
    // Build failure links using BFS
    void buildFailureLinks() {
        queue<AhoCorasickNode*> q;
        
        // Initialize failure links for root's children
        for (auto& pair : root->children) {
            pair.second->failure = root;
            q.push(pair.second);
        }
        
        while (!q.empty()) {
            AhoCorasickNode* current = q.front();
            q.pop();
            
            for (auto& pair : current->children) {
                char c = pair.first;
                AhoCorasickNode* child = pair.second;
                
                AhoCorasickNode* failure = current->failure;
                
                // Find the longest proper suffix that is also a prefix
                while (failure != root && failure->children.find(c) == failure->children.end()) {
                    failure = failure->failure;
                }
                
                if (failure->children.find(c) != failure->children.end()) {
                    child->failure = failure->children[c];
                } else {
                    child->failure = root;
                }
                
                // Merge output functions
                child->output.insert(child->output.end(), 
                                   child->failure->output.begin(), 
                                   child->failure->output.end());
                
                q.push(child);
            }
        }
    }
    
    // Search for all patterns in text
    vector<pair<string, int>> search(string text) {
        vector<pair<string, int>> matches;
        AhoCorasickNode* current = root;
        
        for (int i = 0; i < text.length(); i++) {
            char c = text[i];
            
            // Follow failure links until we find a child with character c
            while (current != root && current->children.find(c) == current->children.end()) {
                current = current->failure;
            }
            
            if (current->children.find(c) != current->children.end()) {
                current = current->children[c];
            } else {
                current = root;
            }
            
            // Add all patterns that end at current node
            for (string pattern : current->output) {
                matches.push_back({pattern, i - pattern.length() + 1});
            }
        }
        
        return matches;
    }
};
```

## Example: Multiple Pattern Matching

**Problem**: Implement a trie for word storage and an Aho-Corasick automaton for multiple pattern matching.

**Sample Input**: 
- Trie operations: insert "hello", "world", "hell", "he"
- Aho-Corasick patterns: ["he", "she", "his", "hers"]
- Text: "ushers"

**Sample Output**: 
```
Search 'hello': 1
Search 'hel': 0
Starts with 'he': 1
Words with prefix 'he': he hell hello

Patterns found in 'ushers':
Pattern 'he' at position 1
Pattern 'she' at position 2
Pattern 'hers' at position 3
```

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Example usage of Trie
    Trie trie;
    trie.insert("hello");
    trie.insert("world");
    trie.insert("hell");
    trie.insert("he");
    
    cout << "Search 'hello': " << trie.search("hello") << endl;
    cout << "Search 'hel': " << trie.search("hel") << endl;
    cout << "Starts with 'he': " << trie.startsWith("he") << endl;
    
    vector<string> words = trie.getWordsWithPrefix("he");
    cout << "Words with prefix 'he': ";
    for (string word : words) {
        cout << word << " ";
    }
    cout << endl;
    
    // Example usage of Aho-Corasick
    AhoCorasick ac;
    vector<string> patterns = {"he", "she", "his", "hers"};
    ac.buildTrie(patterns);
    
    string text = "ushers";
    vector<pair<string, int>> matches = ac.search(text);
    
    cout << "Patterns found in '" << text << "':" << endl;
    for (auto& match : matches) {
        cout << "Pattern '" << match.first << "' at position " << match.second << endl;
    }
    
    return 0;
}
```

## Advanced Applications

### Autocomplete System

```cpp
class AutocompleteSystem {
private:
    Trie trie;
    
public:
    void addWord(string word) {
        trie.insert(word);
    }
    
    vector<string> getSuggestions(string prefix) {
        return trie.getWordsWithPrefix(prefix);
    }
};
```

### Word Search in 2D Grid

```cpp
#include <vector>
#include <string>
using namespace std;

class WordSearch {
private:
    vector<vector<char>> board;
    int rows, cols;
    vector<string> words;
    vector<string> result;
    
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        this->board = board;
        this->words = words;
        rows = board.size();
        cols = board[0].size();
        
        // Build trie from words
        Trie trie;
        for (string word : words) {
            trie.insert(word);
        }
        
        // Search from each cell
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                dfs(i, j, "", trie.root);
            }
        }
        
        return result;
    }
    
private:
    void dfs(int row, int col, string current, TrieNode* node) {
        if (row < 0 || row >= rows || col < 0 || col >= cols || board[row][col] == '#') {
            return;
        }
        
        char c = board[row][col];
        if (node->children.find(c) == node->children.end()) {
            return;
        }
        
        current += c;
        node = node->children[c];
        
        if (node->isEndOfWord) {
            result.push_back(current);
            node->isEndOfWord = false;  // Avoid duplicates
        }
        
        board[row][col] = '#';  // Mark as visited
        
        // Explore all four directions
        dfs(row + 1, col, current, node);
        dfs(row - 1, col, current, node);
        dfs(row, col + 1, current, node);
        dfs(row, col - 1, current, node);
        
        board[row][col] = c;  // Restore
    }
};
```

## Use Cases

### Trie Applications
- **Autocomplete Systems**: Finding words with given prefixes
- **Spell Checkers**: Validating word existence
- **IP Routing**: Longest prefix matching
- **Text Compression**: LZW algorithm
- **Dictionary Operations**: Fast word lookup

### Aho-Corasick Applications
- **Multiple Pattern Matching**: Finding all patterns in text
- **Virus Detection**: Scanning for multiple virus signatures
- **Text Mining**: Extracting multiple keywords
- **DNA Sequence Analysis**: Finding multiple gene patterns
- **Network Intrusion Detection**: Pattern matching in network traffic

## Complexity Analysis

### Trie Operations
- **Insert**: O(m) where m is the length of the word
- **Search**: O(m) where m is the length of the word
- **Prefix Search**: O(m) where m is the length of the prefix
- **Space**: O(ALPHABET_SIZE * N * M) where N is number of words and M is average length

### Aho-Corasick
- **Preprocessing**: O(sum of pattern lengths)
- **Search**: O(text length + number of matches)
- **Space**: O(sum of pattern lengths)

## Optimization Tips

1. **Memory Optimization**: Use array instead of hash map for small alphabets
2. **Compression**: Implement compressed tries (radix trees) for space efficiency
3. **Lazy Loading**: Build trie nodes only when needed
4. **Caching**: Cache frequently accessed nodes
5. **Early Termination**: Stop searching when no more matches are possible
