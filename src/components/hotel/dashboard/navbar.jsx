import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../../config/firebase";
import logo from "../../../Assets/logo.png";
import AccSection from "../layout/accSection";
import NavbarLink from "../layout/navbarLink";

export default function HotelNavbar() {
  const { user } = useUser();
  return (
    <nav className="bg-white w-full px-4 py-2 flex items-center justify-between shadow-md h-[80px]">
      <Link to={"/hotel/home"} className="flex items-center">
        <img src={logo} alt="StayPedia Logo" className="w-20" />
      </Link>
      <div className="hidden md:flex flex-grow justify-center space-x-10">
        <NavbarLink text={"Dashboard"} path={"/hotel/dashboard"} />
        <NavbarLink text={"Home"} path={"/hotel/home"} />
        <NavbarLink text={"About"} path={"/about"} />
        <NavbarLink text={"Contact"} path={"/contact"} />
      </div>
      <div className="hidden md:flex space-x-3">
        <Link
          to={"/hotel/signin"}
          className={`px-4 py-2 bg-[#6A9BB6] w-[140px] text-white rounded ${
            user ? "hidden" : "block"
          }`}
        >
          Login
        </Link>
        <AccSection />
      </div>
    </nav>
  );
}
