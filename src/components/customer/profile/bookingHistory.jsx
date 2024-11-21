import React, { useEffect, useState } from "react";
import { useUser } from "../../../config/firebase";
import { db } from "../../../config/firebase";
import { getDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function BookingHistory() {
  const { userData } = useUser();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userData?.bookingHistory || userData.bookingHistory.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        const bookingPromises = userData.bookingHistory.map(
          async (bookingId) => {
            const bookingDocRef = doc(db, "bookings", bookingId);
            const bookingDoc = await getDoc(bookingDocRef);
            if (bookingDoc.exists()) {
              return { id: bookingId, ...bookingDoc.data() };
            }
            return null;
          }
        );

        const fetchedBookings = await Promise.all(bookingPromises);
        setBookings(fetchedBookings.filter(Boolean));
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load booking history");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [userData]);

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
              className="w-full rounded-md p-3 bg-gray-50 flex justify-between shadow-md"
            >
              <div className="w-full flex flex-col text-gray-700">
                <p className="text-[#7C6A46] text-2xl font-semibold">
                  {booking.hotelName}
                </p>
                <div className="flex w-full justify-evenly p-3">
                  <p>
                    Check-in: {booking.startDate}, {booking.checkInTime} PM
                  </p>
                  <p>
                    Check-out: {booking.endDate}, {booking.checkOutTime} AM
                  </p>
                </div>

                <p>Contact : {booking.hotelContact}</p>
                <p>Email : {booking.hotelEmail}</p>
                <p>Address : {booking.hotelAddress}</p>
              </div>
              <img
                src={booking.hotelPhoto}
                alt=""
                className="w-[200px] rounded-md"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
