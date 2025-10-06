# Segment Tree / Binary Indexed Tree (BIT)

Segment Trees and Binary Indexed Trees (Fenwick Trees) are powerful data structures for efficiently handling range queries and updates. They enable O(log n) time complexity for both point updates and range queries, making them essential for many competitive programming problems.

## Segment Tree

A Segment Tree is a binary tree where each node represents a segment of the array. It allows efficient range queries and updates.

### Basic Structure

```cpp
#include <vector>
#include <algorithm>
using namespace std;

class SegmentTree {
private:
    vector<int> tree;
    int n;
    
    void build(vector<int>& arr, int node, int start, int end) {
        if (start == end) {
            tree[node] = arr[start];
        } else {
            int mid = (start + end) / 2;
            build(arr, 2 * node, start, mid);
            build(arr, 2 * node + 1, mid + 1, end);
            tree[node] = tree[2 * node] + tree[2 * node + 1];
        }
    }
    
    void update(int node, int start, int end, int idx, int val) {
        if (start == end) {
            tree[node] = val;
        } else {
            int mid = (start + end) / 2;
            if (idx <= mid) {
                update(2 * node, start, mid, idx, val);
            } else {
                update(2 * node + 1, mid + 1, end, idx, val);
            }
            tree[node] = tree[2 * node] + tree[2 * node + 1];
        }
    }
    
    int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) {
            return 0;
        }
        if (l <= start && end <= r) {
            return tree[node];
        }
        int mid = (start + end) / 2;
        int left = query(2 * node, start, mid, l, r);
        int right = query(2 * node + 1, mid + 1, end, l, r);
        return left + right;
    }
    
public:
    SegmentTree(vector<int>& arr) {
        n = arr.size();
        tree.resize(4 * n);
        build(arr, 1, 0, n - 1);
    }
    
    void update(int idx, int val) {
        update(1, 0, n - 1, idx, val);
    }
    
    int rangeSum(int l, int r) {
        return query(1, 0, n - 1, l, r);
    }
};
```

### Range Sum Queries

**Problem**: Handle range sum queries and point updates efficiently.

**Sample Input**: 
- Array: `[1, 3, 5, 7, 9, 11]`
- Queries: `rangeSum(1, 3)`, `update(1, 10)`, `rangeSum(1, 3)`

**Sample Output**: 
- `rangeSum(1, 3) = 15` (3 + 5 + 7)
- After `update(1, 10)`: `rangeSum(1, 3) = 22` (10 + 5 + 7)

```cpp
#include <iostream>
using namespace std;

int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11};
    SegmentTree st(arr);
    
    cout << "Range sum(1, 3): " << st.rangeSum(1, 3) << endl;
    
    st.update(1, 10);
    cout << "After update(1, 10), range sum(1, 3): " << st.rangeSum(1, 3) << endl;
    
    return 0;
}
```

### Range Minimum Queries

**Problem**: Find the minimum element in a range with point updates.

**Sample Input**: 
- Array: `[1, 3, 2, 7, 9, 11]`
- Queries: `rangeMin(1, 3)`, `update(1, 0)`, `rangeMin(1, 3)`

**Sample Output**: 
- `rangeMin(1, 3) = 2` (min of 3, 2, 7)
- After `update(1, 0)`: `rangeMin(1, 3) = 0` (min of 0, 2, 7)

```cpp
class MinSegmentTree {
private:
    vector<int> tree;
    int n;
    
    void build(vector<int>& arr, int node, int start, int end) {
        if (start == end) {
            tree[node] = arr[start];
        } else {
            int mid = (start + end) / 2;
            build(arr, 2 * node, start, mid);
            build(arr, 2 * node + 1, mid + 1, end);
            tree[node] = min(tree[2 * node], tree[2 * node + 1]);
        }
    }
    
    void update(int node, int start, int end, int idx, int val) {
        if (start == end) {
            tree[node] = val;
        } else {
            int mid = (start + end) / 2;
            if (idx <= mid) {
                update(2 * node, start, mid, idx, val);
            } else {
                update(2 * node + 1, mid + 1, end, idx, val);
            }
            tree[node] = min(tree[2 * node], tree[2 * node + 1]);
        }
    }
    
    int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) {
            return INT_MAX;
        }
        if (l <= start && end <= r) {
            return tree[node];
        }
        int mid = (start + end) / 2;
        int left = query(2 * node, start, mid, l, r);
        int right = query(2 * node + 1, mid + 1, end, l, r);
        return min(left, right);
    }
    
public:
    MinSegmentTree(vector<int>& arr) {
        n = arr.size();
        tree.resize(4 * n);
        build(arr, 1, 0, n - 1);
    }
    
    void update(int idx, int val) {
        update(1, 0, n - 1, idx, val);
    }
    
    int rangeMin(int l, int r) {
        return query(1, 0, n - 1, l, r);
    }
};
```

## Binary Indexed Tree (Fenwick Tree)

A Binary Indexed Tree is a more space-efficient alternative to Segment Trees for range sum queries.

### Basic Implementation

**Problem**: Implement Binary Indexed Tree for range sum queries and point updates.

**Sample Input**: 
- Array: `[1, 3, 5, 7, 9, 11]`
- Queries: `rangeSum(1, 3)`, `update(1, 10)`, `rangeSum(1, 3)`

**Sample Output**: 
- `rangeSum(1, 3) = 15` (3 + 5 + 7)
- After `update(1, 10)`: `rangeSum(1, 3) = 22` (10 + 5 + 7)

```cpp
class BinaryIndexedTree {
private:
    vector<int> bit;
    int n;
    
    int getSum(int idx) {
        int sum = 0;
        idx++; // 1-indexed
        while (idx > 0) {
            sum += bit[idx];
            idx -= idx & (-idx);
        }
        return sum;
    }
    
    void update(int idx, int val) {
        idx++; // 1-indexed
        while (idx <= n) {
            bit[idx] += val;
            idx += idx & (-idx);
        }
    }
    
public:
    BinaryIndexedTree(vector<int>& arr) {
        n = arr.size();
        bit.resize(n + 1, 0);
        
        for (int i = 0; i < n; i++) {
            update(i, arr[i]);
        }
    }
    
    void update(int idx, int val) {
        int diff = val - getSum(idx) + getSum(idx - 1);
        update(idx, diff);
    }
    
    int rangeSum(int l, int r) {
        return getSum(r) - getSum(l - 1);
    }
    
    int getSum(int idx) {
        int sum = 0;
        idx++; // 1-indexed
        while (idx > 0) {
            sum += bit[idx];
            idx -= idx & (-idx);
        }
        return sum;
    }
};
```

## Advanced Applications

### Range Updates with Lazy Propagation

**Problem**: Handle range updates efficiently using lazy propagation.

**Sample Input**: 
- Array: `[1, 3, 5, 7, 9, 11]`
- Operations: `rangeUpdate(1, 3, 2)`, `rangeSum(1, 3)`

**Sample Output**: 
- After `rangeUpdate(1, 3, 2)`: `rangeSum(1, 3) = 21` (5 + 7 + 9)

```cpp
class LazySegmentTree {
private:
    vector<int> tree, lazy;
    int n;
    
    void push(int node, int start, int end) {
        if (lazy[node] != 0) {
            tree[node] += (end - start + 1) * lazy[node];
            if (start != end) {
                lazy[2 * node] += lazy[node];
                lazy[2 * node + 1] += lazy[node];
            }
            lazy[node] = 0;
        }
    }
    
    void rangeUpdate(int node, int start, int end, int l, int r, int val) {
        push(node, start, end);
        if (r < start || end < l) return;
        
        if (l <= start && end <= r) {
            lazy[node] += val;
            push(node, start, end);
        } else {
            int mid = (start + end) / 2;
            rangeUpdate(2 * node, start, mid, l, r, val);
            rangeUpdate(2 * node + 1, mid + 1, end, l, r, val);
            push(2 * node, start, mid);
            push(2 * node + 1, mid + 1, end);
            tree[node] = tree[2 * node] + tree[2 * node + 1];
        }
    }
    
    int rangeSum(int node, int start, int end, int l, int r) {
        push(node, start, end);
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return tree[node];
        
        int mid = (start + end) / 2;
        int left = rangeSum(2 * node, start, mid, l, r);
        int right = rangeSum(2 * node + 1, mid + 1, end, l, r);
        return left + right;
    }
    
public:
    LazySegmentTree(vector<int>& arr) {
        n = arr.size();
        tree.resize(4 * n);
        lazy.resize(4 * n, 0);
        build(arr, 1, 0, n - 1);
    }
    
    void rangeUpdate(int l, int r, int val) {
        rangeUpdate(1, 0, n - 1, l, r, val);
    }
    
    int rangeSum(int l, int r) {
        return rangeSum(1, 0, n - 1, l, r);
    }
};
```

### 2D Segment Tree

**Problem**: Handle range queries and updates on a 2D matrix.

**Sample Input**: 
- Matrix: `[[1, 2], [3, 4]]`
- Queries: `rangeSum(0, 0, 1, 1)`, `update(0, 0, 5)`, `rangeSum(0, 0, 1, 1)`

**Sample Output**: 
- `rangeSum(0, 0, 1, 1) = 10` (1 + 2 + 3 + 4)
- After `update(0, 0, 5)`: `rangeSum(0, 0, 1, 1) = 14` (5 + 2 + 3 + 4)

```cpp
class SegmentTree2D {
private:
    vector<vector<int>> tree;
    int n, m;
    
    void build(vector<vector<int>>& matrix, int nodeX, int nodeY, int startX, int endX, int startY, int endY) {
        if (startX == endX && startY == endY) {
            tree[nodeX][nodeY] = matrix[startX][startY];
        } else if (startX == endX) {
            int midY = (startY + endY) / 2;
            build(matrix, nodeX, 2 * nodeY, startX, endX, startY, midY);
            build(matrix, nodeX, 2 * nodeY + 1, startX, endX, midY + 1, endY);
            tree[nodeX][nodeY] = tree[nodeX][2 * nodeY] + tree[nodeX][2 * nodeY + 1];
        } else {
            int midX = (startX + endX) / 2;
            build(matrix, 2 * nodeX, nodeY, startX, midX, startY, endY);
            build(matrix, 2 * nodeX + 1, nodeY, midX + 1, endX, startY, endY);
            tree[nodeX][nodeY] = tree[2 * nodeX][nodeY] + tree[2 * nodeX + 1][nodeY];
        }
    }
    
public:
    SegmentTree2D(vector<vector<int>>& matrix) {
        n = matrix.size();
        m = matrix[0].size();
        tree.resize(4 * n, vector<int>(4 * m));
        build(matrix, 1, 1, 0, n - 1, 0, m - 1);
    }
    
    int rangeSum(int x1, int y1, int x2, int y2) {
        return query(1, 1, 0, n - 1, 0, m - 1, x1, y1, x2, y2);
    }
    
private:
    int query(int nodeX, int nodeY, int startX, int endX, int startY, int endY, int x1, int y1, int x2, int y2) {
        if (x2 < startX || endX < x1 || y2 < startY || endY < y1) return 0;
        if (x1 <= startX && endX <= x2 && y1 <= startY && endY <= y2) return tree[nodeX][nodeY];
        
        int midX = (startX + endX) / 2;
        int midY = (startY + endY) / 2;
        
        int sum = 0;
        sum += query(2 * nodeX, 2 * nodeY, startX, midX, startY, midY, x1, y1, x2, y2);
        sum += query(2 * nodeX, 2 * nodeY + 1, startX, midX, midY + 1, endY, x1, y1, x2, y2);
        sum += query(2 * nodeX + 1, 2 * nodeY, midX + 1, endX, startY, midY, x1, y1, x2, y2);
        sum += query(2 * nodeX + 1, 2 * nodeY + 1, midX + 1, endX, midY + 1, endY, x1, y1, x2, y2);
        
        return sum;
    }
};
```

## Use Cases

### Range Query Problems
- **Range Sum**: Computing sums over ranges efficiently
- **Range Minimum/Maximum**: Finding extremal values in ranges
- **Range GCD/LCM**: Computing greatest common divisor or least common multiple
- **Range XOR**: Computing XOR over ranges

### Update Problems
- **Point Updates**: Updating individual elements
- **Range Updates**: Updating ranges of elements
- **Lazy Propagation**: Efficient range updates
- **2D Updates**: Updating 2D ranges

### Competitive Programming
- **RMQ Problems**: Range Minimum Query problems
- **RSQ Problems**: Range Sum Query problems
- **Inversion Counting**: Counting inversions in arrays
- **Frequency Queries**: Handling frequency-based queries

## Complexity Analysis

### Time Complexity
- **Build**: O(n) for Segment Tree, O(n log n) for BIT
- **Point Update**: O(log n) for both
- **Range Query**: O(log n) for both
- **Range Update**: O(log n) with lazy propagation

### Space Complexity
- **Segment Tree**: O(4n) for 1D, O(16nm) for 2D
- **Binary Indexed Tree**: O(n) for 1D, O(nm) for 2D
- **Lazy Propagation**: O(4n) additional space

## When to Use Each

### Use Segment Tree when:
- You need range updates with lazy propagation
- Complex range operations (min, max, gcd, etc.)
- 2D range queries
- Non-commutative operations

### Use Binary Indexed Tree when:
- Only need range sum queries
- Space is a constraint
- Simple point updates
- Commutative operations

## Optimization Tips

1. **Choose Right Structure**: Use BIT for simple range sums, Segment Tree for complex operations
2. **Lazy Propagation**: Use for range updates to avoid O(n) per update
3. **Coordinate Compression**: Compress coordinates for sparse data
4. **Memory Management**: Use appropriate data types to save memory
5. **Batch Operations**: Process multiple queries together when possible
6. **2D Optimization**: Use 2D BIT for 2D range sums when possible
