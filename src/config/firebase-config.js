// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRG22kwL_85ZSPTfaUjBs2RbydLJsergg",
  authDomain: "chatapp-unity.firebaseapp.com",
  projectId: "chatapp-unity",
  storageBucket: "chatapp-unity.appspot.com",
  messagingSenderId: "387277169209",
  appId: "1:387277169209:web:8e2ca5a5b774282a6fa3e8",
  measurementId: "G-JMM91QPNZ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const  dataBase = getFirestore(app);