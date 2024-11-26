import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import GoogleAuth from "../../authentication/googleAuth";
import SideBanner from "../../authentication/sideBanner";
import FormHeader from "../../authentication/formElements/formHeader";
import ErrorMessage from "../../authentication/formElements/formError";
import InputField from "../../authentication/formElements/inputField";
import FormFooter from "../../authentication/formElements/formFooter";
import FormButton from "../../authentication/formElements/formButton";
import FormRedirect from "../../authentication/formElements/formRedirect";
import { useUser } from "../../../config/firebase";

export default function HotelAuth() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { loading, isCustomer, isHotel, userData } = useUser();

  // Redirect user based on their role/status after authentication
  useEffect(() => {
    if (isCustomer) {
      navigate("/", { replace: true });
    } else if (isHotel) {
      const hotelDestination =
        userData?.photos?.length > 0
          ? "/hotel/dashboard/overview"
          : "/hotel/hotel-details";
      navigate(hotelDestination, { replace: true });
    }
  }, [isCustomer, isHotel, userData, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginEmailAndPassword = async (data) => {
    setIsLoading(true);
    setError(""); // Reset error state on new login attempt
    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError("Email not verified. Please check your inbox.");
      }
    } catch (error) {
      handleLoginError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginError = (error) => {
    switch (error.code) {
      case "auth/wrong-password":
        setError("Incorrect password. Please try again.");
        break;
      case "auth/user-not-found":
        setError("No user found with this email. Please sign up.");
        break;
      default:
        setError("Failed to sign in. Please try again.");
        break;
    }
  };

  // Loading indicator while user data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <SideBanner type={"hotelSignIn"} />
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-3">
        <div className="max-w-lg w-full">
          <form
            className="flex flex-col items-center"
            onSubmit={handleSubmit(loginEmailAndPassword)}
          >
            <FormHeader heading={"Sign In"} />
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
            <FormFooter type={"signin"} register={register} />
            <FormButton buttonText={"Sign In"} loading={isLoading} />
            <FormRedirect type={"signin"} path={"/hotel/signup"} />
          </form>
          <GoogleAuth type={"hotel"} />
        </div>
      </div>
    </div>
  );
}
