# Heap / Priority Queue

Heaps and Priority Queues are fundamental data structures for maintaining extremal elements (minimum or maximum) with efficient insertion and deletion operations. They are essential for many algorithms including Dijkstra's shortest path, heap sort, and task scheduling.

## Heap Properties

A heap is a complete binary tree that satisfies the heap property:
- **Min-Heap**: Parent ≤ Children
- **Max-Heap**: Parent ≥ Children

## Basic Heap Implementation

### Min-Heap Implementation

**Problem**: Implement a min-heap with insert, extract-min, and peek operations.

**Sample Input**: 
- Operations: `insert(5)`, `insert(3)`, `insert(8)`, `peek()`, `extractMin()`, `peek()`

**Sample Output**: 
- After insertions: `peek() = 3`
- After `extractMin()`: `peek() = 5`

```cpp
#include <vector>
#include <algorithm>
using namespace std;

class MinHeap {
private:
    vector<int> heap;
    
    void heapifyUp(int index) {
        while (index > 0) {
            int parent = (index - 1) / 2;
            if (heap[index] >= heap[parent]) break;
            swap(heap[index], heap[parent]);
            index = parent;
        }
    }
    
    void heapifyDown(int index) {
        while (true) {
            int smallest = index;
            int left = 2 * index + 1;
            int right = 2 * index + 2;
            
            if (left < heap.size() && heap[left] < heap[smallest]) {
                smallest = left;
            }
            if (right < heap.size() && heap[right] < heap[smallest]) {
                smallest = right;
            }
            
            if (smallest == index) break;
            
            swap(heap[index], heap[smallest]);
            index = smallest;
        }
    }
    
public:
    void insert(int value) {
        heap.push_back(value);
        heapifyUp(heap.size() - 1);
    }
    
    int extractMin() {
        if (heap.empty()) return -1;
        
        int min = heap[0];
        heap[0] = heap.back();
        heap.pop_back();
        
        if (!heap.empty()) {
            heapifyDown(0);
        }
        
        return min;
    }
    
    int peek() {
        return heap.empty() ? -1 : heap[0];
    }
    
    bool empty() {
        return heap.empty();
    }
    
    int size() {
        return heap.size();
    }
};
```

### Max-Heap Implementation

**Problem**: Implement a max-heap with insert, extract-max, and peek operations.

**Sample Input**: 
- Operations: `insert(5)`, `insert(3)`, `insert(8)`, `peek()`, `extractMax()`, `peek()`

**Sample Output**: 
- After insertions: `peek() = 8`
- After `extractMax()`: `peek() = 5`

```cpp
class MaxHeap {
private:
    vector<int> heap;
    
    void heapifyUp(int index) {
        while (index > 0) {
            int parent = (index - 1) / 2;
            if (heap[index] <= heap[parent]) break;
            swap(heap[index], heap[parent]);
            index = parent;
        }
    }
    
    void heapifyDown(int index) {
        while (true) {
            int largest = index;
            int left = 2 * index + 1;
            int right = 2 * index + 2;
            
            if (left < heap.size() && heap[left] > heap[largest]) {
                largest = left;
            }
            if (right < heap.size() && heap[right] > heap[largest]) {
                largest = right;
            }
            
            if (largest == index) break;
            
            swap(heap[index], heap[largest]);
            index = largest;
        }
    }
    
public:
    void insert(int value) {
        heap.push_back(value);
        heapifyUp(heap.size() - 1);
    }
    
    int extractMax() {
        if (heap.empty()) return -1;
        
        int max = heap[0];
        heap[0] = heap.back();
        heap.pop_back();
        
        if (!heap.empty()) {
            heapifyDown(0);
        }
        
        return max;
    }
    
    int peek() {
        return heap.empty() ? -1 : heap[0];
    }
    
    bool empty() {
        return heap.empty();
    }
    
    int size() {
        return heap.size();
    }
};
```

## Priority Queue with Custom Comparators

**Problem**: Implement a priority queue that can handle custom comparison functions.

**Sample Input**: 
- Custom comparator: Sort by string length
- Operations: `push("apple")`, `push("hi")`, `push("hello")`, `top()`, `pop()`, `top()`

**Sample Output**: 
- After insertions: `top() = "hello"` (longest string)
- After `pop()`: `top() = "apple"`

```cpp
#include <queue>
#include <string>
using namespace std;

class CustomPriorityQueue {
private:
    struct StringLengthComparator {
        bool operator()(const string& a, const string& b) {
            return a.length() < b.length(); // Max-heap by length
        }
    };
    
    priority_queue<string, vector<string>, StringLengthComparator> pq;
    
public:
    void push(const string& value) {
        pq.push(value);
    }
    
    string top() {
        return pq.empty() ? "" : pq.top();
    }
    
    void pop() {
        if (!pq.empty()) {
            pq.pop();
        }
    }
    
    bool empty() {
        return pq.empty();
    }
    
    int size() {
        return pq.size();
    }
};
```

## Advanced Applications

### Median Maintenance

**Problem**: Maintain the median of a stream of numbers using two heaps.

**Sample Input**: 
- Stream: `[5, 15, 1, 3]`
- Operations: `add(5)`, `getMedian()`, `add(15)`, `getMedian()`, `add(1)`, `getMedian()`, `add(3)`, `getMedian()`

**Sample Output**: 
- After `add(5)`: `getMedian() = 5`
- After `add(15)`: `getMedian() = 10`
- After `add(1)`: `getMedian() = 5`
- After `add(3)`: `getMedian() = 4`

```cpp
class MedianFinder {
private:
    priority_queue<int> maxHeap; // Left half (max-heap)
    priority_queue<int, vector<int>, greater<int>> minHeap; // Right half (min-heap)
    
public:
    void addNum(int num) {
        if (maxHeap.empty() || num <= maxHeap.top()) {
            maxHeap.push(num);
        } else {
            minHeap.push(num);
        }
        
        // Balance heaps
        if (maxHeap.size() > minHeap.size() + 1) {
            minHeap.push(maxHeap.top());
            maxHeap.pop();
        } else if (minHeap.size() > maxHeap.size() + 1) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }
    
    double findMedian() {
        if (maxHeap.size() == minHeap.size()) {
            return (maxHeap.top() + minHeap.top()) / 2.0;
        } else if (maxHeap.size() > minHeap.size()) {
            return maxHeap.top();
        } else {
            return minHeap.top();
        }
    }
};
```

### Merge K Sorted Arrays

**Problem**: Merge k sorted arrays into one sorted array using a min-heap.

**Sample Input**: 
- Arrays: `[[1, 4, 7], [2, 5, 8], [3, 6, 9]]`

**Sample Output**: 
- Merged: `[1, 2, 3, 4, 5, 6, 7, 8, 9]`

```cpp
#include <vector>
#include <queue>
using namespace std;

class MergeKSorted {
private:
    struct Element {
        int value;
        int arrayIndex;
        int elementIndex;
        
        Element(int v, int ai, int ei) : value(v), arrayIndex(ai), elementIndex(ei) {}
        
        bool operator>(const Element& other) const {
            return value > other.value;
        }
    };
    
public:
    vector<int> mergeKSortedArrays(vector<vector<int>>& arrays) {
        priority_queue<Element, vector<Element>, greater<Element>> minHeap;
        vector<int> result;
        
        // Insert first element from each array
        for (int i = 0; i < arrays.size(); i++) {
            if (!arrays[i].empty()) {
                minHeap.push(Element(arrays[i][0], i, 0));
            }
        }
        
        while (!minHeap.empty()) {
            Element current = minHeap.top();
            minHeap.pop();
            
            result.push_back(current.value);
            
            // Insert next element from the same array
            if (current.elementIndex + 1 < arrays[current.arrayIndex].size()) {
                minHeap.push(Element(arrays[current.arrayIndex][current.elementIndex + 1], 
                                   current.arrayIndex, current.elementIndex + 1));
            }
        }
        
        return result;
    }
};
```

### Task Scheduling

**Problem**: Schedule tasks with different priorities and deadlines using a priority queue.

**Sample Input**: 
- Tasks: `[(1, 3), (2, 1), (3, 2)]` (priority, deadline)
- Operations: `addTask(1, 3)`, `addTask(2, 1)`, `addTask(3, 2)`, `getNextTask()`, `getNextTask()`

**Sample Output**: 
- `getNextTask() = 2` (highest priority)
- `getNextTask() = 3` (next highest priority)

```cpp
struct Task {
    int priority;
    int deadline;
    int id;
    
    Task(int p, int d, int i) : priority(p), deadline(d), id(i) {}
    
    bool operator<(const Task& other) const {
        if (priority != other.priority) {
            return priority < other.priority; // Higher priority first
        }
        return deadline > other.deadline; // Earlier deadline first
    }
};

class TaskScheduler {
private:
    priority_queue<Task> taskQueue;
    int nextId = 0;
    
public:
    void addTask(int priority, int deadline) {
        taskQueue.push(Task(priority, deadline, nextId++));
    }
    
    Task getNextTask() {
        if (taskQueue.empty()) {
            return Task(-1, -1, -1); // No tasks
        }
        
        Task next = taskQueue.top();
        taskQueue.pop();
        return next;
    }
    
    bool hasTasks() {
        return !taskQueue.empty();
    }
};
```

## Heap Sort

**Problem**: Sort an array using heap sort algorithm.

**Sample Input**: 
- Array: `[64, 34, 25, 12, 22, 11, 90]`

**Sample Output**: 
- Sorted: `[11, 12, 22, 25, 34, 64, 90]`

```cpp
class HeapSort {
private:
    void heapify(vector<int>& arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        
        if (largest != i) {
            swap(arr[i], arr[largest]);
            heapify(arr, n, largest);
        }
    }
    
public:
    void heapSort(vector<int>& arr) {
        int n = arr.size();
        
        // Build max heap
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
        
        // Extract elements one by one
        for (int i = n - 1; i > 0; i--) {
            swap(arr[0], arr[i]);
            heapify(arr, i, 0);
        }
    }
};
```

## Use Cases

### Graph Algorithms
- **Dijkstra's Algorithm**: Finding shortest paths
- **Prim's Algorithm**: Minimum spanning tree
- **A* Search**: Pathfinding with heuristics
- **Topological Sort**: Ordering with dependencies

### Sorting and Selection
- **Heap Sort**: In-place sorting algorithm
- **Kth Largest Element**: Finding kth largest element
- **Merge K Sorted Lists**: Combining sorted sequences
- **External Sorting**: Sorting large datasets

### System Design
- **Task Scheduling**: Priority-based task execution
- **Load Balancing**: Distributing work efficiently
- **Memory Management**: Managing memory allocation
- **Event Processing**: Processing events by priority

### Data Processing
- **Median Maintenance**: Keeping track of running median
- **Stream Processing**: Processing data streams
- **Top K Elements**: Finding most frequent elements
- **Sliding Window**: Maintaining window statistics

## Complexity Analysis

### Time Complexity
- **Insert**: O(log n)
- **Extract Min/Max**: O(log n)
- **Peek**: O(1)
- **Build Heap**: O(n)
- **Heap Sort**: O(n log n)

### Space Complexity
- **All Operations**: O(n) for storing elements
- **In-place Heap Sort**: O(1) additional space

## Optimization Tips

1. **Choose Right Heap**: Use min-heap for smallest elements, max-heap for largest
2. **Custom Comparators**: Use custom comparators for complex ordering
3. **Memory Management**: Use appropriate data types to save memory
4. **Batch Operations**: Process multiple operations together when possible
5. **Lazy Deletion**: Mark elements as deleted instead of removing immediately
6. **Fibonacci Heaps**: Use for advanced algorithms requiring decrease-key operations
