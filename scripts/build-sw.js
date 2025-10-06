const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuration
const SITE_DIR = 'site';
const DOCS_DIR = 'docs';
const SW_OUTPUT_FILE = path.join(SITE_DIR, 'sw.js');
const MANIFEST_FILE = path.join(SITE_DIR, 'manifest.json');
const DOCS_MANIFEST_FILE = path.join(DOCS_DIR, 'manifest.json');

// Generate version based on timestamp and content hash
function generateVersion() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `v${timestamp}-${random}`;
}

// Get all files in the site directory recursively
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip certain directories
      if (!['node_modules', '.git', '.cache'].includes(file)) {
        getAllFiles(filePath, fileList);
      }
    } else {
      // Only include certain file types
      const ext = path.extname(file).toLowerCase();
      if (['.html', '.css', '.js', '.json', '.png', '.ico', '.svg', '.woff', '.woff2'].includes(ext)) {
        const relativePath = '/' + path.relative(SITE_DIR, filePath).replace(/\\/g, '/');
        fileList.push(relativePath);
      }
    }
  });
  
  return fileList;
}

// Generate service worker content
function generateServiceWorker(version, cacheUrls) {
  return `const CACHE_NAME = 'tech-guide-${version}';
const STATIC_CACHE_URLS = ${JSON.stringify(cacheUrls, null, 2)};

// Install event - cache static resources
self.addEventListener('install', event => {
  console.log('Service Worker: Installing version ${version}...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching ${cacheUrls.length} static resources');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating version ${version}...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache', event.request.url);
          return cachedResponse;
        }

        console.log('Service Worker: Fetching from network', event.request.url);
        return fetch(event.request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(error => {
            console.error('Service Worker: Fetch failed', error);
            // Return offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
            throw error;
          });
      })
  );
});

// Handle background sync (if supported)
self.addEventListener('sync', event => {
  console.log('Service Worker: Background sync', event.tag);
});

// Handle push notifications (if needed in future)
self.addEventListener('push', event => {
  console.log('Service Worker: Push notification received');
  // Implementation for push notifications can be added here
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notification clicked');
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Service Worker version: ${version}
// Generated on: ${new Date().toISOString()}
// Cached files: ${cacheUrls.length}`;
}

// Main build function
function buildServiceWorker() {
  console.log('🔧 Building Service Worker...');
  
  // Check if site directory exists
  if (!fs.existsSync(SITE_DIR)) {
    console.error('❌ Site directory not found. Run "npm run build:mkdocs" first.');
    process.exit(1);
  }
  
  // Generate version
  const version = generateVersion();
  console.log(`📦 Generated version: ${version}`);
  
  // Get all files to cache
  const cacheUrls = getAllFiles(SITE_DIR);
  console.log(`📁 Found ${cacheUrls.length} files to cache`);
  
  // Generate service worker content
  const swContent = generateServiceWorker(version, cacheUrls);
  
  // Write service worker file
  fs.writeFileSync(SW_OUTPUT_FILE, swContent);
  console.log(`✅ Service Worker generated: ${SW_OUTPUT_FILE}`);
  
  // Update manifest.json with new version info (both in site and docs)
  if (fs.existsSync(MANIFEST_FILE)) {
    const manifest = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf8'));
    manifest.version = version;
    manifest.version_name = version;
    fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));
    console.log(`📋 Updated site manifest.json with version: ${version}`);
  }
  
  // Also update the docs manifest.json
  if (fs.existsSync(DOCS_MANIFEST_FILE)) {
    const manifest = JSON.parse(fs.readFileSync(DOCS_MANIFEST_FILE, 'utf8'));
    manifest.version = version;
    manifest.version_name = version;
    fs.writeFileSync(DOCS_MANIFEST_FILE, JSON.stringify(manifest, null, 2));
    console.log(`📋 Updated docs manifest.json with version: ${version}`);
  }
  
  console.log('🎉 Service Worker build complete!');
}

// Run the build
if (require.main === module) {
  buildServiceWorker();
}

module.exports = { buildServiceWorker, generateVersion };
