import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth, db, useUser } from "../../../config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import GoogleAuth from "../../authentication/googleAuth";
import SideBanner from "../../authentication/sideBanner";
import FormHeader from "../../authentication/formElements/formHeader";
import ErrorMessage from "../../authentication/formElements/formError";
import InputField from "../../authentication/formElements/inputField";
import FormFooter from "../../authentication/formElements/formFooter";
import FormButton from "../../authentication/formElements/formButton";
import FormRedirect from "../../authentication/formElements/formRedirect";
import FormMessage from "../../authentication/formElements/formMessage";

export default function HotelRegister() {
  const navigate = useNavigate();
  const { isCustomer } = useUser();

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [isVerifying, setVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isCustomer) navigate("/", { replace: true });
  }, [isCustomer, navigate]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "hotels", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists() && user.emailVerified) {
          navigate("/hotel/dashboard");
        }
      }
      setInitializing(false);
    });
    return () => unsubscribe();
  }, [navigate, isVerifying]);

  const handleSignUp = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await sendEmailVerification(userCredential.user);
      setMsg("A verification email has been sent. Please check your inbox.");
      setVerifying(true);

      await setDoc(doc(db, "hotels", userCredential.user.uid), {
        hotelName: data.hotelName,
        email: data.email,
        type: "hotel",
      });
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("The email address is already registered.");
      } else if (err.code === "auth/weak-password") {
        setError("The password is too weak.");
      } else {
        setError(err.message || "An error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (isVerifying) {
      const interval = setInterval(async () => {
        await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
          setVerifying(false);
          setIsLoading(false);
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isVerifying, navigate]);

  if (initializing) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <SideBanner type={"hotelSignUp"} />
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-3">
        <div className="w-full max-w-lg">
          <form
            className="flex flex-col items-center"
            onSubmit={handleSubmit(handleSignUp)}
          >
            <FormHeader heading={"Sign Up"} />
            {error && <ErrorMessage message={error} />}
            {msg && <FormMessage msg={msg} />}

            <InputField
              register={register}
              name={"hotelName"}
              placeholder={"Hotel Name"}
              type={"text"}
              error={errors.hotelName}
              validation={{ required: "Hotel Name is required" }}
            />
            <InputField
              register={register}
              name={"email"}
              placeholder={"Email"}
              type={"email"}
              error={errors.email}
              validation={{
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid Email" },
              }}
            />
            <InputField
              register={register}
              name={"password"}
              placeholder={"Create Password"}
              type={"password"}
              error={errors.password}
              validation={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
            />

            <FormFooter type={"signup"} register={register} errors={errors} />
            <FormButton buttonText={"Create an Account"} loading={isLoading} />
            <FormRedirect type={"signup"} path={"/hotel/signin"} />
          </form>
          <GoogleAuth type={"hotel"} />
        </div>
      </div>
    </div>
  );
}
