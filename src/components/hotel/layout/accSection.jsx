import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import { signOut } from "firebase/auth";
import { auth, useUser } from "../../../config/firebase";

export default function AccSection() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { user, userData, setUser, setUserType, setUserData } = useUser();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // setTimeout(() => {
    // }, 3000);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // console.log("sign out");
      setIsHovered(false);
      setUser(null);
      setUserType(null);
      setUserData(null);
      navigate("/hotel/signin");
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
        // onMouseLeave={handleMouseLeave}
      >
        {user?.photoURL?.trim() ? (
          <img
            src={userData.photoURL}
            className="w-[40px] rounded-full h-[40px]"
            alt="profile"
          />
        ) : (
          <FaRegUser className="w-[40px] h-[40px] text-gray-700 rounded-full" />
        )}
      </div>

      {isHovered && (
        <div
          className="absolute shadow-2xl w-[150px] bg-white text-black flex flex-col top-20 right-2 rounded-lg transition-all ease-in-out duration-1000"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            to={"/hotel/hotel-details"}
            className="w-full py-2 hover:bg-gray-300 rounded-lg"
          >
            Profile
          </Link>
          <Link
            to={"/hotel/dashboard/overview"}
            className="py-2 hover:bg-gray-300 rounded-lg"
          >
            Dashboard
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
