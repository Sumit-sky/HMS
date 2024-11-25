import React, { useState, useEffect } from "react";
import HotelNavbar from "../../components/hotel/dashboard/navbar";
import HotelSidebar from "../../components/hotel/dashboard/sidebar";
import Content from "../../components/hotel/dashboard/content";
import { useUser } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

export default function HotelDashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const { isHotel, userData } = useUser();

  // Redirect user based on their role/status after authentication
  useEffect(() => {
    if (isHotel) {
      const hotelDestination =
        userData?.photos?.length > 0
          ? "/hotel/dashboard"
          : "/hotel/hotel-details";
      navigate(hotelDestination, { replace: true });
    }
  }, [isHotel, userData, navigate]);
  return (
    <>
      <HotelNavbar />
      <div className="flex w-full">
        <HotelSidebar active={active} setActive={setActive} />
        <Content active={active} />
      </div>
    </>
  );
}
