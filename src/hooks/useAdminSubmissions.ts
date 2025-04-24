import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/lib/axiosClient";

export const getAdminSubmissions = async (limit?: number, page?: number) => {
  const params: {limit?: number; page?: number;} = {};
  if (limit) params.limit = limit;
  if (page) params.page = page;

  const response = await axiosInstance.get("/api/admin/submission/all-submissions", { params });
  return response.data;
};

export const useAdminSubmissions = (limit?: number, page?: number) => {
  return useQuery({
    queryKey: ["admin-submissions", limit, page],
    queryFn: () => getAdminSubmissions(limit, page),
    staleTime: 1000 * 60
  });
};
