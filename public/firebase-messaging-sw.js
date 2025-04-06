// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDZOcs15xGPsn5Y8yLZwkUeK3ChbFRfflI",
  authDomain: "calatrava-water-works.firebaseapp.com",
  projectId: "calatrava-water-works",
  storageBucket: "calatrava-water-works.firebasestorage.app",
  messagingSenderId: "549897348816",
  appId: "1:549897348816:web:d1161ed22419a48dfba0d5",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
