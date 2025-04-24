import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axiosClient";

export const useAdminSubmissionDetails = (id: string | null) => {
  return useQuery({
    queryKey: ["admin-submission", id],
    queryFn: async () => {
      const response = await axios.get(`/api/admin/submission/${id}`);
      return response.data;
    },
    enabled: !!id, // only fetch if id exists
    staleTime: 2 * 60 * 1000
  });
};
