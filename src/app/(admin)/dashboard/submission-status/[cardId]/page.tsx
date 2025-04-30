'use client'

import { submissionStatus } from "@/app/(user)/lib/utils/constants";
import { useAdminSubmissionDetails } from "@/hooks/useAdminSubmissionDetails";
import { useSubmissionStore } from "@/stores/submissionStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import CardDetails from "../components/CardDetails";
import OrderDetails from "../components/OrderDetails";
import { OrderDetailsSkeleton } from "@/components/skeletons/DashboardSkeleton";


export default function SubmissionStatusPage() {
  const { cardId } = useParams();
  const { data, isLoading, isError } = useAdminSubmissionDetails(cardId as string);
  const { submission, setSubmission } = useSubmissionStore();

  useEffect(() => {
    if (data) {
      console.log(data)
      const {
        id,
        trackingNumber,
        overallProgress,
        submissionStatus,
        estimatedCompletion,
        submissionSource,
        dateTime,
        card,
        user
      } = data.data;

      setSubmission({
        id,
        cardName: card.cardName,
        category: card.category,
        cardType: card.cardType,
        yearOfRelease: card.yearOfRelease,
        conditionEstimate: card.conditionEstimate,
        serviceType: card.serviceType, // Populate as needed
        frontImage: card.frontImage,
        backImage: card.backImage,
        submissionSource,
        trackingNumber,
        overallProgress,
        estimatedCompletion,
        submissionStatus,
        step: 1, // Set appropriately
        fullName: user.fullName, // Populate as needed
        shippingAddress: user.shippingAddress, // Populate as needed
        phoneNumber: user.phoneNumber, // Populate as needed
        submissionDate: dateTime,
        email: user.email,
        grade: card?.grade?.grade,
        aiRemarks: card?.grade?.aiRemarks || ''
      });
    }
  }, [data, setSubmission]);

  if (isLoading) {
    return <OrderDetailsSkeleton />;
  }

  if (isError) {
    return <div>Error loading submission details.</div>;
  }

  if (!data || !submission?.id) {
    return <div>No submission data available.</div>;
  }

  return (
    <>
      {
        submission.submissionStatus !== submissionStatus.SUBMISSION_PENDING && !submission.editing 
          ?
          <OrderDetails />
          :
          <CardDetails />
      }
    </>
  )
}