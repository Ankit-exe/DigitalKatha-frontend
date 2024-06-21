// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API,
    authDomain: "digitalkatha-eb386.firebaseapp.com",
    projectId: "digitalkatha-eb386",
    storageBucket: "digitalkatha-eb386.appspot.com",
    messagingSenderId: "257718993932",
    appId: "1:257718993932:web:5f3f6e52631a638a90da29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;