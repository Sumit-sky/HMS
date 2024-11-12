import React from "react";
import FooterLinkContainer from "./footerLinkContainer";
import FooterFeedback from "./footerFeedback";
import { useUser } from "../../../config/firebase";

export default function HomeFooter() {
  const { isCustomer } = useUser();
  return (
    <div className="bg-[#7C6A46] py-2">
      <div className="flex px-10 my-3 justify-between items-center text-white w-full">
        <div className="flex w-1/2 justify-evenly text-left">
          <FooterLinkContainer
            heading={"Quick Links"}
            links={[
              { title: "Register Hotel", path: "/hotel/signup" },
              { title: "Hotel Login", path: "/hotel/signin" },
              // { title: "Room Booking", path: "#" },
            ]}
          />
          <FooterLinkContainer
            heading={"Company"}
            links={[
              { title: "Contact", path: "#" },
              { title: "Privacy Policy", path: "#" },
              { title: "About", path: "#" },
              { title: "FAQs", path: "#" },
            ]}
          />
          <FooterLinkContainer
            heading={"Social Media"}
            links={[
              { title: "Facebook", path: "#" },
              { title: "Instagram", path: "#" },
              { title: "LinkedIn", path: "#" },
              { title: "X", path: "#" },
            ]}
          />
        </div>
        {isCustomer && <FooterFeedback />}
      </div>
      <hr className=" border-[#D9D9D9]" />
      <p className="text-white text-lg my-2">StayPedia</p>
    </div>
  );
}