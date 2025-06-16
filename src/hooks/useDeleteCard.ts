// hooks/useDeleteCard.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleRequestError, showToast } from '@/lib/toast'; // Assuming you have a toast notification utility
import axiosClient from '@/lib/axiosClient';

interface DeleteCardPayload {
  submissionId: number;
  cardId: number;
}

const deleteCard = async ({ submissionId, cardId }: DeleteCardPayload) => {
  const response = await axiosClient.delete(`/api/admin/submission/${submissionId}/card/${cardId}`);
  return response.data;
};

export function useDeleteCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCard,
    onSuccess: (data, variables) => {
      // Invalidate the submission details query to refetch the updated list of cards
      queryClient.invalidateQueries({ queryKey: ['admin-submission', variables.submissionId.toString()] });
      queryClient.invalidateQueries({
        queryKey: ['admin-submissions'],
      })
      queryClient.invalidateQueries({
        queryKey: ['admin-submission-analysis'],
      })
      showToast(data.message, { variant: 'success' });
    },
    onError: handleRequestError
  });
}