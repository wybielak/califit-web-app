
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
//import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBldy6f-JdRo93SLGR0Jr_dOPGmiZFK0b8",
  authDomain: "califit-a4835.firebaseapp.com",
  projectId: "califit-a4835",
  storageBucket: "califit-a4835.appspot.com",
  messagingSenderId: "425431825055",
  appId: "1:425431825055:web:76e8add59e49805e8400aa",
  measurementId: "G-CT4N51B050"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
//const analytics = getAnalytics(app);