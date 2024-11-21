import React from "react";

export default function FormInput({
  register,
  name,
  type,
  error,
  validation,
  label,
}) {
  return (
    <div className="w-full mb-3">
      <label htmlFor="" className="text-xl">
        {label}
      </label>
      <input
        type={type}
        className="w-full p-3 border text-lg border-gray-300 rounded-md text-gray-700 outline-none"
        {...register(name, validation)}
      />
      {error && <p className="text-red-600 text-left mt-1">{error.message}</p>}
    </div>
  );
}
