# Competitive Programming Guide - MkDocs Material + Firebase

This project uses MkDocs Material to create a beautiful, responsive documentation website for competitive programming techniques and algorithms, hosted on Firebase with analytics.

## Installation

1. **Install dependencies:**
   ```bash
   # Install Python dependencies
   npm run install:python
   
   # Install Firebase CLI
   npm run install:firebase
   
   # Or install everything at once
   npm run setup
   ```

2. **Verify installations:**
   ```bash
   mkdocs --version
   firebase --version
   ```

## Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `comp-prog`
4. Enable Google Analytics (recommended)
5. Choose or create a Google Analytics account

### 2. Enable Firebase Services

1. **Hosting**: Go to Hosting section and click "Get started"
2. **Analytics**: Already enabled if you selected it during project creation

### 3. Initialize Firebase in Your Project

```bash
# Login to Firebase
firebase login

# Initialize Firebase (select Hosting when prompted)
firebase init

# Or use the existing configuration files
# (firebase.json and .firebaserc are already created)
```

### 4. Configure Analytics

1. Go to Firebase Console → Project Settings → General
2. Copy your Web App's Firebase config
3. Set the `GOOGLE_ANALYTICS_KEY` environment variable:
   ```bash
   # Windows
   set GOOGLE_ANALYTICS_KEY=your-analytics-key
   
   # Linux/Mac
   export GOOGLE_ANALYTICS_KEY=your-analytics-key
   ```


## Development

### Local Development Server

Start the development server to preview your documentation:

```bash
# Standard development server
npm run serve

# Development server accessible from all interfaces
npm run dev
```

The site will be available at `http://127.0.0.1:8000/`

### Building the Site

To build the static site with versioned service worker:

```bash
# Build everything (MkDocs + Service Worker)
npm run build

# Build only MkDocs
npm run build:mkdocs

# Generate only service worker (after MkDocs build)
npm run build:sw
```

The built site will be in the `site/` directory with a dynamically generated service worker.

### Service Worker Build Process

The build process automatically generates a versioned service worker with the following features:

- **Dynamic Versioning**: Each build generates a unique cache version
- **Automatic File Discovery**: Scans the built site for all cacheable files
- **Smart Caching**: Only caches relevant file types (HTML, CSS, JS, images, fonts)
- **Cache Management**: Automatically cleans up old cache versions
- **Offline Support**: Serves cached content when offline
- **Manifest Integration**: Updates manifest.json with version information

The service worker is generated in `scripts/build-sw.js` and includes:
- Precaching of all static assets
- Cache-first strategy for performance
- Network fallback for dynamic content
- Offline page for navigation requests
- Background sync and push notification support

### Deployment

#### Firebase Hosting (Recommended)

1. **Build and deploy:**
   ```bash
   # One command to build and deploy
   npm run deploy
   
   # Or manually:
   npm run build
   firebase deploy --only hosting
   ```

2. **Preview deployment:**
   ```bash
   npm run preview
   ```

3. **Your site will be available at:**
   - `https://comp.mendez.codes` (custom domain)
   - `https://comp-prog.web.app` (Firebase default)
   - `https://comp-prog.firebaseapp.com` (Firebase default)

#### GitHub Pages

1. **Enable GitHub Pages** in your repository settings
2. **Deploy automatically:**
   ```bash
   mkdocs gh-deploy
   ```

#### Other Platforms

The `site/` directory contains static files that can be deployed to any web server or CDN.

## Available NPM Scripts

```bash
# Development
npm run serve          # Start development server
npm run dev           # Start dev server on all interfaces (0.0.0.0:8000)
npm run build         # Build MkDocs and generate versioned service worker
npm run build:mkdocs  # Build MkDocs site only
npm run build:sw      # Generate service worker only

# Deployment
npm run deploy        # Build and deploy to Firebase
npm run preview       # Preview Firebase deployment locally

# Setup & Maintenance
npm run setup         # Install Python and Firebase dependencies
npm run install:python # Install Python dependencies only
npm run install:firebase # Install Firebase CLI only
npm run clean         # Remove build directory (Unix/Mac)
npm run clean:win     # Remove build directory (Windows)

# Quality Assurance
npm run lint          # Lint markdown files
npm run test          # Build with strict mode for testing
npm run help          # Show all available commands
```

## Project Structure

```
docs/
├── index.md                    # Homepage
├── brute-force/               # Brute Force & Search Enumeration
│   ├── index.md
│   ├── boolean-counter.md
│   ├── recursive-backtracking.md
│   ├── meet-in-middle.md
│   └── permutation-enumeration.md
├── counting/                  # Counting, Frequency, and Precomputation
│   ├── index.md
│   ├── frequency-arrays.md
│   ├── prefix-arrays.md
│   └── sieve-eratosthenes.md
├── dynamic-programming/       # Dynamic Programming
│   ├── index.md
│   ├── top-down-bottom-up.md
│   ├── bitmask-dp.md
│   └── dp-trees-graphs.md
├── graph-modeling/           # Graph & Network Modeling
│   ├── index.md
│   ├── dfs-bfs.md
│   ├── dijkstra-bellman-ford.md
│   └── union-find.md
├── geometry/                 # Geometry & Spatial Modeling
│   ├── index.md
│   ├── sweep-line.md
│   └── convex-hull.md
├── string-bitwise/          # String & Bitwise Techniques
│   ├── index.md
│   ├── kmp-z-algorithm.md
│   ├── trie-aho-corasick.md
│   └── bitmask-tricks.md
├── simulation/              # Simulation & Modeling
│   ├── index.md
│   ├── two-pointer-sliding-window.md
│   ├── binary-search-answer.md
│   └── greedy-algorithms.md
└── data-structures/         # Data Structures
    ├── index.md
    ├── segment-tree-bit.md
    ├── heap-priority-queue.md
    └── disjoint-set.md
```

## Customization

### Theme Configuration

Edit `mkdocs.yml` to customize:
- Colors and palettes
- Navigation structure
- Features and plugins
- Markdown extensions

### Adding New Techniques

1. Create a new markdown file in the appropriate category directory
2. Add the page to the navigation in `mkdocs.yml`
3. Follow the existing format for consistency

### Styling

The site uses Material Design principles. You can customize:
- Colors in the `theme.palette` section
- Features in the `theme.features` section
- Additional CSS in a custom stylesheet

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Mode**: Automatic theme switching
- **Search**: Built-in search functionality
- **Code Highlighting**: Syntax highlighting for multiple languages
- **Navigation**: Sticky navigation with tabs and sections
- **Copy Code**: One-click code copying
- **Git Integration**: Shows last modified dates
- **Firebase Hosting**: Fast, secure, and reliable hosting
- **Analytics**: Track visitor engagement and popular content
- **Custom Domain**: Easy to set up custom domain
- **CDN**: Global content delivery network
- **SSL**: Automatic HTTPS encryption

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run serve`
5. Run tests with `npm run test`
6. Submit a pull request

## License

This project is open source and available under the MIT License.
