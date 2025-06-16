"use client";

import CardImages from "@/app/(user)/user-dashboard/submission-status/card-details/CardImages";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import { CardData as SubmissionCardData } from "@/stores/submissionStore";
import { formatToUSTimezone } from "@/lib/utils";
import CustomModal from "@/components/common/CustomModal";
import { cardStatus } from "@/app/(user)/lib/utils/constants"; // Assuming cardStatus comes from here
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useGradingRecommendation } from "@/hooks/grading/useGradingRecommendation";
import { useUserStore } from "@/stores/userStore";
import GradingReport from "./components/grading-report";
import { GradingData } from "../../types";
import { reactPDFGenerator } from "@/utils/pdf-generator";
import { ReportSkeleton } from "@/components/skeletons/AdminDashboardSkeleton";
import { useConfirmGrade } from "@/hooks/grading/useConfirmGrade";
// import { useAdminSubmissionDetails } from "@/hooks/useAdminSubmissionDetails"; // REMOVE THIS IMPORT
import { useCardDetails } from "@/hooks/useCardDetails"; // IMPORT THE NEW HOOK

const GenerateCertificate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const submissionId = searchParams.get('submissionId') as string;
  const cardId = searchParams.get('cardId') as string;

  // Use the new useCardDetails hook to fetch the specific card
  const { data: currentCard, isLoading: isCardLoading, isError: isCardError } = useCardDetails(submissionId, cardId);

  const { user } = useUserStore();
  const { mutateAsync: gradingRecommendation, isPending: isGradingPending, error: gradingError } = useGradingRecommendation();
  const confirmGrade = useConfirmGrade();

  const [isConfirmDoc, setIsConfirmDoc] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingPDFBackground, setIsGeneratingPDFBackground] = useState(false);
  const [isEditingReport, setIsEditingReport] = useState(false);

  // Initialize gradingData based on currentCard (now directly from useCardDetails)
  const [gradingData, setGradingData] = useState<GradingData | null | undefined>(null);
  const [pdfFile, setPdfFile] = useState<Blob | null>(null);
  

  // Effect to initialize gradingData if it exists on the fetched card
  useEffect(() => {
    if (currentCard?.grade) {
      setGradingData({
        graded_by: 'Prescision Grading™',
        grade: currentCard.grade?.grade,
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
      });
    }
  }, [currentCard]); // Depend on currentCard

  // Effect to fetch grading recommendation if card images are available and no grading data exists
  useEffect(() => {
    // Only fetch if currentCard is loaded, has images, and gradingData is not already set
    if (currentCard && currentCard.frontImage && currentCard.backImage && !gradingData && !currentCard.grade) {
      fetchGradingRecommendation();
    }
  }, [currentCard, gradingData]); // Depend on currentCard and gradingData state


  const getGradeInfo = (score: number) => {
    if (score >= 9.5) {
      return {
        grade: "★★★★★ Pristine",
        tier: "Tier 1 (Premium Collector Quality)",
        stars: "★★★★★"
      };
    } else if (score >= 9.0) {
      return {
        grade: "★★★★★ Mint",
        tier: "Tier 1 (Premium Collector Quality)",
        stars: "★★★★★"
      };
    } else if (score >= 8.0) {
      return {
        grade: "★★★★☆ Near Mint (NM)",
        tier: "Tier 2 (High Collector Quality)",
        stars: "★★★★☆"
      };
    } else if (score >= 7.0) {
      return {
        grade: "★★★☆☆ Excellent",
        tier: "Tier 3 (Good Collector Quality)",
        stars: "★★★☆☆"
      };
    } else {
      return {
        grade: "★★☆☆☆ Good",
        tier: "Tier 4 (Fair Collector Quality)",
        stars: "★★☆☆☆"
      };
    }
  };

  const fetchGradingRecommendation = async () => {
    if (!currentCard || !currentCard.frontImage || !currentCard.backImage || !user?.id) {
      // console.warn("Missing currentCard, images, or user ID for grading recommendation.");
      return;
    }
    try {
      const data = await gradingRecommendation({
        frontImage: currentCard.frontImage as string,
        backImage: currentCard.backImage as string,
        userId: user.id.toString() // Ensure userId is string if expected
      });
      console.log(data.data.card_details);
      const gradeInfo = getGradeInfo(data.data.card_details.final_score);

      setGradingData({
        ...data.data.card_details,
        graded_by: 'Prescision Grading™',
        grading_date: formatToUSTimezone(new Date().toISOString()),
        grade: gradeInfo.grade,
        condition_tier: gradeInfo.tier,
        ai_summary: `Our AI-powered grading engine evaluates each card using ultra-high resolution imaging and precision scoring across four key areas: Corners, Edges, Surface, and Centering.`,
        frontImage: currentCard.frontImage as string,
        backImage: currentCard.backImage as string,
        card_name: currentCard.cardName,
      });
    } catch (err) {
      console.error("Error fetching grading recommendation:", err);
      // Handle the error (e.g., show a toast)
    }
  };

  // Memoized preview URLs for the current card
  const frontImagePreview = useMemo(() => {
    if (!currentCard?.frontImage) return "/assets/images/default-front.png";
    if (typeof currentCard.frontImage === 'string') return currentCard.frontImage;
    return URL.createObjectURL(currentCard.frontImage as File);
  }, [currentCard?.frontImage]);

  const backImagePreview = useMemo(() => {
    if (!currentCard?.backImage) return "/assets/images/default-back.png";
    if (typeof currentCard.backImage === 'string') return currentCard.backImage;
    return URL.createObjectURL(currentCard.backImage as File);
  }, [currentCard?.backImage]);

  const updateStatus = async () => {
    if (!gradingData || !currentCard?.id) {
      console.error("Grading data or card ID is missing for confirmation.");
      return;
    }

    let pdf = pdfFile;
    if (!pdf) {
      setIsGeneratingPDFBackground(true);
      pdf = await reactPDFGenerator.generatePDF(gradingData as GradingData);
      setIsGeneratingPDFBackground(false);
    }

    await confirmGrade.mutateAsync({
      ...gradingData,
      pdfFile: pdf,
      cardId: currentCard.id,
      submissionId: parseInt(submissionId)
    } as GradingData);
    setIsConfirmDoc(true);
  };

  const handleReportGeneration = async () => {
    if (!gradingData) {
      console.error("No grading data available to generate PDF.");
      return;
    }
    setIsGeneratingPDF(true);

    try {
      const pdf = await reactPDFGenerator.generatePDF(gradingData as GradingData, undefined, true);
      setPdfFile(pdf);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleSubmit = (formdata: GradingData) => {
    setGradingData(formdata);
  };

  // --- Loading and Error States ---
  if (!submissionId || !cardId) {
    <p className="mt-6 text-neutral-grey">No grading data available for this card yet.</p>
  }

  // Use isCardLoading now for the primary data fetching state
  if (isCardLoading || isGradingPending) {
    return (<ReportSkeleton />);
  }

  // Handle errors from fetching the card or grading recommendation
  if (isCardError || gradingError) {
    return (
      <div className="p-5 text-red-500">
        <p className="mt-6 text-neutral-grey mb-4">
          {isCardError ? "Failed to load card details." : "Failed to Grade Card."}
        </p>
        {!isCardError && ( // Only show retry button if grading failed, not if card loading failed
          <ButtonGradient
            onClick={fetchGradingRecommendation}
            disabled={isGradingPending}
          >
            Retry Grading
          </ButtonGradient>
        )}
      </div>
    );
  }

  // Fallback if currentCard is null despite checks (should not happen often with `enabled` query)
  if (!currentCard) {
    return (
      <div className="bg-white border-md px-4 py-4 rounded-md">
        <h1 className="heading-primary font-bold mb-1">
          Official Card Grading Certificate
        </h1>
        <p className="mt-6 text-neutral-grey">No grading data available.</p>
      </div>
    )

  }

  return (
    <div className="bg-white border-md px-4 py-4 rounded-md">
      <div className="mb-4">
        <h1 className="heading-primary font-bold mb-1">
          Official Card Grading Certificate
        </h1>
        <p className="heading-tertiary text-muted-foreground">
          Card: {currentCard.cardName} (ID: {currentCard.id})
        </p>
      </div>

      {currentCard.status !== cardStatus.CARD_PENDING ? ( // Check currentCard status directly
        <>
          {gradingData ? (
            <GradingReport
              data={gradingData as GradingData}
              isEditable={true}
              onSubmit={handleSubmit}
              classNames=""
              setEditing={setIsEditingReport}
            />
          ) : (
            <p className="mt-6 text-neutral-grey">No grading data available for this card yet.</p>
          )}

          <CardImages
            frontImage={frontImagePreview}
            backImage={backImagePreview}
            classNames="mt-4 p-4"
            title="Card Scan Reference"
          />

          <div className="flex items-center gap-6 mt-4 ml-2 md:ml-4">
            <Button
              variant={"ghost"}
              className="rounded-full heading-secondary bg-[#E0E0E0] hover:bg-gray-300 hover:text-black"
              disabled={isEditingReport || isGeneratingPDF || !gradingData}
              onClick={handleReportGeneration}
            >
              {isGeneratingPDF ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  Generating Report...
                </>
              ) : (
                "Download Pdf"
              )}
            </Button>
            <ButtonGradient
              onClick={updateStatus}
              disabled={confirmGrade.isPending || isGeneratingPDFBackground || isEditingReport || !gradingData}
            >
              {confirmGrade.isPending || isGeneratingPDFBackground ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  Confirming...
                </>
              ) : (
                "Confirm & Notify User"
              )}
            </ButtonGradient>
          </div>

          <CustomModal
            isOpen={isConfirmDoc}
            icon_url="/icons/success.svg"
            title="Card has been graded"
            message={`User has been Notified about the Grading Decision for Card ID: ${currentCard.id}.`}
            onConfirm={() => {
              setIsConfirmDoc(false);
              router.push(`/dashboard/submission-status/${submissionId}?cardId=${currentCard.id}`);
            }}
            onCancel={() => setIsConfirmDoc(false)}
            cn="!p-16 !rounded-2xl"
            yes_btn_text="Done"
            no_btn_text="Cancel"
            icon_bg="bg-transparent"
            icon_h={60}
            icon_w={60}
          />
        </>
      ) : (
        <p className="mt-6 text-neutral-grey">This card is not yet ready for grading. Please check its status.</p>
      )}
    </div>
  );
};

export default GenerateCertificate;