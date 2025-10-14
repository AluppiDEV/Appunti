import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAr_F33HmfH7TQHpZpJUFlOgtXwSrCYws0",
  authDomain: "appunti-luppi.firebaseapp.com",
  projectId: "appunti-luppi",
  storageBucket: "appunti-luppi.appspot.com",
  messagingSenderId: "XXX",
  appId: "XXX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
