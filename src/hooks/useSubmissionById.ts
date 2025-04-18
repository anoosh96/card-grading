import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axiosClient";

export const useSubmissionById = (id: string | null) => {
  return useQuery({
    queryKey: ["submission", id],
    queryFn: async () => {
      const response = await axios.get(`/api/submission/${id}`);
      return response.data;
    },
    enabled: !!id, // only fetch if id exists
    staleTime: 2 * 60 * 1000
  });
};
