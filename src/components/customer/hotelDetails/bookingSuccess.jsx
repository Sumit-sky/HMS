import React from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import successAnimation from "../../../Assets/Animation - 1732599114776.json";

export default function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="w-[300px] md:w-[400px]">
        <Player
          autoplay
          loop={true}
          src={successAnimation}
          style={{ height: "300px", width: "300px" }}
        />
      </div>
      <h1 className="text-2xl font-semibold text-gray-800 mt-4">
        Booking Confirmed!
      </h1>
      <p className="text-gray-600 mt-2">
        Your booking was successful. Thank you for choosing us!
      </p>
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-[#7C6A46] text-white rounded-md "
        >
          Home
        </button>
        <button
          onClick={() => navigate("/profile/booking-history")}
          className="px-6 py-2 bg-[#7C6A46] text-white rounded-md"
        >
          Booking History
        </button>
      </div>
    </div>
  );
}
