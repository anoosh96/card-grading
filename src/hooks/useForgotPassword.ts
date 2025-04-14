
// hooks/useForgotPassword.ts
import { useMutation } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { handleRequestError, showToast } from '@/lib/toast';

interface ForgotPasswordInput {
  email: string;
}

const forgotPassword = async (data: ForgotPasswordInput): Promise<{ message: string }> => {
  const res = await axiosClient.post('/api/auth/forgot-password', data);
  return res.data;
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      showToast(data.message, { variant: 'success' });
    },
    onError: (error) => {
      handleRequestError(error);
    }
  });
};
