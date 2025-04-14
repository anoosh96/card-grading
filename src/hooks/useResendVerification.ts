// hooks/useResendCode.ts
import { useMutation } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { handleRequestError, showToast } from '@/lib/toast';

const resendCode = async (): Promise<{ message: string }> => {
  const res = await axiosClient.post('/api/auth/resend-verification');
  return res.data;
};

export const useResendVerification = () => {
  return useMutation({
    mutationFn: resendCode,
    onSuccess: (data) => {
      showToast(data.message, { variant: 'success' });
    },
    onError: (error) => {
      handleRequestError(error);
    }
  });
};
