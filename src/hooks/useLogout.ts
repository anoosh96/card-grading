import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { useUserStore } from '@/stores/userStore';
import { showToast } from '@/lib/toast';
import { ApiResponse } from '@/types';
import { useSubmissionStore } from '@/stores/submissionStore';
import { useRouter } from 'next/navigation';

// Logout function
const logoutUser = async (): Promise<ApiResponse<null>> => {
  const res = await axiosClient.post('/api/auth/logout'); // or /api/logout based on your route
  return res.data;
};

export const useLogout = () => {
  const { clearUser } = useUserStore(); // assuming you have a resetUser() to clear user/token state
  const { resetSubmission } = useSubmissionStore();
  const queryClient = useQueryClient();
  const router = useRouter()

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // Clear user state in store
      clearUser();
      resetSubmission();

      // Clear localStorage
      localStorage.clear();

      // Clear all non-HttpOnly cookies (client-side)
      document.cookie.split(';').forEach((c) => {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
      });

      router.push('/')
      queryClient.clear()

      showToast('Logged out successfully!', { variant: 'success' });
    },
    onError: (error) => {
      showToast('Failed to logout. Please try again.', { variant: 'error' });
      console.error(error);
    },
  });
};
