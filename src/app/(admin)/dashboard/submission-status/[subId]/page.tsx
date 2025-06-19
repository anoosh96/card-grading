'use client'

import { cardStatus } from "@/app/(user)/lib/utils/constants";
import { useCardDetails } from "@/hooks/useCardDetails"; // Using the provided useCardDetails hook
import { useParams, useSearchParams } from "next/navigation";
import CardDetails from "../components/CardDetails";
import OrderDetails from "../components/OrderDetails"; // IMPORTANT: OrderDetails will likely need its own data fetching
import { OrderDetailsSkeleton } from "@/components/skeletons/DashboardSkeleton";
import { Suspense } from "react";

function SubmissionStatusComponent() {
  const { subId } = useParams(); // This is the submission ID
  const searchParams = useSearchParams();

  const isEditMode = searchParams.get('edit') === 'true';
  const cardIdParam = searchParams.get('cardId'); // Get cardId from URL params

   // --- Fetch Specific Card Details Directly ---
   const { 
    data: currentCard, // Direct assignment: data is now currentCard
    isLoading, 
    isError 
  } = useCardDetails(subId as string, cardIdParam as string);

  // --- Input Validation ---
  if (!subId || !cardIdParam) {
    return (
      <div className="p-4 sm:p-7 space-y-4 sm:space-y-6 bg-light-grey rounded-xl shadow-md">
        <h2 className="text-2xl sm:text-3xl text-red-600">Missing Information</h2>
        <p className="text-lg">
          To view specific card details, please provide both a Submission ID and a Card ID in the URL.
        </p>
      </div>
    );
  }

  // --- Loading, Error, and No Data States ---
  if (isLoading) {
    return <OrderDetailsSkeleton />; // Reusing skeleton
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-7 space-y-4 sm:space-y-6 bg-light-grey rounded-xl shadow-md">
        <h2 className="text-2xl sm:text-3xl text-red-600">Error Loading Card Details</h2>
        <p className="text-lg">
          There was an error fetching the card details for this submission. Please try again.
        </p>
      </div>
    );
  }

  if (!currentCard) { // If data is null/undefined after loading
    return (
      <div className="p-4 sm:p-7 space-y-4 sm:space-y-6 bg-light-grey rounded-xl shadow-md">
        <h2 className="text-2xl sm:text-3xl">Card Not Found</h2>
        <p className="text-lg">
          The requested card could not be found for the given Submission ID and Card ID.
        </p>
      </div>
    );
  }

  // --- Conditional Component Rendering ---
  // The logic now relies directly on currentCard data and isEditMode search param.
  // !submission.editing is replaced by !isEditMode.
  const showOrderDetails = currentCard.status !== cardStatus.CARD_PENDING && !isEditMode;

  return (
    <>
      {showOrderDetails ? (
        // WARNING: OrderDetails will NOT receive submission-level data from this page.
        // It MUST fetch its own data (e.g., using useAdminSubmissionDetails internally)
        // or receive all necessary data as props if it needs the broader submission context.
        <OrderDetails currentCard={currentCard} />
      ) : (
        // CardDetails can use currentCard data directly or fetch its own if it also uses useCardDetails internally.
        <CardDetails currentCard={currentCard} />
      )}
    </>
  );
}

export default function SubmissionStatusPage() {
  return (
    <Suspense fallback={<OrderDetailsSkeleton />}>
      <SubmissionStatusComponent />
    </Suspense>
  );
}