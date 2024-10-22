import React, { useState, useEffect } from "react";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SideBanner from "./sideBanner";
import FormHeader from "./formElements/formHeader";
import ErrorMessage from "./formElements/formError";
import InputField from "./formElements/inputField";
import FormButton from "./formElements/formButton";
import { auth } from "../../config/firebase";
import FormMessage from "./formElements/formMessage";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  //   const [validCode, setValidCode] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const verifyCode = async () => {
      const query = new URLSearchParams(location.search);
      const oobCode = query.get("oobCode");

      if (!oobCode) {
        setError("Invalid password reset link. Please request a new one.");
        return;
      }

      try {
        // Verify the reset code is valid
        await verifyPasswordResetCode(auth, oobCode);
        // setValidCode(true);
      } catch (error) {
        // console.error("Code verification error:", error);
        if (error.code === "auth/invalid-action-code") {
          setError(
            "This password reset link has expired or already been used. Please request a new one."
          );
        } else {
          setError("Invalid password reset link. Please request a new one.");
        }
      }
    };
    verifyCode();
  }, [location]);

  const resetPassword = async (data) => {
    setLoading(true);
    setError("");
    setMsg("");
    try {
      const query = new URLSearchParams(location.search);
      const oobCode = query.get("oobCode");
      if (!oobCode) {
        setError("Missing reset code");
      }
      await confirmPasswordReset(auth, oobCode, data.password);
      setValue("password", "");
      setValue("confirmPassword", "");
      setMsg("Password changed successfully! Redirecting to sign in...");
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      if (error.code === "auth/weak-password") {
        setError("Please choose a stronger password.");
      } else if (error.code === "auth/invalid-action-code") {
        setError("This reset link has expired. Please request a new one.");
      } else if (error.code === "auth/expired-action-code") {
        setError("This reset link has expired. Please request a new one.");
      } else {
        setError(
          "Failed to reset password. Please try again or request a new reset link."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <SideBanner type={"customer"} />
      <div className="flex flex-col justify-center items-center w-1/2 max-md:w-full p-3">
        <div className="w-full max-w-md">
          <form
            className="flex flex-col items-center mb-3"
            onSubmit={handleSubmit(resetPassword)}
          >
            <FormHeader heading={"Reset Password"} />
            {error && <ErrorMessage message={error} />}
            {msg && <FormMessage msg={msg} />}
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
                // pattern: {
                //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                //   message:
                //     "Password must contain at least one letter and one number",
                // },
              }}
            />
            <InputField
              register={register}
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              error={errors.confirmPassword}
              validation={{
                required: "Confirm Password is required",
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || "Passwords do not match";
                },
              }}
            />
            <FormButton buttonText={"Reset Password"} loading={loading} />
          </form>
          <Link to={"/signin"} className="text-violet-500 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
