var cacheName = 'hello-world';
var filesToCache = [
	'index.html',
	'styles.css',
	'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
	'https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js',
	'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
	'img/pdf.png',
	'img/banner1.jpeg',
	'img/banner2.jpeg',
	'img/banner3.jpeg',
	'img/banner4.jpeg',
	'img/banner5.jpeg',
	'img/banner6.jpeg'
];

self.addEventListener('install', function(e) {
	console.log('[ServiceWorker] Install');
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			console.log('[ServiceWorker] Caching app shell');
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('activate', event => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request)
		.then(function(res) {
			if (res) 
				return res;
			if (!navigator.onLine) 
				return caches.match(new Request('index.html'));
				
			return fetch(event.request);
		})
	);
});