import React, { useState, useEffect } from "react";
import DashboardOverviewBox from "./dashboardOverviewBox";

export default function DashboardOverview({ userData, bookings }) {
  const [todaysBookings, setTodaysBookings] = useState(0);
  const [todaysCheckIn, setTodaysCheckIn] = useState(0);
  const [todaysCheckOut, setTodaysCheckOut] = useState(0);
  const [todaysEarnings, setEarnings] = useState(0);

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

  useEffect(() => {
    if (bookings.length === 0) {
      return;
    }
    const todaysDate = new Date().toLocaleDateString();
    const count = bookings.filter(
      (booking) =>
        new Date(booking.startDate).toLocaleDateString() === todaysDate &&
        booking.status === "checkedIn"
    ).length;
    setTodaysCheckIn(count);
  }, [bookings]);

  // Calculate today's check-outs
  useEffect(() => {
    if (bookings.length === 0) {
      return;
    }
    const todaysDate = new Date().toLocaleDateString();
    const count = bookings.filter(
      (booking) =>
        new Date(booking.endDate).toLocaleDateString() === todaysDate &&
        booking.status === "checkedOut"
    ).length;
    setTodaysCheckOut(count);
  }, [bookings]);

  useEffect(() => {
    if (bookings.length === 0) {
      return;
    }
    const todaysDate = new Date().toLocaleDateString();
    const earnings = bookings.reduce((total, booking) => {
      if (booking.bookingDate === todaysDate) {
        return total + booking.price;
      }
      return total;
    }, 0);
    setEarnings(earnings);
  }, [bookings]);

  return (
    <div className="flex my-10 flex-col items-start text-lg p-4 rounded-lg shadow-[0_0_25px_-10px_rgba(0,0,0,0.3)]">
      <h1 className="font-semibold">Overview</h1>
      <div className="flex justify-evenly w-full my-2">
        <DashboardOverviewBox
          text1={"Today's"}
          text2={"Bookings"}
          text3={todaysBookings}
        />
        <DashboardOverviewBox
          text1={"Today's"}
          text2={"Check In's"}
          text3={todaysCheckIn}
        />
        <DashboardOverviewBox
          text1={"Today's"}
          text2={"Check Out's"}
          text3={todaysCheckOut}
        />
        <DashboardOverviewBox
          text1={"Today's"}
          text2={"Earnings"}
          text3={`₹ ${todaysEarnings.toFixed(2)}`}
        />
      </div>
    </div>
  );
}
