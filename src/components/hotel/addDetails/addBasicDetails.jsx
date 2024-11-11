import React from "react";
import AddBasicDetailsInput from "./AddBasicDetailsInput";

export default function AddBasicDetails({ register, errors }) {
  return (
    <>
      <h1 className="w-full text-left text-xl mb-3">Basic Details</h1>
      <div className="w-full flex flex-wrap justify-between">
        <AddBasicDetailsInput
          width={"w-full"}
          label={"About Hotel"}
          register={register}
          type={"text"}
          name={"aboutHotel"}
          placeholder={"Tell us about your hotel"}
          error={errors.aboutHotel}
          validation={{
            required: "Hotel Description is required",
          }}
        />
        <AddBasicDetailsInput
          width={"w-full"}
          label={"Address"}
          register={register}
          type={"text"}
          name={"address"}
          placeholder={"Enter the exact address of your hotel"}
          error={errors.address}
          validation={{
            required: "Address is required",
          }}
        />
        <AddBasicDetailsInput
          width={"w-[48%]"}
          label={"Landmark"}
          register={register}
          type={"text"}
          name={"landmark"}
          placeholder={"Enter hotel landmark"}
          error={errors.landmark}
          validation={{
            required: "Landmark is required",
          }}
        />
        <AddBasicDetailsInput
          width={"w-[48%]"}
          label={"Town"}
          register={register}
          type={"text"}
          name={"town"}
          placeholder={"Enter hotel town"}
          error={errors.town}
          validation={{
            required: "Town is required",
          }}
        />
        <AddBasicDetailsInput
          width={"w-[48%]"}
          label={"City"}
          register={register}
          type={"text"}
          name={"city"}
          placeholder={"Enter hotel city"}
          error={errors.city}
          validation={{
            required: "City is required",
          }}
        />
        <AddBasicDetailsInput
          width={"w-[48%]"}
          label={"PinCode"}
          register={register}
          type={"number"}
          name={"pinCode"}
          placeholder={"Enter area pincode"}
          error={errors.pinCode}
          validation={{
            required: "PinCode is required",
            pattern: {
              value: /^[1-9]\d{5}$/,
              message: "PinCode must be of 6-digits",
            },
          }}
        />
      </div>
    </>
  );
}
