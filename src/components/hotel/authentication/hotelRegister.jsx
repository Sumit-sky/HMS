import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
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
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [isVerifying, setVerifying] = useState(false);
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signUp = async (data) => {
    setVerifying(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await sendEmailVerification(userCredential.user);
      setMsg("A verification email has been sent. Please check your inbox.");

      await setDoc(doc(db, "hotels", userCredential.user.uid), {
        hotelName: data.hotelName,
        email: data.email,
        type: "hotel",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (isVerifying) {
      const interval = setInterval(() => {
        auth.currentUser.reload().then(() => {
          if (auth.currentUser.emailVerified) {
            setVerifying(false);
            // navigate("/hotellogin");
          }
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isVerifying]);

  return (
    <div className="flex min-h-screen">
      <SideBanner type={"hotelSignUp"} />
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-3">
        <div className="w-full max-w-lg">
          <form
            className="flex flex-col items-center"
            onSubmit={handleSubmit(signUp)}
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
              validation={{
                required: "Hotel Name is required",
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
            <FormButton
              buttonText={"Create an Account"}
              loading={isVerifying}
            />
            <FormRedirect type={"signup"} path={"/hotel/signin"} />
          </form>
          <GoogleAuth type={"hotel"} />
        </div>
      </div>
    </div>
  );
}
