// hooks/useVerifyCode.ts
import { useMutation } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { handleRequestError, showToast } from '@/lib/toast';
import { ApiResponse, VerifyCodeResponse } from '@/types';

interface VerifyCodeInput {
  code: string
}

const verifyEmail = async (data: VerifyCodeInput): Promise<ApiResponse<VerifyCodeResponse>> => {
  const res = await axiosClient.post('/api/auth/verify-email', data);
  return res.data;
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      showToast(data.message, { variant: 'success' });
    },
    onError: (error) => {
      handleRequestError(error);
    }
  });
};
