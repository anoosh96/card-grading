'use client'

import { Button } from "@/components/ui/button";
import CardImages from "./CardImages";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import { useRouter, useSearchParams } from "next/navigation";
import SubmissionSummary from "@/app/(admin)/dashboard/submission-status/components/SubmissionSummary";
import { useSubmissionById } from "@/hooks/useSubmissionById";
import { SubmissionData } from "@/app/(admin)/dashboard/submission-status/add-post/add-post-types";
import { useUserStore } from "@/stores/userStore";
import { formatSubmissionStatus } from "@/app/(user)/lib/utils/helpers";
import { Suspense } from "react";

function OrderDetails() {
  const router = useRouter();
  const params = useSearchParams();
  const submissionId = params.get('id') as string;
  const { user } = useUserStore()

  const { data, isLoading, isError } = useSubmissionById(submissionId);

  if (!submissionId) {
    return <div className="p-5 text-red-500">Missing submission ID.</div>;
  }

  if (isLoading) {
    return <div className="p-5">Loading order details…</div>;
  }

  if (isError || !data?.data) {
    return <div className="p-5 text-red-500">Failed to load order details.</div>;
  }

  const submission = data.data;

  // Map API data to your SubmissionSummary's expected type
  const submissionSummaryData: SubmissionData = {
    name: user?.fullName as string,
    email: user?.email as string,
    orderId: submission.trackingNumber,
    cardName: submission.card.cardName,
    category: submission.card.category,
    yearOfRelease: submission.card.yearOfRelease,
    condition: submission.card.conditionEstimate,
    submissionDate: submission.dateTime,
    status: formatSubmissionStatus(submission.submissionStatus),
  };

  return (
    <section className="bg-white p-7">
      <h1 className="heading-primary font-bold mb-10">Order Details</h1>

      { submission.card.frontImage &&
        <CardImages
          frontImage={submission.card.frontImage}
          backImage={submission.card.backImage}
        />
      }

      <SubmissionSummary
        title="Submission Summary"
        data={submissionSummaryData}
        onSubmit={(e) => console.log(e)}
        classNames="mt-4"
      />

      <div className="flex gap-6 mt-8">
        <Button
          size={"lg"}
          className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-3 px-14 text-base hover:bg-soft-grey"
          onClick={() => router.back()}
        >
          Back
        </Button>
        <ButtonGradient size={"lg"} className="py-3 px-14 h-auto">
          Done
        </ButtonGradient>
      </div>
    </section>
  );
}

export default function OrderDetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderDetails />
    </Suspense>
  )
}
