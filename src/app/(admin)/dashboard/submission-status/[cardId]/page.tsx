"use client";

import React, { useState } from "react";
import SubmissionSummary from "./components/SubmissionSummary";
import ImageEditor from "@/components/common/ImagePicker/ImageEditor";
import { submissionData } from "../SubmissionStatus.constant";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import { Button } from "@/components/ui/button";

const AdminCard = () => {
  const [frontImg, setFrontImg] = useState<
    { url: string; alt: string } | undefined
  >(undefined);
  const [backImg, setBackImg] = useState<
    { url: string; alt: string } | undefined
  >(undefined);

  const handleUploadImage = (type: "front" | "back", file: File) => {
    const uploadedImage = {
      url: URL.createObjectURL(file),
      alt: file.name,
    };

    if (type === "front") {
      setFrontImg(uploadedImage);
    } else {
      setBackImg(uploadedImage);
    }
  };

  const handleRemoveImage = (type: "front" | "back") => {
    if (type === "front") {
      setFrontImg(undefined);
    } else {
      setBackImg(undefined);
    }
  };

  return (
    <div className="bg-white border-md px-4 py-4 rounded-md">
      <div className="mb-2">
        <h1 className="heading-primary font-bold mb-1">
          Enter Your Card Details
        </h1>
        <p className="heading-tertiary text-muted-foreground">
          Provide information about the card you&apos;re submitting
        </p>
      </div>

      <div className="overflow-hidden">
        <h3 className="heading-tertiary mb-2">Card Images</h3>
        <div className="flex-between gap-4">
          <ImageEditor
            image={frontImg}
            placeholder="Drag and drop your card front image here"
            onAddImage={(file) => handleUploadImage("front", file[0])}
            onDeleteImage={() => handleRemoveImage("front")}
          />

          {/* Back Image */}
          <ImageEditor
            image={backImg}
            placeholder="Drag and drop your card back image here"
            onAddImage={(file) => handleUploadImage("back", file[0])}
            onDeleteImage={() => handleRemoveImage("back")}
          />
        </div>
      </div>

      <SubmissionSummary title="Submission Summary" fields={submissionData} />

      <div className="flex items-center gap-6 ml-6 mt-4">
        <Button
          variant={"ghost"}
          className="max-w-[8rem] w-full rounded-full heading-secondary bg-[#E0E0E0] hover:bg-gray-300 hover:text-black"
        >
          Back
        </Button>
        <ButtonGradient className="max-w-[8rem] w-full">Next</ButtonGradient>
      </div>
    </div>
  );
};

export default AdminCard;
