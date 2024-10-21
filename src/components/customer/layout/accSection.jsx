import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase";

export default function AccSection({ user, setUser }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsHovered(false);
    }, 5000);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("sign out");
      setUser(null);
      navigate("/signin");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div
        className={`w-auto h-max text-white rounded-full p-1 border border-gray-500 cursor-pointer ${
          user ? "block" : "hidden"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={user?.photoURL?.trim() ? user?.photoURL : <FaUser />}
          className="w-[40px] rounded-full"
          alt=""
        />
      </div>

      {isHovered && (
        <div
          className="absolute shadow-xl w-[150px] bg-white text-black flex flex-col top-20 right-2 rounded-lg"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link to={"/profile"} className="py-2 hover:bg-gray-300 rounded-lg">
            Profile
          </Link>
          <button
            onClick={logout}
            className="py-2 hover:bg-gray-300 rounded-lg"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
