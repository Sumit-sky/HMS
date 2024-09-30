import React from "react";

export default function Content({ active }) {
  const renderContent = () => {
    switch (active) {
      case 0:
        return <div>Welcome to the Dashboard</div>;
      case 1:
        return <div>Front Desk Operations</div>;
      case 2:
        return <div>Guest Management</div>;
      case 3:
        return <div>Room Overview</div>;
      case 4:
        return <div>Deal Management</div>;
      case 5:
        return <div>Rate Management</div>;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <div className="text-xl text-white bg-gray-800 w-full min-h-screen p-6">
      {renderContent()}
    </div>
  );
}