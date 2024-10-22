import React from "react";
import hotels from "../../staticData";

export default function HomeHotels() {
  return (
    <div className="w-full flex justify-center items-center ">
      <div
        id="AreaHotels"
        className="w-11/12 flex flex-wrap justify-between items-center text-[#7C6A46] my-10"
      >
        {hotels.map((hotel, index) => (
          <div
            key={index}
            className="w-[390px] h-[414px] hover:shadow-[0_0_25px_-10px_rgba(0,0,0,0.3)]  hover:cursor-pointer m-4 rounded-lg transition-all ease-in-out duration-500"
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-[250px] rounded-lg"
            />
            <div className="flex justify-between p-2">
              <p className="text-xl font-semibold">{hotel.name}</p>
              <p>Available: {hotel.available}</p>
            </div>
            <p className="text-xl font-semibold w-full text-left p-2">
              Rs {hotel.price}
            </p>
            <hr className="border-[#7C6A46]" />
            <button className="bg-[#7C6A46] p-3 px-5 m-3 text-white float-end outline-none rounded-lg">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
