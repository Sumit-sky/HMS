import React, { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import { amenitiesList } from "../../staticData";

export default function HomeHotels({
  pinCode,
  isGeolocationEnabled,
  gettingLocation,
}) {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const savedPinCode = localStorage.getItem("userPinCode");
  const navigate = useNavigate();

  useEffect(() => {
    if (pinCode) {
      const fetchHotels = async () => {
        setIsLoading(true);
        try {
          const hotelsRef = collection(db, "hotels");
          const q = query(hotelsRef, where("pinCode", "==", pinCode));
          const querySnapshot = await getDocs(q);
          const fetchedHotels = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setHotels(fetchedHotels);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchHotels();
    }
  }, [pinCode]);

  if (!isGeolocationEnabled) {
    return (
      <div className="p-10 w-full">
        <h1 className="w-full text-left text-3xl font-semibold">
          Hotels in Your Location
        </h1>
        <p className="text-xl">
          Enable location in browser to see hotels in your area
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center p-10">
      <h1 className="w-full text-left text-3xl font-semibold">
        {pinCode === savedPinCode
          ? `Hotels in Your Location`
          : `Search Results`}
      </h1>
      {isLoading || gettingLocation ? (
        <div className="w-full text-black flex justify-center items-center flex-col z-50">
          <svg
            className="animate-spin h-10 w-10 mx-auto"
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
          <p className="text-xl">
            {gettingLocation
              ? `Getting current location`
              : `Fetching near by hotels...`}
          </p>
        </div>
      ) : (
        <div
          id="AreaHotels"
          className="w-11/12 flex flex-wrap justify-start gap-10 items-center text-[#7C6A46] my-10"
        >
          {hotels.length > 0 ? (
            hotels
              .filter((hotel) => hotel.freeRooms > 0)
              .map((hotel) => (
                <div
                  key={hotel.id}
                  onClick={() =>
                    navigate("/detailed-hotel-info", { state: hotel })
                  }
                  className="w-[390px] bg-white border border-gray-200 h-[414px] hover:shadow-[0_0_25px_-10px_rgba(0,0,0,0.5)] hover:cursor-pointer m-4 rounded-lg transition-all ease-in-out duration-500"
                >
                  <Carousel
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    showIndicators={false}
                  >
                    {hotel.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={hotel.hotelName}
                        className="w-full h-[250px] rounded-lg"
                      />
                    ))}
                  </Carousel>
                  <div className="flex justify-between p-2">
                    <p className="text-xl font-semibold">{hotel.hotelName}</p>
                    <p>Available: {hotel.freeRooms > 0 ? "Yes" : "No"}</p>
                  </div>
                  <p className="text-xl font-semibold w-full text-left p-2">
                    Rs {hotel.bookingPrice}
                  </p>
                  <hr className="border-[#7C6A46]" />
                  <div className="flex justify-between">
                    <div className="flex">
                      {hotel.amenitiesArray
                        .filter((amenity) => amenity.value) // Filter for amenities with value true
                        .map((amenity) => {
                          // Find the corresponding entry in amenitiesList
                          const matchedAmenity = amenitiesList.find(
                            (item) => item.name === amenity.key
                          );
                          return (
                            matchedAmenity && ( // Only render if a match is found
                              <span
                                key={matchedAmenity.name}
                                className="flex items-center justify-center p-1 m-1"
                                title={matchedAmenity.label} // Optional: Show the amenity label on hover
                              >
                                {matchedAmenity.icon}
                              </span>
                            )
                          );
                        })}
                    </div>
                    <button className="bg-[#7C6A46] p-3 px-5 m-3 text-white float-end outline-none rounded-lg">
                      Book Now
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center">No hotels found in your location</div>
          )}
        </div>
      )}
    </div>
  );
}
