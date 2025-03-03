importScripts(
	'https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js',
);
importScripts(
	'https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js',
);
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';

firebase.initializeApp({
	apiKey: 'AIzaSyBj8H7hCEz3KZ4Od2d8S1cFm4BmuiX1k6Q',
	authDomain: 'calatrava-water-system.firebaseapp.com',
	projectId: 'calatrava-water-system',
	storageBucket: 'calatrava-water-system.firebasestorage.app',
	messagingSenderId: '197722655437',
	appId: '1:197722655437:web:e2f64bd9628f473f32f784',
});

const messaging = firebase.messaging();

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST || []);

messaging.onBackgroundMessage((payload) => {
	console.log(
		'[firebase-messaging-sw.js] Received background message ',
		payload,
	);
	// Customize notification here
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: '/logo.png',
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
	console.log('[Service Worker] Notification click received.');
	event.notification.close();
	event.waitUntil(self.clients.openWindow('/'));
});

self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.skipWaiting();
clientsClaim();
