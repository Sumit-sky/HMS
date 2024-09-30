import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../Assets/logo.png";

export default function HomeNavbar() {
  return (
    // md:px-20
    <nav className="bg-white w-full px-4 py-2 flex items-center justify-between">
      {/* <div className="flex items-center"> */}
      <Link to={"/"} className="flex items-center">
        <img src={logo} alt="StayPedia Logo" className="w-20 h-14" />
      </Link>
      {/* </div> */}
      <div className="flex items-center space-x-5 md:hidden">
        <button className="text-gray-800">
          {/* Add hamburger icon if necessary for mobile */}
          &#9776;
        </button>
      </div>
      <div className="hidden md:flex flex-grow justify-center space-x-10">
        <Link to="#" className="text-gray-800 hover:text-gray-600">
          Home
        </Link>
        <Link to="#" className="text-gray-800 hover:text-gray-600">
          Explore
        </Link>
        <Link to="#" className="text-gray-800 hover:text-gray-600">
          About
        </Link>
        <Link to="#" className="text-gray-800 hover:text-gray-600">
          Contact
        </Link>
      </div>
      <div className="hidden md:flex space-x-3">
        <Link
          to={"/hotel/signup"}
          className="px-4 py-2 bg-[#7C6A46] text-white rounded"
        >
          Register Hotel
        </Link>
        <Link
          to={"/signin"}
          className="px-4 py-2 bg-[#7C6A46] text-white rounded"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
