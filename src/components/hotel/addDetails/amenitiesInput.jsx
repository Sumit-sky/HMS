import React from "react";

export default function AmenitiesInput({ label, icon, name, register }) {
  return (
    <div className={`w-max mb-3 flex items-center justify-start`}>
      <input
        type="checkbox"
        className="h-4 w-4 accent-[#1570EF]"
        {...register(name)}
      />
      <label htmlFor="" className="text-lg flex mx-3 items-center">
        <p className="mr-2">{label}</p>
        {icon}
      </label>
    </div>
  );
}
