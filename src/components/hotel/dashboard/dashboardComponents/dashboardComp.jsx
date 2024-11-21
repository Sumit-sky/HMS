import React from "react";
import DashboardDisplayDate from "./dashboardDisplayDate";
import DashboardOverview from "./dashboardOverview";
import DashboardRooms from "./dashboardRooms";

export default function DashboardComp({ userData }) {
  return (
    <>
      <DashboardDisplayDate />
      <DashboardOverview userData={userData} />
      <DashboardRooms userData={userData} />
    </>
  );
}
