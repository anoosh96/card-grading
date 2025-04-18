// hooks/useCreateSubmission.ts
import { useMutation } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { handleRequestError, showToast } from '@/lib/toast';

interface CreateSubmissionInput {
  values: Record<string, string | number | undefined | null | object>; // Replace with a properly typed interface later if needed
  frontImage: File;
  backImage: File;
}

const createSubmission = async ({ values, frontImage, backImage }: CreateSubmissionInput) => {
  const formData = new FormData();

  // Append fields
  Object.entries(values).forEach(([key, value]) => {
    formData.append(key, String(value));
  });

  // Append images
  formData.append('frontImage', frontImage);
  formData.append('backImage', backImage);

  const res = await axiosClient.post('/api/submission', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data;
};

export const useCreateSubmission = () => {
  return useMutation({
    mutationFn: createSubmission,
    onSuccess: () => {
      showToast('Submission created successfully!', { variant: 'success' });
    },
    onError: handleRequestError,
  });
};
