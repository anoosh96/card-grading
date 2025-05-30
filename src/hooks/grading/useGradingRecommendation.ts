import axiosClient from "@/lib/axiosClient";
import { handleRequestError } from "@/lib/toast";
import { useMutation } from "@tanstack/react-query";

interface AiGradingPayload {
  frontImage: string;
  backImage: string;
  userId: string;
}

export const createAiRecommendation = async ({ frontImage, backImage, userId }: AiGradingPayload) => {
  const response = await axiosClient.post(
    '/api/admin/grading/ai-recommendation',
    {
      frontImage,
      backImage,
      userId
    }
  );

  return response.data;
};

export const useGradingRecommendation = () => {
  return useMutation({
    mutationFn: createAiRecommendation,
    onError: handleRequestError
  });
};
