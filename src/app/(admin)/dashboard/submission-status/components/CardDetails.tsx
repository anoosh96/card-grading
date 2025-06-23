"use client";

import React, { useMemo, useState, useEffect } from "react";
import ImageEditor from "@/components/common/ImagePicker/ImageEditor";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import { Button } from "@/components/ui/button";
import SubmissionSummary from "../components/SubmissionSummary";
import { CardData } from "@/stores/submissionStore"; // Still need CardData type
import { useRouter } from "next/navigation"; // No longer need useParams, useSearchParams for cardId here
import { useUpdateSubmission } from "@/hooks/useUpdateSubmission";
import { FlexibleRecord } from "@/types";
import { Loader2 } from "lucide-react";
import { padId } from "@/lib/utils"; // Assuming padId is still used for summary
import { serviceType } from "@/app/(user)/lib/utils/constants";
import { handleRequestSuccess } from "@/lib/toast";

// Define props interface for CardDetails
interface CardDetailsProps {
  currentCard: CardData; // The specific card data passed as a prop
}

export default function CardDetails({ currentCard: initialCard }: CardDetailsProps) {
  const router = useRouter();

  // Local state to manage the card data being edited
  // This is initialized with the prop but can be updated locally.
  const [cardBeingEdited, setCardBeingEdited] = useState<CardData>(initialCard);

  // Sync local state when the initialCard prop changes (e.g., from a re-fetch in parent)
  useEffect(() => {
    setCardBeingEdited(initialCard);
  }, [initialCard]);

  const [isEditingSummary, setIsEditingSummary] = useState(false); // Renamed to avoid conflict with `isEditing` prop usage in the previous version

  // Use our mutation hook
  const updateSubmission = useUpdateSubmission();

  // Memoized preview URLs for current card being edited
  const frontImagePreview = useMemo(() => {
    if (!cardBeingEdited.frontImage) return undefined;
    if (typeof cardBeingEdited.frontImage === 'string') return cardBeingEdited.frontImage;
    return URL.createObjectURL(cardBeingEdited.frontImage as File);
  }, [cardBeingEdited.frontImage]);

  const backImagePreview = useMemo(() => {
    if (!cardBeingEdited.backImage) return undefined;
    if (typeof cardBeingEdited.backImage === 'string') return cardBeingEdited.backImage;
    return URL.createObjectURL(cardBeingEdited.backImage as File);
  }, [cardBeingEdited.backImage]);

  // Handle image uploads locally
  const handleUploadImage = (type: "frontImage" | "backImage", file: File) => {
    setCardBeingEdited(prevCard => ({
      ...prevCard,
      [type]: file
    }));
  };

  // Handle image removal locally
  const handleRemoveImage = (type: "frontImage" | "backImage") => {
    setCardBeingEdited(prevCard => ({
      ...prevCard,
      [type]: null // Or undefined, depending on your CardData type's nullable image fields
    }));
  };

  // Update summary data locally
  const handleUpdateSummary = (updated: Partial<CardData>) => {
    setCardBeingEdited(prevCard => ({
      ...prevCard,
      cardName: updated.cardName ?? prevCard.cardName, // Use nullish coalescing for better handling of empty strings
      category: updated.category ?? prevCard.category,
      yearOfRelease: updated.yearOfRelease ?? prevCard.yearOfRelease,
      status: updated.status ?? prevCard.status,
      // Add other card-specific fields as needed
    }));
  };

  const handleSubmit = () => {
    // Ensure we have a submissionId and card data to work with

    // Prepare the values object for the API - now card-specific from local state
    const values: FlexibleRecord = {
      cardName: cardBeingEdited.cardName,
      category: cardBeingEdited.category,
      yearOfRelease: cardBeingEdited.yearOfRelease,
      cardId: cardBeingEdited.id // Use id from cardBeingEdited
    };

    if(cardBeingEdited.status !== initialCard.status){
      values.status = cardBeingEdited.status
    }

    // Call the mutation with our data
    updateSubmission.mutate({
      id: Number(cardBeingEdited.submissionId), // Use submissionId from props
      values,
      frontImage: cardBeingEdited.frontImage instanceof File ? cardBeingEdited.frontImage : undefined,
      backImage: cardBeingEdited.backImage instanceof File ? cardBeingEdited.backImage : undefined
    }, {
      onSuccess: (data) => {
        // No longer setting submission state in store here.
        // The parent component (SubmissionStatusPage) would be responsible
        // for re-fetching the updated card data if needed, which it does automatically
        // when currentCard prop changes, triggering the useEffect in this component.

        // Navigate back to submission status page, passing current cardId
        handleRequestSuccess(data?.message);
        router.push(`/dashboard/submission-status/${cardBeingEdited.submissionId}?cardId=${cardBeingEdited.id}`);
      },
      onError: (error) => {
        console.error("Failed to update card details:", error);
      }
    });
  };

  // Prepare data for the SubmissionSummary component using local card data
  const summaryData = useMemo(() => {
    if (!cardBeingEdited) return null;

    return {
      orderId: padId(cardBeingEdited.submissionId as number), // Use submissionId from props
      cardName: cardBeingEdited.cardName,
      category: cardBeingEdited.category,
      yearOfRelease: cardBeingEdited.yearOfRelease?.toString() || "",
      status: cardBeingEdited.status as string,
      service: cardBeingEdited.service?.name || serviceType.BULK_SUBMISSION,
      // Removed submission-specific fields like name, email, submissionDate
      // as they are not available directly on the card or in this component's scope
    };
  }, [cardBeingEdited]);

  // Render loading/error/not found states based on the currentCard prop coming from parent
  // These checks are usually done in the parent component that fetches the data.
  // We keep a basic check here if `initialCard` itself is null or `summaryData` can't be formed.
  if (!initialCard || !summaryData) { // Check initialCard as a safeguard
    return (
      <div className="bg-white border-md px-4 py-4 rounded-md">
        <h2 className="heading-primary font-bold">Card Not Available</h2>
        <p className="heading-tertiary text-muted-foreground">
          Card details could not be loaded.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border-md px-4 py-4 rounded-md">
      <div className="mb-2">
        <h1 className="heading-primary font-bold mb-1">
          Update Card Details
        </h1>
        <p className="heading-tertiary text-muted-foreground">
          Modify information about {cardBeingEdited.cardName || 'the submitted card'}
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
          handleUpdateSummary({
            cardName: fields.cardName,
            category: fields.category,
            yearOfRelease: Number(fields.yearOfRelease),
            status: fields.status,
          })
        }
        isEditing={isEditingSummary} // Use the local state for editing summary
        setIsEditing={setIsEditingSummary}
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
          disabled={updateSubmission.isPending || isEditingSummary} // Disable if updating or summary is being edited
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