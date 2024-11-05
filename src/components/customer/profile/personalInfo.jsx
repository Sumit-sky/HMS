import React, { useEffect, useState } from "react";
import FormInput from "../../contactUs/formInput";
import { useForm } from "react-hook-form";
import { useUser } from "../../../config/firebase";
import { toast } from "react-toastify";
import ProfileButton from "./profileButton";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";

export default function PersonalInfo() {
  const { userData, user } = useUser();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disableFormInput, setDisableFormInput] = useState(true);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      dob: userData.dob || "",
      mobile: userData.phoneNumber || "",
    },
  });

  const updatePersonalInfo = async (data) => {
    if (
      userData.firstName === data.firstName &&
      userData.lastName === data.lastName &&
      userData.dob === data.dob &&
      userData.phoneNumber === data.mobile
    ) {
      setDisableFormInput(true);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await updateDoc(doc(db, "customers", user.uid), {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.mobile,
        dob: data.dob,
      });
      setDisableFormInput(true);
      toast.success("Save complete");
    } catch (error) {
      console.error("Error updating personal info:", error);
      setError("Something went wrong, Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      action=""
      onSubmit={handleSubmit(updatePersonalInfo)}
      className="flex flex-col"
    >
      <h1 className="text-xl w-full text-left mb-3">Personal Information</h1>
      <div className="flex flex-wrap justify-between">
        <FormInput
          label={"First Name"}
          register={register}
          name={"firstName"}
          placeholder={"First Name"}
          type={"text"}
          error={errors.firstName}
          validation={{
            required: "First Name is required",
          }}
          disabled={disableFormInput}
        />
        <FormInput
          label={"Last Name"}
          register={register}
          name={"lastName"}
          placeholder={"Last Name"}
          type={"text"}
          error={errors.lastName}
          validation={{
            required: "Last Name is required",
          }}
          disabled={disableFormInput}
        />
        <FormInput
          label={"Date Of Birth"}
          register={register}
          name={"dob"}
          placeholder={"Date of Birth"}
          type={"date"}
          error={errors.dob}
          validation={{
            required: "Date of birth is required",
          }}
          disabled={disableFormInput}
        />
        <FormInput
          label={"Mobile"}
          register={register}
          name={"mobile"}
          placeholder={"Mobile"}
          type={"tel"}
          error={errors.mobile}
          validation={{
            required: "Mobile is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Invalid mobile number",
            },
          }}
          disabled={disableFormInput}
        />
      </div>
      <div className="w-5/12 flex justify-between my-3">
        <ProfileButton
          type={"button"}
          className={disableFormInput ? "block" : "hidden"}
          onClick={() => setDisableFormInput(false)}
          buttonText={"Edit"}
        />
        <ProfileButton
          type={"submit"}
          className={!disableFormInput ? "block" : "hidden"}
          loading={loading}
          buttonText={"Save"}
        />
        <ProfileButton
          type={"button"}
          className={!disableFormInput ? "block" : "hidden"}
          onClick={() => setDisableFormInput(true)}
          buttonText={"Cancel"}
        />
      </div>
    </form>
  );
}
