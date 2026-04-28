import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Production Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV2pv8REY3pD4YOoltjrjjhQ1x2zfqbSQ",
  authDomain: "breed-jainmca.firebaseapp.com",
  projectId: "breed-jainmca",
  storageBucket: "breed-jainmca.firebasestorage.app",
  messagingSenderId: "104241776769",
  appId: "1:104241776769:web:e46467f69e71eef33c2580",
  measurementId: "G-1M49Z315BH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
