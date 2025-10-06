const CACHE_NAME = 'tech-guide-vmgestecm-yd5c73';
const STATIC_CACHE_URLS = [
  "/404.html",
  "/assets/css/custom.css",
  "/assets/css/themes.css",
  "/assets/images/apple-touch-icon.png",
  "/assets/images/favicon.ico",
  "/assets/images/favicon.png",
  "/assets/images/icon-192-maskable.png",
  "/assets/images/icon-192.png",
  "/assets/images/icon-512-maskable.png",
  "/assets/images/icon-512.png",
  "/assets/javascripts/bundle.f55a23d4.min.js",
  "/assets/javascripts/lunr/min/lunr.ar.min.js",
  "/assets/javascripts/lunr/min/lunr.da.min.js",
  "/assets/javascripts/lunr/min/lunr.de.min.js",
  "/assets/javascripts/lunr/min/lunr.du.min.js",
  "/assets/javascripts/lunr/min/lunr.el.min.js",
  "/assets/javascripts/lunr/min/lunr.es.min.js",
  "/assets/javascripts/lunr/min/lunr.fi.min.js",
  "/assets/javascripts/lunr/min/lunr.fr.min.js",
  "/assets/javascripts/lunr/min/lunr.he.min.js",
  "/assets/javascripts/lunr/min/lunr.hi.min.js",
  "/assets/javascripts/lunr/min/lunr.hu.min.js",
  "/assets/javascripts/lunr/min/lunr.hy.min.js",
  "/assets/javascripts/lunr/min/lunr.it.min.js",
  "/assets/javascripts/lunr/min/lunr.ja.min.js",
  "/assets/javascripts/lunr/min/lunr.jp.min.js",
  "/assets/javascripts/lunr/min/lunr.kn.min.js",
  "/assets/javascripts/lunr/min/lunr.ko.min.js",
  "/assets/javascripts/lunr/min/lunr.multi.min.js",
  "/assets/javascripts/lunr/min/lunr.nl.min.js",
  "/assets/javascripts/lunr/min/lunr.no.min.js",
  "/assets/javascripts/lunr/min/lunr.pt.min.js",
  "/assets/javascripts/lunr/min/lunr.ro.min.js",
  "/assets/javascripts/lunr/min/lunr.ru.min.js",
  "/assets/javascripts/lunr/min/lunr.sa.min.js",
  "/assets/javascripts/lunr/min/lunr.stemmer.support.min.js",
  "/assets/javascripts/lunr/min/lunr.sv.min.js",
  "/assets/javascripts/lunr/min/lunr.ta.min.js",
  "/assets/javascripts/lunr/min/lunr.te.min.js",
  "/assets/javascripts/lunr/min/lunr.th.min.js",
  "/assets/javascripts/lunr/min/lunr.tr.min.js",
  "/assets/javascripts/lunr/min/lunr.vi.min.js",
  "/assets/javascripts/lunr/min/lunr.zh.min.js",
  "/assets/javascripts/lunr/tinyseg.js",
  "/assets/javascripts/lunr/wordcut.js",
  "/assets/javascripts/workers/search.973d3a69.min.js",
  "/assets/js/analytics.js",
  "/assets/js/custom.js",
  "/assets/stylesheets/main.2a3383ac.min.css",
  "/assets/stylesheets/palette.06af60db.min.css",
  "/brute-force/boolean-counter/index.html",
  "/brute-force/index.html",
  "/brute-force/meet-in-middle/index.html",
  "/brute-force/permutation-enumeration/index.html",
  "/brute-force/recursive-backtracking/index.html",
  "/counting/frequency-arrays/index.html",
  "/counting/index.html",
  "/counting/prefix-arrays/index.html",
  "/counting/sieve-eratosthenes/index.html",
  "/data-structures/disjoint-set/index.html",
  "/data-structures/heap-priority-queue/index.html",
  "/data-structures/index.html",
  "/data-structures/segment-tree-bit/index.html",
  "/dynamic-programming/bitmask-dp/index.html",
  "/dynamic-programming/dp-trees-graphs/index.html",
  "/dynamic-programming/index.html",
  "/dynamic-programming/top-down-bottom-up/index.html",
  "/geometry/convex-hull/index.html",
  "/geometry/index.html",
  "/geometry/sweep-line/index.html",
  "/graph-modeling/dfs-bfs/index.html",
  "/graph-modeling/dijkstra-bellman-ford/index.html",
  "/graph-modeling/index.html",
  "/graph-modeling/union-find/index.html",
  "/index.html",
  "/manifest.json",
  "/math/combinatorics-counting/index.html",
  "/math/geometric-formulas/index.html",
  "/math/index.html",
  "/math/linear-algebra/index.html",
  "/math/number-theory/index.html",
  "/math/trigonometry/index.html",
  "/offline.html",
  "/overrides/main.html",
  "/search/search_index.json",
  "/simulation/binary-search-answer/index.html",
  "/simulation/greedy-algorithms/index.html",
  "/simulation/index.html",
  "/simulation/two-pointer-sliding-window/index.html",
  "/string-bitwise/bitmask-tricks/index.html",
  "/string-bitwise/index.html",
  "/string-bitwise/kmp-z-algorithm/index.html",
  "/string-bitwise/trie-aho-corasick/index.html"
];

// Install event - cache static resources
self.addEventListener('install', event => {
  console.log('Service Worker: Installing version vmgestecm-yd5c73...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching 93 static resources');
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
  console.log('Service Worker: Activating version vmgestecm-yd5c73...');
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

// Service Worker version: vmgestecm-yd5c73
// Generated on: 2025-10-06T07:17:34.872Z
// Cached files: 93