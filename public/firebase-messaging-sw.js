importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js')

var firebaseConfig = {
  apiKey: "AIzaSyBGbu0xVj6BTU4Sxpz4xy8EloWkuvpdWIU",
  authDomain: "neomedy-c88e1.firebaseapp.com",
  projectId: "neomedy-c88e1",
  storageBucket: "neomedy-c88e1.appspot.com",
  messagingSenderId: "112387158694",
  appId: "1:112387158694:web:ff2d236f49c1bfd9983a67",
  measurementId: "G-J9YQ804G2M",
}

var app = firebase.initializeApp(firebaseConfig);

app.messaging().getToken({ vapidKey: 'BLPcjvIYgCpYwdhZe-b9toT-BvwulE48yPwF2IbzEh0PzPoX3pU_KAurTKA76XOqtdrXP3eJAxssbgRH-Fgv9Vc' });

// messaging.onBackgroundMessage(function (payload) {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//         body: 'Background Message body.',
//         icon: '/firebase-logo.png'
//     };

//     self.registration.showNotification(notificationTitle, notificationOptions);
// });
