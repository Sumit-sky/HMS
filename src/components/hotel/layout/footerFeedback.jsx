import React from "react";
import { useUser } from "../../../config/firebase";
import { useForm } from "react-hook-form";
import { db } from "../../../config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function FooterFeedback() {
  const { userData, user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});

  const feedbackFormSubmit = async (data) => {
    try {
      await setDoc(doc(db, "feedbacks", user.uid), {
        name: userData.firstName,
        email: userData.email,
        msg: data.msg,
      });
      reset();
      toast.success("Your query has been submitted");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form
      className="flex flex-col text-left w-3/12 items-end"
      onSubmit={handleSubmit(feedbackFormSubmit)}
    >
      <h3 className="w-full text-left">Have any query ?</h3>
      <textarea
        name=""
        placeholder="Your message"
        id=""
        rows={"3"}
        className="my-1 rounded-md text-black p-1 px-2 w-full outline-none border-none resize-none"
        {...register("msg", {
          required: "Message is required",
        })}
      ></textarea>
      {errors.msg && (
        <p className="text-red-600 text-left mt-1">{errors.msg.message}</p>
      )}
      <button
        type="submit"
        className="bg-white text-[#7C6A46] w-[100px] p-2 rounded-lg"
      >
        Submit
      </button>
    </form>
  );
}
