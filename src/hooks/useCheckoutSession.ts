import axiosClient from "@/lib/axiosClient";
import { handleRequestError } from "@/lib/toast";
import { CardData } from "@/stores/submissionStore";
import { useMutation } from "@tanstack/react-query";


interface CreateCheckoutSessionPayload {
  cards: CardData[];
  shippingFullName: string;
  shippingAddress: string;
  shippingPhone: string;
  shippingEmail: string;
  totalCost: number;
  numberOfCards: number;
  bulkCardValue?: number;
  userId: number;
  submissionId?: number;
  metadata?: Record<string, any>;
}

export const createCheckoutSession = async (payload: CreateCheckoutSessionPayload) => {
  const response = await axiosClient.post('/api/checkout', payload);
  return response.data;
};

export const useCheckoutSession = () => {
  return useMutation({
    mutationFn: createCheckoutSession,
    onError: handleRequestError
  });
};