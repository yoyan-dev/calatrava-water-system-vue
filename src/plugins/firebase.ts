import { initializeApp } from 'firebase/app';
import {
	getAuth,
	connectAuthEmulator,
	indexedDBLocalPersistence,
	setPersistence,
	browserLocalPersistence,
} from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getMessaging } from 'firebase/messaging';
import {
	getDataConnect,
	connectDataConnectEmulator,
} from 'firebase/data-connect';
import { connectorConfig } from '@/dataconnect-generated';

const firebaseConfig = {
	apiKey: 'AIzaSyBMSgl8q3DqtJaTCGwRIFA7FdfBRnBU2fk',
	authDomain: 'calatrava-water-system-50fee.firebaseapp.com',
	projectId: 'calatrava-water-system-50fee',
	storageBucket: 'calatrava-water-system-50fee.firebasestorage.app',
	messagingSenderId: '964087904782',
	appId: '1:964087904782:web:080fdeafac32359ef3da5f',
	measurementId: 'G-BYL729KK0B',
};

export const firebaseApp = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
export const functions = getFunctions(firebaseApp);
export const messaging = getMessaging(firebaseApp);
export const dc = getDataConnect(connectorConfig);

// Connect emulators in dev mode
if (import.meta.env.DEV) {
	console.log('Connecting Firebase emulators...');

	connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
	connectFirestoreEmulator(db, '127.0.0.1', 8080);
	connectFunctionsEmulator(functions, '127.0.0.1', 5001);
	connectStorageEmulator(storage, '127.0.0.1', 9199);
	connectDataConnectEmulator(dc, 'localhost', 9399);
}

// Auth persistence (optional but good)
setPersistence(auth, indexedDBLocalPersistence).catch(() =>
	setPersistence(auth, browserLocalPersistence),
);
