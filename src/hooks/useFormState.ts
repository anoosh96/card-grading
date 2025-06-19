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
  // 1. Handle strict equality for primitives and null/undefined
  if (obj1 === obj2) {
    return true;
  }

  // 2. Check if both are objects (and not null)
  // typeof null is 'object', so explicitly check for null
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }

  // 3. Handle Arrays
  // Check if both are arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) {
      return false;
    }
    for (let i = 0; i < obj1.length; i++) {
      // Recursively compare array elements
      // Cast to 'any' for the recursive call to handle mixed types in arrays
      // For stricter typing, you might need to refine your T
      if (!areObjectsEqual(obj1[i] as any, obj2[i] as any)) {
        return false;
      }
    }
    return true;
  }

  // 4. Handle Objects (non-arrays)
  // Ensure both are indeed objects and not one is an array and the other isn't
  if (Array.isArray(obj1) !== Array.isArray(obj2)) {
    return false; // One is array, other is object
  }

  const keys1 = Object.keys(obj1) as Array<keyof T>;
  const keys2 = Object.keys(obj2) as Array<keyof T>;

  if (keys1.length !== keys2.length) {
    return false;
  }

  // Iterate over keys and recursively compare values
  for (const key of keys1) {
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
      return false; // obj2 doesn't have the key present in obj1
    }

    // Recursively compare values.
    // Need to cast to any because TypeScript doesn't know the exact type
    // of obj1[key] at this point for the recursive call.
    // For more robust typing, consider type guards or a more complex T.
    if (!areObjectsEqual(obj1[key] as any, obj2[key] as any)) {
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