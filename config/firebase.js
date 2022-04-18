import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1zTfQ7P1Dj4VYifkNvrrYv0wid3oGMS4",
  authDomain: "wuduplz-1e802.firebaseapp.com",
  projectId: "wuduplz-1e802",
  storageBucket: "wuduplz-1e802.appspot.com",
  messagingSenderId: "769701017816",
  appId: "1:769701017816:web:c143ab35d26ef111ffffad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();