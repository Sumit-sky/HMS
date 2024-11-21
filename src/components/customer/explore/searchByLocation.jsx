import React, { useRef, useState, useEffect } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import HomeHotels from "../home/homeHotels";
const libraries = ["places"];
export default function SearchByLocation() {
  const savedPinCode = localStorage.getItem("userPinCode");
  // console.log(savedPinCode);
  const [pinCode, setPinCode] = useState(savedPinCode);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_APIKEY,
    libraries,
  });

  const autocompleteRef = useRef(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .pac-container {
        background-color: #f5f5f5 !important;
        border-radius: 8px !important;
        z-index: 1050 !important;
      }
      .pac-item {
        padding:10px;
        font-size: 14px !important;
        color: #333 !important;
      }
      .pac-item:hover {
        background-color: #e0e0e0 !important;
      }
      .pac-item .pac-icon {
        display: none !important;
      }
      .pac-item-query {
        font-weight: bold !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style); // Clean up on unmount
    };
  }, []);

  // This function runs when a place is selected
  const onPlaceSelected = () => {
    const place = autocompleteRef.current.getPlace();
    const postalCodeComponent = place.address_components.find((component) =>
      component.types.includes("postal_code")
    );
    setPinCode(
      postalCodeComponent ? postalCodeComponent.long_name : "Pincode not found"
    );
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="w-10/12 p-10">
        <h1 className="text-2xl text-left">Search Hotels</h1>
        <div className="p-5">
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={onPlaceSelected}
            className="w-full"
          >
            <input
              type="text"
              className="border w-full outline-none p-3 rounded-lg"
              placeholder="Search by location..."
            />
          </Autocomplete>
          {/* <button
            type="button"
            className="bg-[#7C6A46] w-2/12 p-1 rounded-lg text-white"
          >
            Search
          </button> */}
        </div>
      </div>
      <HomeHotels
        pinCode={pinCode}
        isGeolocationEnabled={pinCode ? true : false}
      />
    </div>
  );
}
