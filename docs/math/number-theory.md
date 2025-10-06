# Number Theory

Essential number theory concepts including prime numbers, modular arithmetic, GCD, LCM, and divisibility rules commonly used in competitive programming and cryptographic applications.

## Prime Numbers

### Prime Checking

**Problem**: Check if a number is prime.

**Sample Input**: `n = 17`

**Sample Output**: `true` (17 is prime)

```cpp
#include <cmath>
using namespace std;

bool isPrime(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) {
            return false;
        }
    }
    return true;
}

// For very large numbers (probabilistic)
bool isPrimeMillerRabin(long long n, int k = 5) {
    if (n <= 1 || n == 4) return false;
    if (n <= 3) return true;
    
    long long d = n - 1;
    while (d % 2 == 0) d /= 2;
    
    for (int i = 0; i < k; i++) {
        long long a = 2 + rand() % (n - 4);
        long long x = modExp(a, d, n);
        
        if (x == 1 || x == n - 1) continue;
        
        bool composite = true;
        for (int j = 0; j < d - 1; j++) {
            x = (x * x) % n;
            if (x == n - 1) {
                composite = false;
                break;
            }
        }
        if (composite) return false;
    }
    return true;
}
```

### Sieve of Eratosthenes

**Problem**: Find all prime numbers up to n.

**Sample Input**: `n = 20`

**Sample Output**: `[2, 3, 5, 7, 11, 13, 17, 19]`

```cpp
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

// Segmented sieve for large ranges
vector<long long> segmentedSieve(long long L, long long R) {
    int limit = sqrt(R);
    vector<bool> isPrime(limit + 1, true);
    vector<int> primes;
    
    // Generate primes up to sqrt(R)
    for (int i = 2; i <= limit; i++) {
        if (isPrime[i]) {
            primes.push_back(i);
            for (int j = i * i; j <= limit; j += i) {
                isPrime[j] = false;
            }
        }
    }
    
    vector<bool> isPrimeRange(R - L + 1, true);
    for (int prime : primes) {
        long long start = max((long long)prime * prime, (L + prime - 1) / prime * prime);
        for (long long j = start; j <= R; j += prime) {
            isPrimeRange[j - L] = false;
        }
    }
    
    vector<long long> result;
    for (long long i = L; i <= R; i++) {
        if (isPrimeRange[i - L]) {
            result.push_back(i);
        }
    }
    
    return result;
}
```

### Prime Factorization

**Problem**: Factorize a number into its prime factors.

**Sample Input**: `n = 60`

**Sample Output**: `[(2, 2), (3, 1), (5, 1)]` (60 = 2² × 3¹ × 5¹)

```cpp
vector<pair<int, int>> primeFactorization(int n) {
    vector<pair<int, int>> factors;
    
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            int count = 0;
            while (n % i == 0) {
                n /= i;
                count++;
            }
            factors.push_back({i, count});
        }
    }
    
    if (n > 1) {
        factors.push_back({n, 1});
    }
    
    return factors;
}

// Using precomputed primes
vector<pair<int, int>> primeFactorizationWithPrimes(int n, const vector<int>& primes) {
    vector<pair<int, int>> factors;
    
    for (int prime : primes) {
        if (prime * prime > n) break;
        if (n % prime == 0) {
            int count = 0;
            while (n % prime == 0) {
                n /= prime;
                count++;
            }
            factors.push_back({prime, count});
        }
    }
    
    if (n > 1) {
        factors.push_back({n, 1});
    }
    
    return factors;
}
```

## Greatest Common Divisor (GCD)

### Euclidean Algorithm

**Problem**: Find the GCD of two numbers.

**Sample Input**: `a = 48, b = 18`

**Sample Output**: `6` (GCD(48, 18) = 6)

```cpp
int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Recursive version
int gcdRecursive(int a, int b) {
    if (b == 0) return a;
    return gcdRecursive(b, a % b);
}

// Extended Euclidean Algorithm
int extendedGcd(int a, int b, int& x, int& y) {
    if (a == 0) {
        x = 0; y = 1;
        return b;
    }
    
    int x1, y1;
    int gcd = extendedGcd(b % a, a, x1, y1);
    
    x = y1 - (b / a) * x1;
    y = x1;
    
    return gcd;
}
```

### Least Common Multiple (LCM)

**Problem**: Find the LCM of two numbers.

**Sample Input**: `a = 12, b = 18`

**Sample Output**: `36` (LCM(12, 18) = 36)

```cpp
int lcm(int a, int b) {
    return (a / gcd(a, b)) * b;
}

// For multiple numbers
int lcmMultiple(const vector<int>& numbers) {
    int result = numbers[0];
    for (int i = 1; i < numbers.size(); i++) {
        result = lcm(result, numbers[i]);
    }
    return result;
}
```

## Modular Arithmetic

### Modular Exponentiation

**Problem**: Calculate (a^b) mod m efficiently.

**Sample Input**: `a = 2, b = 10, m = 1000`

**Sample Output**: `24` (2^10 mod 1000 = 1024 mod 1000 = 24)

```cpp
long long modExp(long long base, long long exp, long long mod) {
    long long result = 1;
    base %= mod;
    
    while (exp > 0) {
        if (exp % 2 == 1) {
            result = (result * base) % mod;
        }
        exp >>= 1;
        base = (base * base) % mod;
    }
    
    return result;
}

// Modular multiplication to prevent overflow
long long modMul(long long a, long long b, long long mod) {
    return ((a % mod) * (b % mod)) % mod;
}

// Modular addition
long long modAdd(long long a, long long b, long long mod) {
    return ((a % mod) + (b % mod)) % mod;
}

// Modular subtraction
long long modSub(long long a, long long b, long long mod) {
    return ((a % mod) - (b % mod) + mod) % mod;
}
```

### Modular Inverse

**Problem**: Find the modular inverse of a number.

**Sample Input**: `a = 3, m = 11`

**Sample Output**: `4` (3 × 4 ≡ 1 (mod 11))

```cpp
long long modInverse(long long a, long long m) {
    int x, y;
    int g = extendedGcd(a, m, x, y);
    
    if (g != 1) {
        return -1; // No inverse exists
    }
    
    return (x % m + m) % m;
}

// Using Fermat's Little Theorem (when m is prime)
long long modInverseFermat(long long a, long long m) {
    return modExp(a, m - 2, m);
}
```

### Chinese Remainder Theorem

**Problem**: Solve a system of congruences.

**Sample Input**: 
- x ≡ 2 (mod 3)
- x ≡ 3 (mod 5)
- x ≡ 2 (mod 7)

**Sample Output**: `23` (x = 23)

```cpp
long long chineseRemainderTheorem(const vector<int>& remainders, const vector<int>& moduli) {
    int n = remainders.size();
    long long product = 1;
    
    for (int mod : moduli) {
        product *= mod;
    }
    
    long long result = 0;
    for (int i = 0; i < n; i++) {
        long long partialProduct = product / moduli[i];
        long long inverse = modInverse(partialProduct, moduli[i]);
        result += remainders[i] * partialProduct * inverse;
    }
    
    return result % product;
}
```

## Divisibility Rules

### Basic Divisibility

**Problem**: Check if a number is divisible by another.

**Sample Input**: `n = 123456, d = 3`

**Sample Output**: `true` (123456 is divisible by 3)

```cpp
bool isDivisible(int n, int d) {
    return n % d == 0;
}

// Sum of digits divisible by 3
bool isDivisibleBy3(int n) {
    int sum = 0;
    while (n > 0) {
        sum += n % 10;
        n /= 10;
    }
    return sum % 3 == 0;
}

// Last digit divisible by 2
bool isDivisibleBy2(int n) {
    return n % 2 == 0;
}

// Last two digits divisible by 4
bool isDivisibleBy4(int n) {
    return n % 4 == 0;
}

// Last three digits divisible by 8
bool isDivisibleBy8(int n) {
    return n % 8 == 0;
}

// Sum of digits divisible by 9
bool isDivisibleBy9(int n) {
    int sum = 0;
    while (n > 0) {
        sum += n % 10;
        n /= 10;
    }
    return sum % 9 == 0;
}
```

## Number Theory Functions

### Euler's Totient Function

**Problem**: Calculate φ(n) - count of numbers less than n that are coprime to n.

**Sample Input**: `n = 12`

**Sample Output**: `4` (φ(12) = 4: 1, 5, 7, 11)

```cpp
int eulerTotient(int n) {
    int result = n;
    
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            while (n % i == 0) {
                n /= i;
            }
            result -= result / i;
        }
    }
    
    if (n > 1) {
        result -= result / n;
    }
    
    return result;
}

// Using prime factorization
int eulerTotientWithFactors(const vector<pair<int, int>>& factors) {
    int result = 1;
    
    for (const auto& factor : factors) {
        int p = factor.first;
        int k = factor.second;
        result *= (p - 1) * pow(p, k - 1);
    }
    
    return result;
}
```

### Möbius Function

**Problem**: Calculate μ(n) - Möbius function.

**Sample Input**: `n = 12`

**Sample Output**: `0` (μ(12) = 0 because 12 has a squared factor)

```cpp
int mobiusFunction(int n) {
    if (n == 1) return 1;
    
    int count = 0;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            if (n % (i * i) == 0) return 0; // Has squared factor
            count++;
            n /= i;
        }
    }
    
    if (n > 1) count++;
    
    return (count % 2 == 0) ? 1 : -1;
}
```

### Divisor Functions

**Problem**: Calculate number of divisors and sum of divisors.

**Sample Input**: `n = 12`

**Sample Output**: 
- Number of divisors: `6` (1, 2, 3, 4, 6, 12)
- Sum of divisors: `28` (1 + 2 + 3 + 4 + 6 + 12 = 28)

```cpp
int numberOfDivisors(int n) {
    int count = 1;
    auto factors = primeFactorization(n);
    
    for (const auto& factor : factors) {
        count *= (factor.second + 1);
    }
    
    return count;
}

int sumOfDivisors(int n) {
    int sum = 1;
    auto factors = primeFactorization(n);
    
    for (const auto& factor : factors) {
        int p = factor.first;
        int k = factor.second;
        sum *= (pow(p, k + 1) - 1) / (p - 1);
    }
    
    return sum;
}

// Generate all divisors
vector<int> getAllDivisors(int n) {
    vector<int> divisors;
    
    for (int i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            divisors.push_back(i);
            if (i != n / i) {
                divisors.push_back(n / i);
            }
        }
    }
    
    sort(divisors.begin(), divisors.end());
    return divisors;
}
```

## Use Cases

### Competitive Programming
- **Prime Problems**: Checking primality, factorization
- **Modular Arithmetic**: Large number calculations
- **GCD/LCM**: Finding common factors and multiples
- **Number Theory**: Solving mathematical problems

### Real-World Applications
- **Cryptography**: RSA encryption, digital signatures
- **Computer Science**: Hash functions, random number generation
- **Mathematics**: Research in number theory
- **Engineering**: Error detection and correction codes

## Implementation Tips

1. **Overflow Prevention**: Use `long long` for large numbers
2. **Modular Arithmetic**: Apply modulo at each step
3. **Precomputation**: Use sieves for multiple queries
4. **Efficiency**: Use efficient algorithms for large inputs
5. **Edge Cases**: Handle n=0, n=1, and negative numbers
6. **Numerical Stability**: Be careful with floating-point operations
