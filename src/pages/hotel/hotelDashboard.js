import React, { useState } from "react";
import HotelNavbar from "../../components/hotel/dashboard/navbar";
import HotelSidebar from "../../components/hotel/dashboard/sidebar";
import Content from "../../components/hotel/dashboard/content";

export default function HotelDashboard() {
  const [active, setActive] = useState(0);
  return (
    <>
      <HotelNavbar />
      <div className="d-flex">
        <HotelSidebar active={active} setActive={setActive} />
        <Content active={active} />
      </div>
    </>
  );
}