'use client'

import { ButtonGradient } from "@/components/common/ButtonGradient";
import CustomInput from "@/components/common/CustomInput";
import Link from "next/link";
import { useFormState } from "@/hooks/useFormState";
import { useLogin } from "@/hooks/useLogin";
import { handleRequestError } from "@/lib/toast";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { FlexibleRecord } from "@/types";

export default function LoginPage() {
  const { values, errors, handleChange, handleApiValidationError, resetFormErrors, setError, clearError } = useFormState({
    email: '',
    password: ''
  });

  const loginMutation = useLogin();
  useAuthRedirect();

  const validateForm = () => {
    let isValid = true;
    const newErrors: FlexibleRecord = {};

    if (!values.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    if (!values.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    Object.entries(newErrors).forEach(([field, message]) => {
      setError(field as 'email' | 'password' , message as string);
    });

    return isValid;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFormErrors();

    if (!validateForm()) {
      return;
    }

    try {
      await loginMutation.mutateAsync(values);
    } catch (error) {
      resetFormErrors();

      if (error instanceof AxiosError && error.response?.data?.errors) {
        handleApiValidationError(error.response.data);
      } else {
        handleRequestError(error);
      }
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-3xl font-semibold text-pure-grey mb-10">Welcome Back!</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex w-full flex-col mb-6 relative">
          <label htmlFor="email" className="block text font-medium text-gray-700 mb-2">
            Email
          </label>
          <CustomInput
            id="email"
            name="email"
            placeholder="Enter Email"
            className={`w-full p-6 ${errors.email ? 'error-class' : ''}`}
            value={values.email}
            onChange={(e) => {
              handleChange(e);
              clearError('email');
            }}
          />
          {errors.email && (
            <div className="absolute top-4 right-0 transform -translate-y-full z-10 animate-fade-in-slide-down">
              <p className="text-xs bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap">
                {errors.email}
              </p>
              <div className="w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-red-600 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
            </div>
          )}
        </div>

        <div className="flex w-full flex-col relative">
          <label htmlFor="password" className="block text font-medium text-gray-700 mb-2">
            Password
          </label>
          <CustomInput
            id="password"
            name="password"
            type="password"
            placeholder="Enter Password"
            className={`w-full p-6 ${errors.password ? 'error-class' : ''}`}
            value={values.password}
            onChange={(e) => {
              handleChange(e);
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

        <div className="text-right mt-4">
          <Link href="/forgot-password" className="text-light-red">
            Forgot Password ?
          </Link>
        </div>

        <ButtonGradient type="submit" className="w-full mt-6 py-6" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
               Logging in...
            </>
          ) : (
            "Log in"
          )}
        </ButtonGradient>
      </form>

      <div className="mt-4 font-medium text-center">
        <span>
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-light-red">
            Sign Up!
          </Link>
        </span>
      </div>
    </div>
  );
}