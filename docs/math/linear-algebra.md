# Linear Algebra

Essential linear algebra concepts including matrix operations, determinants, eigenvalues, and vector calculations commonly used in computer graphics, machine learning, and scientific computing.

## Vector Operations

### Basic Vector Operations

**Problem**: Perform basic vector operations (addition, subtraction, scalar multiplication).

**Sample Input**: 
- `v1 = [1, 2, 3]`
- `v2 = [4, 5, 6]`
- `scalar = 2`

**Sample Output**: 
- `v1 + v2 = [5, 7, 9]`
- `v1 - v2 = [-3, -3, -3]`
- `2 * v1 = [2, 4, 6]`

```cpp
#include <vector>
#include <cmath>
using namespace std;

class Vector {
private:
    vector<double> data;
    
public:
    Vector(const vector<double>& values) : data(values) {}
    
    Vector(int size, double value = 0) : data(size, value) {}
    
    int size() const { return data.size(); }
    
    double& operator[](int index) { return data[index]; }
    const double& operator[](int index) const { return data[index]; }
    
    // Vector addition
    Vector operator+(const Vector& other) const {
        Vector result(data.size());
        for (int i = 0; i < data.size(); i++) {
            result[i] = data[i] + other[i];
        }
        return result;
    }
    
    // Vector subtraction
    Vector operator-(const Vector& other) const {
        Vector result(data.size());
        for (int i = 0; i < data.size(); i++) {
            result[i] = data[i] - other[i];
        }
        return result;
    }
    
    // Scalar multiplication
    Vector operator*(double scalar) const {
        Vector result(data.size());
        for (int i = 0; i < data.size(); i++) {
            result[i] = data[i] * scalar;
        }
        return result;
    }
    
    // Dot product
    double dot(const Vector& other) const {
        double result = 0;
        for (int i = 0; i < data.size(); i++) {
            result += data[i] * other[i];
        }
        return result;
    }
    
    // Cross product (3D only)
    Vector cross(const Vector& other) const {
        if (data.size() != 3 || other.size() != 3) {
            throw invalid_argument("Cross product only defined for 3D vectors");
        }
        
        return Vector({
            data[1] * other[2] - data[2] * other[1],
            data[2] * other[0] - data[0] * other[2],
            data[0] * other[1] - data[1] * other[0]
        });
    }
    
    // Vector magnitude
    double magnitude() const {
        double sum = 0;
        for (double value : data) {
            sum += value * value;
        }
        return sqrt(sum);
    }
    
    // Normalize vector
    Vector normalize() const {
        double mag = magnitude();
        if (mag == 0) return *this;
        return *this * (1.0 / mag);
    }
};
```

### Vector Projection

**Problem**: Project one vector onto another.

**Sample Input**: 
- `v = [3, 4, 0]`
- `u = [1, 0, 0]`

**Sample Output**: 
- Projection: `[3, 0, 0]`
- Scalar projection: `3.0`

```cpp
// Project vector v onto vector u
Vector project(const Vector& v, const Vector& u) {
    double scalar = v.dot(u) / u.dot(u);
    return u * scalar;
}

// Scalar projection of v onto u
double scalarProjection(const Vector& v, const Vector& u) {
    return v.dot(u) / u.magnitude();
}
```

## Matrix Operations

### Basic Matrix Operations

**Problem**: Perform basic matrix operations (addition, subtraction, multiplication).

**Sample Input**: 
- `A = [[1, 2], [3, 4]]`
- `B = [[5, 6], [7, 8]]`

**Sample Output**: 
- `A + B = [[6, 8], [10, 12]]`
- `A * B = [[19, 22], [43, 50]]`

```cpp
class Matrix {
private:
    vector<vector<double>> data;
    int rows, cols;
    
public:
    Matrix(int rows, int cols, double value = 0) : rows(rows), cols(cols) {
        data.resize(rows, vector<double>(cols, value));
    }
    
    Matrix(const vector<vector<double>>& values) : data(values) {
        rows = values.size();
        cols = values[0].size();
    }
    
    int getRows() const { return rows; }
    int getCols() const { return cols; }
    
    vector<double>& operator[](int index) { return data[index]; }
    const vector<double>& operator[](int index) const { return data[index]; }
    
    // Matrix addition
    Matrix operator+(const Matrix& other) const {
        Matrix result(rows, cols);
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                result[i][j] = data[i][j] + other[i][j];
            }
        }
        return result;
    }
    
    // Matrix subtraction
    Matrix operator-(const Matrix& other) const {
        Matrix result(rows, cols);
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                result[i][j] = data[i][j] - other[i][j];
            }
        }
        return result;
    }
    
    // Matrix multiplication
    Matrix operator*(const Matrix& other) const {
        if (cols != other.rows) {
            throw invalid_argument("Matrix dimensions don't match for multiplication");
        }
        
        Matrix result(rows, other.cols);
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < other.cols; j++) {
                for (int k = 0; k < cols; k++) {
                    result[i][j] += data[i][k] * other[k][j];
                }
            }
        }
        return result;
    }
    
    // Scalar multiplication
    Matrix operator*(double scalar) const {
        Matrix result(rows, cols);
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                result[i][j] = data[i][j] * scalar;
            }
        }
        return result;
    }
    
    // Matrix-vector multiplication
    Vector operator*(const Vector& v) const {
        if (cols != v.size()) {
            throw invalid_argument("Matrix and vector dimensions don't match");
        }
        
        Vector result(rows);
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                result[i] += data[i][j] * v[j];
            }
        }
        return result;
    }
};
```

### Matrix Transpose

**Problem**: Calculate the transpose of a matrix.

**Sample Input**: `A = [[1, 2, 3], [4, 5, 6]]`

**Sample Output**: `A^T = [[1, 4], [2, 5], [3, 6]]`

```cpp
Matrix transpose() const {
    Matrix result(cols, rows);
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            result[j][i] = data[i][j];
        }
    }
    return result;
}
```

## Determinants

### 2x2 Determinant

**Problem**: Calculate the determinant of a 2x2 matrix.

**Sample Input**: `A = [[1, 2], [3, 4]]`

**Sample Output**: `-2` (1×4 - 2×3 = -2)

```cpp
double determinant2x2(const Matrix& A) {
    if (A.getRows() != 2 || A.getCols() != 2) {
        throw invalid_argument("Matrix must be 2x2");
    }
    return A[0][0] * A[1][1] - A[0][1] * A[1][0];
}
```

### 3x3 Determinant

**Problem**: Calculate the determinant of a 3x3 matrix.

**Sample Input**: `A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]`

**Sample Output**: `0` (matrix is singular)

```cpp
double determinant3x3(const Matrix& A) {
    if (A.getRows() != 3 || A.getCols() != 3) {
        throw invalid_argument("Matrix must be 3x3");
    }
    
    return A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) -
           A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) +
           A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
}
```

### General Determinant (Laplace Expansion)

**Problem**: Calculate the determinant of any square matrix.

**Sample Input**: `A = [[2, 1, 0], [0, 3, 1], [1, 0, 2]]`

**Sample Output**: `11`

```cpp
double determinant(const Matrix& A) {
    if (A.getRows() != A.getCols()) {
        throw invalid_argument("Matrix must be square");
    }
    
    int n = A.getRows();
    if (n == 1) return A[0][0];
    if (n == 2) return determinant2x2(A);
    
    double det = 0;
    for (int j = 0; j < n; j++) {
        Matrix minor = getMinor(A, 0, j);
        double cofactor = pow(-1, j) * determinant(minor);
        det += A[0][j] * cofactor;
    }
    
    return det;
}

// Helper function to get minor matrix
Matrix getMinor(const Matrix& A, int row, int col) {
    int n = A.getRows();
    Matrix minor(n - 1, n - 1);
    
    int minorRow = 0;
    for (int i = 0; i < n; i++) {
        if (i == row) continue;
        int minorCol = 0;
        for (int j = 0; j < n; j++) {
            if (j == col) continue;
            minor[minorRow][minorCol] = A[i][j];
            minorCol++;
        }
        minorRow++;
    }
    
    return minor;
}
```

## Matrix Inversion

### 2x2 Matrix Inversion

**Problem**: Calculate the inverse of a 2x2 matrix.

**Sample Input**: `A = [[1, 2], [3, 4]]`

**Sample Output**: `A^(-1) = [[-2, 1], [1.5, -0.5]]`

```cpp
Matrix inverse2x2(const Matrix& A) {
    if (A.getRows() != 2 || A.getCols() != 2) {
        throw invalid_argument("Matrix must be 2x2");
    }
    
    double det = determinant2x2(A);
    if (abs(det) < 1e-9) {
        throw invalid_argument("Matrix is singular (determinant is zero)");
    }
    
    Matrix result(2, 2);
    result[0][0] = A[1][1] / det;
    result[0][1] = -A[0][1] / det;
    result[1][0] = -A[1][0] / det;
    result[1][1] = A[0][0] / det;
    
    return result;
}
```

### General Matrix Inversion (Gaussian Elimination)

**Problem**: Calculate the inverse of any square matrix.

**Sample Input**: `A = [[2, 1], [1, 1]]`

**Sample Output**: `A^(-1) = [[1, -1], [-1, 2]]`

```cpp
Matrix inverse(const Matrix& A) {
    if (A.getRows() != A.getCols()) {
        throw invalid_argument("Matrix must be square");
    }
    
    int n = A.getRows();
    Matrix augmented(n, 2 * n);
    
    // Create augmented matrix [A | I]
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            augmented[i][j] = A[i][j];
        }
        augmented[i][i + n] = 1;
    }
    
    // Gaussian elimination
    for (int i = 0; i < n; i++) {
        // Find pivot
        int maxRow = i;
        for (int k = i + 1; k < n; k++) {
            if (abs(augmented[k][i]) > abs(augmented[maxRow][i])) {
                maxRow = k;
            }
        }
        
        // Swap rows
        if (maxRow != i) {
            swap(augmented[i], augmented[maxRow]);
        }
        
        // Check for singular matrix
        if (abs(augmented[i][i]) < 1e-9) {
            throw invalid_argument("Matrix is singular");
        }
        
        // Make diagonal element 1
        double pivot = augmented[i][i];
        for (int j = 0; j < 2 * n; j++) {
            augmented[i][j] /= pivot;
        }
        
        // Eliminate column
        for (int k = 0; k < n; k++) {
            if (k != i) {
                double factor = augmented[k][i];
                for (int j = 0; j < 2 * n; j++) {
                    augmented[k][j] -= factor * augmented[i][j];
                }
            }
        }
    }
    
    // Extract inverse matrix
    Matrix result(n, n);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            result[i][j] = augmented[i][j + n];
        }
    }
    
    return result;
}
```

## Eigenvalues and Eigenvectors

### Power Method for Eigenvalues

**Problem**: Find the largest eigenvalue of a matrix.

**Sample Input**: `A = [[2, 1], [1, 2]]`

**Sample Output**: `3.0` (largest eigenvalue)

```cpp
double powerMethod(const Matrix& A, int maxIterations = 100) {
    if (A.getRows() != A.getCols()) {
        throw invalid_argument("Matrix must be square");
    }
    
    int n = A.getRows();
    Vector x(n, 1.0); // Initial guess
    
    for (int iter = 0; iter < maxIterations; iter++) {
        Vector y = A * x;
        double norm = y.magnitude();
        
        if (norm < 1e-9) break;
        
        x = y * (1.0 / norm);
    }
    
    Vector Ax = A * x;
    return x.dot(Ax) / x.dot(x);
}
```

### QR Algorithm for All Eigenvalues

**Problem**: Find all eigenvalues of a matrix.

**Sample Input**: `A = [[2, 1], [1, 2]]`

**Sample Output**: `[1.0, 3.0]` (eigenvalues)

```cpp
vector<double> qrAlgorithm(const Matrix& A, int maxIterations = 100) {
    if (A.getRows() != A.getCols()) {
        throw invalid_argument("Matrix must be square");
    }
    
    int n = A.getRows();
    Matrix Q(n, n), R(n, n);
    Matrix Ak = A;
    
    for (int iter = 0; iter < maxIterations; iter++) {
        // QR decomposition
        qrDecomposition(Ak, Q, R);
        
        // Update Ak = R * Q
        Ak = R * Q;
    }
    
    // Extract eigenvalues from diagonal
    vector<double> eigenvalues;
    for (int i = 0; i < n; i++) {
        eigenvalues.push_back(Ak[i][i]);
    }
    
    return eigenvalues;
}

// QR decomposition using Gram-Schmidt
void qrDecomposition(const Matrix& A, Matrix& Q, Matrix& R) {
    int n = A.getRows();
    Q = Matrix(n, n);
    R = Matrix(n, n);
    
    for (int j = 0; j < n; j++) {
        Vector v(n);
        for (int i = 0; i < n; i++) {
            v[i] = A[i][j];
        }
        
        for (int k = 0; k < j; k++) {
            Vector qk(n);
            for (int i = 0; i < n; i++) {
                qk[i] = Q[i][k];
            }
            R[k][j] = v.dot(qk);
            v = v - qk * R[k][j];
        }
        
        R[j][j] = v.magnitude();
        if (R[j][j] > 1e-9) {
            Vector qj = v * (1.0 / R[j][j]);
            for (int i = 0; i < n; i++) {
                Q[i][j] = qj[i];
            }
        }
    }
}
```

## Linear Systems

### Gaussian Elimination

**Problem**: Solve a system of linear equations.

**Sample Input**: 
- `2x + y = 5`
- `x + 2y = 4`

**Sample Output**: `x = 2, y = 1`

```cpp
Vector solveLinearSystem(const Matrix& A, const Vector& b) {
    if (A.getRows() != A.getCols() || A.getRows() != b.size()) {
        throw invalid_argument("Matrix and vector dimensions don't match");
    }
    
    int n = A.getRows();
    Matrix augmented(n, n + 1);
    
    // Create augmented matrix [A | b]
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            augmented[i][j] = A[i][j];
        }
        augmented[i][n] = b[i];
    }
    
    // Forward elimination
    for (int i = 0; i < n; i++) {
        // Find pivot
        int maxRow = i;
        for (int k = i + 1; k < n; k++) {
            if (abs(augmented[k][i]) > abs(augmented[maxRow][i])) {
                maxRow = k;
            }
        }
        
        // Swap rows
        if (maxRow != i) {
            swap(augmented[i], augmented[maxRow]);
        }
        
        // Check for singular system
        if (abs(augmented[i][i]) < 1e-9) {
            throw invalid_argument("System is singular");
        }
        
        // Eliminate column
        for (int k = i + 1; k < n; k++) {
            double factor = augmented[k][i] / augmented[i][i];
            for (int j = i; j <= n; j++) {
                augmented[k][j] -= factor * augmented[i][j];
            }
        }
    }
    
    // Back substitution
    Vector x(n);
    for (int i = n - 1; i >= 0; i--) {
        x[i] = augmented[i][n];
        for (int j = i + 1; j < n; j++) {
            x[i] -= augmented[i][j] * x[j];
        }
        x[i] /= augmented[i][i];
    }
    
    return x;
}
```

## Use Cases

### Competitive Programming
- **Matrix Exponentiation**: Fast computation of matrix powers
- **Linear Systems**: Solving systems of equations
- **Graph Algorithms**: Adjacency matrix operations
- **Geometric Transformations**: Rotation, scaling, translation

### Real-World Applications
- **Computer Graphics**: 3D transformations, projections
- **Machine Learning**: Neural networks, dimensionality reduction
- **Scientific Computing**: Numerical analysis, simulations
- **Cryptography**: Matrix-based encryption schemes

## Implementation Tips

1. **Numerical Stability**: Use pivoting in Gaussian elimination
2. **Precision**: Be careful with floating-point precision
3. **Efficiency**: Use optimized algorithms for large matrices
4. **Memory Management**: Consider sparse matrices for large problems
5. **Error Handling**: Check for singular matrices and invalid operations
6. **Library Usage**: Use optimized libraries like BLAS/LAPACK for production code
