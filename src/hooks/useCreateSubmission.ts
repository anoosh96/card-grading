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
  values,
  frontImage,
  backImage,
}: CreateSubmissionInput) => {
  const formData = new FormData();

  // Append all other form fields
  Object.entries(values).forEach(([key, value]) => {
    if (value != null) {
      formData.append(key, String(value));
    }
  });

  // Only append images if they exist
  if (frontImage) {
    formData.append('frontImage', frontImage);
  }
  if (backImage) {
    formData.append('backImage', backImage);
  }

  // Send multipart/form-data request
  const url = values.submissionSource == submissionSources.BY_POST ? '/api/submission/by-post' : '/api/submission'
  const headers = values.submissionSource == submissionSources.BY_POST ? { 'Content-Type': 'application/json' }: { 'Content-Type': 'multipart/form-data' }
  const res = await axiosClient.post(url, formData, {
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
