// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth"
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB02eeqbZCW8JiKLLHo-EWvTY5SwyR16ug",
    authDomain: "interbanking-react-sg.firebaseapp.com",
    projectId: "interbanking-react-sg",
    storageBucket: "interbanking-react-sg.appspot.com",
    messagingSenderId: "1046185155767",
    appId: "1:1046185155767:web:9fce4d3926e84eadfd4132"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app) //exporto la autenticacion
export const db = getFirestore(app) //exporto la base de datos.