import React from "react";

export default function FooterLinkContainer({ heading, links }) {
  return (
    <ul>
      <li className="font-semibold mb-3">{heading}</li>
      {links &&
        links.map((item, index) => (
          <li className="mb-1" key={index}>
            <a href={item.path}>{item.title}</a>
          </li>
        ))}
    </ul>
  );
}
