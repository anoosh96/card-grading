"use client";

import React, { useMemo, useState } from "react";
import ImageEditor from "@/components/common/ImagePicker/ImageEditor";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import { Button } from "@/components/ui/button";
import SubmissionSummary from "../components/SubmissionSummary";
import { SubmissionData } from "@/stores/submissionStore";
import { useRouter } from "next/navigation";
import { useSubmissionStore } from "@/stores/submissionStore";
import { useUpdateSubmission } from "@/hooks/useUpdateSubmission";
import { FlexibleRecord } from "@/types";
import { formatToUSTimezone, padId } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function CardDetails() {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  // pull the submission object and setter from the store
  const submission = useSubmissionStore((s) => s.submission);
  const setSubmission = useSubmissionStore((s) => s.setSubmission);

  // Use our mutation hook
  const updateSubmission = useUpdateSubmission();

  // Memoized preview URLs
  const frontImagePreview = useMemo(() => {
    if (!submission.frontImage) return undefined;
    if (typeof submission.frontImage === 'string') return submission.frontImage;
    return URL.createObjectURL(submission.frontImage as File);
  }, [submission.frontImage]);

  const backImagePreview = useMemo(() => {
    if (!submission.backImage) return undefined;
    if (typeof submission.backImage === 'string') return submission.backImage;
    return URL.createObjectURL(submission.backImage as File);
  }, [submission.backImage]);

  // when a new file is dropped, update both preview and store
  const handleUploadImage = (type: "frontImage" | "backImage", file: File) => {
    setSubmission({ [type]: file });
  };

  const handleRemoveImage = (type: "frontImage" | "backImage") => {
    setSubmission({ [type]: null });
  };

  // pass updated summary data back to store when changed in Summary
  const handleUpdate = (updated: Partial<SubmissionData>) => {
    // Handle specific enum field transformations if needed
    const updatedData = { ...updated };

    // Update the store with the transformed data
    setSubmission({ ...updatedData, editing: true });
  };

  const handleSubmit = () => {
    // Ensure we have an ID to work with
    if (!submission.id) {
      alert("Missing submission ID");
      return;
    }

    // Prepare the values object for the API
    const values: FlexibleRecord = {
      cardName: submission.cardName,
      category: submission.category,
      yearOfRelease: submission.yearOfRelease,
      conditionEstimate: submission.conditionEstimate,
      serviceType: submission.serviceType,
      submissionStatus: submission.submissionStatus,
      user: {
        name: submission.fullName,
        email: submission.email
      }
    };

    // Call the mutation with our submission data
    updateSubmission.mutate({
      id: submission.id,
      values,
      frontImage: submission.frontImage instanceof File ? submission.frontImage : undefined,
      backImage: submission.backImage instanceof File ? submission.backImage : undefined
    }, {
      onSuccess: (data) => {
        // Update the submission store with the response data
        const updatedSubmission = data.data.submission;
        const updatedCard = data.data.card;
        const updatedUser = data.data.user;

        // Update our local submission state
        setSubmission({
          trackingNumber: updatedSubmission.trackingNumber,
          overallProgress: updatedSubmission.overallProgress,
          estimatedCompletion: updatedSubmission.estimatedCompletion,
          submissionStatus: updatedSubmission.submissionStatus,
          frontImage: updatedCard?.frontImage || submission.frontImage,
          backImage: updatedCard?.backImage || submission.backImage,
          cardName: updatedCard?.cardName || submission.cardName,
          category: updatedCard?.category || submission.category,
          yearOfRelease: updatedCard?.yearOfRelease || submission.yearOfRelease,
          conditionEstimate: updatedCard?.conditionEstimate || submission.conditionEstimate,
          fullName: updatedUser?.fullName || submission.fullName,
          email: updatedUser?.email || submission.email,
          editing: false
        });

        // Navigate to submission status page
        router.push(`/dashboard/submission-status/${submission.id}`);
      }
    });
  };

  // Prepare data for the SubmissionSummary component
  const summaryData = useMemo(() => {
    return {
      cardName: submission.cardName,
      category: submission.category,
      yearOfRelease: submission.yearOfRelease?.toString() || "",
      condition: submission.conditionEstimate,
      submissionDate: formatToUSTimezone(submission.submissionDate || ""),
      status: submission.submissionStatus,
      name: submission.fullName as string,
      email: submission.email as string,
      orderId: padId(submission.id)
    };
  }, [submission]);

  return (
    <div className="bg-white border-md px-4 py-4 rounded-md">
      <div className="mb-2">
        <h1 className="heading-primary font-bold mb-1">
          Update Card Details
        </h1>
        <p className="heading-tertiary text-muted-foreground">
          Modify information about the submitted card
        </p>
      </div>

      <div className="overflow-hidden">
        <h3 className="heading-tertiary mb-2">Card Images</h3>
        <div className="flex-col md:flex-row flex-between gap-4">
          <ImageEditor
            image={
              frontImagePreview
                ? { url: frontImagePreview, alt: "Front" }
                : undefined
            }
            placeholder="Drag and drop your card front image here"
            onAddImage={(files) => handleUploadImage("frontImage", files[0])}
            onDeleteImage={() => handleRemoveImage("frontImage")}
          />

          <ImageEditor
            image={
              backImagePreview
                ? { url: backImagePreview, alt: "Back" }
                : undefined
            }
            placeholder="Drag and drop your card back image here"
            onAddImage={(files) => handleUploadImage("backImage", files[0])}
            onDeleteImage={() => handleRemoveImage("backImage")}
          />
        </div>
      </div>

      <SubmissionSummary
        title="Submission Summary"
        data={summaryData}
        isEditable={true}
        onSubmit={(fields) =>
          handleUpdate({
            cardName: fields.cardName,
            category: fields.category,
            yearOfRelease: Number(fields.yearOfRelease),
            conditionEstimate: fields.condition,
            submissionStatus: fields.status,
            fullName: fields.name,
            email: fields.email,
          })
        }
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        classNames="mt-4"
      />

      <div className="flex items-center gap-6 ml-6 mt-4">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="max-w-[8rem] w-full rounded-full heading-secondary bg-[#E0E0E0] hover:bg-gray-300 hover:text-black"
        >
          Back
        </Button>
        <ButtonGradient
          onClick={handleSubmit}
          className="max-w-[8rem] w-full"
          disabled={updateSubmission.isPending || isEditing}
        >
          {updateSubmission.isPending ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Updating...
            </>
          ) : (
            "Update"
          )}
        </ButtonGradient>
      </div>
    </div>
  );
}