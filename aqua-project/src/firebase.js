// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXIYk1apQQ0M1a57TWNsx2_nVqRvXD3rw",
  authDomain: "aqua-monitoring-system-c7b63.firebaseapp.com",
  projectId: "aqua-monitoring-system-c7b63",
  storageBucket: "aqua-monitoring-system-c7b63.appspot.com",
  messagingSenderId: "680691801753",
  appId: "1:680691801753:web:c56db3e72f04db2fb1e208",
  measurementId: "G-DDSQZ3L3YV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {db, app, auth};
