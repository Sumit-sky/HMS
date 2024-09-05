// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzXZ7wA4Q43uSMQPsEpPg2gA7kVzWbdWE",
  authDomain: "hotel-management-system-b9cfd.firebaseapp.com",
  projectId: "hotel-management-system-b9cfd",
  storageBucket: "hotel-management-system-b9cfd.appspot.com",
  messagingSenderId: "482079841283",
  appId: "1:482079841283:web:a60e03ab77fa75e6d3c236",
  measurementId: "G-4ZF3XRR21D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);