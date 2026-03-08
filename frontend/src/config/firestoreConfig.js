// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    VITE_FIRE_STORE_API_KEY,
    VITE_FIRE_STORE_AUTHDOMAIN,
    VITE_FIRE_STORE_PROJECT_ID,
    VITE_FIRE_STORE_STORAGE_BUCKET,
    VITE_FIRE_STORE_MSG_SENDER_ID,
    VITE_FIRE_STORE_APP_ID,
    VITE_FIRE_STORE_MEASUREMENT_ID,
} from "../constants"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: VITE_FIRE_STORE_API_KEY,
  authDomain: VITE_FIRE_STORE_AUTHDOMAIN,
  projectId: VITE_FIRE_STORE_PROJECT_ID,
  storageBucket: VITE_FIRE_STORE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIRE_STORE_MSG_SENDER_ID,
  appId: VITE_FIRE_STORE_APP_ID,
  measurementId: VITE_FIRE_STORE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);