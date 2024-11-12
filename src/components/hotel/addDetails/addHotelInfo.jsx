import React, { useState } from "react";
import AddPictures from "./addPictures";
import AddBasicDetails from "./addBasicDetails";
import { useForm } from "react-hook-form";
import { useUser } from "../../../config/firebase";
import AddDetailsButton from "./addDetailsButton";
import AddRoomDetails from "./addRoomDetails";
import AddHotelDetails from "./addHotelDetails";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { db, storage } from "../../../config/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { amenitiesList } from "../../staticData";
import { useNavigate } from "react-router-dom";

export default function AddHotelInfo() {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [activePage, setActivePage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const renderContent = () => {
    switch (activePage) {
      case 0:
        return <AddBasicDetails register={register} errors={errors} />;
      case 1:
        return (
          <AddHotelDetails
            register={register}
            errors={errors}
            amenitiesList={amenitiesList}
          />
        );
      case 2:
        return <AddRoomDetails register={register} errors={errors} />;
      case 3:
        return (
          <AddPictures
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
          />
        );
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  const handleNextClick = () => {
    // setActivePage(activePage + 1);
    handleSubmit(() => {
      setActivePage(activePage + 1);
    })();
  };

  const handleBackClick = () => {
    setActivePage(activePage - 1);
  };

  const handleProfileSubmit = async (data) => {
    if (selectedFiles.length <= 1) {
      toast.error("Select at least 2 pictures");
      return;
    }
    setIsLoading(true);
    try {
      const photoURLs = [];
      const amenitiesArray = amenitiesList.map((amenity) => ({
        key: amenity.name,
        value: !!data[amenity.name],
      }));
      // console.log(amenitiesArray);
      // Uploading images and getting there download urls
      const uploadPromises = selectedFiles.map(async ({ file }) => {
        const uniqueRef = ref(storage, `hotelPhotos/${user.uid}/${file.name}`);
        await uploadBytes(uniqueRef, file);
        // Get download URL after uploading
        const url = await getDownloadURL(uniqueRef);
        photoURLs.push(url);
      });
      await Promise.all(uploadPromises);
      // updating the hotels table
      await updateDoc(doc(db, "hotels", user.uid), {
        photos: photoURLs,
        amenitiesArray: amenitiesArray,
        aboutHotel: data.aboutHotel,
        address: data.address,
        landmark: data.landmark,
        town: data.town,
        city: data.city,
        pinCode: data.pinCode,
        checkInTime: data.checkInTime,
        checkOutTime: data.checkOutTime,
        mobileNumber: data.mobileNumber,
        unmarriedCouples: data.unmarriedCouples,
        freeRooms: data.numberOfRooms,
        numberOfRooms: data.numberOfRooms,
        roomSize: data.roomSize,
        maxPersons: data.maxPersons,
        bookingPrice: data.bookingPrice,
      });
      toast.success("Profile saved successfully!");
      navigate("/hotel/profile");
      setSelectedFiles([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile, Try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5 w-11/12 flex justify-center flex-col items-center">
      <h1 className="text-3xl font-semibold">Let's Setup Your Profile</h1>
      <form
        action=""
        className="p-5 m-5 w-9/12 rounded-lg shadow-[0_0_25px_-10px_rgba(0,0,0,0.2)]"
        onSubmit={handleSubmit(handleProfileSubmit)}
      >
        {renderContent()}
        <div className="w-full flex justify-between">
          {activePage > 0 && (
            <AddDetailsButton
              buttonText={"Back"}
              type={"button"}
              onClick={handleBackClick}
            />
          )}
          {activePage < 3 && (
            <AddDetailsButton
              buttonText={"Next"}
              type={"button"}
              onClick={handleNextClick}
            />
          )}
          {activePage === 3 && (
            <AddDetailsButton
              buttonText={"Save"}
              type={"submit"}
              loading={isLoading}
            />
          )}
        </div>
      </form>
    </div>
  );
}
