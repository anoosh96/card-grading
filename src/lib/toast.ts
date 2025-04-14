import { enqueueSnackbar, OptionsObject } from 'notistack';

import { AxiosError } from 'axios';

interface ErrorResponse {
  message?: string | string[];
}

export const handleRequestError = (error: unknown) => {
  const axiosError = error as AxiosError;

  if (axiosError?.response) {
    const msg = axiosError.response.data as ErrorResponse;

    // Handle both string and array cases
    const errorMessage = Array.isArray(msg?.message)
      ? msg.message.join(', ') // Join array messages into a single string
      : msg?.message || 'Something went wrong. Please try again.';

    showToast(errorMessage, {
      variant: 'error',
      preventDuplicate: true,
    });
  } else {
    showToast('An unexpected error occurred. Please try again later.', {
      variant: 'error',
    });
  }
};


export const handleRequestSuccess = (message: string) => {
  showToast(message, { variant: 'success' })
}

export const showToast = (message: string, options?: OptionsObject) => {
  enqueueSnackbar(message, {
    variant: 'default', // default variant
    preventDuplicate: true,
    ...options, // Spread to allow custom options
  });
};