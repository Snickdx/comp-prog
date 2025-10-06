# Combinatorics & Counting

Essential formulas and techniques for permutations, combinations, and counting principles used in probability, enumeration, and combinatorial problems.

## Basic Counting Principles

### Factorial

**Problem**: Calculate n! (n factorial).

**Sample Input**: `n = 5`

**Sample Output**: `120` (5! = 5 × 4 × 3 × 2 × 1 = 120)

```cpp
#include <vector>
using namespace std;

// Recursive factorial
long long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Iterative factorial
long long factorialIterative(int n) {
    long long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Factorial with modulo
long long factorialMod(int n, long long mod) {
    long long result = 1;
    for (int i = 2; i <= n; i++) {
        result = (result * i) % mod;
    }
    return result;
}
```

### Permutations (P(n,r))

**Problem**: Calculate the number of ways to arrange r objects from n objects.

**Sample Input**: `n = 5, r = 3`

**Sample Output**: `60` (P(5,3) = 5!/(5-3)! = 120/2 = 60)

```cpp
// Permutation formula: P(n,r) = n! / (n-r)!
long long permutation(int n, int r) {
    if (r > n || r < 0) return 0;
    if (r == 0) return 1;
    
    long long result = 1;
    for (int i = n; i > n - r; i--) {
        result *= i;
    }
    return result;
}

// Permutation with modulo
long long permutationMod(int n, int r, long long mod) {
    if (r > n || r < 0) return 0;
    if (r == 0) return 1;
    
    long long result = 1;
    for (int i = n; i > n - r; i--) {
        result = (result * i) % mod;
    }
    return result;
}
```

### Combinations (C(n,r))

**Problem**: Calculate the number of ways to choose r objects from n objects.

**Sample Input**: `n = 5, r = 3`

**Sample Output**: `10` (C(5,3) = 5!/(3!(5-3)!) = 120/(6×2) = 10)

```cpp
// Combination formula: C(n,r) = n! / (r!(n-r)!)
long long combination(int n, int r) {
    if (r > n || r < 0) return 0;
    if (r == 0 || r == n) return 1;
    
    // Use the property C(n,r) = C(n,n-r) to minimize computation
    if (r > n - r) r = n - r;
    
    long long result = 1;
    for (int i = 0; i < r; i++) {
        result = result * (n - i) / (i + 1);
    }
    return result;
}

// Combination with modulo (using modular inverse)
long long modInverse(long long a, long long mod) {
    long long result = 1;
    long long power = mod - 2;
    while (power > 0) {
        if (power % 2 == 1) {
            result = (result * a) % mod;
        }
        a = (a * a) % mod;
        power /= 2;
    }
    return result;
}

long long combinationMod(int n, int r, long long mod) {
    if (r > n || r < 0) return 0;
    if (r == 0 || r == n) return 1;
    
    long long numerator = 1;
    long long denominator = 1;
    
    for (int i = 0; i < r; i++) {
        numerator = (numerator * (n - i)) % mod;
        denominator = (denominator * (i + 1)) % mod;
    }
    
    return (numerator * modInverse(denominator, mod)) % mod;
}
```

## Advanced Counting Techniques

### Pascal's Triangle

**Problem**: Generate Pascal's triangle for combinations.

**Sample Input**: `n = 5`

**Sample Output**: 
```
1
1 1
1 2 1
1 3 3 1
1 4 6 4 1
1 5 10 10 5 1
```

```cpp
vector<vector<long long>> pascalsTriangle(int n) {
    vector<vector<long long>> triangle(n + 1);
    
    for (int i = 0; i <= n; i++) {
        triangle[i].resize(i + 1);
        triangle[i][0] = triangle[i][i] = 1;
        
        for (int j = 1; j < i; j++) {
            triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j];
        }
    }
    
    return triangle;
}

// Get C(n,r) from Pascal's triangle
long long combinationFromTriangle(const vector<vector<long long>>& triangle, int n, int r) {
    if (r > n || r < 0) return 0;
    return triangle[n][r];
}
```

### Multinomial Coefficients

**Problem**: Calculate multinomial coefficient for dividing n objects into groups.

**Sample Input**: `n = 10, groups = [3, 4, 3]`

**Sample Output**: `4200` (10!/(3!×4!×3!) = 3628800/(6×24×6) = 4200)

```cpp
long long multinomialCoefficient(int n, const vector<int>& groups) {
    long long result = factorial(n);
    
    for (int group : groups) {
        result /= factorial(group);
    }
    
    return result;
}

// Multinomial with modulo
long long multinomialCoefficientMod(int n, const vector<int>& groups, long long mod) {
    long long result = factorialMod(n, mod);
    
    for (int group : groups) {
        result = (result * modInverse(factorialMod(group, mod), mod)) % mod;
    }
    
    return result;
}
```

### Stirling Numbers

**Problem**: Calculate Stirling numbers of the first and second kind.

**Sample Input**: `n = 4, k = 2`

**Sample Output**: 
- First kind: `11` (number of ways to arrange 4 objects into 2 cycles)
- Second kind: `7` (number of ways to partition 4 objects into 2 non-empty subsets)

```cpp
// Stirling numbers of the first kind: S1(n,k)
long long stirlingFirst(int n, int k) {
    if (k == 0) return (n == 0) ? 1 : 0;
    if (k > n) return 0;
    if (k == n) return 1;
    
    return (n - 1) * stirlingFirst(n - 1, k) + stirlingFirst(n - 1, k - 1);
}

// Stirling numbers of the second kind: S2(n,k)
long long stirlingSecond(int n, int k) {
    if (k == 0) return (n == 0) ? 1 : 0;
    if (k > n) return 0;
    if (k == n) return 1;
    
    return k * stirlingSecond(n - 1, k) + stirlingSecond(n - 1, k - 1);
}

// Dynamic programming version for efficiency
vector<vector<long long>> stirlingSecondDP(int n, int k) {
    vector<vector<long long>> dp(n + 1, vector<long long>(k + 1, 0));
    
    dp[0][0] = 1;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= min(i, k); j++) {
            dp[i][j] = j * dp[i-1][j] + dp[i-1][j-1];
        }
    }
    
    return dp;
}
```

## Probability Formulas

### Basic Probability

**Problem**: Calculate probability of an event.

**Sample Input**: `favorable = 3, total = 10`

**Sample Output**: `0.3` (3/10 = 0.3)

```cpp
double probability(int favorable, int total) {
    if (total == 0) return 0;
    return (double)favorable / total;
}
```

### Conditional Probability

**Problem**: Calculate P(A|B) = P(A∩B) / P(B).

**Sample Input**: `P(A∩B) = 0.2, P(B) = 0.5`

**Sample Output**: `0.4` (0.2/0.5 = 0.4)

```cpp
double conditionalProbability(double pAandB, double pB) {
    if (pB == 0) return 0;
    return pAandB / pB;
}
```

### Bayes' Theorem

**Problem**: Calculate P(A|B) using Bayes' theorem.

**Sample Input**: `P(B|A) = 0.8, P(A) = 0.3, P(B) = 0.5`

**Sample Output**: `0.48` (0.8 × 0.3 / 0.5 = 0.48)

```cpp
double bayesTheorem(double pBgivenA, double pA, double pB) {
    if (pB == 0) return 0;
    return (pBgivenA * pA) / pB;
}
```

## Inclusion-Exclusion Principle

### Basic Inclusion-Exclusion

**Problem**: Calculate |A ∪ B| = |A| + |B| - |A ∩ B|.

**Sample Input**: `|A| = 10, |B| = 15, |A∩B| = 5`

**Sample Output**: `20` (10 + 15 - 5 = 20)

```cpp
long long inclusionExclusion2(long long sizeA, long long sizeB, long long sizeAandB) {
    return sizeA + sizeB - sizeAandB;
}

// For three sets: |A ∪ B ∪ C| = |A| + |B| + |C| - |A∩B| - |A∩C| - |B∩C| + |A∩B∩C|
long long inclusionExclusion3(long long sizeA, long long sizeB, long long sizeC,
                             long long sizeAB, long long sizeAC, long long sizeBC,
                             long long sizeABC) {
    return sizeA + sizeB + sizeC - sizeAB - sizeAC - sizeBC + sizeABC;
}
```

### Derangements

**Problem**: Calculate the number of derangements (permutations where no element appears in its original position).

**Sample Input**: `n = 4`

**Sample Output**: `9` (D(4) = 9)

```cpp
long long derangements(int n) {
    if (n == 0) return 1;
    if (n == 1) return 0;
    
    long long prev = 0, curr = 1;
    for (int i = 2; i <= n; i++) {
        long long next = (i - 1) * (prev + curr);
        prev = curr;
        curr = next;
    }
    return curr;
}

// Using formula: D(n) = n! * Σ(-1)^k / k! for k = 0 to n
long long derangementsFormula(int n) {
    long long result = 0;
    long long factorial = 1;
    
    for (int k = 0; k <= n; k++) {
        if (k > 0) factorial *= k;
        long long term = factorial;
        if (k % 2 == 1) term = -term;
        result += term;
    }
    
    return result;
}
```

## Catalan Numbers

**Problem**: Calculate the nth Catalan number.

**Sample Input**: `n = 4`

**Sample Output**: `14` (C(4) = 14)

```cpp
long long catalan(int n) {
    if (n <= 1) return 1;
    
    long long result = 0;
    for (int i = 0; i < n; i++) {
        result += catalan(i) * catalan(n - 1 - i);
    }
    return result;
}

// Dynamic programming version
long long catalanDP(int n) {
    vector<long long> dp(n + 1, 0);
    dp[0] = dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        for (int j = 0; j < i; j++) {
            dp[i] += dp[j] * dp[i - 1 - j];
        }
    }
    
    return dp[n];
}

// Using formula: C(n) = (2n)! / ((n+1)! * n!)
long long catalanFormula(int n) {
    return combination(2 * n, n) / (n + 1);
}
```

## Common Counting Problems

### Permutations with Repetition

**Problem**: Calculate permutations of n objects where some are identical.

**Sample Input**: `n = 5, counts = [2, 1, 2]` (2 A's, 1 B, 2 C's)

**Sample Output**: `30` (5!/(2!×1!×2!) = 120/4 = 30)

```cpp
long long permutationsWithRepetition(int n, const vector<int>& counts) {
    long long result = factorial(n);
    
    for (int count : counts) {
        result /= factorial(count);
    }
    
    return result;
}
```

### Circular Permutations

**Problem**: Calculate circular permutations of n objects.

**Sample Input**: `n = 4`

**Sample Output**: `6` ((4-1)! = 3! = 6)

```cpp
long long circularPermutations(int n) {
    if (n <= 1) return 1;
    return factorial(n - 1);
}
```

### Combinations with Repetition

**Problem**: Calculate combinations of n objects taken r at a time with repetition allowed.

**Sample Input**: `n = 5, r = 3`

**Sample Output**: `35` (C(5+3-1, 3) = C(7, 3) = 35)

```cpp
long long combinationsWithRepetition(int n, int r) {
    return combination(n + r - 1, r);
}
```

## Use Cases

### Competitive Programming
- **Counting Problems**: Enumerating arrangements and selections
- **Probability Problems**: Calculating probabilities of events
- **Combinatorial Optimization**: Finding optimal arrangements
- **Dynamic Programming**: Using counting principles in DP

### Real-World Applications
- **Statistics**: Analyzing data and calculating probabilities
- **Cryptography**: Generating keys and analyzing security
- **Game Theory**: Analyzing strategies and outcomes
- **Operations Research**: Optimizing resource allocation

## Implementation Tips

1. **Overflow Prevention**: Use modular arithmetic for large numbers
2. **Memoization**: Cache results for recursive calculations
3. **Precomputation**: Calculate factorials and combinations in advance
4. **Numerical Stability**: Be careful with floating-point precision
5. **Edge Cases**: Handle n=0, r=0, and invalid inputs
6. **Efficiency**: Use iterative approaches for large inputs
