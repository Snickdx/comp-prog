# Competitive Programming Guide - MkDocs Material + Firebase

This project uses MkDocs Material to create a beautiful, responsive documentation website for competitive programming techniques and algorithms, hosted on Firebase with analytics.

## Installation

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

3. **Verify installations:**
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
mkdocs serve
```

The site will be available at `http://127.0.0.1:8000/`

### Building the Site

To build the static site:

```bash
mkdocs build
```

The built site will be in the `site/` directory.

### Deployment

#### Firebase Hosting (Recommended)

1. **Build and deploy:**
   ```bash
   # Windows
   deploy.bat
   
   # Linux/Mac
   ./deploy.sh
   
   # Or manually:
   mkdocs build
   firebase deploy --only hosting
   ```

2. **Your site will be available at:**
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
4. Test locally with `mkdocs serve`
5. Submit a pull request

## License

This project is open source and available under the MIT License.
