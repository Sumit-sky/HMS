import React from "react";
import { Button } from "react-bootstrap";

export default function SidebarButton({
  index,
  active,
  setActive,
  icon: Icon,
  label,
}) {
  return (
    <Button
      className="border-0 fs-5 d-flex justify-content-start align-items-center"
      style={{
        color: active === index ? "#1366D9" : "#5D6679",
        background: active === index ? "#E8F1FD" : "#fff",
      }}
      onClick={() => setActive(index)}
    >
      <Icon active={active === index} />
      {label}
    </Button>
  );
}
