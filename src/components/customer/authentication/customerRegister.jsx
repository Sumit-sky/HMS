import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { auth, db } from "../../../config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import customer_auth_img from "../../../Assets/customer_auth_img.png";
import GoogleAuth from "../../authentication/googleAuth";
import logo from "../../../Assets/logo.png";

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

  const divStyle = {
    backgroundImage: `url(${customer_auth_img})`,
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
            navigate("/login");
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
      <div style={divStyle} className="hidden md:block w-1/2 bg-cover bg-center"></div>
      <div className="flex flex-col justify-center items-center w-1/2 max-md:w-full p-3">
        <div className="w-full max-w-lg">
          <form
            className="flex flex-col items-center"
            onSubmit={handleSubmit(signUp)}
          >
            <div className="flex justify-between w-full items-center mb-3">
              <h1 className="text-2xl font-bold text-left">Sign Up</h1>
              <Link to={"/"}>
                <img src={logo} alt="Logo" className="w-24 h-16" />
              </Link>
            </div>
            <p className="text-left my-2 text-gray-500 w-full">
              Create your account in seconds
            </p>
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 w-full mt-2">
                {error}
              </div>
            )}
            {msg && (
              <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-2 w-full mt-2">
                {msg}
              </div>
            )}
            <div className="w-full mb-3">
              <input
                type="text"
                className="w-full p-3 border text-lg border-gray-300 rounded-lg text-gray-700 outline-none"
                placeholder="First Name"
                {...register("firstName", {
                  required: "First Name is required",
                })}
              />
              {errors.firstName && (
                <p className="text-red-600 text-left mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="w-full mb-3">
              <input
                type="text"
                className="w-full p-3 border text-lg border-gray-300 rounded-md text-gray-700 outline-none"
                placeholder="Last Name"
                {...register("lastName", {
                  required: "Last Name is required",
                })}
              />
              {errors.lastName && (
                <p className="text-red-600 text-left mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
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
                className="w-full p-3 border border-gray-300 text-lg rounded-md text-gray-700 outline-none"
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
                <p className="text-red-600 text-left mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col items-start w-full mb-3">
              <div className="flex items-center h-max">
                <input
                  type="checkbox"
                  id="termsAndCondition"
                  className="mr-2 h-4 w-4 accent-violet-500"
                  {...register("termsAndCondition", {
                    required: "You must agree to the terms and privacy policy",
                  })}
                />
                <label htmlFor="termsAndCondition" className="text-gray-700">
                  I agree to the terms and privacy policy
                </label>
              </div>
              {errors.termsAndCondition && (
                <p className="text-red-600 text-left mt-1">
                  {errors.termsAndCondition.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-violet-500 text-white py-3 rounded-md"
            >
              Create an Account
            </button>
            <Link to="/signin" className="mt-3 text-gray-500 w-full text-left">
              Already a member?{" "}
              <span className="text-violet-500 hover:underline">Sign In</span>
            </Link>
          </form>
          <GoogleAuth type={"customer"} />
        </div>
      </div>
    </div>
  );
}
