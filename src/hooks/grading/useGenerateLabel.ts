// hooks/grading/useGenerateLabel.ts
import { useMutation } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';

// Define the type for the payload sent to the API
interface GenerateLabelPayload {
  cardId: string;
  year?: string;
  name?: string;
  grade?: string;
  conditionBreakdown?: {
    centering?: { score: number };
    corners?: { score: number };
    edges?: { score: number };
    surface?: { score: number };
  };
}

// The API call function now accepts the payload
const generateLabelPdf = async (payload: GenerateLabelPayload): Promise<Blob> => {
  const { cardId, ...postData } = payload; // Destructure cardId from payload
  const response = await axiosClient.post(`/api/admin/grading/generate-label/${cardId}`, postData, { // Changed to POST
    responseType: 'blob', // Important: tell axios to expect a binary response (Blob)
  });
  return response.data; // Axios automatically wraps the blob in .data
};

export function useGenerateLabel() {
  // Update generics: <Blob, Error, GenerateLabelPayload>
  return useMutation<Blob, Error, GenerateLabelPayload>({
    mutationFn: generateLabelPdf,
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      console.error('Error generating label PDF:', error);
    },
  });
}