import { useState } from 'react';
import { useApiErrors } from './useApiErrors'; // Import the error handling hook
import { APIError } from '@/types';

type FormState<T extends object> = {
  values: T;
  errors: Record<keyof T, string | null>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValue: (field: keyof T, value: any) => void;
  setError: (field: keyof T, error: string | null) => void;
  resetForm: () => void;
  resetFormErrors: () => void;
  handleApiValidationError: (apiErrorResponse: { message: string; errors: APIError[] }) => void;
};

export function useFormState<T extends object>(initialValues: T): FormState<T> {
  const { formErrors, mapApiErrors, clearApiErrors } = useApiErrors(); // Hook for mapping API errors

  const [values, setValues] = useState<T>(initialValues);

  const [errors, setErrors] = useState<Record<keyof T, string | null>>(
    Object.keys(initialValues).reduce((acc, key) => {
      acc[key as keyof T] = null;
      return acc;
    }, {} as Record<keyof T, string | null>)
  );

  // Handle input field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Set a specific field's value manually
  const setValue = (field: keyof T, value: any) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Set an error message for a specific field
  const setError = (field: keyof T, error: string | null) => {
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  // Reset form values and errors
  const resetForm = () => {
    setValues(initialValues);
    setErrors(
      Object.keys(initialValues).reduce((acc, key) => {
        acc[key as keyof T] = null;
        return acc;
      }, {} as Record<keyof T, string | null>)
    );
    resetFormErrors()
  };

  const resetFormErrors = () => {
    clearApiErrors();
    Object.keys(errors).forEach((key) => {
      setError(key as keyof typeof values, null); // Clear each error
    });
  };
  

  // When API validation errors are returned, map them to the fields
  const handleApiValidationError = (apiErrorResponse: { message: string; errors: APIError[] }) => {
    mapApiErrors(apiErrorResponse.errors);
  };

  return {
    values,
    errors: { ...errors, ...formErrors }, // Combine field-level errors and API errors
    handleChange,
    setValue,
    setError,
    resetForm,
    handleApiValidationError,
    resetFormErrors
  };
}
