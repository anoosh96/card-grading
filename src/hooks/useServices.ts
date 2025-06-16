// hooks/useEnums.ts
import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await axiosClient.get('/api/service');
      return res.data.data?.services;
    },
  });
};
