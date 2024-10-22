// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, onSnapshot, getDoc } from 'firebase/firestore';
import React, { createContext, useContext, useState, useEffect } from 'react';

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
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser) {
        const customerDoc = await getDoc(doc(db, 'customers', firebaseUser.uid));
        if (customerDoc.exists) {
          setUserType('customer');
          setUserData(customerDoc.data());
        } else {
          const hotelDoc = await getDoc(doc(db, 'hotels', firebaseUser.uid));
          if (hotelDoc.exists) {
            setUserType('hotel');
            setUserData(hotelDoc.data());
          } else {
            // User not found in either collection
            console.error('User not found in customers or managers collection');
            setUserType(null);
            setUserData(null);
          }
        }
        setUser(firebaseUser);
      } else {
        // User is signed out
        setUser(null);
        setUserType(null);
        setUserData(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    userType,
    userData,
    loading,
    isCustomer: userType === "customer",
    isHotel: userType === "hotel",
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {!loading && children}
    </GlobalStateContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};