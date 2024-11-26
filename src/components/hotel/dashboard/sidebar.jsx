import React, { useState } from "react";
import SidebarButton from "./sideBarButton";
import IconDashboard from "../../../Assets/hotel_svgs/iconDashboard";
// import IconFrontDesk from "../../../Assets/hotel_svgs/iconFrontDesk";
// import IconDeals from "../../../Assets/hotel_svgs/iconDeals";
import IconGuest from "../../../Assets/hotel_svgs/iconGuest";
import IconRate from "../../../Assets/hotel_svgs/iconRate";
import IconRooms from "../../../Assets/hotel_svgs/iconRooms";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function HotelSidebar({ active }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex">
      {isSidebarVisible && (
        <div className="flex flex-col h-[88vh] w-64 p-2 shadow-lg text-white">
          <SidebarButton
            index={0}
            active={active}
            path={"/hotel/dashboard/overview"}
            icon={IconDashboard}
            label="Dashboard"
          />
          <SidebarButton
            index={1}
            active={active}
            path={"/hotel/dashboard/bookings"}
            icon={IconGuest}
            label="Bookings"
          />
          <SidebarButton
            index={2}
            active={active}
            path={"/hotel/dashboard/guests"}
            icon={IconRooms}
            label="Guests"
          />
          <SidebarButton
            index={3}
            active={active}
            path={"/hotel/dashboard/rooms"}
            icon={IconRate}
            label="Rooms"
          />
        </div>
      )}
      <button
        onClick={toggleSidebar}
        className={`absolute transition-all duration-300 bg-white rounded-[100%] border w-8 h-8 flex justify-center items-center ${
          isSidebarVisible ? "left-60" : "left-0"
        } top-24`}
      >
        {isSidebarVisible ? <IoIosArrowBack /> : <IoIosArrowForward />}
      </button>
    </div>
  );
}
