// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDu4-Ow6dST8RFxIIfBhxD7CmiHLVFgZWY",
  authDomain: "gutenberg-85d3c.firebaseapp.com",
  projectId: "gutenberg-85d3c",
  storageBucket: "gutenberg-85d3c.appspot.com",
  messagingSenderId: "728591506739",
  appId: "1:728591506739:web:253c443a6a489e81d6b246",
  measurementId: "G-6XPTRPYMYT",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
