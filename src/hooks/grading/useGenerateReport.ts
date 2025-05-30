import { GradingData } from "@/app/(admin)/dashboard/types";
import axiosClient from "@/lib/axiosClient";
import { handleRequestError } from "@/lib/toast";
import { useMutation } from "@tanstack/react-query";


export const generateReport = async (cardDetails: GradingData) => {
  const response = await axiosClient.post(
    '/api/admin/grading/generate-report',
    {
      card_details: cardDetails
    },
    {
      responseType: 'blob' // Ensure the response is treated as a blob for file download
    }
  );

  return response.data;
};

export const useGenerateReport = () => {
  return useMutation({
    mutationFn: generateReport,
    onError: handleRequestError
  });
};
