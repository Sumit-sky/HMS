import React, { useState } from "react"; // Import useState to manage the error state
import { auth, googleProvider, db } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function GoogleAuth({ type }) {
  const navigate = useNavigate();
  const [error, setError] = useState(""); // Use useState to manage errors

  const googleSignUp = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      // console.log(user);
      // Check if the user document already exists
      let userDocRef;
      if (type === "hotel") {
        userDocRef = doc(db, "hotels", user.uid);
      } else {
        userDocRef = doc(db, "customers", user.uid);
      }
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        // Only create a new document if it doesn't already exist
        await setDoc(userDocRef, {
          firstName: user.displayName ? user.displayName.split(" ")[0] : "",
          lastName: user.displayName
            ? user.displayName.split(" ").slice(1).join(" ")
            : "",
          email: user.email,
          photoURL: user.photoURL,
          type: type,
        });
      }
      console.log("with google");
      if (type === "customer") {
        navigate("/");
      }
    } catch (error) {
      // console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="mt-4 text-gray-500">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-2">
          <p>{error}</p>
        </div>
      )}
      <p className="my-2">Or continue with</p>
      <button className="my-2" onClick={googleSignUp}>
        <img
          width={"50px"}
          src="https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK"
          alt="Google Login"
        />
      </button>
      {/* <button onClick={logout}>Logout</button> */}
    </div>
  );
}
