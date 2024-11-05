// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
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
export const storage = getStorage(app, "gs://hotel-management-system-b9cfd.firebasestorage.app");
export const googleProvider = new GoogleAuthProvider();

const GlobalStateContext = createContext();

export const useUser = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const GlobalStateProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const resetStates = () => {
    setUser(null);
    setUserType(null);
    setUserData(null);
    setError(null);
  };

  const fetchUserData = async (firebaseUser, collectionName) => {
    try {
      const docRef = doc(db, collectionName, firebaseUser.uid);
      const docSnap = await getDoc(docRef);
      return docSnap;
    } catch (error) {
      console.error(`Error fetching ${collectionName} data:`, error);
      setError(error.message);
      return null;
    }
  };

  useEffect(() => {
    setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (!firebaseUser || !firebaseUser.emailVerified) {
          resetStates();
          setLoading(false);
          return;
        }

        // First check if the user is in hotels collection
        const hotelDoc = await fetchUserData(firebaseUser, 'hotels');

        if (hotelDoc?.exists()) {
          setUser(firebaseUser);
          setUserType('hotel');
          setUserData(hotelDoc.data());
          setLoading(false);
          return;
        }

        // If not a hotel, check if user is in customers collection
        const customerDoc = await fetchUserData(firebaseUser, 'customers');

        if (customerDoc?.exists()) {
          setUser(firebaseUser);
          setUserType('customer');
          setUserData(customerDoc.data());
          setLoading(false);
          return;
        }

        // If user is not found in either collection
        console.warn('User not found in any collection:', firebaseUser.uid);
        setUser(firebaseUser);
        setUserType(null);
        setUserData(null);
        setError('User profile not found');

      } catch (error) {
        console.error('Error in auth state change:', error);
        setError(error.message);
        resetStates();
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const isHotel = userType === 'hotel';
  const isCustomer = userType === 'customer';

  const value = {
    user,
    userType,
    userData,
    loading,
    error,
    isCustomer,
    isHotel,
    setUser,
    setUserType,
    setUserData,
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {/* {console.log(value)} */}
      {!loading && children}
    </GlobalStateContext.Provider>
  )
}