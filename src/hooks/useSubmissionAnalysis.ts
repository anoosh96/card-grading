import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axiosClient";

export const useSubmissionAnalysis = () => {
  return useQuery({
    queryKey: ["submission-analysis"],
    queryFn: async () => {
      const response = await axios.get(`/api/submission/statistics`);
      return response.data.data;
    },
    staleTime: 2 * 60 * 1000
  });
};
