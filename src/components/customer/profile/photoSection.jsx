import React, { useRef, useState, useEffect } from "react";
import { useUser } from "../../../config/firebase";
import { FaRegUser, FaPen } from "react-icons/fa6";
import { db, storage } from "../../../config/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function PhotoSection() {
  const { userData, user } = useUser();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(userData.photoURL); // Use local state for photo URL
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Sync photoURL with userData in case it changes from an external source
    setPhotoURL(userData.photoURL);
  }, [userData.photoURL]);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleProfileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `profilePhotos/${user.uid}`);
    setLoading(true);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await updateDoc(doc(db, "customers", user.uid), {
        photoURL: downloadURL,
      });

      setPhotoURL(downloadURL); // Update local photo URL
      setError(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload profile photo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-max h-max flex flex-col relative">
      <div className="relative w-auto h-auto">
        {photoURL ? (
          <img
            src={photoURL}
            className="w-[160px] h-[160px] rounded-full p-1 border border-gray-500"
            alt="profile"
          />
        ) : (
          <FaRegUser className="w-[160px] h-[160px] text-gray-700 rounded-full p-1 border border-gray-500" />
        )}
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-full">
            <svg
              className="animate-spin h-10 w-10 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          </div>
        )}
      </div>
      <button
        onClick={handleEditClick}
        className="bg-[#7C6A46] text-white absolute w-max right-0 text-xl p-2 border rounded-full"
      >
        <FaPen className="h-auto" />
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleProfileChange}
        className="hidden"
      />
      <p className="my-2 text-xl">
        {userData.firstName + " " + userData.lastName}
      </p>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
