import React from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "./formError";

export default function FormFooter({ type, register, errors }) {
  return type === "signin" ? (
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
      <Link to={"#"} className={` text-violet-500 hover:underline`}>
        Forgot Password?
      </Link>
    </div>
  ) : (
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
  );
}
