'use client'

import { useState, useEffect } from "react";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import CustomInput from "@/components/common/CustomInput";
import Link from "next/link";
import { useFormState } from "@/hooks/useFormState";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react"; // Import Loader2 for consistency
import { FlexibleRecord } from "@/types"; // Ensure FlexibleRecord is imported if used in useFormState

export default function ForgotPasswordPage() {
  const { values, setValue, errors, resetForm, handleApiValidationError, resetFormErrors, setError, clearError } = useFormState({
    email: ''
  });

  const forgotPasswordMutation = useForgotPassword();

  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(10);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCooldown) {
      timer = setInterval(() => {
        setCooldownTime(prev => {
          if (prev === 1) {
            clearInterval(timer);
            setIsCooldown(false);
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCooldown]);

  const validateForm = () => {
    let isValid = true;
    const newErrors: FlexibleRecord = {};

    if (!values.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    Object.entries(newErrors).forEach(([field, message]) => {
      setError(field as 'email', message as string);
    });

    return isValid;
  };

  const handleSubmit = async () => {
    resetFormErrors(); // Clear existing errors

    if (!validateForm()) { // Client-side validation
      return;
    }

    try {
      await forgotPasswordMutation.mutateAsync({ email: values.email });
      resetForm(); // Resets form values and errors
      setIsCooldown(true);
    } catch (error) {
      resetFormErrors(); // Clear errors again before showing new ones from API
      if (error instanceof AxiosError && error?.response?.data?.errors) {
        handleApiValidationError(error.response.data);
      }
      // No general handleRequestError here, as you only want specific API errors to show
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-xl md:text-3xl font-semibold text-pure-grey mb-10">Forgot Password</h1>

      <div className="flex w-full flex-col mb-6 relative">
        <label htmlFor="email" className="block font-medium text-gray-700 mb-2">
          Email
        </label>
        <CustomInput
          id="email"
          placeholder="Enter Email"
          className={`w-full p-6 ${errors.email ? 'error-class' : ''}`}
          value={values.email}
          onChange={(e) => {
            setValue('email', e.target.value);
            clearError('email'); // Clear error when user types
          }}
        />
        {errors.email && (
          <div className="absolute top-4 right-0 transform -translate-y-full z-10 animate-fade-in-slide-down"> {/* Error message styling */}
            <p className="text-xs bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap">
              {errors.email}
            </p>
            <div className="w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-red-600 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
          </div>
        )}
      </div>

      <ButtonGradient
        className="w-full mt-6 py-6"
        onClick={handleSubmit}
        disabled={forgotPasswordMutation.isPending || isCooldown}
      >
        {forgotPasswordMutation.isPending ? (
          <>
            <Loader2 className="animate-spin w-5 h-5" />
            Submitting...
          </>
        ) : isCooldown ? (
          `Please wait ${cooldownTime}s before trying again`
        ) : (
          'Recover Password'
        )}
      </ButtonGradient>

      <div className="mt-4 text-lg font-medium text-center">
        <span>
          Don&#39;t have an account?{" "}
          <Link href={"/sign-up"} className="text-light-red">Sign Up!</Link>
        </span>
      </div>
    </div>
  );
}