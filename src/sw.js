import { precacheAndRoute } from "workbox-precaching";
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
});

const messaging = getMessaging(firebaseApp);

// ✅ Handle background messages
onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/pwa-192x192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Log service worker lifecycle
self.addEventListener("install", (event) => {
  console.log("[sw.js] Service Worker installing");
  event.waitUntil(self.skipWaiting()); // Force activation
});

self.addEventListener("activate", (event) => {
  console.log("[sw.js] Service Worker activated");
  event.waitUntil(self.clients.claim()); // Take control immediately
});

self.addEventListener("fetch", (event) => {
  console.log("[sw.js] Fetch event:", event.request.url);
  // Let Workbox handle precaching
});

// Workbox precaching (Vite-PWA will inject the manifest here)
self.__WB_MANIFEST;

precacheAndRoute(self.__WB_MANIFEST);
