'use client'

import { ButtonGradient } from "@/components/common/ButtonGradient";
import CustomInput from "@/components/common/CustomInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormState } from "@/hooks/useFormState";
import { useLogin } from "@/hooks/useLogin";
import { handleRequestError } from "@/lib/toast";

export default function LoginPage() {
  const router = useRouter();
  const { values, errors, handleChange, handleApiValidationError, resetFormErrors } = useFormState({
    email: '',
    password: ''
  });

  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await loginMutation.mutateAsync(values); // awaits the promise

      if(data.user.emailVerified){
        router.push('/user-dashboard');
      }
      else {
        router.push('/verification-code')
      }
    } catch (error: any) {
      resetFormErrors()
      if (error?.response?.data?.errors) {
        handleApiValidationError(error.response.data);
      }
      else{
        handleRequestError(error)
      }
      // You might still have a global toast from handleRequestError inside the mutation’s onError
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-3xl font-semibold text-pure-grey mb-10">Welcome Back!</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex w-full flex-col mb-6">
          <label htmlFor="email" className="block text font-medium text-gray-700 mb-2">
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
          {errors.email && <p className="text-red-500 mt-2">{errors.email}</p>}
        </div>

        <div className="flex w-full flex-col">
          <label htmlFor="password" className="block text font-medium text-gray-700 mb-2">
            Password
          </label>
          <CustomInput
            id="password"
            name="password"
            type="password"
            placeholder="Enter Password"
            className="w-full p-6"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 mt-2">{errors.password}</p>}
        </div>

        <div className="text-right mt-4">
          <Link href="/forgot-password" className="text-light-red">
            Forgot Password ?
          </Link>
        </div>

        <ButtonGradient type="submit" className="w-full mt-6 py-6">
          {loginMutation.isPending ? 'Logging in...' : 'Log in'}
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
