import React from "react";
import tryBanner_img from "../../../Assets/tryBanner.png";
import { Link } from "react-router-dom";

export default function TryBanner() {
  return (
    <div className="bg-white w-full flex justify-center items-center p-10">
      <div className="bg-gradient-to-r from-[#F2EEFD] to-[#6A9BB6] w-7/12 p-5 rounded-lg flex justify-around">
        <div className="w-1/2 flex flex-col items-start justify-center">
          <p className="text-2xl font-serif my-5">Try StayPedia For free</p>
          <Link
            to={"/hotel/signup"}
            className="text-[#666666] bg-white p-2 px-4 font-semibold rounded-lg my-3"
          >
            Try for Free
          </Link>
        </div>
        <img src={tryBanner_img} alt="" className="w-[300px]" />
      </div>
    </div>
  );
}
