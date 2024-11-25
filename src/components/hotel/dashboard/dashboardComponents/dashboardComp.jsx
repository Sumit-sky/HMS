import React from "react";
import DashboardDisplayDate from "./dashboardDisplayDate";
import DashboardOverview from "./dashboardOverview";
import DashboardRooms from "./dashboardRooms";
import DashboardChart from "./dashboardChart";

export default function DashboardComp({ userData, bookings }) {
  return (
    <div className="w-full overflow-scroll h-[82vh] px-5">
      <DashboardDisplayDate userData={userData} />
      <DashboardOverview userData={userData} bookings={bookings} />
      <DashboardRooms userData={userData} />
      <DashboardChart bookings={bookings} />
    </div>
  );
}
