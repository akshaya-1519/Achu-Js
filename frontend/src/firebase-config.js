
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD3ip8pSXconpF66tPGSYaNzAjqo0byydM",
  authDomain: "chat-app1-3bf73.firebaseapp.com",
  projectId: "chat-app1-3bf73",
  storageBucket: "chat-app1-3bf73.firebasestorage.app",
  messagingSenderId: "578211794308",
  appId: "1:578211794308:web:73e1ef8887d7bbed1321d1",
  measurementId: "G-SGCF4XHL7T"
};

const app = initializeApp(firebaseConfig);
export const db= getDatabase(app);