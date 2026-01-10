import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp9FQY6aYJnNN-Uv8rA6FkhyUAMKkfuYs",
  authDomain: "thrift-and-go.firebaseapp.com",
  projectId: "thrift-and-go",
  storageBucket: "thrift-and-go.firebasestorage.app",
  messagingSenderId: "16585040712",
  appId: "1:16585040712:web:f7d0cad99aa450af41897d",
  measurementId: "G-S0049BDE66"
};

// 1. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. Initialize Services and EXPORT them (This fixes the errors)
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// If you had analytics code here causing the warning, you can remove it
// or just ignore the warning. It won't stop the app from working.