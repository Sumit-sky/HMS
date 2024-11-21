import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
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

export default function CustomerRegister() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [isVerifying, setVerifying] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { isHotel } = useUser();

  useEffect(() => {
    if (isHotel) {
      navigate("/", { replace: true });
    }
  }, [isHotel, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "customers", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists() && user.emailVerified) {
          navigate("/");
        }
      }
      setInitializing(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const signUp = async (data) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await sendEmailVerification(userCredential.user);
      setVerifying(true);
      setMsg("A verification email has been sent. Please check your inbox.");

      await setDoc(doc(db, "customers", userCredential.user.uid), {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        type: "customer",
        bookingHistory: [],
      });
    } catch (error) {
      setError(error.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isVerifying) {
      const interval = setInterval(async () => {
        if (auth.currentUser) {
          await auth.currentUser.reload();
          if (auth.currentUser.emailVerified) {
            setVerifying(false);
            setIsLoading(false);
            clearInterval(interval);
            navigate("/");
          }
        } else {
          clearInterval(interval); // Clear interval if user is null
        }
      }, 500);

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
      <SideBanner type={"customer"} />
      <div className="flex flex-col justify-center items-center w-1/2 max-md:w-full p-3">
        <div className="w-full max-w-lg">
          <form
            className="flex flex-col items-center"
            onSubmit={handleSubmit(signUp)}
          >
            <FormHeader heading={"Sign Up"} />
            <p className="text-left my-2 text-gray-500 w-full">
              Create your account in seconds
            </p>
            {error && <ErrorMessage message={error} />}
            {msg && <FormMessage msg={msg} />}
            <InputField
              register={register}
              name={"firstName"}
              placeholder={"First Name"}
              type={"text"}
              error={errors.firstName}
              validation={{
                required: "First Name is required",
              }}
            />
            <InputField
              register={register}
              name={"lastName"}
              placeholder={"Last Name"}
              type={"text"}
              error={errors.lastName}
              validation={{
                required: "Last Name is required",
              }}
            />
            <InputField
              register={register}
              name={"email"}
              placeholder={"Email"}
              type={"email"}
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
            <FormRedirect type={"signup"} path={"/signin"} />
          </form>
          <GoogleAuth type={"customer"} />
        </div>
      </div>
    </div>
  );
}
