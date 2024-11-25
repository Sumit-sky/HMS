import React, { useState } from "react";
import TableHeader from "./tableHeader";
import { db } from "../../../../config/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useUser } from "../../../../config/firebase";

export default function Rooms() {
  const { user, userData } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const roomsArray = userData?.roomsArray || {};
  const rooms = Object.entries(roomsArray).map(
    ([key, [status, cleanliness]]) => ({
      roomNo: Number(key) + 1,
      status,
      cleanliness,
    })
  );

  const filteredRooms = rooms.filter((room) =>
    room.roomNo.toString().includes(searchQuery)
  );

  const handleRoomClean = async (roomNo) => {
    setIsLoading(true);
    try {
      const roomKey = roomNo - 1;
      const updatedRoomsArray = { ...roomsArray };

      if (updatedRoomsArray[roomKey]) {
        updatedRoomsArray[roomKey][1] = "Clean";
      }
      await updateDoc(doc(db, "hotels", user.uid), {
        roomsArray: updatedRoomsArray,
      });
      console.log("Working");

      userData.roomsArray = updatedRoomsArray;
      toast.success(`Room ${roomNo} has been marked as clean!`);
    } catch (error) {
      console.error("Error cleaning room:", error);
      toast.error("Failed to update room cleanliness. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full text-left">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Manage Rooms</h1>
        <input
          type="text"
          placeholder="Search by room no..."
          className="border-2 rounded-md p-2 text-md outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="rounded-md my-5 border">
        {filteredRooms && filteredRooms.length > 0 ? (
          <table className="w-full">
            <TableHeader
              headers={["Room No", "Status", "Cleanliness", "Actions"]}
            />
            <tbody>
              {filteredRooms.map((room) => (
                <tr className="border-b" key={room.roomNo}>
                  <td className="py-2 px-4 text-left">{room.roomNo}</td>
                  <td className={`py-2 px-4 text-left`}>
                    <span
                      className={`${
                        room.status === "Free"
                          ? "bg-[rgb(74,134,79)]"
                          : "bg-blue-500"
                      }  p-1 px-3 rounded-md text-white w-full`}
                    >
                      {room.status === "Free" ? "Available" : "Booked"}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-left">
                    <span
                      className={`${
                        room.cleanliness === "Used" ? "bg-red-500" : ""
                      } ${room.cleanliness === "Clean" ? "bg-green-500" : ""} ${
                        room.cleanliness === "Booked" ? "bg-blue-500" : ""
                      } p-1 px-3 rounded-md text-white w-full`}
                    >
                      {room.cleanliness === "Used" && "Dirty"}
                      {room.cleanliness === "Booked" && "Booked"}
                      {room.cleanliness === "Clean" && "Clean"}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-left flex justify-between">
                    {room.cleanliness === "Used" && (
                      <button
                        className={`${
                          isLoading ? "cursor-not-allowed" : ""
                        } bg-blue-500 text-white p-2 mr-2 rounded-md w-max`}
                        onClick={() => handleRoomClean(room.roomNo)}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <svg
                            className="animate-spin h-5 w-5 mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                          </svg>
                        ) : (
                          "Cleaned ?"
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-5 text-gray-500 text-center">
            {searchQuery ? "No matching rooms found" : "No rooms found"}
          </p>
        )}
      </div>
    </div>
  );
}
