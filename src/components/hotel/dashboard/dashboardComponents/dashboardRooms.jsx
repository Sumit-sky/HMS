import React, { useEffect, useState } from "react";
import DashboardOverviewBox from "./dashboardOverviewBox";

export default function DashboardRooms({ userData }) {
  const [cleanedRooms, setCleanedRooms] = useState(0);
  const [dirtyRooms, setDirtyRooms] = useState(0);

  useEffect(() => {
    // If userData.roomsArray is available, calculate cleaned and dirty rooms
    if (userData?.roomsArray) {
      let cleaned = 0;
      let dirty = 0;

      // Iterate over the roomsArray to count cleaned and dirty rooms
      Object.entries(userData.roomsArray).forEach(([key, [status, cleanliness]]) => {
        if (cleanliness === "Clean") {
          cleaned += 1;
        } else if (cleanliness === "Used") {
          dirty += 1;
        }
      });

      // Set the states for cleaned and dirty rooms
      setCleanedRooms(cleaned);
      setDirtyRooms(dirty);
    }
  }, [userData]);

  return (
    <div className="flex my-10 flex-col items-start text-lg p-4 rounded-lg shadow-[0_0_25px_-10px_rgba(0,0,0,0.3)]">
      <h1 className="font-semibold">Rooms</h1>
      <div className="flex justify-between w-full my-2">
        <DashboardOverviewBox
          text1={"Total"}
          text2={"Rooms"}
          text3={userData.numberOfRooms}
        />
        <DashboardOverviewBox
          text1={"Total"}
          text2={"Available Rooms"}
          text3={userData.freeRooms}
        />
        <DashboardOverviewBox
          text1={"Total"}
          text2={"Occupied Rooms"}
          text3={userData.numberOfRooms - userData.freeRooms}
        />
        <DashboardOverviewBox
          text1={"Total"}
          text2={"Cleaned Rooms"}
          text3={cleanedRooms}
        />
        <DashboardOverviewBox
          text1={"Total"}
          text2={"Dirty Rooms"}
          text3={dirtyRooms}
        />
      </div>
    </div>
  );
}
