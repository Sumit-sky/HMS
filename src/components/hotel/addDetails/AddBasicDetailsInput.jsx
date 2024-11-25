import React from "react";

export default function AddBasicDetailsInput({
  register,
  label,
  name,
  placeholder,
  type,
  error,
  validation,
  value,
  width,
  disable,
}) {
  return (
    <div className={`${width} mb-3 flex flex-col items-start justify-center`}>
      <label htmlFor="" className="my-1 text-lg">
        {label}
      </label>
      <input
        type={type}
        className="w-full p-3 border text-lg border-gray-300 text-gray-700 outline-none rounded-lg"
        placeholder={placeholder}
        value={value}
        disabled={disable}
        {...register(name, validation)}
      />
      {error && <p className="text-red-600 text-left mt-1">{error.message}</p>}
    </div>
  );
}
