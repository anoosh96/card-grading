// hooks/useBulkCardSubmission.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { handleRequestError, showToast } from '@/lib/toast';

interface BulkCardSubmissionInput {
  submissionId: number;
  cards: any[]; // Adjust this type to match your CardData interface if needed
}

const bulkCardSubmission = async ({ submissionId, cards }: BulkCardSubmissionInput) => {
  // The API endpoint should be designed to accept an array of new cards
  const url = `/api/admin/submission/${submissionId}/bulk-add-cards`;
  const headers = { 'Content-Type': 'application/json' };
  const res = await axiosClient.post(url, { cards }, { headers });
  return res.data;
};

export const useBulkCardSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkCardSubmission,
    onSuccess: (data, variables) => {
      // Invalidate relevant queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['admin-submission', variables.submissionId.toString()] });
      queryClient.invalidateQueries({ queryKey: ['admin-submissions'] }); // If adding cards changes overall submission view
      queryClient.invalidateQueries({ queryKey: ['admin-submission-analysis'] }); // If analysis depends on card count

      showToast(`${data.addedCardsCount || variables.cards.length} cards added successfully!`, { variant: 'success' });
    },
    onError: (error) => {
      handleRequestError(error);
      showToast('Failed to add cards.', { variant: 'error' }); // A generic fallback message
    },
  });
};