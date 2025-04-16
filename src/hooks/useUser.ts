import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { useUserStore } from '@/stores/userStore';

export const useUser = () => {
  const setUser = useUserStore((state) => state.setUser);

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axiosClient.get('/api/user');
      const userData = res.data.data;
      setUser(userData); // update zustand store
      return userData;
    },
    
    enabled: false, // only fetch manually when called
  });
};
