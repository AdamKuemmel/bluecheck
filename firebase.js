// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhG1iGsalFBm4WKjtPjzK0q55DrvDZFdc",
  authDomain: "bluecheck-fire-ak.firebaseapp.com",
  projectId: "bluecheck-fire-ak",
  storageBucket: "bluecheck-fire-ak.appspot.com",
  messagingSenderId: "734472105879",
  appId: "1:734472105879:web:75117a95bf8e3087521ed2",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
