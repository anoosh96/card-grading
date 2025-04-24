import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axiosClient";

export const useAdminSubmissionAnalysis = () => {
  return useQuery({
    queryKey: ["admin-submission-analysis"],
    queryFn: async () => {
      const response = await axios.get(`/api/admin/submission/statistics`);
      return response.data.data;
    },
    staleTime: 2 * 60 * 1000
  });
};
