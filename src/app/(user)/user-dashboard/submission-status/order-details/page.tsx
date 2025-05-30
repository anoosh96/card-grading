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
import { Suspense, useEffect, useState } from "react";
import { OrderDetailsSkeleton } from "@/components/skeletons/DashboardSkeleton";
import { formatToUSTimezone, padId } from "@/lib/utils";
import { submissionStatus } from "@/app/(user)/lib/utils/constants";
import { useSubmissionStore } from "@/stores/submissionStore";
import { usePdfDownload } from "@/hooks/pdf/usePdfDownload";
import { Loader2 } from "lucide-react";

function OrderDetails() {
  const router = useRouter();
  const params = useSearchParams();
  const submissionId = params.get('id') as string;
  const { user } = useUserStore()

  const { data, isLoading, isError } = useSubmissionById(submissionId);
  const { downloadPdf, isGeneratingPDF } = usePdfDownload()
  const { setSubmission } = useSubmissionStore()
  // const [reportPdfUrl, setReportPdfUrl] = useState('')

  useEffect(() => {
    if (data) {
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
        aiRemarks: card?.grade?.aiRemarks || '',
        cardId: card.id,
        gradeData: card.grade
      });
    }
  }, [data, setSubmission]); // Add isEditMode to dependency array

  if (!submissionId) {
    return <div className="p-5 text-red-500">Missing submission ID.</div>;
  }

  if (isLoading) {
    return <OrderDetailsSkeleton />;
  }

  if (isError || !data?.data) {
    return <div className="p-5 text-red-500">Failed to load order details.</div>;
  }

  const submission = data.data;

  // Map API data to your SubmissionSummary's expected type
  const submissionSummaryData: SubmissionData = {
    name: user?.fullName as string,
    email: user?.email as string,
    orderId: padId(submission.id),
    cardName: submission.card.cardName,
    category: submission.card.category,
    yearOfRelease: submission.card.yearOfRelease,
    condition: submission.card.conditionEstimate,
    submissionDate: formatToUSTimezone(submission.dateTime),
    status: formatSubmissionStatus(submission.submissionStatus),
  };

  return (
    <section className="bg-white p-7">
      <h1 className="heading-primary font-bold mb-10">Order Details</h1>

      {submission.card.frontImage &&
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
        <ButtonGradient size={"lg"} className="py-3 px-14 h-auto" onClick={downloadPdf} disabled={submission.submissionStatus !== submissionStatus.GRADING_COMPLETE || isGeneratingPDF}>
          {isGeneratingPDF ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Downloading Report...
            </>
          ) : (
            "Download Report"
          )}
        </ButtonGradient>
      </div>
    </section>
  );
}

export default function OrderDetailsPage() {
  return (
    <Suspense fallback={<OrderDetailsSkeleton />}>
      <OrderDetails />
    </Suspense>
  )
}
