import { useState, useRef, useEffect, useMemo } from 'react'; // Added useEffect
import { useApiErrors } from './useApiErrors';
import { APIError } from '@/types';

type FormState<T extends object> = {
  values: T;
  errors: Record<keyof T, string | null>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setError: (field: keyof T, error: string | null) => void;
  clearError: (field: keyof T) => void;
  resetForm: (newInitialState?: T | (() => T)) => void;
  resetFormErrors: () => void;
  handleApiValidationError: (apiErrorResponse: { message: string; errors: APIError[] }) => void;
  isFormChanged: boolean;
};

// Helper for deep comparison of two objects
function areObjectsEqual<T extends object>(obj1: T, obj2: T): boolean {
  const keys1 = Object.keys(obj1) as Array<keyof T>;
  const keys2 = Object.keys(obj2) as Array<keyof T>;

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    // Treat undefined and null as equivalent for comparison if needed, or strictly compare
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

export function useFormState<T extends object>(initialValues: T): FormState<T> {
  const { formErrors, mapApiErrors, clearApiErrors } = useApiErrors();

  const [values, setValues] = useState<T>(initialValues);
  // useRef to store the *current* baseline for comparison.
  // This will be explicitly updated when initialValues prop changes or after a successful save.
  const baselineValues = useRef<T>(initialValues);


  const [errors, setErrors] = useState<Record<keyof T, string | null>>(() =>
    Object.keys(initialValues).reduce((acc, key) => {
      acc[key as keyof T] = null;
      return acc;
    }, {} as Record<keyof T, string | null>)
  );

  // Effect to update the baseline when the initialValues prop changes
  // This is crucial for ProfilePage where initialValues are derived from 'user' store
  useEffect(() => {
    // Only update if the incoming initialValues are actually different from the current baseline
    // This prevents unnecessary re-renders if parent re-renders but initialValues didn't change semantically
    if (!areObjectsEqual(initialValues, baselineValues.current)) {
      setValues(initialValues); // Also reset current values to match new initial
      baselineValues.current = initialValues;
      resetFormErrors(); // Clear errors when initial state updates
    }
  }, [initialValues]); // Depend on initialValues prop


  // Memoize isFormChanged to only re-calculate when values or baselineValues.current change
  const isFormChanged = useMemo(() => {
    // Use the deep comparison helper
    return !areObjectsEqual(values, baselineValues.current);
  }, [values, baselineValues.current]);


  // Handle input field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber') {
      // Allow empty string to clear the input, but prevent non-numeric input
      if (value !== '' && isNaN(Number(value))) {
        return;
      }
    }

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Set a specific field's value manually
  const setValue = <K extends keyof T>(field: K, value: T[K]) => {
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

  // Clear an error message for a specific field
  const clearError = (field: keyof T) => {
    setErrors((prev) => ({
      ...prev,
      [field]: null,
    }));
  };

  // Reset form values and errors
  // Now accepts an optional newInitialState or a function to derive it
  const resetForm = (newInitialState?: T | (() => T)) => {
    let stateToResetTo: T;

    if (typeof newInitialState === 'function') {
      stateToResetTo = (newInitialState as () => T)();
    } else if (newInitialState) {
      stateToResetTo = newInitialState;
    } else {
      stateToResetTo = baselineValues.current; // Reset to the current baseline
    }

    setValues(stateToResetTo);
    // Crucial: Update the baseline values to the state we just reset to.
    // This ensures that after a reset (e.g., successful save or cancel),
    // the form is no longer considered "changed" relative to this new baseline.
    baselineValues.current = stateToResetTo;

    setErrors(
      Object.keys(stateToResetTo).reduce((acc, key) => {
        acc[key as keyof T] = null;
        return acc;
      }, {} as Record<keyof T, string | null>)
    );
    clearApiErrors();
  };

  const resetFormErrors = () => {
    clearApiErrors();
    setErrors(
      Object.keys(values).reduce((acc, key) => {
        acc[key as keyof T] = null;
        return acc;
      }, {} as Record<keyof T, string | null>)
    );
  };

  // When API validation errors are returned, map them to the fields
  const handleApiValidationError = (apiErrorResponse: { message: string; errors: APIError[] }) => {
    mapApiErrors(apiErrorResponse.errors);
  };

  return {
    values,
    errors: { ...errors, ...formErrors },
    handleChange,
    setValue,
    setError,
    clearError,
    resetForm,
    handleApiValidationError,
    resetFormErrors,
    isFormChanged,
  };
}