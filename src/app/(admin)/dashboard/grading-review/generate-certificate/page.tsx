"use client";

import CardImages from "@/app/(user)/user-dashboard/submission-status/order-details/CardImages";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import { useSubmissionStore } from "@/stores/submissionStore";
import { formatToUSTimezone } from "@/lib/utils";
import CustomModal from "@/components/common/CustomModal";
import { submissionStatus } from "@/app/(user)/lib/utils/constants";
import { useUpdateSubmission } from "@/hooks/useUpdateSubmission";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useGradingRecommendation } from "@/hooks/grading/useGradingRecommendation";
import { useUserStore } from "@/stores/userStore";
import GradingReport from "./components/grading-report";
import { GradingData } from "../../types";
import { reactPDFGenerator } from "@/utils/pdf-generator";
import { ReportSkeleton } from "@/components/skeletons/AdminDashboardSkeleton";
import { useConfirmGrade } from "@/hooks/grading/useConfirmGrade";


const GenerateCertificate = () => {
  const [isConfirmDoc, setIsConfirmDoc] = useState(false);
  const { submission } = useSubmissionStore();
  const { user } = useUserStore();
  const updateSubmission = useUpdateSubmission();
  const router = useRouter();
  const { mutateAsync: gradingRecommendation, isPending, error } = useGradingRecommendation()
  // const { mutateAsync: generateReport, isPending: isReportPending, error: reportError } = useGenerateReport()
  const confirmGrade = useConfirmGrade()
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingPDFBackground, setIsGeneratingPDFBackground] = useState(false);
  const [isEditingReport, setIsEditingReport] = useState(false);

  const getInitialGradingData = () => {
    if (submission.gradeData) {
      return {
        graded_by: 'Prescision Grading™',
        grade: submission.gradeData.grade,
        condition_tier: submission.gradeData.conditionTier || "Not Graded",
        ai_summary: submission.gradeData.aiSummary,
        condition_breakdown: submission.gradeData.conditionBreakdown,
        frontImage: submission.frontImage as string,
        backImage: submission.backImage as string,
        final_score: String(submission.gradeData.finalScore),
        overall_justification: submission.gradeData.overallJustification,
        card_name: submission.cardName,
        card_number: submission.gradeData.cardNumber,
        grading_date: formatToUSTimezone(submission.gradeData.gradeDate as string)
      };
    }

    return null
  }


  const [gradingData, setGradingData] = useState<GradingData | null | undefined>(getInitialGradingData())
  const [pdfFile, setPdfFile] = useState<Blob | null>(null);

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
  }



  const fetchGradingRecommendation = async () => {
    const data = await gradingRecommendation({ frontImage: submission.frontImage as string, backImage: submission.backImage as string, userId: user?.id as string })
    console.log(data.data.card_details)
    const gradeInfo = getGradeInfo(data.data.card_details.final_score);
    setGradingData({
      ...data.data.card_details, graded_by: 'Prescision Grading™',
      grading_date: formatToUSTimezone(new Date().toISOString()), grade: gradeInfo.grade, condition_tier: gradeInfo.tier,
      ai_summary: `Our AI-powered grading engine evaluates each card using ultra-high resolution imaging and precision scoring across four key areas: Corners, Edges, Surface, and Centering.`,
      frontImage: submission.frontImage as string,
      backImage: submission.backImage as string
    });
  }

  useEffect(() => {
    if (submission.frontImage && submission.backImage && !gradingData && !submission.gradeData) {
      fetchGradingRecommendation();
    }
  }, [submission.frontImage, submission.backImage]);


  // Memoized preview URLs
  const frontImagePreview = useMemo(() => {
    if (!submission.frontImage) return undefined;
    if (typeof submission.frontImage === 'string') return submission.frontImage;
    return URL.createObjectURL(submission.frontImage as File);
  }, [submission.frontImage]);

  const backImagePreview = useMemo(() => {
    if (!submission.backImage) return undefined;
    if (typeof submission.backImage === 'string') return submission.backImage;
    return URL.createObjectURL(submission.backImage as File);
  }, [submission.backImage]);

  const updateStatus = async () => {

    let pdf = pdfFile;
    if (!pdf) {
      setIsGeneratingPDFBackground(true);
      pdf = await reactPDFGenerator.generatePDF(gradingData as GradingData);
      setIsGeneratingPDFBackground(false);
    }


    await confirmGrade.mutateAsync({ ...gradingData, pdfFile: pdf, cardId: submission.cardId } as GradingData)
    setIsConfirmDoc(true);
  };

  const handleReportGeneration = async () => {
    setIsGeneratingPDF(true);

    try {
      const pdf = await reactPDFGenerator.generatePDF(gradingData as GradingData, undefined, true);
      setPdfFile(pdf)
      // PDF will be automatically downloaded
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      // Handle error (show toast, etc.)
    }
    finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleSubmit = (formdata: GradingData) => {
    setGradingData(formdata);
  }

  if (isPending) {
    return (<ReportSkeleton />)
  }

  if (error) {
    return (
      <div>
        <p className="mt-6 text-neutral-grey mb-4">Failed to Grade Card.</p>

        <ButtonGradient
          // onClick={() => router.back()}
          disabled={isPending}
          onClick={() => fetchGradingRecommendation() }
        >
          Retry Grading
        </ButtonGradient>
      </div>
    )
  }

  return (
    <div className="bg-white border-md px-4 py-4 rounded-md">
      <div className="mb-4">
        <h1 className="heading-primary font-bold mb-1">
          Official Card Grading Certificate
        </h1>
        {/* <p className="heading-tertiary text-muted-foreground">
          Certificate ID: #{submission.trackingNumber}
        </p> */}
      </div>

      {!submission.id || submission.submissionStatus == submissionStatus.SUBMISSION_PENDING ?
        <p className="mt-6 text-neutral-grey">No Submission Selected for Grading Review.</p>
        :
        <>

          {gradingData &&
            <GradingReport
              data={gradingData as GradingData}
              isEditable={true}
              onSubmit={handleSubmit}
              classNames=""
              setEditing={setIsEditingReport}
            />
          }

          <CardImages
            frontImage={frontImagePreview || "/assets/images/default-front.png"}
            backImage={backImagePreview || "/assets/images/default-back.png"}
            classNames="mt-4 p-4"
            title="Card Scan Reference"
          />

          <div className="flex items-center gap-6 mt-4 ml-2 md:ml-4">
            <Button
              // onClick={() => router.back()}
              variant={"ghost"}
              className="rounded-full heading-secondary bg-[#E0E0E0] hover:bg-gray-300 hover:text-black"
              disabled={isEditingReport}
              onClick={handleReportGeneration}
            >
              {isGeneratingPDF ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Generating Report...
                </>
              ) : (
                "Download Pdf"
              )}
            </Button>
            <ButtonGradient onClick={updateStatus} disabled={updateSubmission.isPending || isEditingReport}>
              {confirmGrade.isPending || isGeneratingPDFBackground ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
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
            message="User has been Notified about the Grading Decision."
            onConfirm={() => {
              setIsConfirmDoc(false);
              router.push("/dashboard");
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

      }
    </div>
  );
};

export default GenerateCertificate;
