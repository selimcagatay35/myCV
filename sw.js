// Service Worker for Academic Website
// Provides offline functionality and caching

const CACHE_NAME = 'academic-website-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/cv.html',
    '/publications.html',
    '/gallery.html',
    '/css/style.css',
    '/js/script.js',
    '/images/profile-photo.jpg',
    '/assets/cv.pdf'
];

// Install event - cache essential resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            })
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});