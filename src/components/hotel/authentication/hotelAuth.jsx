import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import GoogleAuth from "../../authentication/googleAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import hotel_auth_img from "../../../Assets/hotel_auth_img.png";
import logo from "../../../Assets/logo.png";
import { Link } from "react-router-dom";

export default function HotelAuth() {
  const divStyle = {
    backgroundImage: `url(${hotel_auth_img})`,
  };

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginEmailAndPassword = async (data) => {
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
  };

  return (
    <div className="flex min-h-screen">
      {/* Left-side Image */}
      <div
        style={divStyle}
        className="hidden md:block w-1/2 h-screen bg-cover bg-center"
      >
        <h1 className="text-white text-start p-3 text-4xl">
          Welcome <span className="font-bold text-violet-500">BACK</span>
        </h1>
      </div>

      {/* Right-side Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-3">
        <div className="max-w-lg w-full">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-2xl text-left font-bold">Sign In</h1>
            <Link to={"/"}>
              <img src={logo} alt="StayPedia Logo" className="w-24 h-16" />
            </Link>
          </div>
          {error && (
            <div className="mb-4">
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit(loginEmailAndPassword)}>
            <div className="w-full mb-3">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 text-lg text-gray-700 border border-gray-300 rounded outline-none"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid Email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 text-lg text-gray-700 border border-gray-300 rounded outline-none"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center mb-4">
              <label className="flex items-center h-max">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 accent-violet-500"
                />
                Remember Me
              </label>
              <a href="#" className="text-violet-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-violet-500 text-white py-2 rounded-md transition duration-200"
            >
              Log in
            </button>

            <div className="text-left mt-4">
              <Link
                to="/hotel/signup"
                className="mt-3 text-gray-500 w-full text-left"
              >
                Don't have an account?{" "}
                <span className="text-violet-500 hover:underline">Sign Up</span>
              </Link>
            </div>
          </form>
          <GoogleAuth type={"hotel"} />
        </div>
      </div>
    </div>
  );
}
