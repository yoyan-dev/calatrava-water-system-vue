importScripts(
  "https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js"
);

let firebaseConfig = null;

// Listen for Firebase config from main thread
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SET_FIREBASE_CONFIG") {
    firebaseConfig = event.data.firebaseConfig;

    if (firebaseConfig) {
      firebase.initializeApp(firebaseConfig);

      const messaging = firebase.messaging();

      messaging.onBackgroundMessage((payload) => {
        console.log(
          "[firebase-messaging-sw.js] Received background message ",
          payload
        );
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
          body: payload.notification.body,
          icon: "/pwa-192x192.png",
        };

        self.registration.showNotification(
          notificationTitle,
          notificationOptions
        );
      });

      console.log("✅ Firebase Messaging initialized in SW!");
    }
  }
});
