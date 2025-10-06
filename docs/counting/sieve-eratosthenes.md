# Sieve of Eratosthenes

The Sieve of Eratosthenes is an efficient algorithm for finding all prime numbers up to a given limit. It works by systematically eliminating multiples of each prime number, leaving only the primes. This algorithm is fundamental for many number theory problems and competitive programming challenges.

## How It Works

1. **Initialize**: Create a boolean array of size n+1, marking all numbers as potential primes
2. **Mark Non-Primes**: For each number from 2 to √n, if it's still marked as prime, mark all its multiples as non-prime
3. **Collect Primes**: All unmarked numbers are prime

## Basic Implementation

**Problem**: Find all prime numbers up to a given limit using the Sieve of Eratosthenes.

**Sample Input**: `n = 30`

**Sample Output**: `[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]`

```cpp
#include <vector>
#include <cmath>
using namespace std;

vector<int> sieveOfEratosthenes(int n) {
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;
    
    for (int i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    
    vector<int> primes;
    for (int i = 2; i <= n; i++) {
        if (isPrime[i]) {
            primes.push_back(i);
        }
    }
    
    return primes;
}
```

## Optimized Implementation

**Problem**: Optimized version with better memory usage and performance.

**Sample Input**: `n = 100`

**Sample Output**: All primes from 2 to 97

```cpp
#include <vector>
#include <cmath>
using namespace std;

vector<int> optimizedSieve(int n) {
    if (n < 2) return {};
    
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;
    
    // Only check odd numbers (except 2)
    for (int i = 3; i * i <= n; i += 2) {
        if (isPrime[i]) {
            // Start from i*i and step by 2*i (skip even multiples)
            for (int j = i * i; j <= n; j += 2 * i) {
                isPrime[j] = false;
            }
        }
    }
    
    vector<int> primes;
    primes.push_back(2); // Add 2 separately
    
    for (int i = 3; i <= n; i += 2) {
        if (isPrime[i]) {
            primes.push_back(i);
        }
    }
    
    return primes;
}
```

## Segmented Sieve

**Problem**: Find primes in a range [L, R] where R can be very large but R-L is manageable.

**Sample Input**: 
- `L = 100`
- `R = 200`

**Sample Output**: Primes in range [100, 200]

```cpp
#include <vector>
#include <cmath>
using namespace std;

vector<int> segmentedSieve(int L, int R) {
    // First, find all primes up to sqrt(R)
    int limit = sqrt(R);
    vector<bool> isPrime(limit + 1, true);
    isPrime[0] = isPrime[1] = false;
    
    for (int i = 2; i * i <= limit; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= limit; j += i) {
                isPrime[j] = false;
            }
        }
    }
    
    // Collect small primes
    vector<int> smallPrimes;
    for (int i = 2; i <= limit; i++) {
        if (isPrime[i]) {
            smallPrimes.push_back(i);
        }
    }
    
    // Segmented sieve
    vector<bool> rangePrime(R - L + 1, true);
    
    for (int prime : smallPrimes) {
        int start = max(prime * prime, (L + prime - 1) / prime * prime);
        for (int j = start; j <= R; j += prime) {
            rangePrime[j - L] = false;
        }
    }
    
    // Collect primes in range
    vector<int> result;
    for (int i = 0; i < rangePrime.size(); i++) {
        if (rangePrime[i] && (L + i) > 1) {
            result.push_back(L + i);
        }
    }
    
    return result;
}
```

## Advanced Applications

### Prime Factorization

**Problem**: Precompute smallest prime factor for each number to enable fast factorization.

**Sample Input**: `n = 20`

**Sample Output**: 
- Smallest prime factors: [0, 1, 2, 3, 2, 5, 2, 7, 2, 3, 2, 11, 2, 13, 2, 3, 2, 17, 2, 19, 2]

```cpp
#include <vector>
using namespace std;

class PrimeFactorization {
private:
    vector<int> spf; // smallest prime factor
    
public:
    PrimeFactorization(int n) {
        spf.resize(n + 1);
        for (int i = 0; i <= n; i++) {
            spf[i] = i;
        }
        
        for (int i = 2; i * i <= n; i++) {
            if (spf[i] == i) { // i is prime
                for (int j = i * i; j <= n; j += i) {
                    if (spf[j] == j) {
                        spf[j] = i;
                    }
                }
            }
        }
    }
    
    vector<int> getPrimeFactors(int x) {
        vector<int> factors;
        while (x > 1) {
            factors.push_back(spf[x]);
            x /= spf[x];
        }
        return factors;
    }
    
    bool isPrime(int x) {
        return spf[x] == x && x > 1;
    }
};
```

### Totient Function (Euler's Phi)

**Problem**: Calculate Euler's totient function φ(n) for all numbers up to n.

**Sample Input**: `n = 10`

**Sample Output**: 
- φ(1) = 1, φ(2) = 1, φ(3) = 2, φ(4) = 2, φ(5) = 4, φ(6) = 2, φ(7) = 6, φ(8) = 4, φ(9) = 6, φ(10) = 4

```cpp
#include <vector>
using namespace std;

vector<int> eulerTotient(int n) {
    vector<int> phi(n + 1);
    
    for (int i = 1; i <= n; i++) {
        phi[i] = i;
    }
    
    for (int i = 2; i <= n; i++) {
        if (phi[i] == i) { // i is prime
            for (int j = i; j <= n; j += i) {
                phi[j] -= phi[j] / i;
            }
        }
    }
    
    return phi;
}
```

### Möbius Function

**Problem**: Calculate Möbius function μ(n) for all numbers up to n.

**Sample Input**: `n = 10`

**Sample Output**: 
- μ(1) = 1, μ(2) = -1, μ(3) = -1, μ(4) = 0, μ(5) = -1, μ(6) = 1, μ(7) = -1, μ(8) = 0, μ(9) = 0, μ(10) = 1

```cpp
#include <vector>
using namespace std;

vector<int> mobiusFunction(int n) {
    vector<int> mu(n + 1, 1);
    vector<bool> isPrime(n + 1, true);
    
    for (int i = 2; i <= n; i++) {
        if (isPrime[i]) {
            for (int j = i; j <= n; j += i) {
                isPrime[j] = false;
                if (j % (i * i) == 0) {
                    mu[j] = 0;
                } else {
                    mu[j] *= -1;
                }
            }
        }
    }
    
    return mu;
}
```

## Use Cases

### Number Theory Problems
- **Prime Counting**: Count primes in a range
- **Prime Factorization**: Factor numbers efficiently
- **GCD/LCM**: Compute greatest common divisor and least common multiple
- **Modular Arithmetic**: Work with modular operations

### Competitive Programming
- **Prime Checking**: Determine if a number is prime
- **Prime Generation**: Generate primes for other algorithms
- **Mathematical Functions**: Totient, Möbius, and other functions
- **Optimization**: Precompute values for faster queries

### Cryptography
- **RSA Algorithm**: Generate large primes for encryption
- **Key Generation**: Create secure cryptographic keys
- **Hash Functions**: Use primes in hash table implementations
- **Random Number Generation**: Generate pseudo-random primes

## Complexity Analysis

### Time Complexity
- **Basic Sieve**: O(n log log n)
- **Optimized Sieve**: O(n log log n) with better constants
- **Segmented Sieve**: O(√R + (R-L) log log R)
- **Prime Factorization**: O(log n) per query after preprocessing

### Space Complexity
- **Basic Sieve**: O(n) for boolean array
- **Optimized Sieve**: O(n) but with better cache performance
- **Segmented Sieve**: O(√R + (R-L)) for the range
- **Prime Factorization**: O(n) for smallest prime factor array

## Optimization Tips

1. **Memory Optimization**: Use bitset for large ranges
2. **Cache Efficiency**: Process numbers in order for better cache performance
3. **Wheel Factorization**: Skip multiples of small primes
4. **Segmented Approach**: Handle large ranges by dividing into segments
5. **Precomputation**: Store results for frequently used ranges
6. **Parallel Processing**: Use multiple threads for very large sieves

## Common Variations

### Linear Sieve
```cpp
vector<int> linearSieve(int n) {
    vector<int> primes;
    vector<int> spf(n + 1);
    
    for (int i = 2; i <= n; i++) {
        if (spf[i] == 0) {
            spf[i] = i;
            primes.push_back(i);
        }
        
        for (int j = 0; j < primes.size() && primes[j] <= spf[i] && i * primes[j] <= n; j++) {
            spf[i * primes[j]] = primes[j];
        }
    }
    
    return primes;
}
```

### Sieve of Sundaram
```cpp
vector<int> sieveOfSundaram(int n) {
    int newN = (n - 1) / 2;
    vector<bool> marked(newN + 1, false);
    
    for (int i = 1; i <= newN; i++) {
        for (int j = i; (i + j + 2 * i * j) <= newN; j++) {
            marked[i + j + 2 * i * j] = true;
        }
    }
    
    vector<int> primes;
    if (n >= 2) primes.push_back(2);
    
    for (int i = 1; i <= newN; i++) {
        if (!marked[i]) {
            primes.push_back(2 * i + 1);
        }
    }
    
    return primes;
}
```
