import React, { useState, useEffect } from "react";
import { Link, } from "react-router-dom";
import logo from "../../../Assets/logo.png";
import NavbarLink from "./navbarLink";
import { auth } from "../../../config/firebase";
import AccSection from "./accSection";

export default function HomeNavbar() {
  const [user, setUser] = useState(null);
  // console.log(auth.currentUser);
  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);
    }
  }, [auth.currentUser]);

  return (
    <nav className="bg-white w-full px-4 py-2 flex items-center justify-between">
      <Link to={"/"} className="flex items-center">
        <img src={logo} alt="StayPedia Logo" className="w-20 h-14" />
      </Link>
      <div className="hidden md:flex flex-grow justify-center space-x-10">
        <NavbarLink text={"Home"} path={"/"} />
        <NavbarLink text={"Explore"} path={"#"} />
        <NavbarLink text={"About"} path={"#"} />
        <NavbarLink text={"Contact"} path={"/contact"} />
      </div>
      <div className="hidden md:flex space-x-3">
        <Link
          to={"/hotel/signup"}
          className={`px-4 py-2 bg-[#7C6A46] w-[140px] text-white rounded ${
            user ? "hidden" : "block"
          }`}
        >
          Register Hotel
        </Link>
        <Link
          to={"/signin"}
          className={`px-4 py-2 bg-[#7C6A46] w-[140px] text-white rounded ${
            user ? "hidden" : "block"
          }`}
        >
          Login
        </Link>
        <AccSection user={user} setUser={setUser} />
      </div>
    </nav>
  );
}
