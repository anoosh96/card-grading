'use client'

import { ButtonGradient } from "@/components/common/ButtonGradient";
import CustomInput from "@/components/common/CustomInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignUp } from "@/hooks/useSignup"; // assuming you have this hook
import { useFormState } from "@/hooks/useFormState"; // use your custom form hook
import { handleRequestError } from "@/lib/toast";
import { useUserStore } from "@/stores/userStore";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { FlexibleRecord, SignupField } from "@/types";

export default function SignupPage() {
  const router = useRouter();

  // Form state using custom useFormState hook
  const { values, errors, handleChange, setError, clearError, resetFormErrors, handleApiValidationError } = useFormState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Loading and error handling
  const { mutateAsync: signup, isPending: signupLoading } = useSignUp();
  const { setUser, setToken } = useUserStore();  // Zustand hook to set user

  const validateForm = () => {
    let isValid = true;
    const newErrors: FlexibleRecord = {};

    // Check for required fields
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

    // Validate password match if both are provided
    if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    // Set all errors
    Object.entries(newErrors).forEach(([field, message]) => {
      setError(field as SignupField, message as string);
    });

    return isValid;
  };

  const handleSignup = async () => {
    resetFormErrors();
    
    // Check if form is valid
    if (!validateForm()) {
      return;
    }

    const { name, email, password } = values;

    try {
      const { user, token } = await signup({ name, email, password });
      setUser(user);  // Store user data in Zustand after sign-up
      setToken(token);
      router.push('/verification-code'); // Redirect to login page on successful signup
    } catch (err) {
      resetFormErrors();
      // Check if the error response has validation errors
      if (err instanceof AxiosError && err?.response?.data?.errors) {
        handleApiValidationError(err.response.data); // Map API errors to form fields
      }
      else {
        // If there is a general message (e.g., "User already exists"), set it globally
        handleRequestError(err);
      }
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-xl md:text-3xl font-semibold text-pure-grey mb-10">Create Account</h1>
      <div className="flex w-full flex-col mb-6">
        <label htmlFor="name" className="block font-medium text-gray-700 mb-2">
          Name <span className="text-red-500">*</span>
        </label>
        <CustomInput
          id="name"
          name="name"
          placeholder="Enter Name"
          className="w-full p-6"
          value={values.name}
          onChange={(e) => {
            handleChange(e);
            clearError('name');
          }}
          required
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="flex w-full flex-col mb-6">
        <label htmlFor="email" className="block font-medium text-gray-700 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <CustomInput
          id="email"
          name="email"
          placeholder="Enter Email"
          className="w-full p-6"
          value={values.email}
          onChange={(e) => {
            handleChange(e);
            clearError('email');
          }}
          required
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="flex w-full flex-col mb-6">
        <label htmlFor="password" className="block font-medium text-gray-700 mb-2">
          Password <span className="text-red-500">*</span>
        </label>
        <CustomInput
          id="password"
          name="password"
          placeholder="Enter Password"
          type="password"
          className="w-full p-6"
          value={values.password}
          onChange={(e) => {
            handleChange(e);
            clearError('password');
          }}
          required
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      <div className="flex w-full flex-col">
        <label htmlFor="confirmPassword" className="block font-medium text-gray-700 mb-2">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <CustomInput
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          className="w-full p-6"
          value={values.confirmPassword}
          onChange={(e) => {
            handleChange(e);
            clearError('confirmPassword');
          }}
          required
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
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