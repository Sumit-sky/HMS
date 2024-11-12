import React from "react";

export default function DashboardOverviewBox({ text1, text2, text3 }) {
  return (
    <div className="w-3/12 flex items-center">
      <div className="flex items-start flex-col mr-4">
        <p className="text-gray-400 text-base">{text1}</p>
        <p>{text2}</p>
      </div>
      <p className="text-4xl text-[#1366D9] font-semibold">{text3}</p>
    </div>
  );
}