import React from "react";

export default function FormMessage({msg}) {
  return (
    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-2 w-full my-2">
      {msg}
    </div>
  );
}
