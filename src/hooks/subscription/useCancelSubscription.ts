import axiosClient from "@/lib/axiosClient";
import { handleRequestError, handleRequestSuccess } from "@/lib/toast";
import { useMutation } from "@tanstack/react-query";


export const cancelSubscription = async () => {
  const response = await axiosClient.post(
    '/api/subscription/cancel'
  );

  return response.data;
};

export const useCancelSubscription = () => {
  return useMutation({
    mutationFn: cancelSubscription,
    onSuccess: (data) => {
      console.log(data);
      handleRequestSuccess(data.message);
    },
    onError: handleRequestError
  });
};
