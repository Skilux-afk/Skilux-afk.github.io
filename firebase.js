// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";

import { getDatabase } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use            
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAF_96r3Odby5ka8FH1S7V0fa1cOgGx3vk",
    authDomain: "einkaufsliste-35fc9.firebaseapp.com",
    projectId: "einkaufsliste-35fc9",
    storageBucket: "einkaufsliste-35fc9.firebasestorage.app",
    messagingSenderId: "561414364840",
    appId: "1:561414364840:web:036de241c80129fba9ec9d",
    measurementId: "G-RSGX9PVYWJ"
};            

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app,"https://einkaufsliste-35fc9-default-rtdb.europe-west1.firebasedatabase.app");

export { app, db };