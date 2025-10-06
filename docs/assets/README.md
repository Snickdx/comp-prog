# Assets Directory Structure

This directory contains custom assets for the Programming Techniques Guide.

## Directory Structure

```
docs/assets/
├── images/
│   ├── favicon.ico
│   ├── favicon.png
│   ├── apple-touch-icon.png
│   ├── icon-192.png
│   ├── icon-192-maskable.png
│   ├── icon-512.png
│   ├── icon-512-maskable.png
│   ├── logos/
│   │   ├── logo.png
│   │   └── logo-dark.png
│   ├── diagrams/
│   │   ├── algorithm-flow.svg
│   │   ├── data-structure-tree.png
│   │   └── graph-example.svg
│   ├── screenshots/
│   │   ├── demo-1.png
│   │   └── demo-2.png
│   └── icons/
│       ├── technique-icons/
│       └── category-icons/
├── css/
│   ├── custom.css
│   ├── themes.css
│   └── responsive.css
├── js/
│   ├── custom.js
│   ├── analytics.js
│   └── interactive.js
└── fonts/
    ├── custom-font.woff2
    └── custom-font.woff
```

## Usage in Markdown

### Images
```markdown
![Logo](../assets/images/logos/logo.png)
![Algorithm Diagram](../assets/images/diagrams/algorithm-flow.svg)
![Favicon](../assets/images/favicon.png)
```

### Custom CSS Classes
```html
<div class="custom-card">
  <h3>Important Note</h3>
  <p>This is a custom styled card.</p>
</div>

<div class="custom-alert success">
  <strong>Success!</strong> Your code is working correctly.
</div>
```

### Custom JavaScript
```html
<button onclick="ProgrammingGuide.scrollToTop()">Scroll to Top</button>
```

## Asset Guidelines

1. **Images**: Use SVG for diagrams, PNG for screenshots, WebP for photos
2. **CSS**: Keep styles modular and responsive
3. **JavaScript**: Use modern ES6+ syntax with fallbacks
4. **Fonts**: Include WOFF2 and WOFF formats for compatibility
5. **Naming**: Use kebab-case for file names
6. **Optimization**: Compress images and minify CSS/JS for production
