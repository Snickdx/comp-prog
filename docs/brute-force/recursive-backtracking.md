# Recursive Backtracking

Recursive backtracking is a powerful technique that explores all possible solutions by building them incrementally and backtracking when a solution becomes invalid. It's particularly effective for constraint satisfaction problems and combinatorial optimization.

## How It Works

The algorithm follows these steps:
1. **Choose**: Make a choice for the current step
2. **Explore**: Recursively solve the remaining problem
3. **Unchoose**: Backtrack if the choice doesn't lead to a solution

## Basic Template

```cpp
#include <vector>
using namespace std;

bool backtrack(vector<int>& currentState, vector<int>& remainingChoices) {
    // Base case: solution found
    if (isSolution(currentState)) {
        return true;
    }
    
    // Try each possible choice
    for (int i = 0; i < remainingChoices.size(); i++) {
        int choice = remainingChoices[i];
        if (isValidChoice(currentState, choice)) {
            // Make the choice
            currentState.push_back(choice);
            remainingChoices.erase(remainingChoices.begin() + i);
            
            // Recursively explore
            if (backtrack(currentState, remainingChoices)) {
                return true;
            }
            
            // Backtrack: undo the choice
            currentState.pop_back();
            remainingChoices.insert(remainingChoices.begin() + i, choice);
        }
    }
    
    return false;  // No solution found
}
```

## Example: N-Queens Problem

**Problem**: Place N queens on an N×N chessboard such that no two queens attack each other. Return all possible solutions.

**Sample Input**: `n = 4`
**Sample Output**: 
```
[
  [[0,1,0,0], [0,0,0,1], [1,0,0,0], [0,0,1,0]],
  [[0,0,1,0], [1,0,0,0], [0,0,0,1], [0,1,0,0]]
]
```
(1 represents queen, 0 represents empty)

```cpp
#include <vector>
#include <iostream>
using namespace std;

class NQueens {
private:
    vector<vector<int>> board;
    vector<vector<vector<int>>> solutions;
    int n;
    
    bool isSafe(int row, int col) {
        // Check column
        for (int i = 0; i < row; i++) {
            if (board[i][col] == 1) {
                return false;
            }
        }
        
        // Check diagonals
        for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] == 1) {
                return false;
            }
        }
        
        for (int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] == 1) {
                return false;
            }
        }
        
        return true;
    }
    
    void backtrack(int row) {
        if (row == n) {
            solutions.push_back(board);
            return;
        }
        
        for (int col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = 1;
                backtrack(row + 1);
                board[row][col] = 0;  // Backtrack
            }
        }
    }
    
public:
    vector<vector<vector<int>>> solveNQueens(int n) {
        this->n = n;
        board = vector<vector<int>>(n, vector<int>(n, 0));
        solutions.clear();
        backtrack(0);
        return solutions;
    }
};
```

## Common Applications

- **Constraint Satisfaction**: Sudoku, crossword puzzles
- **Combinatorial Problems**: Permutations, combinations
- **Path Finding**: Maze solving, Hamiltonian paths
- **Game Playing**: Chess, checkers endgame analysis

## Optimization Techniques

1. **Pruning**: Eliminate branches that can't lead to solutions
2. **Heuristics**: Order choices to find solutions faster
3. **Memoization**: Cache results for repeated subproblems
4. **Constraint Propagation**: Use constraints to reduce search space

## Complexity Considerations

- **Time Complexity**: Often exponential, but pruning can significantly improve performance
- **Space Complexity**: O(depth) for recursion stack
- **Best Case**: O(1) if solution is found immediately
- **Worst Case**: O(b^d) where b is branching factor and d is depth
