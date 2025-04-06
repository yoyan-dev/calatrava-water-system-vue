// public/firebase-messaging-sw.js
importScripts(
	'https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js',
);
importScripts(
	'https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js',
);

let messaging;

self.addEventListener('message', (event) => {
	console.log('[firebase-messaging-sw.js] Message received:', event.data);
	if (event.data.type === 'SET_FIREBASE_CONFIG') {
		console.log(
			'[firebase-messaging-sw.js] Initializing Firebase with config:',
			event.data.config,
		);
		firebase.initializeApp(event.data.config);
		messaging = firebase.messaging();
		console.log('[firebase-messaging-sw.js] Messaging initialized');

		messaging.onBackgroundMessage((payload) => {
			console.log(
				'[firebase-messaging-sw.js] Received background message:',
				payload,
			);
			const notificationTitle = payload.notification?.title || 'Default Title';
			const notificationOptions = {
				body: payload.notification?.body || 'Default Body',
				icon: '/logo.png',
			};
			self.registration.showNotification(
				notificationTitle,
				notificationOptions,
			);
		});
	}
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
