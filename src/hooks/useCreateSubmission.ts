// hooks/useCreateSubmission.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { handleRequestError, showToast } from '@/lib/toast';
import { submissionSources } from '@/app/(user)/lib/utils/constants';

interface CreateSubmissionInput {
  values: Record<string, string | number | undefined | null | object>;
  frontImage?: File;    // now optional
  backImage?: File;     // now optional
}

const createSubmission = async ({
  values
}: CreateSubmissionInput) => {
  const formData = new FormData();

  // Send multipart/form-data request
  const url = '/api/submission/by-post'
  const headers = {'Content-Type': 'application/json' }
  const res = await axiosClient.post(url, values, {
    headers,
  });

  return res.data;
};

export const useCreateSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      queryClient.invalidateQueries({ queryKey: ['submission-analysis'] });
      showToast('Submission created successfully!', { variant: 'success' });
    },
    onError: handleRequestError,
  });
};
