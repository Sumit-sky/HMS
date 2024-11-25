import React from "react";
import FormInput from "./FormInput";

export default function CreateBooking({
  register,
  errors,
  handleSubmit,
  isLoading,
  setShowModal,
}) {
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
  return (
    <div className="fixed h-[100vh] w-full bg-[rgba(0,0,0,0.5)] top-0 left-0 flex justify-center items-center">
      <div className="bg-white rounded-lg py-5 px-10 w-8/12 ">
        <h1 className="text-center font-semibold text-2xl mb-3">
          Create Booking
        </h1>
        <form
          action=""
          className="flex flex-wrap justify-between"
          onSubmit={handleSubmit}
        >
          <FormInput
            register={register}
            label={"Tenant Name"}
            placeholder={"Enter tenant name"}
            name={"userName"}
            error={errors.userName}
            type={"text"}
            validation={{
              required: "Tenant name is required",
            }}
          />
          <FormInput
            register={register}
            label={"Tenant Mobile"}
            placeholder={"Enter mobile number of tenant"}
            name={"userContact"}
            error={errors.userContact}
            type={"tel"}
            validation={{
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit mobile number",
              },
            }}
          />
          <FormInput
            register={register}
            label={"Tenant Email"}
            placeholder={"Enter email of tenant"}
            name={"userEmail"}
            error={errors.userEmail}
            type={"email"}
            validation={{
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid Email",
              },
            }}
          />
          <FormInput
            register={register}
            label={"Number of Guests"}
            name={"guests"}
            error={errors.guests}
            type={"number"}
            placeholder={"Enter number of guests"}
            validation={{
              required: "At least 1 guest is required",
              min: {
                value: 1,
                message: "Number of guests cannot be less than 1",
              },
            }}
          />
          <FormInput
            register={register}
            label={"From"}
            name={"startDate"}
            error={errors.startDate}
            type={"date"}
            validation={{
              required: "Start Date is required",
              validate: (value) => {
                const selectedDate = new Date(value);
                const todayDate = new Date();
                todayDate.setHours(0, 0, 0, 0);
                if (selectedDate < todayDate) {
                  return "Start Date cannot be in the past";
                }
                return true;
              },
            }}
          />
          <FormInput
            register={register}
            label={"To"}
            name={"endDate"}
            error={errors.endDate}
            type={"date"}
            validation={{
              required: "End Date is required",
              validate: (value) => {
                const selectedDate = new Date(value);
                if (selectedDate > oneMonthFromNow) {
                  return "Booking cannot be made more than one month in advance";
                }
                return true;
              },
            }}
          />
          <div className="flex w-full justify-between">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 w-[48%] text-white px-4 py-3 mt-3 rounded-md"
            >
              {isLoading ? (
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
                "Book Now"
              )}
            </button>
            <button
              className="bg-blue-500 w-[48%] text-white px-4 py-3 mt-3 rounded-md"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
