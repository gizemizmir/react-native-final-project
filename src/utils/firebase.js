// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7XWsMP6Y7syiXYqxT1i4srCV6_8StAHU",
  authDomain: "akbank-final-project.firebaseapp.com",
  projectId: "akbank-final-project",
  storageBucket: "akbank-final-project.appspot.com",
  messagingSenderId: "597841036141",
  appId: "1:597841036141:web:e1e00937d48a7b95909064",
  measurementId: "G-0RXGWR7JB0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
