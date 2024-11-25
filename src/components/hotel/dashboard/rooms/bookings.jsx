import React, { useState } from "react";
import TableHeader from "./tableHeader";
import { useUser } from "../../../../config/firebase";
import { db } from "../../../../config/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Bookings({ bookings }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState(bookings);
  const { userData, user } = useUser();
  const today = new Date();

  const statusPriority = {
    checkedIn: 2,
    booked: 1,
    checkedOut: 3,
    earlyCheckOut: 4,
  };

  const sortedBookings = bookingData?.sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);

    const statusComparison =
      statusPriority[a.status] - statusPriority[b.status];
    if (statusComparison !== 0) {
      return statusComparison;
    }

    return dateA - dateB;
  });

  const filteredBookings = sortedBookings?.filter((booking) =>
    booking.userName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckIn = async (booking) => {
    const verified = window.confirm("Documents Verified ?");
    if (!verified) {
      return;
    }
    setIsLoading(true);
    try {
      const roomsRequested = booking.rooms;

      const roomsObject = userData?.roomsArray || {};
      const roomsEntries = Object.entries(roomsObject);
      const availableRooms = roomsEntries.filter(
        ([key, [status, cleanliness]]) =>
          status === "Free" && cleanliness === "Clean"
      );

      if (availableRooms.length < roomsRequested) {
        toast.info("Not enough free and clean rooms available.");
        return;
      }

      const assignedRooms = [];
      const updatedRoomsObject = { ...roomsObject };
      availableRooms.forEach(([key], index) => {
        if (index < roomsRequested) {
          assignedRooms.push(Number(key) + 1);
          updatedRoomsObject[key] = ["Booked", "Booked"];
        }
      });

      await updateDoc(doc(db, "bookings", booking.id), {
        status: "checkedIn",
        assignedRooms: assignedRooms,
      });

      await updateDoc(doc(db, "hotels", user.uid), {
        roomsArray: updatedRoomsObject,
        freeRooms: userData.freeRooms - roomsRequested,
      });

      setBookingData((prevData) =>
        prevData.map((b) =>
          b.id === booking.id ? { ...b, status: "checkedIn", assignedRooms } : b
        )
      );

      toast.success(`Assigned rooms: ${assignedRooms.join(", ")}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to check in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full text-left">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Manage Bookings</h1>
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
                "Booking Date",
                "Name",
                "No of Guests",
                "Rooms Booked",
                "Check In Date",
                "Check Out Date",
                "Actions/Status",
              ]}
            />
            <tbody>
              {filteredBookings.map((booking) => (
                <tr className="border-b" key={booking.id}>
                  <td className="py-2 px-4 text-left">{booking.bookingDate}</td>
                  <td className="py-2 px-4 text-left">{booking.userName}</td>
                  <td className="py-2 px-4 text-left">{booking.guests}</td>
                  <td className="py-2 px-4 text-left">{booking.rooms}</td>
                  <td className="py-2 px-4 text-left">
                    {new Date(booking.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 text-left">
                    {new Date(booking.endDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 text-left flex justify-between">
                    {booking.status === "booked" &&
                      today <= new Date(booking.startDate) && (
                        <p
                          className={`font-semibold p-2 mr-2 rounded-md w-max`}
                        >
                          Booked
                        </p>
                      )}
                    {booking.status === "checkedIn" && (
                      <p className={`font-semibold p-2 mr-2 rounded-md w-max`}>
                        Checked In
                      </p>
                    )}
                    {booking.status === "booked" &&
                      today >= new Date(booking.startDate) && (
                        <button
                          className={`${
                            isLoading ? "cursor-not-allowed" : ""
                          } bg-blue-500 text-white p-2 mr-2 rounded-md w-full`}
                          onClick={() => handleCheckIn(booking)}
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
                            "Check In"
                          )}
                        </button>
                      )}

                    {booking.status === "checkedOut" && (
                      <p className={`font-semibold p-2 mr-2 rounded-md w-max`}>
                        Checked Out
                      </p>
                    )}
                    {booking.status === "earlyCheckOut" && (
                      <p className={`font-semibold p-2 mr-2 rounded-md w-max`}>
                        Early Checkout
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-5 text-gray-500 text-center">
            {searchQuery ? "No matching bookings found" : "No bookings found"}
          </p>
        )}
      </div>
    </div>
  );
}
