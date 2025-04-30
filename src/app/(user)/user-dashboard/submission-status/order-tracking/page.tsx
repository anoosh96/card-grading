'use client'

import { Button } from "@/components/ui/button";
import ProgressTracker from "./ProgressTracker";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import { useRouter, useSearchParams } from "next/navigation";
import { useSubmissionById } from "@/hooks/useSubmissionById";
import { Suspense } from "react";
import { OrderTrackingSkeleton } from "@/components/skeletons/DashboardSkeleton";


function OrderTracking() {
  const router = useRouter()
  const params = useSearchParams()
  const submissionId = params.get('id') as string;
  const { data, isLoading, isError } = useSubmissionById(submissionId);

  if (!submissionId) {
    return <div className="p-5 text-red-500">Missing submission ID.</div>;
  }

  if (isLoading) {
    return <OrderTrackingSkeleton />;
  }

  if (isError || !data?.data) {
    return <div className="p-5 text-red-500">Failed to load order details.</div>;
  }

  const submission = data.data

  const trackingParams = {
    trackingNumber: submission.trackingNumber,
    overallProgress: submission.overallProgress,
    estimatedCompletion: submission.estimatedCompletion,
    submissionStatus: submission.submissionStatus
  }


  return (
    <section className="p-7 bg-white">
      <h1 className="heading-primary font-bold">Order Tracking</h1>
      <p className="mt-4 mb-10">Monitor the progress of your card grading</p>

      <ProgressTracker {...trackingParams} />

      <div className="flex gap-6 mt-8">
        <Button
          size={"lg"}
          className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-3 px-14 text-base hover:bg-soft-grey"
          onClick={() => router.back()}
        >
          Back
        </Button>
        <ButtonGradient size={"lg"} className="py-3 px-14 h-auto" 
          onClick={() => router.back()}
        >
          Done
        </ButtonGradient>
      </div>
    </section>
  )
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderTracking />
    </Suspense>
  )
}