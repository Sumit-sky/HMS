import React, { useState, useEffect } from "react";

export default function DashboardDisplayDate() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getFormattedDate = () => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return currentDate.toLocaleDateString("en-US", options);
  };
  return (
    <div className="flex justify-between items-center text-lg p-4 rounded-lg shadow-[0_0_25px_-10px_rgba(0,0,0,0.3)]">
      {getFormattedDate()}
      <button className="bg-[#1570EF] text-white p-2 px-4 rounded-lg text-md">
        Create Booking
      </button>
    </div>
  );
}
