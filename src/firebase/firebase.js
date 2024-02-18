// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getDatabase } from "firebase/database";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIREBASE_API_ID }`,
  measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}`,
  databaseURL: `${process.env.REACT_APP_FIREBASE_DATABASE_URL}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

logEvent(analytics, 'user_login', {
    method: 'email',
    successful: true,
});

export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
