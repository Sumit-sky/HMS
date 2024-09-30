import React from "react";

export default function SidebarButton({
  index,
  active,
  setActive,
  icon: Icon,
  label,
}) {
  return (
    <button
      className={`flex items-center text-lg p-3 w-full rounded-md transition-all duration-200 ${
        active === index
          ? "bg-blue-100 text-blue-600"
          : "bg-white text-gray-600"
      }`}
      onClick={() => setActive(index)}
    >
      <Icon active={active === index} />
      <span className="ml-3">{label}</span>
    </button>
  );
}
