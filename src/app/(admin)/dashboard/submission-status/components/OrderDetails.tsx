// components/CardDetailedView.tsx
"use client";

import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CardData } from "@/stores/submissionStore";
import SubmissionSummary from "./SubmissionSummary";
import CardImages from "@/app/(user)/user-dashboard/submission-status/card-details/CardImages";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import { Button } from "@/components/ui/button";
import { SubmissionData } from "../add-post/add-post-types";
import { formatCardStatus } from "@/app/(user)/lib/utils/helpers";
import { useUpdateSubmission } from "@/hooks/useUpdateSubmission";
import { cardStatus, serviceType, submissionStatus } from "@/app/(user)/lib/utils/constants";
import { formatToUSTimezone, padId } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { reactPDFGenerator } from "@/utils/pdf-generator";
import { showToast } from "@/lib/toast";
import { GradingData } from "../../types";
import { FlexibleRecord } from "@/types";

interface OrderDetailsProp {
  currentCard: CardData
}

const OrderDetails = ({ currentCard }: OrderDetailsProp) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cardId = searchParams.get('cardId');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);


  const updateSubmission = useUpdateSubmission();

  const updateStatus = (status: string, redirect: string, successMessage: boolean = true) => {
    if (!currentCard) return;

    if (currentCard.status == cardStatus.GRADING_IN_PROGRESS && status == cardStatus.GRADING_IN_PROGRESS) {
      router.push(redirect);
      return;
    }

    const values: FlexibleRecord = {
      cardId: currentCard.id,
      status
    };

    // Call the mutation with our submission data
    updateSubmission.mutate({
      id: currentCard.submissionId as number,
      values
    }, {
      onSuccess: () => {
        // Navigate to submission status page with cardId
        router.push(redirect);
        if (successMessage) {
          showToast('Submission updated successfully!', { variant: 'success' });
        }
      }
    });
  };

  // Prepare submission summary data using current card

  const handleDownloadPdf = async () => {
    // CORRECTED: Using currentCard.grade instead of currentCard.gradeData
    if (!currentCard || !currentCard.grade) {
      console.error("No grading data available for PDF generation.");
      showToast("No grading data found for this card.", { variant: 'error' });
      return;
    }

    setIsGeneratingPDF(true);

    try {
      // Construct GradingData directly from currentCard.grade
      const gradeDataToDownload: GradingData = {
        graded_by: 'Prescision Grading™', // You might want to get this from currentCard.grade if available
        grade: currentCard.grade.grade,
        condition_tier: currentCard.grade.conditionTier || "Not Graded",
        ai_summary: currentCard.grade.aiSummary,
        condition_breakdown: currentCard.grade.conditionBreakdown,
        frontImage: currentCard.frontImage as string,
        backImage: currentCard.backImage as string,
        final_score: String(currentCard.grade.finalScore),
        overall_justification: currentCard.grade.overallJustification,
        card_name: currentCard.cardName,
        card_number: currentCard.grade.cardNumber,
        grading_date: formatToUSTimezone(currentCard.grade.gradeDate as string)
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


  const submissionSummaryData: SubmissionData = useMemo(() => {
    return {
      // name: submission?.user?.fullName as string,
      // email: submission?.user?.email as string,
      orderId: padId(currentCard.submissionId as number),
      cardName: currentCard?.cardName as string,
      category: currentCard?.category as string,
      yearOfRelease: String(currentCard?.yearOfRelease || ''),
      submissionDate: formatToUSTimezone(currentCard.createdAt as string),
      status: formatCardStatus(currentCard?.status as string),
      service: currentCard?.service?.name || serviceType.BULK_SUBMISSION as string
    };
  }, [currentCard]);

  // Memoized preview URLs for current card
  const frontImagePreview = useMemo(() => {
    if (!currentCard?.frontImage) return undefined;
    if (typeof currentCard.frontImage === 'string') return currentCard.frontImage;
    return URL.createObjectURL(currentCard.frontImage as File);
  }, [currentCard?.frontImage]);

  const backImagePreview = useMemo(() => {
    if (!currentCard?.backImage) return undefined;
    if (typeof currentCard.backImage === 'string') return currentCard.backImage;
    return URL.createObjectURL(currentCard.backImage as File);
  }, [currentCard?.backImage]);

  // Get current card status for conditional rendering
  const currentCardStatus = currentCard?.status

  // Don't render if no current card
  if (!currentCard || !submissionSummaryData) {
    return (
      <div className="bg-white border-md px-4 py-4 rounded-md">
        <h2 className="heading-primary font-bold">Card Not Found</h2>
        <p className="heading-tertiary text-muted-foreground">
          The requested card could not be found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border-md px-4 py-4 rounded-md">
      <div className="mb-2">
        <h1 className="heading-primary font-bold mb-1">Card Status</h1>
        <p className="heading-tertiary text-muted-foreground">
          Latest actions for {currentCard.cardName || 'this card'} across the grading workflow
        </p>
      </div>

      <div>
        <CardImages
          frontImage={frontImagePreview || "/assets/images/default-front.png"}
          backImage={backImagePreview || "/assets/images/default-back.png"}
        />
      </div>

      <SubmissionSummary
        title="Card Summary"
        data={submissionSummaryData}
        onSubmit={() => { }}
        classNames="mt-4"
      />

      <div className="flex flex-col sm:flex-row items-center gap-6 ml-2 sm:ml-6 mt-4">
        <Button
          onClick={() => router.back()}
          variant={"ghost"}
          className="rounded-full w-full sm:w-28 text-light-grey-100 heading-secondary font-medium bg-[#E0E0E0] hover:bg-gray-300 hover:text-black"
          disabled={updateSubmission.isPending}
        >
          Back
        </Button>

        <Button
          onClick={() => router.push(`/dashboard/submission-status/${currentCard.submissionId}?cardId=${currentCard.id}&edit=true`)}
          variant={"ghost"}
          className="rounded-full w-full sm:w-auto text-light-grey-100 heading-secondary font-medium bg-[#E0E0E0] hover:bg-gray-300 hover:text-black"
          disabled={updateSubmission.isPending}
        >
          Edit Card
        </Button>

        <ButtonGradient
          onClick={() => updateStatus(cardStatus.GRADING_IN_PROGRESS,
            `/dashboard/grading-review/generate-certificate?submissionId=${currentCard.submissionId}&cardId=${cardId}`, false)}
          className="w-full sm:max-w-[8rem]"
          disabled={currentCardStatus == cardStatus.CARD_REJECTED || updateSubmission.isPending}
        >
          {!currentCard.grade ? 'Start Grading' : 'Edit Grade'}
        </ButtonGradient>

        {
          currentCardStatus !== submissionStatus.GRADING_COMPLETE &&
          <Button
            onClick={() => updateStatus(cardStatus.CARD_REJECTED, `/dashboard/submission-status/${currentCard.submissionId}?cardId=${cardId}`)}
            variant={"ghost"}
            className="rounded-full w-full sm:w-auto text-light-grey-100 heading-secondary font-medium bg-[#E0E0E0] hover:bg-gray-300 hover:text-black"
            disabled={updateSubmission.isPending || currentCardStatus == cardStatus.CARD_REJECTED}
          >
            {"Reject Card"}
          </Button>
        }

        {
          currentCard.grade &&
          <ButtonGradient
            onClick={handleDownloadPdf} // Pass cardId for card-specific PDF
            className="max-w-[12rem] w-full"
            disabled={isGeneratingPDF || !currentCard?.grade}
          >
            {isGeneratingPDF ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Downloading Report...
              </>
            ) : (
              "Download Report"
            )}
          </ButtonGradient>
        }
      </div>
    </div>
  );
};

export default OrderDetails;