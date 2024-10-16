import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth, db } from "../../../config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import GoogleAuth from "../../authentication/googleAuth";
import SideBanner from "../../authentication/sideBanner";
import FormHeader from "../../authentication/formHeader";
import ErrorMessage from "../../authentication/formError";
import FormMessage from "../../authentication/formMessage";
import InputField from "../../authentication/inputField";
import FormFooter from "../../authentication/formFooter";
import FormButton from "../../authentication/formButton";
import FormRedirect from "../../authentication/formRedirect";

export default function CustomerRegister() {
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [isVerifying, setVerifying] = useState(false);

  const navigate = useNavigate();
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

      await setDoc(doc(db, "customers", userCredential.user.uid), {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        type: "customer",
      });
      // console.log("email and password");
      // navigate("/home");
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
            // navigate("/signin");
          }
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isVerifying]);

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("sign out");
    } catch (error) {
      setError(error.message);
    }
  };

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
            <FormButton
              buttonText={"Create an Account"}
              loading={isVerifying}
            />
            <FormRedirect type={"signup"} path={"/signin"} />
          </form>
          <GoogleAuth type={"customer"} />
        </div>
      </div>
    </div>
  );
}
