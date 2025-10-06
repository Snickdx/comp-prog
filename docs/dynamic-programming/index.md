# Dynamic Programming (DP)

Dynamic Programming is a powerful algorithmic paradigm that solves complex problems by breaking them down into simpler subproblems and storing the solutions to avoid redundant calculations. It's particularly effective for optimization problems with overlapping subproblems.

## Techniques in This Category

| Technique | Description | Link |
|-----------|-------------|------|
| **Top-Down & Bottom-Up** | Two fundamental approaches to implementing dynamic programming solutions, each with its own advantages. | [Top-Down & Bottom-Up](top-down-bottom-up.md) |
| **Bitmask DP** | Using bitmasks to represent states in dynamic programming, particularly useful for subset problems and state space optimization. | [Bitmask DP](bitmask-dp.md) |
| **DP on Trees / Graphs** | Applying dynamic programming techniques to tree and graph structures for solving complex traversal and optimization problems. | [DP on Trees / Graphs](dp-trees-graphs.md) |

## When to Use Dynamic Programming

DP is most effective when:
- The problem has optimal substructure
- Subproblems overlap (same subproblems are solved multiple times)
- You need to find the optimal solution among many possibilities
- The problem can be broken down into smaller, similar problems

## Key Principles

1. **Optimal Substructure**: The optimal solution contains optimal solutions to subproblems
2. **Overlapping Subproblems**: The same subproblems are solved multiple times
3. **Memoization**: Store results of subproblems to avoid recomputation
4. **State Definition**: Clearly define what each state represents
