// hooks/useContactMessage.ts
import { useMutation } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient'; // Assuming this is your configured axios instance
import { handleRequestError, handleRequestSuccess } from '@/lib/toast';

// Define the type for the data your form will send
interface ContactMessagePayload {
  name: string;
  email: string;
  subject?: string; // Subject is optional as per your schema
  message: string;
}

// The API call function
const sendContactMessage = async (data: ContactMessagePayload) => {
  const response = await axiosClient.post('/api/contact-us/messages', data);
  return response.data;
};

export function useContactMessage() {
  return useMutation<any, Error, ContactMessagePayload>({
    mutationFn: sendContactMessage,
    onSuccess: () => {
      handleRequestSuccess('Your Message has been Received Successfully.')
      // You might want to do something else on success, like clear the form
    },
    onError: handleRequestError
  });
}
