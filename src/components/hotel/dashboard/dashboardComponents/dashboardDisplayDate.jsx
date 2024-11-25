import React, { useState, useEffect } from "react";
import CreateBooking from "./createBooking";
import { useForm } from "react-hook-form";
import { updateDoc, doc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useUser } from "../../../../config/firebase";

export default function DashboardDisplayDate({ userData }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      startDate: today.toISOString().split("T")[0],
      endDate: tomorrow.toISOString().split("T")[0],
      guests: 1,
      rooms: 1,
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getFormattedDate = () => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return currentDate.toLocaleDateString("en-US", options);
  };

  const handleBooking = async (data) => {
    if (data.startDate >= data.endDate) {
      toast.error("Invalid Duration");
      return;
    }
    if (data.guests > userData.maxPersons) {
      const rooms = Math.ceil(data.guests / userData.maxPersons);
      if (rooms > userData.freeRooms) {
        toast.error("Rooms not available");
        return;
      }
      data.rooms = rooms;
    }
    setIsLoading(true);
    try {
      const docId = uuidv4();
      await setDoc(doc(db, "bookings", docId), {
        ...data,
        bookingDate: new Date().toLocaleDateString(),
        userName: data.userName,
        userContact: data.userContact,
        userEmail: data.userEmail,
        hotelId: user.uid,
        hotelName: userData.hotelName,
        hotelPhoto: userData.photos[0],
        checkInTime: userData.checkInTime,
        checkOutTime: userData.checkOutTime,
        hotelContact: userData.mobileNumber,
        hotelAddress:
          userData.address + ", " + userData.city + ", " + userData.pinCode,
        hotelEmail: userData.email,
        status: "booked",
        price: data.rooms * userData.bookingPrice,
      });

      await updateDoc(doc(db, "hotels", user.uid), {
        bookings: arrayUnion(docId),
      });

      toast.success("Booking successful!");
      setShowModal(false);
      reset();
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while booking");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center text-lg p-4 rounded-lg shadow-[0_0_25px_-10px_rgba(0,0,0,0.3)]">
      {getFormattedDate()}
      <button
        className="bg-[#1570EF] text-white p-2 px-4 rounded-lg text-md"
        onClick={() => setShowModal(true)}
      >
        Create Booking
      </button>
      {showModal && (
        <CreateBooking
          register={register}
          handleSubmit={handleSubmit(handleBooking)}
          errors={errors}
          isLoading={isLoading}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}
