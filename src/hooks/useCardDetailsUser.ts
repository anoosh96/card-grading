// hooks/useCardDetails.ts
import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient'; // Assuming this is your configured axios instance
import { CardData } from '@/stores/submissionStore'; // Assuming this type correctly reflects your backend Card model

interface CardDetailsInput {
  submissionId: string;
  cardId: string;
}

const fetchCardDetails = async ({ submissionId, cardId }: CardDetailsInput): Promise<CardData> => {
  const { data } = await axiosClient.get(`/api/submission/${submissionId}/card/${cardId}`);
  return data.data; // Assuming your API response structure is { success: true, message: '...', data: CardData }
};

export function useCardDetailsUser(submissionId: string, cardId: string) {
  return useQuery<CardData, Error>({
    queryKey: ['card-details-user', submissionId, cardId],
    queryFn: () => fetchCardDetails({ submissionId, cardId }),
    // Enable query only if both submissionId and cardId are provided
    enabled: !!submissionId && !!cardId,
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
  });
}
