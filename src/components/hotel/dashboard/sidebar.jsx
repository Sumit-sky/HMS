import React, { useState } from "react";
import SidebarButton from "./sideBarButton";
import IconDashboard from "../../../Assets/hotel_svgs/iconDashboard";
import IconFrontDesk from "../../../Assets/hotel_svgs/iconFrontDesk";
import IconDeals from "../../../Assets/hotel_svgs/iconDeals";
import IconGuest from "../../../Assets/hotel_svgs/iconGuest";
import IconRate from "../../../Assets/hotel_svgs/iconRate";
import IconRooms from "../../../Assets/hotel_svgs/iconRooms";

export default function HotelSidebar({ active, setActive }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="d-flex">
      {isSidebarVisible && (
        <div
          className="d-flex flex-column min-vh-100 px-1"
          style={{ width: "250px" }}
        >
          <SidebarButton
            index={0}
            active={active}
            setActive={setActive}
            icon={IconDashboard}
            label="Dashboard"
          />
          <SidebarButton
            index={1}
            active={active}
            setActive={setActive}
            icon={IconFrontDesk}
            label="Front Desk"
          />
          <SidebarButton
            index={2}
            active={active}
            setActive={setActive}
            icon={IconGuest}
            label="Guest"
          />
          <SidebarButton
            index={3}
            active={active}
            setActive={setActive}
            icon={IconRooms}
            label="Rooms"
          />
          <SidebarButton
            index={4}
            active={active}
            setActive={setActive}
            icon={IconDeals}
            label="Deals"
          />
          <SidebarButton
            index={5}
            active={active}
            setActive={setActive}
            icon={IconRate}
            label="Rate"
          />
        </div>
      )}
      <button
        onClick={toggleSidebar}
        style={{
          position: "absolute",
          left: isSidebarVisible ? "250px" : "0px",
          top: "76px",
        }}
        className="btn bg-body rounded-end-pill fs-5"
      >
        {isSidebarVisible ? "<" : ">"}
      </button>
    </div>
  );
}
