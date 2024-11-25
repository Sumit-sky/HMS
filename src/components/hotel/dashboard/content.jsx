import React, { useState, useEffect } from "react";
import DashboardComp from "./dashboardComponents/dashboardComp";
import { useUser } from "../../../config/firebase";
import Guests from "./rooms/guests";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { toast } from "react-toastify";
import Bookings from "./rooms/bookings";
import Rooms from "./rooms/rooms";

export default function Content({ active }) {
  const { userData } = useUser();
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const fetchBookings = async () => {
      if (!userData?.bookings || userData.bookings.length === 0) {
        return;
      }

      try {
        const bookingPromises = userData.bookings.map(async (bookingId) => {
          const bookingDocRef = doc(db, "bookings", bookingId);
          const bookingDoc = await getDoc(bookingDocRef);
          if (bookingDoc.exists()) {
            return { id: bookingId, ...bookingDoc.data() };
          }
          return null;
        });

        const fetchedBookings = await Promise.all(bookingPromises);
        setBookings(fetchedBookings.filter(Boolean));
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load booking history");
      }
    };

    fetchBookings();
  }, [userData]);

  const renderContent = () => {
    switch (active) {
      case 0:
        return <DashboardComp userData={userData} bookings={bookings} />;
      case 1:
        return <Bookings bookings={bookings} />;
      case 2:
        return <Guests bookings={bookings} />;
      case 3:
        return <Rooms />;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <div className="text-xl text-gray-800 w-full p-6">{renderContent()}</div>
  );
}
