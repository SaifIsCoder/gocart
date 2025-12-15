import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.MEASUREMENT_ID,
};

// Initialize Firebase only if config is available
// This prevents build-time errors when env vars are missing
let app = null;
let auth = null;
let db = null;
let storage = null;

if (firebaseConfig.apiKey && firebaseConfig.projectId) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } catch (error) {
    console.warn("Firebase initialization error:", error);
    // auth will remain null, components will handle this with null checks
  }
} else if (process.env.NODE_ENV !== 'production') {
  // Only warn in development, not during build
  console.warn("Firebase configuration missing. Some features may not work.");
}

export { auth, db, storage };
