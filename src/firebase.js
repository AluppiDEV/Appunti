// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "XXX",
  authDomain: "TUO_PROGETTO.firebaseapp.com",
  projectId: "TUO_PROGETTO",
  storageBucket: "TUO_PROGETTO.appspot.com",
  messagingSenderId: "XXX",
  appId: "XXX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
