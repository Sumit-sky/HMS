import React from "react";
import hotel_booking from "../../../Assets/hotel_booking.png";

export default function HomeHotels() {
  // Array of hotel data
  const hotels = [
    {
      name: "The Royal Room",
      available: "Yes",
      price: 10000,
      image: hotel_booking,
    },
    {
      name: "The Deluxe Suite",
      available: "No",
      price: 15000,
      image: hotel_booking,
    },
    {
      name: "Ocean View Villa",
      available: "Yes",
      price: 20000,
      image: hotel_booking,
    },
    {
      name: "The Royal Room",
      available: "Yes",
      price: 10000,
      image: hotel_booking,
    },
    {
      name: "The Deluxe Suite",
      available: "No",
      price: 15000,
      image: hotel_booking,
    },
    {
      name: "Ocean View Villa",
      available: "Yes",
      price: 20000,
      image: hotel_booking,
    },
    // Add more hotels as needed
  ];

  return (
    <div className="w-full flex justify-center items-center ">
      <div
        id="AreaHotels"
        className="w-11/12 flex flex-wrap justify-between items-center text-[#7C6A46] my-10"
      >
        {hotels.map((hotel, index) => (
          <div
            key={index}
            className="w-[390px] h-[414px] hover:shadow-lg hover:cursor-pointer m-4"
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-[250px]"
            />
            <div className="flex justify-between p-2">
              <p className="text-xl font-semibold">{hotel.name}</p>
              <p>Available: {hotel.available}</p>
            </div>
            <p className="text-xl font-semibold w-full text-left p-2">
              Rs {hotel.price}
            </p>
            <hr className="border-[#7C6A46]" />
            <button className="bg-[#7C6A46] p-3 px-5 m-3 text-white float-end outline-none">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
