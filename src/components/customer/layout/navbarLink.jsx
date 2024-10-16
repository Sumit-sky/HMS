import React from "react";
import { Link } from "react-router-dom";

export default function NavbarLink({text,path}) {
  return (
    <Link to={path} className="text-gray-800 hover:text-gray-600">
      {text}
    </Link>
  );
}
