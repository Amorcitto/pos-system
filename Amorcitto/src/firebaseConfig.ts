// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDUiCsb4fvIrypAreI7zeqDzZBLk10KV0U",
    authDomain: "amorcitto-3a468.firebaseapp.com",
    projectId: "amorcitto-3a468",
    storageBucket: "amorcitto-3a468.firebasestorage.app",
    messagingSenderId: "493500793176",
    appId: "1:493500793176:web:c9294db99a33491281652d",
    measurementId: "G-WJPVWPWVKC"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
