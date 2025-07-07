// hooks/grading/useGenerateLabel.ts
import { useMutation } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';

// Define the type for the payload sent to the API
interface GenerateLabelPayload {
  reportPdfUrl: string
  cardId: string
}

// The API call function now accepts the payload
const generateLabelPdf = async (payload: GenerateLabelPayload): Promise<Blob> => {
  const { cardId, ...postData } = payload; // Destructure cardId from payload
  const response = await axiosClient.post(`/api/admin/grading/generate-back-label/${cardId}`, postData, { // Changed to POST
    responseType: 'blob', // Important: tell axios to expect a binary response (Blob)
  });
  return response.data; // Axios automatically wraps the blob in .data
};

export function useGenerateBackLabel() {
  // Update generics: <Blob, Error, GenerateLabelPayload>
  return useMutation<Blob, Error, GenerateLabelPayload>({
    mutationFn: generateLabelPdf,
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // Add the download attribute with a desired filename
      link.download = 'back-label.pdf'; // You can make this dynamic if needed
      document.body.appendChild(link); // Append to body to make it clickable in all browsers
      link.click();
      document.body.removeChild(link); // Clean up the DOM
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      console.error('Error generating label PDF:', error);
    },
  });
}
