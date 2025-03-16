importScripts(
	'https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js',
);
importScripts(
	'https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js',
);

firebase.initializeApp({
	apiKey: 'AIzaSyBj8H7hCEz3KZ4Od2d8S1cFm4BmuiX1k6Q',
	authDomain: 'calatrava-water-system.firebaseapp.com',
	projectId: 'calatrava-water-system',
	storageBucket: 'calatrava-water-system.firebasestorage.app',
	messagingSenderId: '197722655437',
	appId: '1:197722655437:web:e2f64bd9628f473f32f784',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	console.log(
		'[firebase-messaging-sw.js] Received background message ',
		payload,
	);
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: '/pwa-192x192.png',
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});

// Log service worker lifecycle
self.addEventListener('install', (event) => {
	console.log('[sw.js] Service Worker installing');
	event.waitUntil(self.skipWaiting()); // Force activation
});

self.addEventListener('activate', (event) => {
	console.log('[sw.js] Service Worker activated');
	event.waitUntil(self.clients.claim()); // Take control immediately
});

self.addEventListener('fetch', (event) => {
	console.log('[sw.js] Fetch event:', event.request.url);
	// Let Workbox handle precaching
});

// Workbox precaching (Vite-PWA will inject the manifest here)
self.__WB_MANIFEST;
