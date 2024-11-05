import React from "react";

export default function FormInput({
  register,
  label,
  name,
  placeholder,
  type,
  error,
  validation,
  disabled,
  display,
}) {
  return (
    <div
      className={`${
        display ? "hidden" : ""
      } w-[48%] mb-3 flex flex-col items-start justify-center`}
    >
      <label htmlFor="" className="my-1">
        {label}
      </label>
      <input
        type={type}
        className={`w-full p-3 border text-lg border-gray-300 text-gray-700 outline-none rounded-lg ${
          disabled ? "cursor-not-allowed" : ""
        }`}
        placeholder={placeholder}
        {...register(name, validation)}
        disabled={disabled}
      />
      {error && <p className="text-red-600 text-left mt-1">{error.message}</p>}
    </div>
  );
}
