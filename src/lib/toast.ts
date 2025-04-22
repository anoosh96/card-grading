import { enqueueSnackbar, OptionsObject } from 'notistack';

import { AxiosError } from 'axios';


interface ValidationError {
  path: string[];
  message: string;
}

interface ErrorResponse {
  message: string;
  errors?: ValidationError[];
}

export function getFirstErrorMessage(error: ErrorResponse): string {
  console.log(error)
  if (error.errors && error.errors.length > 0) {
    return error.errors[0].message;
  }
  return error.message;
}


export const handleRequestError = (error: unknown) => {
  const axiosError = error as AxiosError;

  if (axiosError?.response) {
    const msg = axiosError.response.data as ErrorResponse;

    let errorMessage = 'Something went wrong. Please try again.';

    if (Array.isArray(msg?.message)) {
      // Case: message is an array
      errorMessage = msg.message.join(', ');
    } else if (typeof msg?.message === 'string') {
      // Case: message is a string
      errorMessage = msg.message;
    }

    // If there are validation errors, prefer the first one
    if (msg.errors && msg.errors.length > 0) {
      errorMessage = msg.errors[0].message;
    }

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