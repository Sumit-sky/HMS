import React from "react";

export default function HomeFooter() {
  return (
    <div className="bg-[#7C6A46] py-2">
      <div className="flex px-10 my-3 justify-between items-center text-white w-full">
        <div className="flex w-1/2 justify-evenly text-left">
          <ul>
            <li className="font-semibold mb-3">Quick Links</li>
            <li className="mb-1">
              <a href="#">Register Hotel</a>
            </li>
            <li className="mb-1">
              <a href="#">Room Booking</a>
            </li>
            <li className="mb-1">
              <a href="#">Contact</a>
            </li>
          </ul>
          <ul>
            <li className="font-semibold mb-3">Company</li>
            <li className="mb-1">
              {" "}
              <a href="#">Privacy Policy</a>
            </li>
            <li className="mb-1">
              {" "}
              <a href="#">About</a>
            </li>
            <li className="mb-1">
              {" "}
              <a href="#">FAQs</a>
            </li>
          </ul>
          <ul>
            <li className="font-semibold mb-3">Social Media</li>
            <li className="mb-1">
              {" "}
              <a href="#">Facebook</a>
            </li>
            <li className="mb-1">
              {" "}
              <a href="#">Instagram</a>
            </li>
            <li className="mb-1">
              {" "}
              <a href="#">LinkedIn</a>
            </li>
            <li className="mb-1">
              {" "}
              <a href="#">X</a>
            </li>
          </ul>
        </div>
        <form className="flex flex-col text-left w-3/12 items-end">
          <h3 className="w-full text-left">Have any query ?</h3>
          <input
            type="email"
            placeholder="Enter your email"
            className="my-1 h-10 rounded-md text-black px-4 outline-none border-none w-full"
          />
          <textarea
            name=""
            placeholder="Your message"
            id=""
            rows={"3"}
            className="my-1 rounded-md text-black p-1 px-4 w-full  outline-none border-none"
          ></textarea>
          <button
            type="button"
            className="bg-white text-[#7C6A46] w-[100px] p-2 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
      <hr className=" border-[#D9D9D9]" />
      <p className="text-white text-lg my-2">StayPedia</p>
    </div>
  );
}
