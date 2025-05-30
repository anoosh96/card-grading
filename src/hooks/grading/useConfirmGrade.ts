import { GradingData } from "@/app/(admin)/dashboard/types";
import axiosClient from "@/lib/axiosClient";
import { handleRequestError } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const confirmGrade = async (gradeData: GradingData) => {
  const formData = new FormData();

  // Manually construct the numeric-safe condition breakdown
  const normalizedConditionBreakdown = {
    centering: {
      score: Number(gradeData.condition_breakdown?.centering?.score ?? 0),
      comments: gradeData.condition_breakdown?.centering?.comments || '',
    },
    corners: {
      score: Number(gradeData.condition_breakdown?.corners?.score ?? 0),
      comments: gradeData.condition_breakdown?.corners?.comments || '',
    },
    edges: {
      score: Number(gradeData.condition_breakdown?.edges?.score ?? 0),
      comments: gradeData.condition_breakdown?.edges?.comments || '',
    },
    surface: {
      score: Number(gradeData.condition_breakdown?.surface?.score ?? 0),
      comments: gradeData.condition_breakdown?.surface?.comments || '',
    },
  };

  // Append primitive fields
  const basicFields = [
    'card_name',
    'card_number',
    'final_score',
    'grade',
    'grading_date',
    'condition_tier',
    'ai_summary',
    'overall_justification',
    'graded_by',
    'cardId'
  ] as const;

  basicFields.forEach((key) => {
    const value = gradeData[key];
    if (value !== undefined && value !== null) {
      formData.append(key, key === 'final_score' ? String(Number(value)) : value);
    }
  });

  // Append condition_breakdown as JSON string
  formData.append('condition_breakdown', JSON.stringify(normalizedConditionBreakdown));

  // Append file
  if (gradeData.pdfFile) {
    formData.append('pdfFile', gradeData.pdfFile);
  }

  const response = await axiosClient.post(
    '/api/admin/grading/confirm-grade',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );

  return response.data;
};

export const useConfirmGrade = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: confirmGrade,
    onError: handleRequestError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-submissions'] });
      queryClient.invalidateQueries({ queryKey: ['admin-submission'] });
    }
  });
};
