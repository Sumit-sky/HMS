import React, { useState } from "react";
import FormInput from "./formInput";
import { useForm } from "react-hook-form";
import FormButton from "../authentication/formElements/formButton";
import ErrorMessage from "../authentication/formElements/formError";
import { db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import FormMessage from "../authentication/formElements/formMessage";
import { useUser } from "../../config/firebase";
import contactusimg from "../../Assets/contactus.png";
import { Link } from "react-router-dom";
import {
  AiFillMail,
  AiFillPhone,
  AiFillEnvironment,
  AiFillTwitterSquare,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";
import { toast } from "react-toastify";

export default function ContactForm() {
  const { userData, user } = useUser();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: userData?.firstName || userData?.hotelName || "",
      email: userData?.email || "",
    },
  });

  const feedbackFormSubmit = async (data) => {
    setLoading(true);
    try {
      if (!user) {
        const docId = uuidv4();
        await setDoc(doc(db, "feedbacks", docId), {
          name: data.name,
          email: data.email,
          msg: data.msg,
        });
      } else {
        await setDoc(doc(db, "feedbacks", user.uid), {
          name: data.name,
          email: data.email,
          msg: data.msg,
        });
      }
      reset();
      toast.info("Your feedback has been submitted");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-100">
      <div className="w-full mx-auto bg-[#7C6A46]">
        <div className="w-full mx-auto h-[300px] flex items-center justify-between max-md:h-[200px]">
          <div className="flex justify-center items-center w-[50%]">
            <h1 className="text-6xl font-semibold text-white max-md:text-2xl">
              Get in Touch
            </h1>
          </div>
          <img
            src={contactusimg}
            alt=""
            className="h-[300px] max-md:h-[200px]"
          />
        </div>
      </div>
      <div className="flex w-full mt-[-50px] max-md:flex-col">
        <div className="w-11/12 md:w-[40%] mx-auto bg-white p-4 mb-4 flex justify-center flex-col items-center ">
          <h1 className="text-2xl font-semibold text-left w-full">
            Contact Us
          </h1>
          <div className="flex flex-col justify-center w-full p-4">
            <p className="flex items-center my-2">
              <AiFillEnvironment className="text-lg mr-2" />
              Cluster Innovation Centre, University of Delhi - 110009
            </p>
            <p className="flex items-center my-2">
              <AiFillMail className="text-lg mr-2" />
              yadavskyst@gmail.com
            </p>
            <p className="flex items-center my-2">
              <AiFillPhone className="text-lg mr-2" />
              9467181804
            </p>
          </div>
          <div className="flex justify-around w-full">
            <Link to="https://x.com/sumitsky03" target="_blank" className="">
              <AiFillTwitterSquare className="text-6xl"></AiFillTwitterSquare>
            </Link>
            <Link
              to="https://www.instagram.com/sumit.sky/"
              target="_blank"
              className=""
            >
              <AiFillInstagram className="text-6xl"></AiFillInstagram>
            </Link>
            <Link
              to="https://www.youtube.com/@learnwithsumit03"
              target="_blank"
              className=""
            >
              <AiFillYoutube className="text-6xl"></AiFillYoutube>
            </Link>
          </div>
        </div>
        <div className="w-11/12 md:w-[40%] mx-auto bg-white p-4 mb-4 flex justify-center flex-col items-center ">
          <h1 className="text-2xl font-semibold text-center w-full">
            Get In Touch
          </h1>
          <form
            onSubmit={handleSubmit(feedbackFormSubmit)}
            className="flex justify-center items-center flex-col w-[80%]"
          >
            {error && <ErrorMessage message={error} />}
            {msg && <FormMessage msg={msg} />}
            <FormInput
              register={register}
              label={"Fullname"}
              name={"name"}
              placeholder={"John Wick"}
              type={"text"}
              error={errors.name}
              validation={{
                required: "Name is required",
              }}
            />
            <FormInput
              register={register}
              name={"email"}
              label={"Email"}
              placeholder={"example@yahoo.com"}
              type="email"
              error={errors.email}
              validation={{
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid Email",
                },
              }}
            />
            <div className="w-full mb-3 flex flex-col items-start justify-center">
              <label htmlFor="" className="my-1">
                Message
              </label>
              <textarea
                name=""
                id=""
                rows={5}
                className="w-full p-3 border text-lg rounded-md border-gray-300 text-gray-700 outline-none"
                placeholder="Your message here...."
                {...register("msg", {
                  required: "Message is required",
                })}
              ></textarea>
              {errors.msg && (
                <p className="text-red-600 text-left mt-1">
                  {errors.msg.message}
                </p>
              )}
            </div>
            <FormButton
              buttonText={"Submit"}
              loading={loading}
              contactUs={true}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
