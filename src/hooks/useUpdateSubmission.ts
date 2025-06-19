// hooks/useUpdateSubmission.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { handleRequestError } from '@/lib/toast';

interface UpdateSubmissionInput {
  id: number;
  values: Record<string, string | number | undefined | null | object>;
  frontImage?: File;
  backImage?: File;
}

const updateSubmission = async ({
  id,
  values,
  frontImage,
  backImage,
}: UpdateSubmissionInput) => {
  const formData = new FormData();

  // Append all other form fields
  Object.entries(values).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (typeof value === 'object' && !(value instanceof File)) {
        // Handle nested objects like user data
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          if (nestedValue !== null && nestedValue !== undefined) {
            formData.append(`${key}[${nestedKey}]`, String(nestedValue));
          }
        });
      } else {
        formData.append(key, String(value));
      }
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
  const res = await axiosClient.put(`/api/admin/submission/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data;
};

export const useUpdateSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSubmission,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['card-details', variables.id.toString(), variables.values.cardId?.toString()],
      })
      queryClient.invalidateQueries({ queryKey: ['admin-submissions'] });
      queryClient.invalidateQueries({ queryKey: ['admin-submission'] });
      queryClient.invalidateQueries({ queryKey: ['admin-submission-analysis'] });

      // handleRequestSuccess(data?.message)
      //   queryClient.invalidateQueries({ queryKey: ['submission-analysis'] });
    },
    onError: handleRequestError,
  });
};