import React from "react";
import DashboardDisplayDate from "./dashboardDisplayDate";
import DashboardOverview from "./dashboardOverview";
import DashboardRooms from "./dashboardRooms";

export default function DashboardComp() {
  return (
    <>
      <DashboardDisplayDate />
      <DashboardOverview />
      <DashboardRooms />
    </>
  );
}
