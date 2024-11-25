import React, { useState, useEffect } from "react";
import DashboardOverviewBox from "./dashboardOverviewBox";

export default function DashboardOverview({ userData,bookings }) {
  const [todaysBookings, setTodaysBookings] = useState(0);

  useEffect(() => {
    if (bookings.length === 0) {
      return;
    }
    const todaysDate = new Date().toLocaleDateString();
    const count = bookings.filter(
      (booking) => booking.bookingDate === todaysDate
    ).length;

    setTodaysBookings(count);
  }, [bookings]);

  return (
    <div className="flex my-10 flex-col items-start text-lg p-4 rounded-lg shadow-[0_0_25px_-10px_rgba(0,0,0,0.3)]">
      <h1 className="font-semibold">Overview</h1>
      <div className="flex justify-between w-full">
        <DashboardOverviewBox
          text1={"Total"}
          text2={"Rooms"}
          text3={userData.numberOfRooms}
        />
        <DashboardOverviewBox
          text1={"Today's"}
          text2={"Bookings"}
          text3={todaysBookings}
        />
        <DashboardOverviewBox
          text1={"Total"}
          text2={"Available Rooms"}
          text3={userData.freeRooms}
        />
        <DashboardOverviewBox
          text1={"Total"}
          text2={"Occupied Rooms"}
          text3={userData.numberOfRooms - userData.freeRooms}
        />
      </div>
    </div>
  );
}
