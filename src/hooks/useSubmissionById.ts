import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axiosClient";
import { CardData, SubmissionData } from "@/stores/submissionStore";

// Define the expected structure of the data returned by the API
interface SubmissionDetailsResponse {
  submission: SubmissionData; // Replace 'any' with your actual Submission type
  cards: CardData[]; // Replace 'any[]' with your actual Card[] type
  cardPagination: {
    totalCards: number;
    currentPage: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Update the hook to accept pagination and filter parameters
export const useSubmissionById = (
  id: string | null,
  page: number = 1,
  limit: number = 10,
  cardName?: string,
  cardStatus?: string // Use the Prisma enum type if available, otherwise string
) => {
  return useQuery<SubmissionDetailsResponse>({
    queryKey: ["submission", id, page, limit, cardName, cardStatus], // Include all parameters in queryKey
    queryFn: async () => {
      // Construct query parameters
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      if (cardName) {
        params.append('cardName', cardName);
      }
      if (cardStatus) {
        params.append('cardStatus', cardStatus);
      }

      const response = await axios.get(`/api/submission/${id}?${params.toString()}`);
      return response.data.data; // Assuming your successResponse wraps data under a 'data' key
    },
    enabled: !!id, // Only fetch if id exists
    staleTime: 2 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });
};