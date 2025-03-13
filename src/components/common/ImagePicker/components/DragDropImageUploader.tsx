"use client";

import { useState, useCallback, FC } from "react";
import { useDropzone } from "react-dropzone";
import PrimaryImage from "../../PrimaryImage/PrimaryImage";
import { ButtonGradient } from "../../ButtonGradient";

interface DragDropImageUploaderProps {
  onUpload?: (file: FileList) => void;
  className?: string;
  placeholder: string;
}

const DragDropImageUploader: FC<DragDropImageUploaderProps> = ({
  onUpload,
  className,
  placeholder,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [], "image/gif": [] },
    multiple: false, // Allow multiple files
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0 && onUpload) {
        const fileList = new DataTransfer();

        acceptedFiles.forEach((file) => {
          const image = new Image();
          image.src = URL.createObjectURL(file);

          image.onload = () => {
            fileList.items.add(file);

            if (fileList.files.length === acceptedFiles.length) {
              onUpload(fileList.files);
            }
          };

          image.onerror = () => {
            setError(`Invalid image file: "${file.name}".`);
          };
        });
      }
    },

    onDropRejected: (fileRejections) => {
      fileRejections.forEach((rejection) => {
        rejection.errors.forEach((error) => {
          setError(error.message);
        });
      });
    },
  });

  return (
    <div className={`w-full rounded-md mx-auto ${className}`}>
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-md px-4 py-6 border-primary-stroke
          ${isDragging ? "bg-light-blue-75" : ""}
          transition-colors duration-200
          flex flex-col items-center justify-center
          min-h-[250px] mx-auto
        `}
        // onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input {...getInputProps()} />
        <PrimaryImage
          width={40}
          height={40}
          alt="upload"
          src={"/assets/images/image-add.png"}
          className="object-cover w-[40px] h-[40px] mb-3"
        />

        <p className="heading-tertiary mb-6 text-center">
          {placeholder},<br /> or click to select
        </p>

        <ButtonGradient className="rounded-full">Select image</ButtonGradient>
        <p className="heading-tertiary text-red-500 mt-2">{error}</p>
      </div>
    </div>
  );
};

export default DragDropImageUploader;
