import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../Assets/logo_blue.png";
import NavbarLink from "./navbarLink";
import { useUser } from "../../../config/firebase";
import AccSection from "./accSection";

export default function HomeNavbar() {
  const { user } = useUser();

  return (
    <nav className="bg-white w-full px-4 py-2 flex items-center justify-between">
      <Link to={"/hotel/home"} className="flex items-center">
        <img src={logo} alt="StayPedia Logo" className="w-20 h-10" />
      </Link>
      <div className="hidden md:flex flex-grow justify-center space-x-10">
        <NavbarLink text={"Home"} path={"/hotel/home"} />
        <NavbarLink text={"Dashboard"} path={"/hotel/dashboard/overview"} />
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
