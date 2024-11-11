import React from "react";
import AddBasicDetailsInput from "./AddBasicDetailsInput";
import AmenitiesInput from "./amenitiesInput";

export default function AddHotelDetails({ register, errors, amenitiesList }) {
  return (
    <>
      <h1 className="w-full text-left text-xl mb-3">Hotel Details</h1>
      <div className="w-full flex flex-wrap justify-between">
        <AddBasicDetailsInput
          width={"w-[48%]"}
          label={"Check-in Time"}
          register={register}
          type={"time"}
          name={"checkInTime"}
          placeholder={"Check-in Time"}
          error={errors.checkInTime}
          validation={{ required: "Check-in time is required" }}
        />
        <AddBasicDetailsInput
          width={"w-[48%]"}
          label={"Check-out Time"}
          register={register}
          type={"time"}
          name={"checkOutTime"}
          placeholder={"Check-out Time"}
          error={errors.checkOutTime}
          validation={{ required: "Check-out time is required" }}
        />
        <AddBasicDetailsInput
          width={"w-[48%]"}
          label={"Mobile Number"}
          register={register}
          type={"tel"}
          name={"mobileNumber"}
          placeholder={"Mobile number"}
          error={errors.mobileNumber}
          validation={{
            required: "Mobile Number is required",
            pattern: {
              value: /^[1-9]\d{9}$/,
              message: "Enter a valid 10-digit mobile number",
            },
          }}
        />
        <div className={`mb-3 w-full flex items-center justify-start`}>
          <label htmlFor="" className="text-lg text-left w-max">
            Are unmarried couples allowed ?
          </label>
          <input
            type="checkbox"
            name="unmarriedCouples"
            className="w-[50px] h-4 accent-[#1570EF]"
            {...register("unmarriedCouples")}
          />
        </div>
        <h1 className="w-full text-left text-xl mb-3">Amenities</h1>
        <div className="flex gap-4 flex-wrap">
          {amenitiesList.map((amenity) => (
            <AmenitiesInput
              key={amenity.name}
              label={amenity.label}
              name={amenity.name}
              register={register}
              icon={amenity.icon}
            />
          ))}
        </div>
      </div>
    </>
  );
}
