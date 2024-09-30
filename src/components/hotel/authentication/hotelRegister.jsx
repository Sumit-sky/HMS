import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../../config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import hotel_auth_img from "../../../Assets/hotel_auth_img.png";
import logo from "../../../Assets/logo.png";
import GoogleAuth from "../../authentication/googleAuth";

export default function HotelRegister() {
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [isVerifying, setVerifying] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const divStyle = {
    backgroundImage: `url(${hotel_auth_img})`,
  };

  const signUp = async (data) => {
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
            navigate("/hotellogin");
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
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={divStyle}
      >
        <h1 className="w-full text-start p-3 text-4xl text-white">
          Grow With <span className="font-bold text-violet-500">US</span>
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-3">
        <div className="w-full max-w-lg">
          <form
            className="flex flex-col items-center"
            onSubmit={handleSubmit(signUp)}
          >
            <div className="flex justify-between items-center w-full mb-3">
              <h1 className="text-left text-2xl font-bold">Sign Up</h1>
              <Link to={"/"}>
                <img src={logo} alt="StayPedia Logo" className="w-24 h-16" />
              </Link>
            </div>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                <span>{error}</span>
              </div>
            )}
            {msg && (
              <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4">
                <span>{msg}</span>
              </div>
            )}
            <div className="w-full mb-3">
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg text-lg text-gray-600 outline-none"
                placeholder="Hotel Name"
                {...register("hotelName", {
                  required: "Hotel Name is required",
                })}
              />
              {errors.hotelName && (
                <div className="text-red-600 text-sm mt-1">
                  {errors.hotelName.message}
                </div>
              )}
            </div>
            <div className="w-full mb-3">
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg text-lg text-gray-600 outline-none"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid Email",
                  },
                })}
              />
              {errors.email && (
                <div className="text-red-600 text-sm mt-1">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="w-full mb-3">
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg text-lg text-gray-600 outline-none"
                placeholder="Create Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <div className="text-red-600 text-sm mt-1">
                  {errors.password.message}
                </div>
              )}
            </div>
            <div className="w-full flex flex-col items-start mb-3">
              <label className="flex items-center h-max">
                <input
                  type="checkbox"
                  className="accent-violet-500 w-4 h-4"
                  {...register("termsAndCondition", {
                    required: "You must agree to the terms and privacy policy",
                  })}
                />
                <span className="ml-2">
                  I agree to the terms and privacy policy
                </span>
              </label>
              {errors.termsAndCondition && (
                <div className="text-red-600 text-sm mt-1">
                  {errors.termsAndCondition.message}
                </div>
              )}
            </div>
            <button
              className="w-full py-3 text-white rounded-lg bg-violet-500"
              type="submit"
            >
              Create an Account
            </button>
            <Link
              to="/hotel/signin"
              className="mt-3 text-gray-500 w-full text-left"
            >
              Already have an account?{" "}
              <span className="hover:underline text-violet-500">Sign In</span>
            </Link>
          </form>
          <GoogleAuth type={"hotel"} />
        </div>
      </div>
    </div>
  );
}
