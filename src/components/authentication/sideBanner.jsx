import React from "react";
import customer_auth_img from "../../Assets/customer_auth_img.png";
import hotel_auth_img from "../../Assets/hotel_auth_img.png";

export default function SideBanner({ type }) {
  const divStyle = {
    backgroundImage: `url(${type === "customer" ? customer_auth_img : hotel_auth_img})`,
  };

  return (
    <div
      style={divStyle}
      className="hidden md:block w-1/2 h-screen bg-cover bg-center"
    >
      <h1 className={`${type === "customer" ? "hidden" : "block"} text-white text-start p-3 text-4xl`}>
        Welcome <span className="font-bold text-violet-500">BACK</span>
      </h1>
    </div>
  );
}
