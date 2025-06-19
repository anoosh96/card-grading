'use client'

import { ButtonGradient } from "@/components/common/ButtonGradient";
import CustomInput from "@/components/common/CustomInput";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormState } from "@/hooks/useFormState";
import { useResetPassword } from "@/hooks/useResetPassword";
import { AxiosError } from "axios";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { FlexibleRecord } from "@/types";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const { values, setValue, errors, resetForm, handleApiValidationError, setError, clearError, resetFormErrors } = useFormState({
    password: '',
    confirmPassword: ''
  });

  const resetPasswordMutation = useResetPassword();

  const validateForm = () => {
    let isValid = true;
    const newErrors: FlexibleRecord = {};

    if (!values.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    if (!values.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    }

    if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    Object.entries(newErrors).forEach(([field, message]) => {
      setError(field as 'password' | 'confirmPassword', message as string);
    });

    return isValid;
  };


  const handleSubmit = async () => {
    if (!token) {
      // Handle case where token is missing, e.g., redirect to an error page or show a message
      return;
    }

    resetFormErrors(); // Clear all errors before validation and submission

    if (!validateForm()) {
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync({
        token,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      resetForm();
      router.push('/login');
    } catch (error) {
      resetFormErrors(); // Clear errors again before showing new ones from API
      if (error instanceof AxiosError && error?.response?.data?.errors) {
        handleApiValidationError(error.response.data);
      }
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-xl lg:text-3xl font-semibold text-pure-grey mb-10">Reset Password</h1>

      <div className="flex w-full flex-col mb-6 relative">
        <label htmlFor="password" className="block font-medium text-gray-700 mb-2">
          Password
        </label>
        <CustomInput
          id="password"
          placeholder="Enter Password"
          className={`w-full p-6 ${errors.password ? 'error-class' : ''}`}
          type="password"
          value={values.password}
          onChange={(e) => {
            setValue('password', e.target.value);
            clearError('password');
          }}
        />
        {errors.password && (
          <div className="absolute top-4 right-0 transform -translate-y-full z-10 animate-fade-in-slide-down">
            <p className="text-xs bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap">
              {errors.password}
            </p>
            <div className="w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-red-600 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
          </div>
        )}
      </div>

      <div className="flex w-full flex-col relative">
        <label htmlFor="confirmPassword" className="block font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <CustomInput
          id="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          className={`w-full p-6 ${errors.confirmPassword ? 'error-class' : ''}`}
          value={values.confirmPassword}
          onChange={(e) => {
            setValue('confirmPassword', e.target.value);
            clearError('confirmPassword');
          }}
        />
        {errors.confirmPassword && (
          <div className="absolute top-4 right-0 transform -translate-y-full z-10 animate-fade-in-slide-down">
            <p className="text-xs bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap">
              {errors.confirmPassword}
            </p>
            <div className="w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-red-600 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
          </div>
        )}
      </div>

      <ButtonGradient
        className="w-full mt-6 py-6"
        onClick={handleSubmit}
        disabled={resetPasswordMutation.isPending}
      >
        {resetPasswordMutation.isPending ? (
          <>
            <Loader2 className="animate-spin w-5 h-5" />
            Updating...
          </>
        ) : (
          'Update Password'
        )}
      </ButtonGradient>

      <div className="mt-4 font-medium text-center">
        <span>
          Remember your Password?{" "}
          <Link href={"/login"} className="text-light-red">Log In Here!</Link>
        </span>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}