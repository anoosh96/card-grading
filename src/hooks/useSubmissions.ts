import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/lib/axiosClient";

export const getUserSubmissions = async (limit?: number, page?: number) => {
  const params: any = {};
  if (limit) params.limit = limit;
  if (page) params.page = page;

  const response = await axiosInstance.get("/api/submission/user-submissions", { params });
  return response.data;
};

export const useSubmissions = (limit?: number, page?: number) => {
  return useQuery({
    queryKey: ["submissions", limit, page],
    queryFn: () => getUserSubmissions(limit, page),
    staleTime: 1000 * 60
  });
};
