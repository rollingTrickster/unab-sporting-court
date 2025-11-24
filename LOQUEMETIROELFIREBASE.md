npm install firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiK: "AIzaSyAhoywGRKhZ1WAJx4sOOd0xXUjUinjZIII",
  authDomain: "unab-sporting-court-b5294.firebaseapp.com",
  projectId: "unab-sporting-court-b5294",
  storageBucket: "unab-sporting-court-b5294.firebasestorage.app",
  messagingSenderId: "955105231764",
  appId: "1:955105231764:web:c4ab8c75ff9b3136870581",
  measurementId: "G-KN2KLY1N6L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

Texto q me dio el firebase
borre la keyap