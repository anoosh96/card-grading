// hooks/useSignUp.ts
import { useMutation } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient'; // Axios client
import { useUserStore } from '@/stores/userStore'; // Zustand store
import { handleRequestError, showToast } from '@/lib/toast';
import { SignUpResponse } from '@/types';

interface SignUpInput {
  email: string;
  password: string;
  name: string;
}

const signUpUser = async (data: SignUpInput): Promise<SignUpResponse> => {
  const res = await axiosClient.post('/api/auth/signup', data);  // Send API request to /signup
  return res.data.data;
};

// Custom hook to handle sign-up mutation
export const useSignUp = () => {

  return useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      showToast('Sign-up successful!', { variant: 'success' });  // Success snackbar
    },
  });
};
