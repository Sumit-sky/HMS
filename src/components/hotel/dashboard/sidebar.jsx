import React from "react";
import { Button } from "react-bootstrap";

export default function Hotel_Sidebar({ active, setActive }) {
  return (
    <div
      className="d-flex flex-column bg-dark min-vh-100"
      style={{ width: "200px" }}
    >
      <Button
        className="bg-transparent border-0 fs-4 align-items-lg-start"
        style={{ color: active === 0 ? "black" : "#5D6679" }}
        onClick={() => setActive(0)}
      >
        Dashboard
      </Button>
      <Button
        className="bg-transparent border-0 fs-4 align-items-lg-start"
        style={{ color: active === 1 ? "black" : "#5D6679" }}
        onClick={() => setActive(1)}
      >
        Front Desk
      </Button>
      <Button
        className="bg-transparent border-0 fs-4 align-items-lg-start"
        style={{ color: active === 2 ? "black" : "#5D6679" }}
        onClick={() => setActive(2)}
      >
        Guest
      </Button>
      <Button
        className="bg-transparent border-0 fs-4 align-items-lg-start"
        style={{ color: active === 3 ? "black" : "#5D6679" }}
        onClick={() => setActive(3)}
      >
        Rooms
      </Button>
      <Button
        className="bg-transparent border-0 fs-4 align-items-lg-start"
        style={{ color: active === 4 ? "black" : "#5D6679" }}
        onClick={() => setActive(4)}
      >
        Deal
      </Button>
      <Button
        className="bg-transparent border-0 fs-4 align-items-lg-start"
        style={{ color: active === 5 ? "black" : "#5D6679" }}
        onClick={() => setActive(5)}
      >
        Rate
      </Button>
    </div>
  );
}
