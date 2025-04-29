/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { FC } from "react";
import Image from "next/image";
import DragDropImageUploader from "./components/DragDropImageUploader";
import CrossIcon from "@/components/svgs/dashboard/CrossIcon";

interface ImageEditorProps {
  image?: { url: string; alt: string }; // Single image instead of an array
  onAddImage: (file: FileList) => void; // Handle single file
  placeholder: string;
  onDeleteImage: () => void; // Handle single image deletion
}

const ImageEditor: FC<ImageEditorProps> = ({
  image,
  onAddImage,
  onDeleteImage,
  placeholder,
}) => {
  const handleDelete = () => {
    onDeleteImage();
  };

  return (
    <div className="bg-[#f7f7f7] w-full rounded-md">
      {/* Show uploader if no image */}
      {!image ? (
        <DragDropImageUploader
          placeholder={placeholder}
          onUpload={(file) => onAddImage(file)} // Handle single file
        />
      ) : (
        <div className="flex justify-between relative min-h-[250px] h-[250px] flex-col sm:flex-row border-2 border-dashed rounded-md">
          {/* Delete Button */}
          <div
            onClick={handleDelete}
            className="absolute top-2 right-2 border-2 p-1 rounded-md cursor-pointer"
          >
            <CrossIcon width={10} height={10} />
          </div>

          {/* Display Image */}
          <div className="mx-auto max-h-[220px] h-full p-2 bg-gray-50">
            <Image
              src={image.url || "/placeholder.svg"}
              alt={image.alt || "Placeholder"}
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
