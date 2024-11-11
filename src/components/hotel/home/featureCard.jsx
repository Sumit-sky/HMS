import React from "react";

export default function FeatureCard({ image, title, desc }) {
  return (
    <div className="flex flex-col items-start justify-center w-3/12 p-2 flex-wrap">
      <img src={image} alt="" className="w-[100px]" />
      <p className="my-2">{title}</p>
      <p className="text-[#6B6B7F] mb-2 w-full text-left">{desc}</p>
    </div>
  );
}
