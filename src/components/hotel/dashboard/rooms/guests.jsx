import React, { useState } from "react";
import TableHeader from "./tableHeader";
import { toast } from "react-toastify";
import { useUser } from "../../../../config/firebase";
import { db } from "../../../../config/firebase";
import { updateDoc, doc } from "firebase/firestore";

export default function Guests({ bookings }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date();
  const { userData, user } = useUser();
  const [bookingData, setBookingData] = useState(bookings);

  const checkedInBookings = bookingData?.filter(
    (booking) => booking.status === "checkedIn"
  );

  const sortedBookings = checkedInBookings?.sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);

    return dateA - dateB;
  });

  const filteredBookings = sortedBookings?.filter((booking) =>
    booking.userName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckOut = async (booking) => {
    setIsLoading(true);
    try {
      let status = "checkedOut";
      if (today < new Date(booking.endDate)) {
        status = "earlyCheckOut";
      }

      const roomsObject = userData?.roomsArray || {};
      const updatedRoomsObject = { ...roomsObject };

      booking.assignedRooms.forEach((roomNumber) => {
        const roomKey = roomNumber - 1;
        if (updatedRoomsObject[roomKey]) {
          updatedRoomsObject[roomKey] = ["Free", "Used"];
        }
      });

      await updateDoc(doc(db, "bookings", booking.id), {
        status: status,
        assignedRooms: [],
      });

      await updateDoc(doc(db, "hotels", user.uid), {
        roomsArray: updatedRoomsObject,
        freeRooms: userData.freeRooms + booking.rooms,
      });

      setBookingData((prevData) =>
        prevData.map((b) =>
          b.id === booking.id
            ? { ...b, status: "checkedOut", assignedRooms: [] }
            : b
        )
      );

      toast.success("Check-out successful!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to check out. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full text-left">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Manage Guests</h1>
        <input
          type="text"
          placeholder="Search by name..."
          className="border-2 rounded-md p-2 text-md outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="rounded-md my-5 border">
        {filteredBookings && filteredBookings.length > 0 ? (
          <table className="w-full">
            <TableHeader
              headers={[
                // "ID",
                "Name",
                "Check In Date",
                "Check Out Date",
                "Room No",
                "Booking Date",
                "Amount Paid",
                "Actions/Status",
              ]}
            />
            <tbody>
              {filteredBookings.map((booking) => (
                <tr className="border-b" key={booking.id}>
                  {/* <td className="py-2 px-4 text-left">{booking.id}</td> */}
                  <td className="py-2 px-4 text-left">{booking.userName}</td>
                  <td className="py-2 px-4 text-left">
                    {new Date(booking.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 text-left">
                    {new Date(booking.endDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 text-left">
                    {booking.assignedRooms.join(",")}
                  </td>
                  <td className="py-2 px-4 text-left">{booking.bookingDate}</td>
                  <td className="py-2 px-4 text-left">₹ {booking.price}</td>
                  <td className="py-2 px-4 text-left flex justify-between">
                    {booking.status === "checkedIn" && (
                      <button
                        className={`${
                          isLoading ? "cursor-not-allowed" : ""
                        } bg-blue-500 text-white p-2 mr-2 rounded-md w-full`}
                        onClick={() => handleCheckOut(booking)}
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
                          "Check Out"
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
            {searchQuery
              ? "No matching guests found"
              : "No checked-in guests found"}
          </p>
        )}
      </div>
    </div>
  );
}
