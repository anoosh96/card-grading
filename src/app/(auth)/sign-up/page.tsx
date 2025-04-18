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

export default function SignupPage() {
  const router = useRouter();

  // Form state using custom useFormState hook
  const { values, errors, handleChange, setError, resetFormErrors, handleApiValidationError } = useFormState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Loading and error handling

  const { mutateAsync: signup, isPending: signupLoading } = useSignUp();
  const { setUser, setToken } = useUserStore();  // Zustand hook to set user


  const handleSignup = async () => {
    resetFormErrors();
    const { name, email, password, confirmPassword } = values;

    // Validate password match
    if (password !== confirmPassword) {
      setError('confirmPassword', 'Passwords do not match');
      return;
    }

    // Clear previous errors
    setError('confirmPassword', null);

    try {
      const { user, token } = await signup({ name, email, password });
      setUser(user);  // Store user data in Zustand after sign-up
      setToken(token);
      router.push('/verification-code'); // Redirect to login page on successful signup
    } catch (err) {
      resetFormErrors()
      // Check if the error response has validation errors
      if (err instanceof AxiosError &&  err?.response?.data?.errors) {
        handleApiValidationError(err.response.data); // Map API errors to form fields
      }
      else {
        // If there is a general message (e.g., "User already exists"), set it globally
        handleRequestError(err)
      }
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-xl md:text-3xl font-semibold text-pure-grey mb-10">Create Account</h1>
      <div className="flex w-full flex-col mb-6">
        <label htmlFor="name" className="block font-medium text-gray-700 mb-2">
          Name
        </label>
        <CustomInput
          id="name"
          name="name"
          placeholder="Enter Name"
          className="w-full p-6"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="flex w-full flex-col mb-6">
        <label htmlFor="email" className="block font-medium text-gray-700 mb-2">
          Email
        </label>
        <CustomInput
          id="email"
          name="email"
          placeholder="Enter Email"
          className="w-full p-6"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="flex w-full flex-col mb-6">
        <label htmlFor="password" className="block font-medium text-gray-700 mb-2">
          Password
        </label>
        <CustomInput
          id="password"
          name="password"
          placeholder="Enter Password"
          type="password"
          className="w-full p-6"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      <div className="flex w-full flex-col">
        <label htmlFor="confirmPassword" className="block font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <CustomInput
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          className="w-full p-6"
          value={values.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
      </div>

      {/* Show error message if there's a form-wide error */}
      {/* {apiError && <p className="text-red-500 text-sm">{apiError}</p>} */}

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
