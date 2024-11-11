import React, { useRef } from "react";
import { IoIosClose } from "react-icons/io";
import AddDetailsButton from "./addDetailsButton";

export default function AddPictures({ selectedFiles, setSelectedFiles }) {
  const filesInputRef = useRef(null);

  const handleAddPhotosClick = () => {
    filesInputRef.current.click();
  };

  const handleAddPhotos = (event) => {
    const files = Array.from(event.target.files);

    // Filter out files already added based on `file` name and size if they exist
    const newFiles = files.filter(
      (file) =>
        !selectedFiles.some(
          (existingFile) =>
            existingFile.file?.name === file.name &&
            existingFile.file?.size === file.size
        )
    );

    // Map new files to include file and preview URL
    const filePreviews = newFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedFiles([...selectedFiles, ...filePreviews]);
    filesInputRef.current.value = "";
  };

  const handleRemovePicture = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);

    // Revoke the object URL for newly added images to prevent memory leaks
    if (selectedFiles[index].file) {
      URL.revokeObjectURL(selectedFiles[index].preview);
    }

    setSelectedFiles(updatedFiles);
  };

  return (
    <div className="mb-5 w-full flex flex-col items-start">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl text-left">Add Pictures Of Rooms</h1>
        <div className="flex w-1/2 justify-between items-center">
          <input
            type="file"
            accept="image/*"
            ref={filesInputRef}
            multiple
            className="hidden"
            onChange={handleAddPhotos}
          />
        </div>
        <AddDetailsButton
          type={"button"}
          onClick={handleAddPhotosClick}
          buttonText={selectedFiles.length > 0 ? "Add More" : "Add Pictures"}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        {selectedFiles.map(({ preview }, index) => (
          <div key={index} className="h-max w-max relative">
            <button
              type="button"
              className="absolute top-[-5px] right-[-5px] bg-white rounded-full border h-5 flex items-center justify-center w-5 text-2xl"
              onClick={() => handleRemovePicture(index)}
            >
              <IoIosClose />
            </button>
            <img
              src={preview}
              alt={`Preview ${index + 1}`}
              className="w-24 h-24 object-cover rounded-md shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}