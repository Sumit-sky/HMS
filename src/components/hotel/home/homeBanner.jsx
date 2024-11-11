import React from "react";
import { Link } from "react-router-dom";
import hotel_Home from "../../../Assets/hotel_Home.png";

export default function HomeBanner() {
  return (
    <div className="bg-[#6A9BB6] w-full p-10 flex justify-center items-center">
      <div className="w-11/12 flex flex-col justify-center items-center">
        <p className="text-6xl font-serif">
          The first <br /> truly intelligent <br /> Hotel Management
        </p>
        <p className="my-3 text-lg">
          Skyrocket your hotel conversion rate and improve the customer journey{" "}
          <br /> with smart online management.
        </p>
        <Link to={"#"} className="text-[#666666] bg-white p-1 px-3 font-semibold rounded-lg my-3">Ask a Question</Link>
        <img src={hotel_Home} alt="Banner" className="my-3" />
      </div>
    </div>
  );
}
