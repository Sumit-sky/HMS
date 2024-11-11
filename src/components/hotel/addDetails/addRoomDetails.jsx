import React from "react";
import AddBasicDetailsInput from "./AddBasicDetailsInput";

export default function AddRoomDetails({ register, errors }) {
  return (
    <>
      <h1 className="w-full text-left text-xl mb-3">Room Details</h1>
      <div className="w-full flex flex-wrap justify-between">
        <AddBasicDetailsInput
          width={"w-[48%]"}
          label={"Number Of Rooms"}
          register={register}
          type={"text"}
          name={"numberOfRooms"}
          placeholder={"Total number of Rooms"}
          error={errors.numberOfRooms}
          validation={{
            required: "Number of Rooms is required",
            pattern: {
              value: /^[1-9]\d*$/,
              message: "Enter a number",
            },
          }}
        />
        <AddBasicDetailsInput
          width={"w-[48%]"}
          label={"Room Size"}
          register={register}
          type={"number"}
          name={"roomSize"}
          placeholder={"Room size in sqm"}
          error={errors.roomSize}
          validation={{
            required: "Room Size is required",
            pattern: {
              value: /^[1-9]\d*$/,
              message: "Enter a number",
            },
          }}
        />
        <AddBasicDetailsInput
          width={"w-[48%]"}
          label={"Max Persons/Room"}
          register={register}
          type={"number"}
          name={"maxPersons"}
          placeholder={"Maximum persons in allowed in one room"}
          error={errors.maxPersons}
          validation={{
            required: "Max Persons/Room is required",
            pattern: {
              value: /^[1-9]\d*$/,
              message: "Enter a number",
            },
          }}
        />
        <AddBasicDetailsInput
          width={"w-[48%]"}
          label={"Price/Room"}
          register={register}
          type={"number"}
          name={"bookingPrice"}
          placeholder={"Price of one room"}
          error={errors.bookingPrice}
          validation={{
            required: "Price/Room is required",
            pattern: {
              value: /^[1-9]\d*$/,
              message: "Enter a number",
            },
          }}
        />
      </div>
    </>
  );
}
