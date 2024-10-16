import React from "react";
import { Link } from "react-router-dom";

export default function FormRedirect({ type, path }) {
  return (
    <Link to={path} className="mt-3 text-gray-500  w-full text-left">
      {type === "signin"
        ? "Don't have an account?"
        : "Already have an account?"}{" "}
      <span className="text-violet-500 hover:underline">
        {type === "signin" ? "Sign Up" : "Sign In"}{" "}
      </span>
    </Link>
  );
}
