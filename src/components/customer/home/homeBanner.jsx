import React from "react";
import homeBannerImg from "../../../Assets/home_banner.png";
import { BsArrowDown } from "react-icons/bs";

export default function HomeBanner({ heading, quote ,scrollDown }) {
  return (
    <div
      className="w-full h-[90vh] bg-cover m-0 p-0"
      style={{
        backgroundImage: `url(${homeBannerImg})`,
      }}
    >
      <div className="w-full h-full flex flex-col justify-center items-center text-white bg-[rgba(124,106,70,0.5)]">
        <h1 className="text-4xl font-semibold">{heading}</h1>
        <p className="text-xl mt-4 text-center w-9/12">
          The elegant luxury bedrooms in this gallery showcase custom interior
          designs & decorating ideas. View pictures and find your perfect luxury
          bedroom design.
        </p>
        <a 
          href="#AreaHotels"
          className={`p-2 border border-white rounded-full mt-6 ${scrollDown !== true ? "hidden" : "" }`}
        >
          <BsArrowDown className="text-2xl text-white " />
        </a>
      </div>
    </div>
  );
}
