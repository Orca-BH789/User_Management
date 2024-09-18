// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqbxhSLOVP4zFinOB3Zf-46y9VD11lji0",
  authDomain: "lab1sao.firebaseapp.com",
  projectId: "lab1sao",
  storageBucket: "lab1sao.appspot.com",
  messagingSenderId: "1098066344342",
  appId: "1:1098066344342:web:aaa6f39c8e9ae5132dc5b7",
  measurementId: "G-5KF8BB8ZCV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);