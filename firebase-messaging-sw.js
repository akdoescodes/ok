/* Ensure Babel transpilation for Safari support */
importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging.js");

firebase.initializeApp({
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: "icon.png"
    });
});
