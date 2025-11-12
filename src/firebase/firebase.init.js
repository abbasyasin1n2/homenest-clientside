// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzhlfr85pOuG0VMYGvXqfDwkct9Hi0X-8",
  authDomain: "homenest-clientside.firebaseapp.com",
  projectId: "homenest-clientside",
  storageBucket: "homenest-clientside.firebasestorage.app",
  messagingSenderId: "616527325225",
  appId: "1:616527325225:web:5f7154eb87d82b6be91438"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;