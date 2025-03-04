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
	// Customize notification here
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: '/logo.png',
	};

	self.registration.showNotification(notificationTitle, notificationOptions);

	self.addEventListener('notificationclick', (e) => {
		console.log('on click notification', e);
		const url = 'https://follow.it';
		// Close the notification popout
		e.notification.close();
		// Get all the Window clients
		e.waitUntil(
			clients.matchAll({ type: 'window' }).then((clientsArr) => {
				// If a Window tab matching the targeted URL already exists, focus that;
				const hadWindowToFocus = clientsArr.some((windowClient) =>
					// windowClient.url === e.notification.data.url
					windowClient.url === url ? (windowClient.focus(), true) : false,
				);
				// Otherwise, open a new tab to the applicable URL and focus it.
				if (!hadWindowToFocus)
					clients
						// .openWindow(e.notification.data.url)
						.openWindow(url)
						.then((windowClient) =>
							windowClient ? windowClient.focus() : null,
						);
			}),
		);
	});
});
