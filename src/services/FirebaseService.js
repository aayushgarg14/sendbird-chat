import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4V0SiSRbwvMVjnZLnQuS6PX1mPHFmRIU",
  authDomain: "kure-dev-191711.firebaseapp.com",
  databaseURL: "https://kure-dev-191711.firebaseio.com",
  projectId: "kure-dev-191711",
  storageBucket: "kure-dev-191711.appspot.com",
  messagingSenderId: "880900664877",
  appId: "1:880900664877:web:e792da0bb55f78ed0152a4",
  measurementId: "G-X76HF49FQD",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseDB = getFirestore();

export { firebaseApp, firebaseDB };
