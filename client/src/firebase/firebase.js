// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf0Z8Mi9QY-Dm3xzPkGTYfFvFgf2Cgx50",
  authDomain: "job-portal-sp.firebaseapp.com",
  projectId: "job-portal-sp",
  storageBucket: "job-portal-sp.firebasestorage.app",
  messagingSenderId: "61406543706",
  appId: "1:61406543706:web:fe9707ec3f072fd22b7d63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);