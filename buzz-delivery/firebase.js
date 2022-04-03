// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
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
const app = firebase.initializeApp(firebaseConfig);

const auth = getAuth(app);

const firestore = getFirestore()

var user_uid;
export async function createUser(email, password, driver, n, v) {
  createUserWithEmailAndPassword(auth, email, password).then(async function(user_log) {
    user_uid = user_log.user.uid;
    if (driver) {
      await setDoc(doc(firestore, "driver", user_uid), {
        name: n,
        venmo: v
      })
    } else {
      await setDoc(doc(firestore, "customer", user_uid), {
        name: n,
        venmo: v
      })
    }
  });

  
  return user_uid;
}

export function signIn(email, password) {
  const userCredentials = signInWithEmailAndPassword(auth, email, password);
  onAuthStateChanged(auth, (user_log) => {
    if (user_log) {
      user_uid = user_log.uid;
    }
  });

  user_uid = auth.currentUser.uid;

  return userCredentials;
}

// export async function food_request(order, driver_id, price) {
//   const user_doc = doc(firestore, "ongoing_orders", driver_id);
//   const orders_map = new Map([
//     ["customer_id" , auth.currentUser.uid],
//     ["order", order],
//     ["price", price]

//   ])
//   const docRef = updateDoc(user_doc, {
//     orders: arrayUnion(orders_map)
//   });
// }

export async function updateOrderStage(status) {
  const user_doc = doc(firestore, "ongoing_orders", auth.currentUser.uid);
  const docRef = updateDoc(user_doc, {
    stage: status
  });
}

