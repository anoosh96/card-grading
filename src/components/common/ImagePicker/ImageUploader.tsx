import React, { useState } from "react";
import ImageEditor from "./ImageEditor";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState<
    | {
        url: string;
        alt: string;
      }
    | undefined
  >(undefined);

  const handleUploadImage = (file: File) => {
    const uploadedImage = {
      url: URL.createObjectURL(file),
      alt: file.name,
    };
    setSelectedImage(uploadedImage);
  };

  const handleRemoveImage = () => {
    setSelectedImage(undefined);
  };

  return (
    <ImageEditor
      image={selectedImage}
      onAddImage={(files: FileList) => handleUploadImage(files[0])}
      placeholder=""
      onDeleteImage={handleRemoveImage}
    />
  );
};

export default ImageUploader;
