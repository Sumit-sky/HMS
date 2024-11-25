import React, { useState, useEffect } from "react";
import FormInput from "../../contactUs/formInput";
import { useForm } from "react-hook-form";
import { useUser } from "../../../config/firebase";
import { toast } from "react-toastify";
import { auth, db } from "../../../config/firebase";
import {
  sendPasswordResetEmail,
  updateEmail,
  sendEmailVerification,
} from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import ProfileButton from "./profileButton";

export default function SecurityInfo() {
  const { userData, user } = useUser();
  const [error, setError] = useState(null);
  const [disableFormInput, setDisableFormInput] = useState(true);
  const [resetPasswordEmailLoading, setResetPasswordEmailLoading] =
    useState(false);
  const [updateEmailLoading, setUpdateEmailLoading] = useState(false);
  const [emailUpdatePending, setEmailUpdatePending] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: userData.email,
    },
  });

  const forgotPasswordEmail = async () => {
    setResetPasswordEmailLoading(true);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, userData.email, {
        url: "http://localhost:3000/signin",
      });
      toast.success(
        "Please check your inbox, a password reset email has been sent!"
      );
    } catch (error) {
      handleError(error);
    } finally {
      setResetPasswordEmailLoading(false);
    }
  };

  const updateUserEmail = async (data) => {
    if (userData.email === data.email) {
      return;
    }

    setUpdateEmailLoading(true);
    setError(null);

    try {
      await updateEmail(auth.currentUser, data.email);
      await sendEmailVerification(auth.currentUser);
      setEmailUpdatePending(true);
      await updateDoc(doc(db, "customers", user.uid), {
        email: data.email,
      });
    } catch (error) {
      setDisableFormInput(false);
      handleError(error);
    } finally {
      setUpdateEmailLoading(false);
    }
  };

  const handleError = (error) => {
    if (error.code === "auth/requires-recent-login") {
      setError("Please log in again to update your email.");
    } else if (error.code === "auth/email-already-in-use") {
      setError("Email already in use");
    } else {
      console.error("Error:", error);
      setError("Failed to update email. Please try again.");
    }
  };

  useEffect(() => {
    if (emailUpdatePending) {
      const interval = setInterval(async () => {
        await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
          setEmailUpdatePending(false);
          setDisableFormInput(true);
          toast.success("Email verified successfully!");
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [emailUpdatePending]);

  return (
    <>
      <h1 className="text-xl w-full text-left mb-3">Security</h1>
      <form
        action=""
        onSubmit={handleSubmit(updateUserEmail)}
        className="flex flex-col"
      >
        <div className="flex flex-wrap justify-between">
          <FormInput
            width={"w-[48%]"}
            label={"Email"}
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
            disabled={disableFormInput}
          />
        </div>
        <div className="w-5/12 flex justify-between my-3">
          <ProfileButton
            type={"button"}
            className={disableFormInput ? "block" : "hidden"}
            buttonText={"Change Email"}
            onClick={() => setDisableFormInput(false)}
          />
          <ProfileButton
            type={"submit"}
            className={disableFormInput ? "hidden" : "block"}
            buttonText={"Update"}
            loading={updateEmailLoading}
          />
          <ProfileButton
            type={"button"}
            className={
              disableFormInput || updateEmailLoading ? "hidden" : "block"
            }
            buttonText={"Cancel"}
            onClick={() => setDisableFormInput(true)}
          />
        </div>
        <ProfileButton
          onClick={forgotPasswordEmail}
          type={"button"}
          loading={resetPasswordEmailLoading}
          buttonText={"Reset Password"}
        />
      </form>
      {emailUpdatePending && (
        <div className="w-full h-[100vh] absolute top-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,0.3)]">
          <div className="w-5/12 h-[300px] p-3 flex flex-col justify-center items-center bg-white rounded-lg">
            <svg
              className="animate-spin h-10 w-10 mx-auto my-3"
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
            <p className="text-lg">
              We have sent a verification email to{" "}
              <span className="font-semibold">{getValues("email")}</span>
              <br />
              Please check your inbox to continue.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
