import React from "react";

export default function ProfileButton({
  onClick,
  buttonText,
  className,
  type,
  loading,
}) {
  return (
    <button
      type={type}
      className={`${
        loading ? "cursor-not-allowed" : ""
      } ${className} md:w-5/12 bg-[#7C6A46] text-white py-3 rounded-md`}
      onClick={onClick}
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
