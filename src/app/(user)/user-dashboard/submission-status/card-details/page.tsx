'use client'

import { Button } from "@/components/ui/button";
import CardImages from "./CardImages";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import { useRouter, useSearchParams } from "next/navigation";
import SubmissionSummary from "@/app/(admin)/dashboard/submission-status/components/SubmissionSummary";
import { SubmissionData } from "@/app/(admin)/dashboard/submission-status/add-post/add-post-types";
import { useUserStore } from "@/stores/userStore";
import { formatCardStatus } from "@/app/(user)/lib/utils/helpers";
import { Suspense, useState } from "react";
import { OrderDetailsSkeleton } from "@/components/skeletons/DashboardSkeleton";
import { formatToUSTimezone, padId } from "@/lib/utils";
import { cardStatus, serviceType } from "@/app/(user)/lib/utils/constants";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useCardDetailsUser } from "@/hooks/useCardDetailsUser";
import { reactPDFGenerator } from "@/utils/pdf-generator";
import { GradingData } from "@/app/(admin)/dashboard/types";
import { showToast } from "@/lib/toast";

function CardDetails() {
  const router = useRouter();
  const params = useSearchParams();
  const submissionId = params.get('id') as string;
  const cardId = params.get('cardId') as string;

  const { user } = useUserStore();

  const { data: displayCard, isLoading, isError } = useCardDetailsUser(submissionId, cardId);

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  if (!submissionId || !cardId) {
    return <div className="p-5 text-red-500">Missing **submission ID** or **card ID**.</div>;
  }

  if (isLoading) {
    return <OrderDetailsSkeleton />;
  }

  if (isError || !displayCard) {
    return <div className="p-5 text-red-500">Failed to load **card details**.</div>;
  }

  // Map API data to your SubmissionSummary's expected type
  const submissionSummaryData: SubmissionData = {
    name: user?.fullName as string,
    email: user?.email as string,
    orderId: padId(Number(submissionId)),
    cardName: displayCard.cardName,
    category: displayCard.category,
    yearOfRelease: displayCard.yearOfRelease as string,
    service: displayCard.service?.name || serviceType.BULK_SUBMISSION,
    submissionDate: formatToUSTimezone(displayCard.createdAt as string),
    status: formatCardStatus(displayCard.status as string),
  };

  // Determine if PDF download should be enabled based on card status and existence of grade data
  // CORRECTED: Using displayCard.grade instead of displayCard.gradeData
  const canDownloadPdf = (
    displayCard.status === cardStatus.GRADING_COMPLETE &&
    !!displayCard.grade // Check if the 'grade' object exists
  );

  const handleBackClick = () => {
    router.back();
  };

  const handleDownloadPdf = async () => {
    // CORRECTED: Using displayCard.grade instead of displayCard.gradeData
    if (!displayCard || !displayCard.grade) {
      console.error("No grading data available for PDF generation.");
      showToast("No grading data found for this card.", { variant: 'error' });
      return;
    }

    setIsGeneratingPDF(true);

    try {
      // Construct GradingData directly from displayCard.grade
      const gradeDataToDownload: GradingData = {
        graded_by: 'Prescision Grading™', // You might want to get this from displayCard.grade if available
        grade: displayCard.grade.grade,
        condition_tier: displayCard.grade.conditionTier || "Not Graded",
        ai_summary: displayCard.grade.aiSummary,
        condition_breakdown: displayCard.grade.conditionBreakdown,
        frontImage: displayCard.frontImage as string,
        backImage: displayCard.backImage as string,
        final_score: String(displayCard.grade.finalScore),
        overall_justification: displayCard.grade.overallJustification,
        card_name: displayCard.cardName,
        card_number: displayCard.grade.cardNumber,
        grading_date: formatToUSTimezone(displayCard.grade.gradeDate as string)
      };

      await reactPDFGenerator.generatePDF(gradeDataToDownload, undefined, true);
      showToast("PDF report downloaded successfully!", { variant: 'success' });
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      showToast("Failed to generate PDF report. Please try again.", { variant: 'error' });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <section className="bg-white p-4 lg:p-7">
      <div className="flex items-center justify-between mb-10">
        <h1 className="heading-primary font-bold">Card Details</h1>
      </div>

      {displayCard.frontImage &&
        <CardImages
          frontImage={displayCard.frontImage as string}
          backImage={displayCard.backImage as string}
        />
      }

      <SubmissionSummary
        title="Card Summary"
        data={submissionSummaryData}
        onSubmit={(e) => console.log(e)}
        classNames="mt-4"
      />

      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <Button
          size={"lg"}
          className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-3 px-14 text-base hover:bg-soft-grey"
          onClick={handleBackClick}
        >
          Back
        </Button>

        <Link href={`/user-dashboard/submission-status/order-tracking?id=${submissionId}&cardId=${cardId}`}>
          <Button
            size={"lg"}
            className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-3 px-14 text-base hover:bg-soft-grey w-full"
          >
            Track
          </Button>
        </Link>

        <ButtonGradient
          size={"lg"}
          className="py-3 px-14 h-auto"
          onClick={handleDownloadPdf}
          disabled={!canDownloadPdf || isGeneratingPDF}
        >
          {isGeneratingPDF ? (
            <>
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
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

export default function CardDetailsPage() {
  return (
    <Suspense fallback={<OrderDetailsSkeleton />}>
      <CardDetails />
    </Suspense>
  )
}