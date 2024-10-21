import React from "react";
import logo from "../../../Assets/logo.png";
import { Link } from "react-router-dom";

export default function FormHeader({heading}) {
  return (
    <div className="flex justify-between w-full items-center mb-3">
      <h1 className="text-2xl font-bold text-left">{heading}</h1>
      <Link to={"/"}>
        <img src={logo} alt="Logo" className="w-24 h-16" />
      </Link>
    </div>
  );
}
