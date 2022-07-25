import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import {
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbnem95Y_BvT07J49q4LEU11OFZfMlHNg",
  authDomain: "rockethelp-a571e.firebaseapp.com",
  projectId: "rockethelp-a571e",
  storageBucket: "rockethelp-a571e.appspot.com",
  messagingSenderId: "297619394456",
  appId: "1:297619394456:web:a88a7ad3de114f2763a5ed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const provider = new GoogleAuthProvider();
const auth = getAuth();

function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

function signOutUser() {
  signOut(auth);
}

export { app, db, signIn, signOutUser, onAuthStateChanged, auth };
