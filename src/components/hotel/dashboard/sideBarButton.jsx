import React from "react";
import { Link } from "react-router-dom";

export default function SidebarButton({
  index,
  active,
  path,
  icon: Icon,
  label,
}) {
  return (
    <Link
      to={path}
      className={`flex items-center text-lg p-3 w-full rounded-md transition-all duration-200 ${
        active === index
          ? "bg-blue-100 text-blue-600"
          : "bg-white text-gray-600"
      }`}
    >
      <Icon active={active === index} />
      <span className="ml-3">{label}</span>
    </Link>
  );
}
