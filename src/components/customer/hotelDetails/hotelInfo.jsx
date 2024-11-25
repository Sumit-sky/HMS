import React from "react";
import { amenitiesList } from "../../staticData";
import { FaCheck } from "react-icons/fa";

export default function HotelInfo({ hotel }) {
  // console.log(hotel);
  return (
    <div className="flex flex-col w-8/12 text-left p-10">
      <div className="flex flex-col">
        <h1 className="text-4xl text-[#7C6A46] font-semibold">
          {hotel.hotelName}
        </h1>
        <p className="text-lg text-gray-400">
          {hotel.address}, {hotel.city}, {hotel.pinCode}
        </p>
      </div>
      <div className="py-10 w-full">
        <h1 className="text-2xl font-semibold">Amenities</h1>
        <div className="pt-5 w-full flex flex-wrap">
          {hotel.amenitiesArray
            .filter((amenity) => amenity.value) // Filter for amenities with value true
            .map((amenity) => {
              // Find the corresponding entry in amenitiesList
              const matchedAmenity = amenitiesList.find(
                (item) => item.name === amenity.key
              );
              return (
                matchedAmenity && ( // Only render if a match is found
                  <div
                    key={matchedAmenity.name}
                    className="flex items-center justify-center p-1 m-1 text-xl"
                    title={matchedAmenity.label} // Optional: Show the amenity label on hover
                  >
                    {matchedAmenity.icon}
                    <p className="ml-3">{matchedAmenity.label}</p>
                  </div>
                )
              );
            })}
        </div>
      </div>
      <div className="pb-5 w-full">
        <h1 className="text-2xl font-semibold">About {hotel.hotelName}</h1>
        <p className="text-lg text-justify py-3">{hotel.aboutHotel}</p>
      </div>
      <div className="pb-5 w-full" id="selectRoom">
        <h1 className="text-2xl font-semibold">Choose Your room</h1>
        <div className="flex w-full h-[200px] justify-between border p-3 mt-4 rounded-md">
          <div className=" flex flex-col h-full justify-between content-between">
            <h1 className="text-xl font-semibold">Standard</h1>
            <p className="text-lg mt-4">Room Size : {hotel.roomSize} sqm</p>
            <p className="font-bold text-xl">₹ {hotel.bookingPrice}</p>
            <button className="flex items-center border p-2 rounded-md cursor-not-allowed">
              <FaCheck className="text-green-500 mr-2" /> Selected
            </button>
          </div>
          <img src={hotel.photos[0]} className="w-[200px] rounded-lg" alt="" />
        </div>
      </div>
      <div className="pb-5 w-full">
        <h1 className="text-2xl font-semibold">Hotel Policies</h1>
        <div className="flex justify-around py-3 w-1/2">
          <p className="text-xl flex flex-col items-center">
            {" "}
            Check-in :{" "}
            <span className="font-semibold mt-2 border p-2 px-4 rounded-lg">
              {hotel.checkInTime}
            </span>
          </p>
          <p className="text-xl  flex flex-col items-center">
            Check-out :{" "}
            <span className="font-semibold mt-2 border p-2 px-4 rounded-lg">
              {" "}
              {hotel.checkOutTime}
            </span>
          </p>
        </div>
        <ul className="list-disc px-4 text-lg">
          {hotel.unmarriedCouples ? (
            <li>Couple are welcome</li>
          ) : (
            <li>Unmarried couples are not allowed</li>
          )}
          <li>
            Guests can check in using any local or outstation ID proof (PAN card
            not accepted).
          </li>
        </ul>
      </div>
      <div className="pb-5 w-full">
        <iframe
          width="100%"
          height="450"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_APIKEY} 
    &q=${hotel.address}, ${hotel.city}, ${hotel.pinCode}`}
        ></iframe>
      </div>
    </div>
  );
}
