// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, setDoc, doc, collection, arrayRemove, arrayUnion, getDoc, updateDoc } from 'firebase/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
  } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMHnLrgItJILkd789aQQEpFC69McbohIM",
  authDomain: "buzz-delivery-fdf32.firebaseapp.com",
  projectId: "buzz-delivery-fdf32",
  storageBucket: "buzz-delivery-fdf32.appspot.com",
  messagingSenderId: "360258172405",
  appId: "1:360258172405:web:7155f4f6a752fe6d439cbc",
  measurementId: "G-BRD1V75YH1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const firestore = getFirestore()