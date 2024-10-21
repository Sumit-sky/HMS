import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import GoogleAuth from "../../authentication/googleAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import SideBanner from "../../authentication/sideBanner";
import FormHeader from "../../authentication/formElements/formHeader";
import ErrorMessage from "../../authentication/formElements/formError";
import InputField from "../../authentication/formElements/inputField";
import FormFooter from "../../authentication/formElements/formFooter";
import FormButton from "../../authentication/formElements/formButton";
import FormRedirect from "../../authentication/formElements/formRedirect";

export default function CustomerAuth() {
  const navigate = useNavigate();
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
      const userDocRef = doc(db, "customers", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        if (!user.emailVerified) {
          setError("Email not Verified, Please check your inbox");
        } else {
          navigate("/");
          console.log("sign in success");
        }
      } else {
        setError("No customer record found.");
      }
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (error.code === "auth/user-not-found") {
        setError("No user found with this email. Please sign up.");
      } else {
        setError("Failed to sign in. Please try again.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      <SideBanner type={"customer"} />
      <div className="flex flex-col justify-center items-center w-1/2 max-md:w-full p-3">
        <div className="w-full max-w-md">
          <form
            className="flex flex-col items-center"
            onSubmit={handleSubmit(loginEmailAndPassword)}
          >
            <FormHeader heading={"Sign In"} />
            <p className="text-left mb-2 text-gray-500 w-full">
              Sign in to your account in seconds
            </p>
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
            <FormRedirect type={"signin"} path={"/signup"} />
          </form>
          <GoogleAuth type={"customer"} />
        </div>
      </div>
    </div>
  );
}
