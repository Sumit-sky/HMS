import React from "react";

export default function IconDashboard({ active }) {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-3"
    >
      <path
        d="M1.25 11L10.204 2.04499C10.644 1.60599 11.356 1.60599 11.795 2.04499L20.75 11M3.5 8.74999V18.875C3.5 19.496 4.004 20 4.625 20H8.75V15.125C8.75 14.504 9.254 14 9.875 14H12.125C12.746 14 13.25 14.504 13.25 15.125V20H17.375C17.996 20 18.5 19.496 18.5 18.875V8.74999M7.25 20H15.5"
        stroke={active ? "#1366D9" : "#5D6679"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
