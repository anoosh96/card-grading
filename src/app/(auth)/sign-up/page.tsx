'use client'

import { ButtonGradient } from "@/components/common/ButtonGradient";
import CustomInput from "@/components/common/CustomInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignUp } from "@/hooks/useSignup";
import { useFormState } from "@/hooks/useFormState";
import { handleRequestError } from "@/lib/toast";
import { useUserStore } from "@/stores/userStore";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { FlexibleRecord, SignupField } from "@/types";

export default function SignupPage() {
  const router = useRouter();

  const { values, errors, handleChange, setError, clearError, resetFormErrors, handleApiValidationError } = useFormState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { mutateAsync: signup, isPending: signupLoading } = useSignUp();
  const { setUser, setToken } = useUserStore();

  const validateForm = () => {
    let isValid = true;
    const newErrors: FlexibleRecord = {};

    if (!values.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!values.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

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
      setError(field as SignupField, message as string);
    });

    return isValid;
  };

  const handleSignup = async () => {
    resetFormErrors();
    
    if (!validateForm()) {
      return;
    }

    const { name, email, password } = values;

    try {
      const { user, token } = await signup({ name, email, password });
      setUser(user);
      setToken(token);
      router.push('/verification-code');
    } catch (err) {
      resetFormErrors();
      if (err instanceof AxiosError && err?.response?.data?.errors) {
        handleApiValidationError(err.response.data);
      }
      else {
        handleRequestError(err);
      }
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-xl md:text-3xl font-semibold text-pure-grey mb-10">Create Account</h1>
      
      <div className="flex w-full flex-col mb-6 relative">
        <label htmlFor="name" className="block font-medium text-gray-700 mb-2">
          Name <span className="text-red-500">*</span>
        </label>
        <CustomInput
          id="name"
          name="name"
          placeholder="Enter Name"
          className={`w-full p-6 ${errors.name ? 'error-class' : ''}`}
          value={values.name}
          onChange={(e) => {
            handleChange(e);
            clearError('name');
          }}
          required
        />
        {errors.name && (
          <div className="absolute top-4 right-0 transform -translate-y-full z-10">
            <p className="text-xs bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap">
              {errors.name}
            </p>
            <div className="w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-red-600 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
          </div>
        )}
      </div>

      <div className="flex w-full flex-col mb-6 relative">
        <label htmlFor="email" className="block font-medium text-gray-700 mb-2">
          Email <span className="text-red-500">*</span>
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
          required
        />
        {errors.email && (
          <div className="absolute top-4 right-0 transform -translate-y-full z-10">
            <p className="text-xs bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap">
              {errors.email}
            </p>
            <div className="w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-red-600 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
          </div>
        )}
      </div>

      <div className="flex w-full flex-col mb-6 relative">
        <label htmlFor="password" className="block font-medium text-gray-700 mb-2">
          Password <span className="text-red-500">*</span>
        </label>
        <CustomInput
          id="password"
          name="password"
          placeholder="Enter Password"
          type="password"
          className={`w-full p-6 ${errors.password ? 'error-class' : ''}`}
          value={values.password}
          onChange={(e) => {
            handleChange(e);
            clearError('password');
          }}
          required
        />
        {errors.password && (
          <div className="absolute top-4 right-0 transform -translate-y-full z-10">
            <p className="text-xs bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap">
              {errors.password}
            </p>
            <div className="w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-red-600 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
          </div>
        )}
      </div>

      <div className="flex w-full flex-col relative">
        <label htmlFor="confirmPassword" className="block font-medium text-gray-700 mb-2">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <CustomInput
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          className={`w-full p-6 ${errors.confirmPassword ? 'error-class' : ''}`}
          value={values.confirmPassword}
          onChange={(e) => {
            handleChange(e);
            clearError('confirmPassword');
          }}
          required
        />
        {errors.confirmPassword && (
          <div className="absolute top-4 right-0 transform -translate-y-full z-10">
            <p className="text-xs bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap">
              {errors.confirmPassword}
            </p>
            <div className="w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-red-600 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
          </div>
        )}
      </div>

      <ButtonGradient className="w-full mt-6 py-6" onClick={handleSignup} disabled={signupLoading}>
        {signupLoading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Signing Up...
            </>
          ) : (
            "Create Account"
          )}
      </ButtonGradient>

      <div className="mt-4 font-medium text-center">
        <span>Already have an account? <Link href={"/login"} className="text-light-red">Log in Here!</Link></span>
      </div>
    </div>
  );
}