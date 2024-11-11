import React from "react";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBell } from "@fortawesome/free-regular-svg-icons";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../Assets/logo.png";
import AccSection from "../layout/accSection";

export default function HotelNavbar() {
  return (
    <nav className="w-full p-4 shadow-md bg-white">
      <div className="mx-auto flex items-center justify-between">
        <div className="flex items-center w-1/2">
          <Link to={"/hotel/home"} className="flex items-center">
            <img src={logo} alt="StayPedia Logo" className="w-20 h-14" />
          </Link>

          {/* <div className="flex flex-grow mx-4">
            <form className="w-full">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    size="lg"
                    className="text-gray-500"
                  />
                </span>
                <input
                  type="text"
                  placeholder="Search for rooms and offers"
                  className="pl-10 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
            </form>
          </div> */}
        </div>

        <div className="flex items-center space-x-6">
          {/* <FontAwesomeIcon icon={faBell} size="lg" className="text-gray-700" /> */}
          <AccSection />
        </div>
      </div>
    </nav>
  );
}
