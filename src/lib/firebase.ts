// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsZMSZBFC_lKRNkMWm52kdC9KUUAvCbNs",
  authDomain: "aust2-b8d21.firebaseapp.com",
  projectId: "aust2-b8d21",
  storageBucket: "aust2-b8d21.firebasestorage.app",
  messagingSenderId: "91866779140",
  appId: "1:91866779140:web:f23a3ccfd106287682af51",
  measurementId: "G-EBSNTKHEB8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
