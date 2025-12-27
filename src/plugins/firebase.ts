import { initializeApp } from 'firebase/app';
import {
	connectAuthEmulator,
	getAuth,
	indexedDBLocalPersistence,
	setPersistence,
	browserLocalPersistence,
} from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { getMessaging } from 'firebase/messaging';
import {
	connectDataConnectEmulator,
	getDataConnect,
} from 'firebase/data-connect';
import { connectorConfig } from '@/dataconnect-generated';

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
const db = getFirestore(firebaseApp);
const dc = getDataConnect(connectorConfig);
const functions = getFunctions(firebaseApp);

// Connect to emulators in development mode
if (process.env.NODE_ENV === 'development') {
	connectAuthEmulator(auth, 'http://127.0.0.1:9099', {
		disableWarnings: true,
	});
	connectFirestoreEmulator(db, '127.0.0.1', 8080);
	connectDataConnectEmulator(dc, 'localhost', 9399);
	connectFunctionsEmulator(functions, '127.0.0.1', 5001);
}

setPersistence(auth, indexedDBLocalPersistence).catch(() =>
	setPersistence(auth, browserLocalPersistence),
);

export { firebaseApp, messaging, auth, db, dc };
