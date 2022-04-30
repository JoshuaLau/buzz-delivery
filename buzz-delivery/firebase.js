// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { getFirestore, setDoc, doc, collection, arrayRemove, arrayUnion, getDoc, updateDoc, getDocs } from 'firebase/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
  } from 'firebase/auth';
import { pushToken, sendPushNotification } from "./App";
import { isAdmin } from "@firebase/util";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlpGNj7e7xxZCBza7EosP1nh8K7Psv3ek",
  authDomain: "deliverbuzz-26d98.firebaseapp.com",
  databaseURL: "https://deliverbuzz-26d98-default-rtdb.firebaseio.com",
  projectId: "deliverbuzz-26d98",
  storageBucket: "deliverbuzz-26d98.appspot.com",
  messagingSenderId: "365279079729",
  appId: "1:365279079729:web:7b074f75ff56670161d410"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const auth = getAuth(app);

const firestore = getFirestore();

var user_uid;

// state of orders
const ACCEPTING = "ACCEPTING";
const ORDER_PLACED = "ORDER_PLACED";
const RETURNING = "RETURNING";
const DELIVERED = "DELIVERED";

export async function createUser(email, password, driver, n, v) {
  createUserWithEmailAndPassword(auth, email, password).then(async function(user_log) {
    user_uid = user_log.user.uid;
    if (driver) {
      await setDoc(doc(firestore, "driver", user_uid), {
        name: n,
        venmo: v,
        rating: -1,
        total_ratings: 0,
        latitude: 0,
        longitude: 0,
        pushtoken: pushToken,
      })
    } else {
      await setDoc(doc(firestore, "customer", user_uid), {
        name: n,
        venmo: v,
        rating: -1,
        total_ratings: 0,
        pushtoken: pushToken,
      })
    }
  });

  
  return user_uid;
}

export async function saveTripDetails(restaurantName, menuLink, dropLocation, estimatedTime, maxRequests) {
  user_uid = auth.currentUser.uid;

  var driverDoc = await getDoc(doc(firestore, "driver", user_uid));

  var driver_name;
  if (!driverDoc.exists()) {
    driver_name = "TEMP";
  } else {
    driver_name = driverDoc.get("name");
  }
  
  await setDoc(doc(firestore, "trips", user_uid), {
    driver: driver_name,
    restaurant_name: restaurantName,
    menu_link: menuLink,
    drop_location: dropLocation,
    estimated_time: estimatedTime,
    max_requests: maxRequests
  });

  await setDoc(doc(firestore, "ongoing_orders", user_uid), {
    driver_id: user_uid,
    customers: [],
    customer_ids: [],
    destination: dropLocation,
    orders: [],
    restaurant: restaurantName,
    stage: ACCEPTING
  });

  return user_uid;
}

export async function placeOrder(order, price, driver_id) {
  user_uid = auth.currentUser.uid;

  price = parseFloat(price);

  var customerDoc = await getDoc(doc(firestore, "customer", user_uid));

  var customer_name;
  if (!customerDoc.exists()) {
    customer_name = "TEMP";
  } else {
    customer_name = customerDoc.get("name");
  }
  
  await updateDoc(doc(firestore, "ongoing_orders", driver_id), {
    customer_ids: arrayUnion(user_uid),
    customers: arrayUnion(customer_name),
    orders: arrayUnion({
      order: order,
      price: price
    })
  });

  return user_uid;
}

export async function getAvailableDrivers() {

  var tripSnapshot = await getDocs(collection(firestore, "trips"));

  var trips = [];

  tripSnapshot.forEach((doc) => {
    trips.push({id: doc.id, ...doc.data()})
  });

  return trips;
}

export async function getOrders() {

  var user_uid = auth.currentUser.uid;

  var ongoing_order = await getDoc(doc(firestore, "ongoing_orders", user_uid));
  
  var orders = ongoing_order.data();

  return orders;
}

export async function getVenmo(driver_id) {

  var driver_doc = await getDoc(doc(firestore, "driver", driver_id));
  
  var driver = driver_doc.data();

  return driver;
}

export async function updateLocation(lat, long) {
  const user_doc = doc(firestore, "driver", auth.currentUser.uid);
  const docRef = updateDoc(user_doc, {
    latitude: lat,
    longitude: long
  });
}

export async function getLocation(driver_id) {
  const document = await getDoc(doc(firestore, "driver", "fJFZ3Oh2DoVZiCoRkjZoBIoggm02")); //TODO: replace hardcoded driver id with param
  var lat = document.data().latitude;
  var long = document.data().longitude;
  return [lat, long]
}

export async function userType() {
  var docSnap = await getDoc(doc(firestore, "customer", auth.currentUser.uid));
  if (!docSnap.exists()) {
    console.log("gothere")
    return "driver";
  };
  return "customer";
}

export async function signIn(email, password) {
  const userCredentials = await signInWithEmailAndPassword(auth, email, password);
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
  const document = await getDoc(doc(firestore, "ongoing_orders", auth.currentUser.uid));
  var customers = document.data().customer_id;
  // var title = ""; uncomment when update order stage begins to work
  // var text = "";
  // if (status == "Returning") {
  //   title = "Returning to Campus";
  //   text = "Your food has been picked up and is being returned to campus!";
  // } else if (status = "Arrived") {
  //   title="Arrived to Campus";
  //   text = "Your food is at the designated dropoff location!";
  // }

  // for (let i=0; i < customers.length; i++) {
  //   const cust_doc = await getDoc(doc(firestore, "customer", customers[i]));
  //   sendPushNotification(cust_doc.data().pushtoken, title, text, "")
  // }
}

