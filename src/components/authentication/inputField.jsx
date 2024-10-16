import React from "react";

export default function InputField({
  register,
  name,
  placeholder,
  type,
  error,
  validation,
}) {
  return (
    <div className="w-full mb-3">
      <input
        type={type}
        className="w-full p-3 border text-lg border-gray-300 rounded-md text-gray-700 outline-none"
        placeholder={placeholder}
        {...register(name, validation)}
      />
      {error && <p className="text-red-600 text-left mt-1">{error.message}</p>}
    </div>
  );
}
