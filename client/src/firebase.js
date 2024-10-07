// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-54db6.firebaseapp.com",
  projectId: "mern-blog-54db6",
  storageBucket: "mern-blog-54db6.appspot.com",
  messagingSenderId: "280402226801",
  appId: "1:280402226801:web:1e3fcaed8b8a3b97b8b5d0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
