import { APIError } from '@/types';
import { useState } from 'react';

interface ValidationError {
  [key: string]: string | null; // to store errors for each field
}

export const useApiErrors = () => {
  const [formErrors, setFormErrors] = useState<ValidationError>({});

  // Map API errors to the form field errors
  const mapApiErrors = (errors: APIError[]) => {
    const mappedErrors: ValidationError = {};
    
    errors.forEach((error) => {
      const field = error.path[0]; // assuming path contains the field name
      mappedErrors[field] = error.message;
    });
    
    setFormErrors(mappedErrors);
  };

  const clearApiErrors = () => {
    setFormErrors({});
  };

  return { formErrors, mapApiErrors, clearApiErrors };
};
