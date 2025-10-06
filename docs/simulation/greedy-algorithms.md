# Greedy Algorithms

Greedy algorithms make locally optimal choices at each step with the hope that these choices will lead to a globally optimal solution. They work well for problems that have the greedy choice property and optimal substructure.

## Key Principles

1. **Greedy Choice Property**: A global optimum can be reached by making locally optimal choices
2. **Optimal Substructure**: The optimal solution contains optimal solutions to subproblems
3. **No Backtracking**: Once a choice is made, it's never reconsidered

## Common Greedy Patterns

### 1. Activity Selection Problem

**Problem**: Select maximum number of non-overlapping activities from a set of activities.

**Sample Input**: 
- Activities: [(1,3), (2,5), (0,6), (5,7), (8,9), (5,9)]

**Sample Output**: 
- Selected activities: [(1,3), (5,7), (8,9)]
- Maximum activities: 3

```cpp
#include <vector>
#include <algorithm>
using namespace std;

struct Activity {
    int start, end;
    Activity(int s, int e) : start(s), end(e) {}
};

class ActivitySelection {
public:
    vector<Activity> selectActivities(vector<Activity>& activities) {
        // Sort by end time
        sort(activities.begin(), activities.end(), 
             [](const Activity& a, const Activity& b) {
                 return a.end < b.end;
             });
        
        vector<Activity> selected;
        selected.push_back(activities[0]);
        int lastEndTime = activities[0].end;
        
        for (int i = 1; i < activities.size(); i++) {
            if (activities[i].start >= lastEndTime) {
                selected.push_back(activities[i]);
                lastEndTime = activities[i].end;
            }
        }
        
        return selected;
    }
};
```

### 2. Fractional Knapsack

**Problem**: Fill a knapsack with maximum value, allowing fractional items.

**Sample Input**: 
- Items: [(60, 10), (100, 20), (120, 30)] (value, weight)
- Capacity: 50

**Sample Output**: 
- Maximum value: 240
- Items taken: 10kg of item1, 20kg of item2, 20kg of item3

```cpp
#include <vector>
#include <algorithm>
using namespace std;

struct Item {
    int value, weight;
    double ratio;
    
    Item(int v, int w) : value(v), weight(w) {
        ratio = (double)value / weight;
    }
};

class FractionalKnapsack {
public:
    double getMaxValue(vector<Item>& items, int capacity) {
        // Sort by value-to-weight ratio in descending order
        sort(items.begin(), items.end(), 
             [](const Item& a, const Item& b) {
                 return a.ratio > b.ratio;
             });
        
        double totalValue = 0.0;
        int remainingCapacity = capacity;
        
        for (const Item& item : items) {
            if (remainingCapacity >= item.weight) {
                // Take the entire item
                totalValue += item.value;
                remainingCapacity -= item.weight;
            } else {
                // Take fraction of the item
                totalValue += item.ratio * remainingCapacity;
                break;
            }
        }
        
        return totalValue;
    }
};
```

### 3. Huffman Coding

**Problem**: Create optimal binary codes for characters based on their frequencies.

**Sample Input**: 
- Text: "aabacdab"

**Sample Output**: 
- Character frequencies: a=4, b=2, c=1, d=1
- Huffman codes: a=0, b=10, c=110, d=111
- Encoded text: "00100110110010"

```cpp
#include <queue>
#include <string>
#include <unordered_map>
using namespace std;

struct HuffmanNode {
    char data;
    int frequency;
    HuffmanNode* left, *right;
    
    HuffmanNode(char d, int freq) : data(d), frequency(freq), left(nullptr), right(nullptr) {}
    HuffmanNode(int freq) : data('\0'), frequency(freq), left(nullptr), right(nullptr) {}
};

class HuffmanCoding {
private:
    struct Compare {
        bool operator()(HuffmanNode* a, HuffmanNode* b) {
            return a->frequency > b->frequency;
        }
    };
    
public:
    unordered_map<char, string> buildHuffmanCodes(string text) {
        // Count frequencies
        unordered_map<char, int> freq;
        for (char c : text) {
            freq[c]++;
        }
        
        // Build min heap
        priority_queue<HuffmanNode*, vector<HuffmanNode*>, Compare> minHeap;
        for (auto& pair : freq) {
            minHeap.push(new HuffmanNode(pair.first, pair.second));
        }
        
        // Build Huffman tree
        while (minHeap.size() > 1) {
            HuffmanNode* left = minHeap.top();
            minHeap.pop();
            
            HuffmanNode* right = minHeap.top();
            minHeap.pop();
            
            HuffmanNode* merged = new HuffmanNode(left->frequency + right->frequency);
            merged->left = left;
            merged->right = right;
            
            minHeap.push(merged);
        }
        
        // Generate codes
        unordered_map<char, string> codes;
        generateCodes(minHeap.top(), "", codes);
        
        return codes;
    }
    
private:
    void generateCodes(HuffmanNode* root, string code, unordered_map<char, string>& codes) {
        if (!root) return;
        
        if (root->data != '\0') {
            codes[root->data] = code;
            return;
        }
        
        generateCodes(root->left, code + "0", codes);
        generateCodes(root->right, code + "1", codes);
    }
};
```

## Classic Greedy Problems

### Minimum Spanning Tree (Kruskal's Algorithm)

```cpp
#include <vector>
#include <algorithm>
using namespace std;

struct Edge {
    int src, dest, weight;
    Edge(int s, int d, int w) : src(s), dest(d), weight(w) {}
};

class UnionFind {
private:
    vector<int> parent, rank;
    
public:
    UnionFind(int n) : parent(n), rank(n, 0) {
        iota(parent.begin(), parent.end(), 0);
    }
    
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }
    
    void unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return;
        
        if (rank[px] < rank[py]) {
            parent[px] = py;
        } else if (rank[px] > rank[py]) {
            parent[py] = px;
        } else {
            parent[py] = px;
            rank[px]++;
        }
    }
    
    bool connected(int x, int y) {
        return find(x) == find(y);
    }
};

class KruskalMST {
public:
    vector<Edge> findMST(vector<Edge>& edges, int vertices) {
        // Sort edges by weight
        sort(edges.begin(), edges.end(), 
             [](const Edge& a, const Edge& b) {
                 return a.weight < b.weight;
             });
        
        UnionFind uf(vertices);
        vector<Edge> mst;
        
        for (const Edge& edge : edges) {
            if (!uf.connected(edge.src, edge.dest)) {
                mst.push_back(edge);
                uf.unite(edge.src, edge.dest);
            }
        }
        
        return mst;
    }
};
```

### Coin Change (Minimum Coins)

```cpp
#include <vector>
#include <algorithm>
using namespace std;

class CoinChange {
public:
    int minCoins(vector<int>& coins, int amount) {
        // Sort coins in descending order
        sort(coins.rbegin(), coins.rend());
        
        int count = 0;
        int remaining = amount;
        
        for (int coin : coins) {
            if (remaining >= coin) {
                count += remaining / coin;
                remaining %= coin;
            }
        }
        
        return (remaining == 0) ? count : -1;
    }
    
    // For arbitrary coin systems (not always optimal)
    int minCoinsDP(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        
        return (dp[amount] > amount) ? -1 : dp[amount];
    }
};
```

### Job Scheduling

```cpp
#include <vector>
#include <algorithm>
using namespace std;

struct Job {
    int id, deadline, profit;
    Job(int i, int d, int p) : id(i), deadline(d), profit(p) {}
};

class JobScheduling {
public:
    vector<Job> scheduleJobs(vector<Job>& jobs) {
        // Sort by profit in descending order
        sort(jobs.begin(), jobs.end(), 
             [](const Job& a, const Job& b) {
                 return a.profit > b.profit;
             });
        
        int maxDeadline = 0;
        for (const Job& job : jobs) {
            maxDeadline = max(maxDeadline, job.deadline);
        }
        
        vector<bool> slot(maxDeadline + 1, false);
        vector<Job> scheduled;
        
        for (const Job& job : jobs) {
            // Find latest available slot
            for (int j = min(job.deadline, maxDeadline); j >= 1; j--) {
                if (!slot[j]) {
                    slot[j] = true;
                    scheduled.push_back(job);
                    break;
                }
            }
        }
        
        return scheduled;
    }
};
```

## Advanced Greedy Applications

### Gas Station Problem

```cpp
#include <vector>
using namespace std;

class GasStation {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int totalTank = 0;
        int currentTank = 0;
        int startStation = 0;
        
        for (int i = 0; i < gas.size(); i++) {
            totalTank += gas[i] - cost[i];
            currentTank += gas[i] - cost[i];
            
            if (currentTank < 0) {
                startStation = i + 1;
                currentTank = 0;
            }
        }
        
        return (totalTank >= 0) ? startStation : -1;
    }
};
```

### Meeting Rooms

```cpp
#include <vector>
#include <algorithm>
using namespace std;

struct Interval {
    int start, end;
    Interval(int s, int e) : start(s), end(e) {}
};

class MeetingRooms {
public:
    int minMeetingRooms(vector<Interval>& intervals) {
        vector<int> starts, ends;
        
        for (const Interval& interval : intervals) {
            starts.push_back(interval.start);
            ends.push_back(interval.end);
        }
        
        sort(starts.begin(), starts.end());
        sort(ends.begin(), ends.end());
        
        int rooms = 0;
        int endIndex = 0;
        
        for (int i = 0; i < starts.size(); i++) {
            if (starts[i] < ends[endIndex]) {
                rooms++;
            } else {
                endIndex++;
            }
        }
        
        return rooms;
    }
};
```

### Task Scheduler

```cpp
#include <vector>
#include <algorithm>
#include <queue>
using namespace std;

class TaskScheduler {
public:
    int leastInterval(vector<char>& tasks, int n) {
        vector<int> freq(26, 0);
        for (char task : tasks) {
            freq[task - 'A']++;
        }
        
        sort(freq.rbegin(), freq.rend());
        
        int maxFreq = freq[0];
        int idleSlots = (maxFreq - 1) * n;
        
        for (int i = 1; i < 26 && freq[i] > 0; i++) {
            idleSlots -= min(freq[i], maxFreq - 1);
        }
        
        return tasks.size() + max(0, idleSlots);
    }
};
```

## When to Use Greedy Algorithms

### Problems Suitable for Greedy
- **Activity Selection**: Choose activities that finish earliest
- **Fractional Knapsack**: Take items with highest value-to-weight ratio
- **Huffman Coding**: Build tree by combining least frequent characters
- **Minimum Spanning Tree**: Add edges with minimum weight
- **Coin Change**: Use largest coins first (for standard coin systems)

### Problems NOT Suitable for Greedy
- **0/1 Knapsack**: Greedy doesn't guarantee optimal solution
- **Traveling Salesman**: Greedy can get stuck in local optima
- **Graph Coloring**: No simple greedy strategy works
- **Longest Path**: Greedy choices don't lead to optimal solution

## Proving Greedy Correctness

### 1. Greedy Choice Property
Show that a globally optimal solution can be reached by making locally optimal choices.

### 2. Optimal Substructure
Show that the optimal solution contains optimal solutions to subproblems.

### 3. Exchange Argument
Show that any optimal solution can be transformed to include the greedy choice.

## Complexity Analysis

### Time Complexity
- **Sorting**: Usually O(n log n) for initial sorting
- **Main Algorithm**: Often O(n) after sorting
- **Overall**: Typically O(n log n)

### Space Complexity
- **Additional Space**: Usually O(1) or O(n) for storing results
- **Sorting Space**: O(1) for in-place sorting, O(n) for stable sorting

## Optimization Tips

1. **Identify the Greedy Choice**: Determine what makes a choice locally optimal
2. **Sort Efficiently**: Choose appropriate sorting criteria
3. **Use Appropriate Data Structures**: Heaps, sets, or arrays as needed
4. **Handle Edge Cases**: Empty inputs, single elements, ties
5. **Prove Correctness**: Ensure the greedy choice leads to optimal solution
6. **Consider Alternatives**: Sometimes DP or other approaches might be better
