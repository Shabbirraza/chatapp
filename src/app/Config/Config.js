
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCUPAOskJ_Hn0jbJMhdKvpmWUdb1vJkrDM",
  authDomain: "chatapp-129c5.firebaseapp.com",
  projectId: "chatapp-129c5",
  storageBucket: "chatapp-129c5.appspot.com",
  messagingSenderId: "747172505968",
  appId: "1:747172505968:web:955c24445412b7d49e47b5",
  measurementId: "G-8LEKSKZM8Y"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);