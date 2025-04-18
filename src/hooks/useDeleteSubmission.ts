import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../lib/axiosClient';

export const useDeleteSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (submissionId: string) =>
      axios.delete(`/api/submission/${submissionId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      queryClient.invalidateQueries({ queryKey: ['submission-analysis'] });

    },
  });
};
