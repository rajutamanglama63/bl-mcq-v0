// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAxVM4naMmgRfjGg3qW-_mk1jFKbrOjAEo",
  authDomain: "bl-mcq-v1.firebaseapp.com",
  projectId: "bl-mcq-v1",
  storageBucket: "bl-mcq-v1.firebasestorage.app",
  messagingSenderId: "595712370923",
  appId: "1:595712370923:web:a5d09f5834c9f7d296b6ae",
  measurementId: "G-SHBCMM8QLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
