// hooks/useSignUp.ts
import { useMutation } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient'; // Axios client
import { showToast } from '@/lib/toast';
import { SignUpResponse } from '@/types';
import { MESSAGES } from '@/lib/constants';

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
    onSuccess: () => {
      showToast(MESSAGES.SIGNUP_SUCCESS, { variant: 'success' });  // Success snackbar
    },
  });
};
