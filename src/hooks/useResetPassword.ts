// hooks/useResetPassword.ts
import { useMutation } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { handleRequestError, showToast } from '@/lib/toast';

interface ResetPasswordInput {
  token: string;
  password: string;
  confirmPassword: string;
}

const resetPassword = async (data: ResetPasswordInput): Promise<{ message: string }> => {
  const res = await axiosClient.post('/api/auth/reset-password', data);
  return res.data;
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      showToast(data.message, { variant: 'success' });
    },
    onError: (error) => {
      handleRequestError(error);
    },
  });
};
