import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import GoogleAuth from "../../authentication/googleAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import logo from "../../../Assets/logo.png";
import { Link } from "react-router-dom";
import SideBanner from "../../authentication/sideBanner";
import FormHeader from "../../authentication/formHeader";
import ErrorMessage from "../../authentication/formError";
import InputField from "../../authentication/inputField";
import FormFooter from "../../authentication/formFooter";
import FormButton from "../../authentication/formButton";
import FormRedirect from "../../authentication/formRedirect";

export default function HotelAuth() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginEmailAndPassword = async (data) => {
    setLoading(true);
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      const userDocRef = doc(db, "hotels", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        if (!user.emailVerified) {
          setError("Email not Verified, Please check your inbox");
        } else {
          console.log("sign in success");
        }
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      <SideBanner type={"hotel"} />
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-3">
        <div className="max-w-lg w-full">
          <form className="flex flex-col items-center" onSubmit={handleSubmit(loginEmailAndPassword)}>
            <FormHeader heading={"Sign In"} />
            {error && <ErrorMessage message={error} />}
            <InputField
              register={register}
              name={"email"}
              placeholder={"Email"}
              type="email"
              error={errors.email}
              validation={{
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid Email",
                },
              }}
            />
            <InputField
              register={register}
              name="password"
              placeholder="Password"
              type="password"
              error={errors.password}
              validation={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
            />
            <FormFooter type={"signin"} />
            <FormButton buttonText={"Sign In"} loading={loading} />
            <FormRedirect type={"signin"} path={"/hotel/signup"} />
          </form>
          <GoogleAuth type={"hotel"} />
        </div>
      </div>
    </div>
  );
}
