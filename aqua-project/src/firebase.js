// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUhgOat1FWBHFj1Hl1GqYLFkuDxFPW-hY",
  authDomain: "aqua-monitoring-system.firebaseapp.com",
  databaseURL: "https://aqua-monitoring-system-default-rtdb.firebaseio.com",
  projectId: "aqua-monitoring-system",
  storageBucket: "aqua-monitoring-system.appspot.com",
  messagingSenderId: "549079427797",
  appId: "1:549079427797:web:c86c8c78bbfa0f6319d05c",
  measurementId: "G-EVZEG3V7T3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
