import React from "react";

export default function FormButton({ buttonText, loading, contactUs }) {
  return (
    <button
      type="submit"
      className={`${loading ? "cursor-not-allowed" : ""} w-full ${
        contactUs ? "bg-[#7C6A46]" : "bg-violet-500"
      } text-white py-3 rounded-md`}
      disabled={loading}
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
        buttonText
      )}
    </button>
  );
}
