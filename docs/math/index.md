# Mathematical Formulas & Concepts

This section provides essential mathematical formulas and concepts commonly used in competitive programming and algorithmic problem-solving. These formulas serve as quick references for geometric calculations, combinatorics, number theory, and other mathematical operations.

## Techniques in This Category

| Technique | Description | Link |
|-----------|-------------|------|
| **Geometric Formulas** | Essential formulas for points, lines, circles, polygons, and 3D geometry. | [Geometric Formulas](geometric-formulas.md) |
| **Combinatorics & Counting** | Permutations, combinations, and counting principles for probability and enumeration problems. | [Combinatorics & Counting](combinatorics-counting.md) |
| **Number Theory** | Prime numbers, modular arithmetic, GCD, LCM, and divisibility rules. | [Number Theory](number-theory.md) |
| **Trigonometry** | Trigonometric functions, identities, and their applications in geometric problems. | [Trigonometry](trigonometry.md) |
| **Linear Algebra** | Matrix operations, determinants, and vector calculations. | [Linear Algebra](linear-algebra.md) |

## Quick Reference Tables

### Common Mathematical Constants
| Constant | Value | Description |
|----------|-------|-------------|
| π (pi) | 3.14159265359 | Ratio of circle's circumference to diameter |
| e | 2.71828182846 | Base of natural logarithm |
| φ (phi) | 1.61803398875 | Golden ratio |
| √2 | 1.41421356237 | Square root of 2 |
| √3 | 1.73205080757 | Square root of 3 |

### Common Angle Conversions
| Degrees | Radians | Sin | Cos | Tan |
|---------|---------|-----|-----|-----|
| 0° | 0 | 0 | 1 | 0 |
| 30° | π/6 | 1/2 | √3/2 | √3/3 |
| 45° | π/4 | √2/2 | √2/2 | 1 |
| 60° | π/3 | √3/2 | 1/2 | √3 |
| 90° | π/2 | 1 | 0 | ∞ |

## When to Use Mathematical Formulas

These formulas are essential when:
- Solving geometric problems involving shapes, distances, and angles
- Working with probability and counting problems
- Implementing number theory algorithms
- Performing trigonometric calculations
- Working with matrices and vectors

## Common Applications

### Geometric Problems
- **Distance Calculations**: Finding distances between points, lines, and shapes
- **Area and Perimeter**: Calculating areas and perimeters of various shapes
- **Angle Calculations**: Determining angles between lines and vectors
- **3D Geometry**: Working with 3D coordinates and transformations

### Counting Problems
- **Permutations**: Arranging objects in order
- **Combinations**: Selecting objects without regard to order
- **Probability**: Calculating probabilities of events
- **Inclusion-Exclusion**: Counting elements in unions of sets

### Number Theory
- **Prime Factorization**: Breaking numbers into prime factors
- **Modular Arithmetic**: Working with remainders and congruences
- **GCD and LCM**: Finding greatest common divisors and least common multiples
- **Divisibility**: Checking if numbers divide evenly

### Trigonometric Applications
- **Angle Calculations**: Finding angles in triangles and polygons
- **Wave Functions**: Modeling periodic phenomena
- **Coordinate Transformations**: Converting between coordinate systems
- **Geometric Constructions**: Building shapes with specific properties

## Tips for Using Mathematical Formulas

1. **Precision**: Be careful with floating-point precision in geometric calculations
2. **Edge Cases**: Consider special cases like parallel lines, collinear points
3. **Optimization**: Use integer arithmetic when possible to avoid floating-point errors
4. **Modular Arithmetic**: Apply modular properties to prevent integer overflow
5. **Trigonometric Identities**: Use identities to simplify complex expressions
6. **Coordinate Systems**: Choose appropriate coordinate systems for the problem

## Implementation Notes

- **Floating Point**: Use `double` or `long double` for high precision
- **Integer Math**: Use `long long` for large numbers
- **Modular Operations**: Apply modulo at each step to prevent overflow
- **Trigonometric Functions**: Use `sin()`, `cos()`, `tan()` from `<cmath>`
- **Mathematical Constants**: Use `M_PI`, `M_E` from `<cmath>` or define your own
