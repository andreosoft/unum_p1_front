// import { onBackgroundMessage } from "firebase/messaging/sw";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, onMessage, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBGbu0xVj6BTU4Sxpz4xy8EloWkuvpdWIU",
  authDomain: "neomedy-c88e1.firebaseapp.com",
  projectId: "neomedy-c88e1",
  storageBucket: "neomedy-c88e1.appspot.com",
  messagingSenderId: "112387158694",
  appId: "1:112387158694:web:ff2d236f49c1bfd9983a67",
  measurementId: "G-J9YQ804G2M",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const messaging = getMessaging();
export { getToken }

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});
