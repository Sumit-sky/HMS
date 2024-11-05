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
      name: userData?.firstName + " " + userData?.lastName || "",
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
      setMsg("Your feedback has been submitted");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(feedbackFormSubmit)}
      className="m-5 flex flex-col"
    >
      {error && <ErrorMessage message={error} />}
      {msg && <FormMessage msg={msg} />}
      <div className="flex w-full justify-between">
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
      </div>
      <div className="w-full mb-3 flex flex-col items-start justify-center">
        <label htmlFor="" className="my-1">
          Message
        </label>
        <textarea
          name=""
          id=""
          rows={5}
          className="w-full p-3 border text-lg border-gray-300 text-gray-700 outline-none"
          placeholder="Your message here...."
          {...register("msg", {
            required: "Message is required",
          })}
        ></textarea>
        {errors.msg && (
          <p className="text-red-600 text-left mt-1">{errors.msg.message}</p>
        )}
      </div>
      <div className="w-1/12">
        <FormButton buttonText={"Submit"} loading={loading} contactUs={true} />
      </div>
    </form>
  );
}
