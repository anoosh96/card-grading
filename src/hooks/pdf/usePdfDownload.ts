import { GradingData } from "@/app/(admin)/dashboard/types";
import { handleRequestError } from "@/lib/toast";
import { formatToUSTimezone } from "@/lib/utils";
import { useSubmissionStore } from "@/stores/submissionStore"
import { reactPDFGenerator } from "@/utils/pdf-generator";
import { useState } from "react";




export const usePdfDownload = () => {
  const { submission } = useSubmissionStore()

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const downloadPdf = async () => {
    setIsGeneratingPDF(true);

    try {
      await reactPDFGenerator.generatePDF(getGradeData() as GradingData, undefined, true);
      // PDF will be automatically downloaded
    } catch (error) {
      handleRequestError(error)
      console.error('Failed to generate PDF:', error); 
      // Handle error (show toast, etc.)
    }
    finally {
      setIsGeneratingPDF(false);
    }
  };

  const getGradeData = (): GradingData | null => {
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

  return { downloadPdf, isGeneratingPDF }

}
