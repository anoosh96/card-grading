'use client'

import { ButtonGradient } from "@/components/common/ButtonGradient";
import CustomInput from "@/components/common/CustomInput";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormState } from "@/hooks/useFormState";
import { useResetPassword } from "@/hooks/useResetPassword";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const { values, setValue, errors, resetForm, handleApiValidationError } = useFormState({
    password: '',
    confirmPassword: ''
  });

  const resetPasswordMutation = useResetPassword();

  const handleSubmit = async () => {
    if (!token) {
      return;
    }

    if (values.password !== values.confirmPassword) {
      // Optional local validation
      alert("Passwords do not match.");
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
    } catch (error: any) {
      if (error?.response?.data?.errors) {
        handleApiValidationError(error.response.data);
      }
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-xl lg:text-3xl font-semibold text-pure-grey mb-10">Reset Password</h1>

      <div className="flex w-full flex-col mb-6">
        <label htmlFor="password" className="block font-medium text-gray-700 mb-2">
          Password
        </label>
        <CustomInput
          id="password"
          placeholder="Enter Password"
          className="w-full p-6"
          type="password"
          value={values.password}
          onChange={(e) => setValue('password', e.target.value)}
        />
        {errors.password && <p className="text-red-500 mt-2">{errors.password}</p>}
      </div>

      <div className="flex w-full flex-col">
        <label htmlFor="confirmPassword" className="block font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <CustomInput
          id="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          className="w-full p-6"
          value={values.confirmPassword}
          onChange={(e) => setValue('confirmPassword', e.target.value)}
        />
        {errors.confirmPassword && <p className="text-red-500 mt-2">{errors.confirmPassword}</p>}
      </div>

      <ButtonGradient
        className="w-full mt-6 py-6"
        onClick={handleSubmit}
        disabled={resetPasswordMutation.isPending}
      >
        {resetPasswordMutation.isPending ? 'Updating...' : 'Update Password'}
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
