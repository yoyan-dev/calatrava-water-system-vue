import App from './App.vue';
import router from './router';
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from '@/firebase/config';
import { Field, Form as VeeForm } from 'vee-validate';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import {
	browserLocalPersistence,
	connectAuthEmulator,
	getAuth,
	indexedDBLocalPersistence,
	setPersistence,
} from 'firebase/auth';

const app = createApp(App);
const auth = getAuth(firebaseApp);
if (process.env.NODE_ENV === 'development') {
	connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
}

setPersistence(auth, indexedDBLocalPersistence)
	.catch(() => setPersistence(auth, browserLocalPersistence))
	.then(() => console.log('Persistence set successfully'))
	.catch((error) => console.error('Error setting persistence:', error));

app.use(VueFire, {
	firebaseApp,
	modules: [VueFireAuth()],
});

app.use(createPinia());
app.use(router);

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/firebase-messaging-sw.js")
//     .then((registration) => {
//       console.log("✅ Service Worker registered successfully!", registration);
//       registration.active?.postMessage({
//         type: "SET_FIREBASE_CONFIG",
//         firebaseConfig: {
//           apiKey: import.meta.env.VITE_API_KEY,
//           authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//           projectId: import.meta.env.VITE_PROJECT_ID,
//           storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//           messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//           appId: import.meta.env.VITE_APP_ID,
//         },
//       });
//     })
//     .catch((error) => {
//       console.error("Service Worker registration failed:", error);
//     });
// }

app.mount('#app');
