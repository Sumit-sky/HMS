import React from "react";
import DashboardComp from "./dashboardComponents/dashboardComp";
import { useUser } from "../../../config/firebase";

export default function Content({ active }) {
  const { userData } = useUser();
  console.log(userData);
  const renderContent = () => {
    switch (active) {
      case 0:
        return <DashboardComp userData={userData} />;
      case 1:
        return <div>Guest Management</div>;
      case 2:
        return <div>Room Overview</div>;
      case 3:
        return <div>Rate Management</div>;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <div className="text-xl text-gray-800 w-full min-h-screen p-6">
      {renderContent()}
    </div>
  );
}
