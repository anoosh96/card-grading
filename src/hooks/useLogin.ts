// hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { useUserStore } from '@/stores/userStore';
import { showToast } from '@/lib/toast';
import { ApiResponse, LoginResponse } from '@/types';

interface LoginInput {
  email: string;
  password: string;
}

const loginUser = async (data: LoginInput): Promise<ApiResponse<LoginResponse>> => {
  const res = await axiosClient.post('/api/auth/login', data);
  return res.data;
};

export const useLogin = () => {
  const { setUser, setToken } = useUserStore();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data?.data?.user);
      setToken(data?.data?.token);
      showToast('Login successful!', { variant: 'success' });
    }
  });
};
