// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyClnTaCLsoL3r5QGwh7mtAjV4JaeA7P0gk",
  authDomain: "fir-course-a8899.firebaseapp.com",
  projectId: "fir-course-a8899",
  storageBucket: "fir-course-a8899.appspot.com",
  messagingSenderId: "837649050226",
  appId: "1:837649050226:web:2b30e41193226f08b230eb",
  measurementId: "G-C0B4P4G4F5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


export const db = getFirestore(app);
export const storage = getStorage(app);
