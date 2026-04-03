import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFLeKsNGKz5geVVsYaLfsGBInaom6HZ50",
  authDomain: "respectnerds-6e8ca.firebaseapp.com",
  projectId: "respectnerds-6e8ca",
  storageBucket: "respectnerds-6e8ca.firebasestorage.app",
  messagingSenderId: "241567333800",
  appId: "1:241567333800:web:cd55bc4ea31490136eb19d",
  measurementId: "G-CLPHZKWKQ7"
};

// Next.js fast-refresh safe initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
