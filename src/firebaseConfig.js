import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8Ha9lNyY9U7Kp9WOZ3Y9PbVZLd6zUwFU",
  authDomain: "toa-assessment.firebaseapp.com",
  projectId: "toa-assessment",
  storageBucket: "toa-assessment.firebasestorage.app",
  messagingSenderId: "139984786434",
  appId: "1:139984786434:web:93fd244b4055f5fbbb831b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
