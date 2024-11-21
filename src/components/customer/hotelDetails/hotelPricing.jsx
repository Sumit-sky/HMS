import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import { toast } from "react-toastify";
import { updateDoc, doc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { v4 as uuidv4 } from "uuid";

export default function HotelPricing({ hotel }) {
  const navigate = useNavigate();
  const { isCustomer, user, userData } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      startDate: today.toISOString().split("T")[0],
      endDate: tomorrow.toISOString().split("T")[0],
      guests: 1,
      rooms: 1,
    },
  });

  const bookRoom = async (data) => {
    if (data.startDate === data.endDate) {
      toast.error("Dates cannot be same");
      return;
    }
    if (!isCustomer) {
      navigate("/signin");
      return;
    }
    if (data.guests > hotel.maxPersons) {
      const rooms = Math.ceil(data.guests / hotel.maxPersons);
      if (rooms > hotel.freeRooms) {
        toast.error("Rooms not available");
        return;
      }
      data.rooms = rooms;
    }
    setIsLoading(true);
    try {
      const docId = uuidv4();
      await setDoc(doc(db, "bookings", docId), {
        ...data,
        bookingDate: new Date().getDate(),
        userId: user.uid,
        userName: userData.firstName + " " + userData.lastName,
        userContact: userData.phoneNumber,
        userEmail: userData.email,
        hotelId: hotel.id,
        hotelName: hotel.hotelName,
        hotelPhoto: hotel.photos[0],
        checkInTime: hotel.checkInTime,
        checkOutTime: hotel.checkOutTime,
        hotelContact: hotel.mobileNumber,
        hotelAddress: hotel.address + ", " + hotel.city + ", " + hotel.pinCode,
        hotelEmail: hotel.email,
      });

      await updateDoc(doc(db, "customers", user.uid), {
        bookingHistory: arrayUnion(docId),
      });
      await updateDoc(doc(db, "hotels", hotel.id), {
        bookings: arrayUnion(docId),
        freeRooms: hotel.freeRooms - data.rooms,
      });
      toast.success("Hotel booked successfully!");
      reset();
      navigate("/profile");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while booking");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-left py-10 w-4/12">
      <div className="w-full shadow-[0_0_25px_-10px_rgba(0,0,0,0.5)] p-5 rounded-md">
        <p className="font-bold text-2xl">₹{hotel.bookingPrice}/day</p>
        <p>Inclusive of all taxes</p>
        <form action="" className="mt-4" onSubmit={handleSubmit(bookRoom)}>
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
          <FormInput
            register={register}
            label={"Number of Guests"}
            name={"guests"}
            error={errors.guests}
            type={"number"}
            validation={{
              required: "At least 1 guest is required",
              min: {
                value: 1,
                message: "Number of guests cannot be less than 1",
              },
            }}
          />
          <p className="text-red-500">
            Note: <strong>Max {hotel.maxPersons} guests per room</strong>. Extra
            guests will increase the room count.
          </p>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 w-full text-white px-4 py-3 mt-3 rounded-md"
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
        </form>
      </div>
    </div>
  );
}
