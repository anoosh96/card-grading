// hooks/useEnums.ts
import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';

export const useEnums = () => {
  return useQuery({
    queryKey: ['enums'],
    queryFn: async () => {
      const res = await axiosClient.get('/api/enums');
      return res.data.data;
    },
  });
};
