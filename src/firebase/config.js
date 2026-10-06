// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWUwHaTYdj0wpI9cbho7tCRgsVAZUishY",
  authDomain: "mi-ecommerce-react-bc451.firebaseapp.com",
  projectId: "mi-ecommerce-react-bc451",
  storageBucket: "mi-ecommerce-react-bc451.firebasestorage.app",
  messagingSenderId: "850419451606",
  appId: "1:850419451606:web:2aa93c74eeedb7bd22ab77",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializamos y exportamos Firestore, Auth y el proveedor de Google
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;

