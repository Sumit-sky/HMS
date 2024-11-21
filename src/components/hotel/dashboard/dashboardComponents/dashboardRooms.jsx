import React from "react";

export default function DashboardRooms({ userData }) {
  return (
    <div className="flex my-10 flex-col  items-start text-lg p-4 rounded-lg shadow-[0_0_25px_-10px_rgba(0,0,0,0.3)]">
      <h1 className="font-semibold">Rooms</h1>
      <div className="border-2 py-2 px-5 rounded-lg text-lg my-3">
        <p>Standard Room</p>
        <p className="w-full text-left">
          <span className="text-2xl font-bold">
            {userData.numberOfRooms - userData.freeRooms}
          </span>
          /{userData.numberOfRooms}
        </p>
        <p className="w-full text-left">
          <span className="text-2xl font-semibold text-[#1366D9]">
            ₹ {userData.bookingPrice}
          </span>
          /day
        </p>
      </div>
    </div>
  );
}
