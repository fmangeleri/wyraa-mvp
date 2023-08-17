// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7XyeRmOFhlb7Ca_vUOI_2QMYMZ3FQDAo",
  authDomain: "wyraa-api-test.firebaseapp.com",
  projectId: "wyraa-api-test",
  storageBucket: "wyraa-api-test.appspot.com",
  messagingSenderId: "657889519286",
  appId: "1:657889519286:web:69aafc3fe5c703245de817",
  measurementId: "G-1NQCP3FW3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);