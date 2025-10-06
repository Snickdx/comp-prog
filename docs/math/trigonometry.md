# Trigonometry

Essential trigonometric functions, identities, and their applications in geometric problems, wave analysis, and coordinate transformations.

## Basic Trigonometric Functions

### Sine, Cosine, and Tangent

**Problem**: Calculate basic trigonometric functions for given angles.

**Sample Input**: `angle = 30°` (π/6 radians)

**Sample Output**: 
- `sin(30°) = 0.5`
- `cos(30°) = 0.866`
- `tan(30°) = 0.577`

```cpp
#include <cmath>
using namespace std;

// Convert degrees to radians
double degreesToRadians(double degrees) {
    return degrees * M_PI / 180.0;
}

// Convert radians to degrees
double radiansToDegrees(double radians) {
    return radians * 180.0 / M_PI;
}

// Basic trigonometric functions
double sine(double angle) {
    return sin(angle);
}

double cosine(double angle) {
    return cos(angle);
}

double tangent(double angle) {
    return tan(angle);
}

// For degree input
double sineDegrees(double degrees) {
    return sin(degreesToRadians(degrees));
}

double cosineDegrees(double degrees) {
    return cos(degreesToRadians(degrees));
}

double tangentDegrees(double degrees) {
    return tan(degreesToRadians(degrees));
}
```

### Inverse Trigonometric Functions

**Problem**: Calculate inverse trigonometric functions.

**Sample Input**: `value = 0.5`

**Sample Output**: 
- `arcsin(0.5) = 30°` (π/6 radians)
- `arccos(0.5) = 60°` (π/3 radians)
- `arctan(0.5) = 26.57°` (0.464 radians)

```cpp
// Inverse trigonometric functions
double arcsine(double value) {
    return asin(value);
}

double arccosine(double value) {
    return acos(value);
}

double arctangent(double value) {
    return atan(value);
}

// Two-argument arctangent (atan2)
double arctangent2(double y, double x) {
    return atan2(y, x);
}

// For degree output
double arcsineDegrees(double value) {
    return radiansToDegrees(asin(value));
}

double arccosineDegrees(double value) {
    return radiansToDegrees(acos(value));
}

double arctangentDegrees(double value) {
    return radiansToDegrees(atan(value));
}
```

## Trigonometric Identities

### Pythagorean Identities

**Problem**: Verify Pythagorean identities.

**Sample Input**: `angle = 45°`

**Sample Output**: 
- `sin²(45°) + cos²(45°) = 1.0`
- `1 + tan²(45°) = sec²(45°) = 2.0`

```cpp
// Pythagorean identities
bool verifyPythagoreanIdentity(double angle) {
    double sinVal = sin(angle);
    double cosVal = cos(angle);
    double result = sinVal * sinVal + cosVal * cosVal;
    return abs(result - 1.0) < 1e-9;
}

// Secant, cosecant, cotangent
double secant(double angle) {
    return 1.0 / cos(angle);
}

double cosecant(double angle) {
    return 1.0 / sin(angle);
}

double cotangent(double angle) {
    return 1.0 / tan(angle);
}
```

### Angle Sum and Difference Identities

**Problem**: Calculate trigonometric functions of sum and difference of angles.

**Sample Input**: `a = 30°, b = 45°`

**Sample Output**: 
- `sin(75°) = 0.966` (sin(30° + 45°))
- `cos(15°) = 0.966` (cos(45° - 30°))

```cpp
// Angle sum identities
double sinSum(double a, double b) {
    return sin(a) * cos(b) + cos(a) * sin(b);
}

double cosSum(double a, double b) {
    return cos(a) * cos(b) - sin(a) * sin(b);
}

double tanSum(double a, double b) {
    return (tan(a) + tan(b)) / (1 - tan(a) * tan(b));
}

// Angle difference identities
double sinDiff(double a, double b) {
    return sin(a) * cos(b) - cos(a) * sin(b);
}

double cosDiff(double a, double b) {
    return cos(a) * cos(b) + sin(a) * sin(b);
}

double tanDiff(double a, double b) {
    return (tan(a) - tan(b)) / (1 + tan(a) * tan(b));
}
```

### Double Angle Identities

**Problem**: Calculate trigonometric functions of double angles.

**Sample Input**: `angle = 30°`

**Sample Output**: 
- `sin(60°) = 0.866` (sin(2 × 30°))
- `cos(60°) = 0.5` (cos(2 × 30°))

```cpp
// Double angle identities
double sinDouble(double angle) {
    return 2 * sin(angle) * cos(angle);
}

double cosDouble(double angle) {
    double cosVal = cos(angle);
    return 2 * cosVal * cosVal - 1;
}

double tanDouble(double angle) {
    double tanVal = tan(angle);
    return 2 * tanVal / (1 - tanVal * tanVal);
}
```

### Half Angle Identities

**Problem**: Calculate trigonometric functions of half angles.

**Sample Input**: `angle = 60°`

**Sample Output**: 
- `sin(30°) = 0.5` (sin(60°/2))
- `cos(30°) = 0.866` (cos(60°/2))

```cpp
// Half angle identities
double sinHalf(double angle) {
    return sqrt((1 - cos(angle)) / 2);
}

double cosHalf(double angle) {
    return sqrt((1 + cos(angle)) / 2);
}

double tanHalf(double angle) {
    return (1 - cos(angle)) / sin(angle);
}
```

## Triangle Calculations

### Law of Sines

**Problem**: Solve triangle using Law of Sines.

**Sample Input**: `a = 5, A = 30°, B = 45°`

**Sample Output**: 
- `b = 7.071` (side opposite angle B)
- `C = 105°` (remaining angle)

```cpp
struct Triangle {
    double a, b, c;  // Sides
    double A, B, C;  // Angles (in radians)
    
    Triangle(double a, double b, double c) : a(a), b(b), c(c) {
        // Calculate angles using Law of Cosines
        A = acos((b*b + c*c - a*a) / (2*b*c));
        B = acos((a*a + c*c - b*b) / (2*a*c));
        C = acos((a*a + b*b - c*c) / (2*a*b));
    }
    
    Triangle(double a, double A, double B) : a(a), A(A), B(B) {
        C = M_PI - A - B;
        b = a * sin(B) / sin(A);  // Law of Sines
        c = a * sin(C) / sin(A);
    }
};

// Law of Sines: a/sin(A) = b/sin(B) = c/sin(C)
double lawOfSines(double a, double A, double B) {
    return a * sin(B) / sin(A);
}
```

### Law of Cosines

**Problem**: Solve triangle using Law of Cosines.

**Sample Input**: `a = 3, b = 4, C = 90°`

**Sample Output**: 
- `c = 5.0` (hypotenuse)

```cpp
// Law of Cosines: c² = a² + b² - 2ab*cos(C)
double lawOfCosines(double a, double b, double C) {
    return sqrt(a*a + b*b - 2*a*b*cos(C));
}

// Calculate angle using Law of Cosines
double lawOfCosinesAngle(double a, double b, double c) {
    return acos((a*a + b*b - c*c) / (2*a*b));
}
```

### Triangle Area

**Problem**: Calculate triangle area using different methods.

**Sample Input**: `a = 3, b = 4, C = 90°`

**Sample Output**: 
- Area: `6.0` (using two sides and included angle)

```cpp
// Area using two sides and included angle
double triangleAreaSAS(double a, double b, double C) {
    return 0.5 * a * b * sin(C);
}

// Area using three sides (Heron's formula)
double triangleAreaSSS(double a, double b, double c) {
    double s = (a + b + c) / 2;
    return sqrt(s * (s - a) * (s - b) * (s - c));
}

// Area using base and height
double triangleAreaBH(double base, double height) {
    return 0.5 * base * height;
}
```

## Coordinate Transformations

### Polar to Cartesian

**Problem**: Convert polar coordinates to Cartesian coordinates.

**Sample Input**: `r = 5, θ = 30°`

**Sample Output**: 
- `x = 4.33, y = 2.5`

```cpp
struct PolarPoint {
    double r, theta;  // radius, angle in radians
    
    PolarPoint(double r, double theta) : r(r), theta(theta) {}
    
    // Convert to Cartesian
    pair<double, double> toCartesian() {
        double x = r * cos(theta);
        double y = r * sin(theta);
        return {x, y};
    }
};

// Direct conversion
pair<double, double> polarToCartesian(double r, double theta) {
    return {r * cos(theta), r * sin(theta)};
}
```

### Cartesian to Polar

**Problem**: Convert Cartesian coordinates to polar coordinates.

**Sample Input**: `x = 3, y = 4`

**Sample Output**: 
- `r = 5.0, θ = 53.13°`

```cpp
struct CartesianPoint {
    double x, y;
    
    CartesianPoint(double x, double y) : x(x), y(y) {}
    
    // Convert to polar
    pair<double, double> toPolar() {
        double r = sqrt(x*x + y*y);
        double theta = atan2(y, x);
        return {r, theta};
    }
};

// Direct conversion
pair<double, double> cartesianToPolar(double x, double y) {
    double r = sqrt(x*x + y*y);
    double theta = atan2(y, x);
    return {r, theta};
}
```

### Rotation Matrix

**Problem**: Rotate a point around the origin.

**Sample Input**: `x = 1, y = 0, angle = 90°`

**Sample Output**: 
- `x' = 0, y' = 1`

```cpp
// Rotate point around origin
pair<double, double> rotatePoint(double x, double y, double angle) {
    double cosA = cos(angle);
    double sinA = sin(angle);
    
    double newX = x * cosA - y * sinA;
    double newY = x * sinA + y * cosA;
    
    return {newX, newY};
}

// Rotate point around arbitrary center
pair<double, double> rotatePointAround(double x, double y, double centerX, double centerY, double angle) {
    // Translate to origin
    double tx = x - centerX;
    double ty = y - centerY;
    
    // Rotate
    auto rotated = rotatePoint(tx, ty, angle);
    
    // Translate back
    return {rotated.first + centerX, rotated.second + centerY};
}
```

## Wave Functions

### Sine Wave

**Problem**: Generate sine wave data points.

**Sample Input**: `amplitude = 2, frequency = 1, phase = 0, samples = 10`

**Sample Output**: `[0, 1.236, 2, 1.236, 0, -1.236, -2, -1.236, 0, 1.236]`

```cpp
vector<double> generateSineWave(double amplitude, double frequency, double phase, int samples) {
    vector<double> wave;
    double timeStep = 2 * M_PI / samples;
    
    for (int i = 0; i < samples; i++) {
        double t = i * timeStep;
        double value = amplitude * sin(frequency * t + phase);
        wave.push_back(value);
    }
    
    return wave;
}
```

### Fourier Transform (Simple)

**Problem**: Calculate simple Fourier coefficients.

**Sample Input**: `signal = [1, 0, -1, 0]`

**Sample Output**: 
- `DC component: 0`
- `First harmonic: 1`

```cpp
// Simple DFT (not optimized)
vector<complex<double>> discreteFourierTransform(const vector<double>& signal) {
    int N = signal.size();
    vector<complex<double>> result(N);
    
    for (int k = 0; k < N; k++) {
        complex<double> sum(0, 0);
        for (int n = 0; n < N; n++) {
            double angle = -2 * M_PI * k * n / N;
            sum += signal[n] * complex<double>(cos(angle), sin(angle));
        }
        result[k] = sum;
    }
    
    return result;
}
```

## Common Trigonometric Values

### Special Angles

**Problem**: Get trigonometric values for special angles.

**Sample Input**: `angle = 30°`

**Sample Output**: 
- `sin(30°) = 0.5`
- `cos(30°) = √3/2 ≈ 0.866`

```cpp
// Precomputed values for common angles
map<int, pair<double, double>> specialAngles = {
    {0, {0, 1}},
    {30, {0.5, sqrt(3)/2}},
    {45, {sqrt(2)/2, sqrt(2)/2}},
    {60, {sqrt(3)/2, 0.5}},
    {90, {1, 0}},
    {120, {sqrt(3)/2, -0.5}},
    {135, {sqrt(2)/2, -sqrt(2)/2}},
    {150, {0.5, -sqrt(3)/2}},
    {180, {0, -1}}
};

pair<double, double> getSpecialAngleValues(int degrees) {
    if (specialAngles.find(degrees) != specialAngles.end()) {
        return specialAngles[degrees];
    }
    return {sin(degreesToRadians(degrees)), cos(degreesToRadians(degrees))};
}
```

## Use Cases

### Competitive Programming
- **Geometric Problems**: Angle calculations, rotations
- **Wave Analysis**: Signal processing, frequency analysis
- **Coordinate Systems**: Transformations between coordinate systems
- **Trigonometric Identities**: Simplifying complex expressions

### Real-World Applications
- **Computer Graphics**: 3D rotations, transformations
- **Physics**: Wave motion, oscillations
- **Engineering**: Signal processing, control systems
- **Navigation**: GPS, compass calculations

## Implementation Tips

1. **Angle Units**: Be consistent with degrees vs radians
2. **Precision**: Use appropriate precision for calculations
3. **Edge Cases**: Handle angles outside [0, 2π] range
4. **Numerical Stability**: Use stable algorithms for calculations
5. **Precomputation**: Cache frequently used values
6. **Library Functions**: Use optimized library functions when available
