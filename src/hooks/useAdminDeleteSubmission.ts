import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../lib/axiosClient';

export const useAdminDeleteSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (submissionId: string) =>
      axios.delete(`/api/admin/submission/${submissionId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-submissions'] });
      queryClient.invalidateQueries({ queryKey: ['admin-submission-analysis'] });
    },
  });
};
