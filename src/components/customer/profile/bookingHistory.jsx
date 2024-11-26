import React, { useEffect, useState } from "react";
import { useUser } from "../../../config/firebase";
import { db } from "../../../config/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function BookingHistory() {
  const { userData } = useUser();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingBookingId, setLoadingBookingId] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userData?.bookingHistory || userData.bookingHistory.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        const bookingPromises = userData.bookingHistory.map(async (bookingId) => {
          const bookingDocRef = doc(db, "bookings", bookingId);
          const bookingDoc = await getDoc(bookingDocRef);
          if (bookingDoc.exists()) {
            return { id: bookingId, ...bookingDoc.data() };
          }
          return null;
        });

        const fetchedBookings = await Promise.all(bookingPromises);

        // Status priority map
        const statusPriority = {
          booked: 1,
          checkedIn: 2,
          checkedOut: 3,
          earlyCheckOut: 4,
          cancelled: 5,
        };

        // Sort bookings by check-in date and status priority
        const sortedBookings = fetchedBookings
          .filter(Boolean)
          .sort((a, b) => {
            const dateA = new Date(a.startDate);
            const dateB = new Date(b.startDate);

            if (dateA.getTime() !== dateB.getTime()) {
              return dateA - dateB; // Earlier dates first
            }

            return statusPriority[a.status] - statusPriority[b.status]; // Higher priority first
          });

        setBookings(sortedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load booking history");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [userData]);

  const handleBookingCancel = async (booking) => {
    setLoadingBookingId(booking.id);
    try {
      await updateDoc(doc(db, "bookings", booking.id), {
        status: "cancelled",
      });

      toast.success("Booking Cancelled");
      setBookings((prevBookings) =>
        prevBookings.map((b) =>
          b.id === booking.id ? { ...b, status: "cancelled" } : b
        )
      );
    } catch (error) {
      toast.error("Something went wrong, Try again!");
    } finally {
      setLoadingBookingId(null);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-xl w-full text-left mb-3">Booking History</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">No bookings available.</p>
      ) : (
        <div className="w-full text-left">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="w-full mb-2 rounded-md p-3 bg-gray-50 flex justify-between shadow-md hover:shadow-2xl transition-all ease-in-out duration-100"
            >
              <div className="w-full flex flex-col text-gray-700">
                <p className="text-[#7C6A46] text-2xl font-semibold">
                  {booking.hotelName}
                </p>
                <div className="flex w-full justify-evenly p-3">
                  <p>Rooms Booked: {booking.rooms}</p>
                  <p>
                    Check-in: {new Date(booking.startDate).toLocaleDateString()},
                    {booking.checkInTime} PM
                  </p>
                  <p>
                    Check-out: {new Date(booking.endDate).toLocaleDateString()},
                    {booking.checkOutTime} AM
                  </p>
                </div>
                <p>Status: {booking.status}</p>
                <p>Contact : {booking.hotelContact}</p>
                <p>Email : {booking.hotelEmail}</p>
                <p>Address : {booking.hotelAddress}</p>
                {booking.status === "booked" && (
                  <button
                    className="p-2 px-4 bg-red-500 my-3 text-white w-[150px]"
                    onClick={() => handleBookingCancel(booking)}
                    disabled={loadingBookingId === booking.id}
                  >
                    {loadingBookingId === booking.id ? (
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
                      "Cancel Booking"
                    )}
                  </button>
                )}
              </div>
              <img
                src={booking.hotelPhoto}
                alt="Hotel Preview"
                className="w-[200px] rounded-md"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}