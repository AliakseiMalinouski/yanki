// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDeN6qFYxr0bgIJivJuMbB7MQmhxcEyt-Q",
  authDomain: "yanki-5e093.firebaseapp.com",
  projectId: "yanki-5e093",
  storageBucket: "yanki-5e093.appspot.com",
  messagingSenderId: "430618378210",
  appId: "1:430618378210:web:87890b827b94dfd460c3bb",
  measurementId: "G-5WT8F6LTTF"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
