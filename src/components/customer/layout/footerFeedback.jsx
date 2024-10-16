import React from "react";

export default function FooterFeedback() {
  return (
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
  );
}
