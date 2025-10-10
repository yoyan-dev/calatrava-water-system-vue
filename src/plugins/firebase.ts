import { initializeApp } from 'firebase/app';
import {
	connectAuthEmulator,
	getAuth,
	indexedDBLocalPersistence,
	setPersistence,
	browserLocalPersistence,
} from 'firebase/auth';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
const auth = getAuth(firebaseApp);
if (process.env.NODE_ENV === 'development') {
	connectAuthEmulator(auth, 'http://127.0.0.1:9099', {
		disableWarnings: true,
	});
}

setPersistence(auth, indexedDBLocalPersistence).catch(() =>
	setPersistence(auth, browserLocalPersistence),
);
// .then(() => console.log('Persistence set successfully'))
// .catch((error) => console.error('Error setting persistence:', error));

export { firebaseApp, messaging, auth };
