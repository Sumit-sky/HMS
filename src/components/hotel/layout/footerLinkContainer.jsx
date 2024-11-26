import React from "react";
import { Link } from "react-router-dom";

export default function FooterLinkContainer({ heading, links }) {
  return (
    <ul>
      <li className="font-semibold mb-3">{heading}</li>
      {links &&
        links.map((item, index) => (
          <li className="mb-1" key={index}>
            <Link to={item.path}>{item.title}</Link>
          </li>
        ))}
    </ul>
  );
}
