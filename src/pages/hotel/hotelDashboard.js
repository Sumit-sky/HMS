import React, { useState, useEffect } from "react";
import HotelNavbar from "../../components/hotel/dashboard/navbar";
import HotelSidebar from "../../components/hotel/dashboard/sidebar";
import Content from "../../components/hotel/dashboard/content";
import { useUser } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function HotelDashboard() {
  const navigate = useNavigate();
  const { section } = useParams();
  const { isHotel, userData } = useUser();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (section === 'overview') setActive(0);
    if (section === 'bookings') setActive(1);
    if (section === 'guests') setActive(2);
    if (section === 'rooms') setActive(3);
  }, [section]);

  useEffect(() => {
    if (isHotel && userData) {
      const hotelDestination =
        userData.photos?.length > 0
          ? `/hotel/dashboard/${section}`
          : "/hotel/hotel-details";
      if (window.location.pathname !== hotelDestination) {
        navigate(hotelDestination, { replace: true });
      }
    }
  }, [isHotel, userData, navigate]);

  return (
    <>
      <HotelNavbar />
      <div className="flex w-full">
        <HotelSidebar active={active} />
        <Content active={active} />
      </div>
    </>
  );
}
