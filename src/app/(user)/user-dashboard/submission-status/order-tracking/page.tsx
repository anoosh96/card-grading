'use client'

import { Button } from "@/components/ui/button";
import ProgressTracker from "./ProgressTracker";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import { useRouter, useSearchParams } from "next/navigation";
// import { useSubmissionById } from "@/hooks/useSubmissionById"; // REMOVE THIS IMPORT
import { useCardDetailsUser } from "@/hooks/useCardDetailsUser"; // IMPORT THE NEW HOOK
import { Suspense } from "react"; // Removed useMemo as selectedCard logic changes
import { OrderTrackingSkeleton } from "@/components/skeletons/DashboardSkeleton";
import { cardStatusMap } from "@/app/(user)/lib/utils/helpers"; // submissionStatusMap will no longer be directly applicable for a single card

function OrderTracking() {
  const router = useRouter();
  const params = useSearchParams();
  const submissionId = params.get('id') as string;
  const cardId = params.get('cardId') as string; // Ensure cardId is always string for hook usage

  // Use the useCardDetailsUser hook to fetch the specific card
  const { data: selectedCard, isLoading, isError } = useCardDetailsUser(submissionId, cardId);

  // We are now exclusively in "card view" in this component's logic if cardId is provided
  // Removed isCardView boolean as it's implied by presence of cardId
  
  if (!submissionId || !cardId) {
    return <div className="p-5 text-red-500">Missing **submission ID** or **card ID**. This page is designed to track a specific card.</div>;
  }

  if (isLoading) {
    return <OrderTrackingSkeleton />;
  }

  // Check for error or if selectedCard is null/undefined after loading
  if (isError || !selectedCard) {
    return <div className="p-5 text-red-500">Failed to load **card details** or card not found.</div>;
  }

  // Determine tracking parameters directly from selectedCard
  const trackingParams = {
    trackingNumber: selectedCard.trackingNumber as string,
    overallProgress: selectedCard.overallProgress as number,
    estimatedCompletion: selectedCard.estimatedCompletion as string,
    submissionStatus: cardStatusMap[selectedCard.status as string],
    turnAroundTime: selectedCard.service?.turnAroundTime || '10d'
  };

  const handleBackClick = () => {
    router.back();
  };

  const handleDoneClick = () => {
    // If tracking a specific card, typically go back to the submission's cards list
    router.push(`/user-dashboard/submission-status?id=${submissionId}`); // Assuming this is the path to view all cards in a submission
  };

  return (
    <section className="p-4 sm:p-7 bg-white">
      <div className="flex items-center justify-between mb-4">
        {/* Always display 'Card Tracking' as we are focused on a single card */}
        <h1 className="heading-primary font-bold">Card Tracking</h1>
        {/* The "Card X of Y" display needs total cards from the submission, 
            which we no longer fetch. You might remove this or fetch submission 
            details if this specific feature is critical. 
            For now, I'm removing it.
        */}
      </div>
      
      <p className="mt-4 mb-10">
        Monitor the progress of your card: **{selectedCard?.cardName}**
      </p>

      <ProgressTracker {...trackingParams} />

      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <Button
          size={"lg"}
          className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-3 px-14 text-base hover:bg-soft-grey"
          onClick={handleBackClick}
        >
          Back
        </Button>
        <ButtonGradient 
          size={"lg"} 
          className="py-3 px-14 h-auto" 
          onClick={handleDoneClick}
        >
          Done
        </ButtonGradient>
      </div>
    </section>
  )
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<OrderTrackingSkeleton />}>
      <OrderTracking />
    </Suspense>
  )
}