import React, { useState, useEffect } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SideBanner from "./sideBanner";
import FormHeader from "./formElements/formHeader";
import ErrorMessage from "./formElements/formError";
import InputField from "./formElements/inputField";
import FormButton from "./formElements/formButton";
import { auth, db } from "../../config/firebase";
import FormMessage from "./formElements/formMessage";
import { useUser } from "../../config/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

export default function ForgotPassword() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const { isCustomer, isHotel } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isCustomer || isHotel) {
      const from = location.state?.from?.pathname || document.referrer || "/";
      navigate(from, { replace: true });
    }
  }, [isCustomer, isHotel, location, navigate]);

  const forgotPasswordEmail = async (data) => {
    setLoading(true);
    try {
      const userRef = collection(db, "customers");
      const q = query(userRef, where("email", "==", data.email.toLowerCase()));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        const hotelRef = collection(db, "hotels");
        const h = query(
          hotelRef,
          where("email", "==", data.email.toLowerCase())
        );
        const hotelQuerySnapshot = await getDocs(h);
        if (hotelQuerySnapshot.empty) {
          setError("Invalid Email");
          setLoading(false);
          return;
        }
      }
      await sendPasswordResetEmail(auth, data.email, {
        url: "http://localhost:3000/signin",
      });
      setValue("email", "");
      setMsg("Please check your inbox, a password reset email has been sent !");
      setError("");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Invalid email address format.");
      } else if (error.code === "auth/too-many-requests") {
        setError("Too many requests. Please try again later.");
      } else {
        setError("Failed to send reset email. Please try again.");
      }
      console.error("Password reset error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      <SideBanner type={"customer"} />
      <div className="flex flex-col justify-center items-center w-1/2 max-md:w-full p-3">
        <div className="w-full max-w-md">
          <form
            className="flex flex-col items-center mb-3"
            onSubmit={handleSubmit(forgotPasswordEmail)}
          >
            <FormHeader heading={"Forgot Password ?"} />
            {error && <ErrorMessage message={error} />}
            {msg && <FormMessage msg={msg} />}
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
            <FormButton
              buttonText={"Send Password Reset Email"}
              loading={loading}
            />
          </form>
          <Link to={"/signin"} className="text-violet-500 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
