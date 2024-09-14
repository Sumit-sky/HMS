import React, { useState } from "react"; // Import useState to manage the error state
import { Alert, Button } from "react-bootstrap";
import { auth, googleProvider, db } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function GoogleAuth(type) {
  const [error, setError] = useState(""); // Use useState to manage errors

  const googleSignUp = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      // Check if the user document already exists
      let userDocRef;
      if (type.type === "hotel") {
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
          type: type.type,
        });
      }
      console.log("with google");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="mt-4 text-muted">
      {error && (
        <Alert variant="danger" className="text-danger mt-2">
          {error}
        </Alert>
      )}{" "}
      <p>Or continue with</p>
      <Button variant="none" onClick={googleSignUp}>
        <img
          width={"50px"}
          src="https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK"
          alt="Google Login"
        />
      </Button>
      {/* <Button onClick={logout}>Logout</Button> */}
    </div>
  );
}
