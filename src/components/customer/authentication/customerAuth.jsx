import React, { useState } from "react";
import { useForm } from "react-hook-form";
import customer_auth_img from "../../../Assets/customer_auth_img.png";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import GoogleAuth from "../../authentication/googleAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import logo from "../../../Assets/logo.png";
import { Link } from "react-router-dom";

const divStyle = {
  backgroundImage: `url(${customer_auth_img})`,
};

export default function CustomerAuth() {
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
      <div
        style={divStyle}
        className="hidden md:block w-1/2 bg-cover bg-center"
      ></div>
      <div className="flex flex-col justify-center items-center w-1/2 max-md:w-full p-3">
        <div className="w-full max-w-md">
          <form
            className="flex flex-col items-center"
            onSubmit={handleSubmit(loginEmailAndPassword)}
          >
            <div className="flex justify-between w-full items-center mb-3">
              <h1 className="text-2xl font-bold text-left">Sign In</h1>
              <Link to={"/"}>
                <img src={logo} alt="Logo" className="w-24 h-16" />
              </Link>
            </div>
            <p className="text-left mb-2 text-gray-500 w-full">
              Sign in to your account in seconds
            </p>
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full mt-2">
                {error}
              </div>
            )}
            <div className="w-full mb-3">
              <input
                type="email"
                className="w-full p-3 border text-lg border-gray-300 rounded-md text-gray-700 outline-none"
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
                <p className="text-red-600 text-left mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="w-full mb-3">
              <input
                type="password"
                className="w-full p-3 border text-lg border-gray-300 rounded-md text-gray-700 outline-none"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-600 text-left mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex justify-between items-center w-full mb-3">
              <div className="flex items-center h-max ">
                <input
                  type="checkbox"
                  id="keepMeSignedIn"
                  className="mr-2 h-4 w-4 accent-violet-500"
                />
                <label htmlFor="keepMeSignedIn" className="text-gray-700">
                  Remember Me
                </label>
              </div>
              <a href="#" className="text-violet-500 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-violet-500 text-white py-3 rounded-md"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : (
                "Log in"
              )}
            </button>
            <Link to="/signup" className="mt-3 text-gray-500  w-full text-left">
              Don't have an account?{" "}
              <span className="text-violet-500 hover:underline">Sign Up</span>
            </Link>
          </form>
          <GoogleAuth type={"customer"} />
        </div>
      </div>
    </div>
  );
}
