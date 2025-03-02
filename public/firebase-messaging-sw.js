// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts(
	'https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js',
);
importScripts(
	'https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js',
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
	apiKey: 'AIzaSyBj8H7hCEz3KZ4Od2d8S1cFm4BmuiX1k6Q',
	authDomain: 'calatrava-water-system.firebaseapp.com',
	projectId: 'calatrava-water-system',
	storageBucket: 'calatrava-water-system.firebasestorage.app',
	messagingSenderId: '197722655437',
	appId: '1:197722655437:web:e2f64bd9628f473f32f784',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
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
});
