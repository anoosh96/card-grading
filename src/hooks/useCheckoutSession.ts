import axiosClient from "@/lib/axiosClient";
import { handleRequestError } from "@/lib/toast";
import { useMutation } from "@tanstack/react-query";

interface CreateCheckoutSessionPayload {
  serviceType: string;
}

export const createCheckoutSession = async ({ serviceType }: CreateCheckoutSessionPayload) => {
  const response = await axiosClient.post(
    '/api/subscription/checkout',
    {
      serviceType,
      successUrl: `${window.location.origin}/user-dashboard/subscription?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}/services-and-pricing`,
    }
  );

  return response.data;
};

export const useCheckoutSession = () => {
  return useMutation({
    mutationFn: createCheckoutSession,
    onError: handleRequestError
  });
};