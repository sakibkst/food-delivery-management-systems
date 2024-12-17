// src/firebase-config.js

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

// Replace with your Firebase project's credentials
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
    vapidKey: "YOUR_VAPID_KEY", // This is the public key for push notifications
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request permission to show notifications and get FCM token
Notification.requestPermission().then(permission => {
    if (permission === "granted") {
        getToken(messaging, { vapidKey: firebaseConfig.vapidKey })
            .then(currentToken => {
                if (currentToken) {
                    console.log("FCM Token: ", currentToken);
                    // Send the token to your backend (NestJS API)
                    fetch('http://localhost:3000/api/push-notification/save-token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token: currentToken }),
                    })
                        .then(response => response.json())
                        .then(data => console.log('Token saved:', data))
                        .catch(err => console.error('Error saving token:', err));
                } else {
                    console.log("No registration token available.");
                }
            })
            .catch(err => console.log("Error retrieving token:", err));
    } else {
        console.log("Notification permission denied");
    }
});
