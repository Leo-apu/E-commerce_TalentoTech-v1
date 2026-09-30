// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// Inicializamos y exportamos la base de datos Firestore
export const db = getFirestore(app);
export default app;
