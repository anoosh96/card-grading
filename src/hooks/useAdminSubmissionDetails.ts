// hooks/useAdminSubmissionDetails.ts
import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { CardData, SubmissionData } from '@/stores/submissionStore'; // Or a more specific type if available

interface GetSubmissionDetailsResponse extends SubmissionData {
  submission: SubmissionData;
  cards: CardData[]; // The paginated cards array
  cardPagination: {
    totalCards: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

interface AdminSubmissionDetailsInput {
  submissionId: string;
  page?: number;
  limit?: number;
  cardStatusFilter?: string;
  cardNameSearch?: string;
}

const fetchAdminSubmissionDetails = async ({
  submissionId,
  page,
  limit,
  cardStatusFilter,
  cardNameSearch,
}: AdminSubmissionDetailsInput): Promise<GetSubmissionDetailsResponse> => {
  const params = new URLSearchParams();
  if (page !== undefined) params.append('page', page.toString());
  if (limit !== undefined) params.append('limit', limit.toString());
  if (cardStatusFilter) params.append('cardStatus', cardStatusFilter);
  if (cardNameSearch) params.append('cardName', cardNameSearch);

  const { data } = await axiosClient.get(`/api/admin/submission/${submissionId}?${params.toString()}`);
  return data.data; // Assuming your API returns { success: true, message: '...', data: GetSubmissionDetailsResponse }
};

export function useAdminSubmissionDetails(
  submissionId: string,
  page: number = 1,
  limit: number = 10,
  cardStatusFilter?: string,
  cardNameSearch?: string
) {
  return useQuery<GetSubmissionDetailsResponse, Error>({
    queryKey: ['admin-submission', submissionId, page, limit, cardStatusFilter, cardNameSearch],
    queryFn: () => fetchAdminSubmissionDetails({ submissionId, page, limit, cardStatusFilter, cardNameSearch }),
    enabled: !!submissionId, // Only run if submissionId is available
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    // Keep past data while new data is being fetched
    // This provides a smoother experience when changing pagination/filters
    placeholderData: (previousData) => previousData, 
  });
}