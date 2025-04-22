'use client'

import { useState, useEffect } from "react";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import CustomInput from "@/components/common/CustomInput";
import Link from "next/link";
import { useFormState } from "@/hooks/useFormState";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { AxiosError } from "axios";

export default function ForgotPasswordPage() {
  const { values, setValue, errors, resetForm, handleApiValidationError } = useFormState({
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

  const handleSubmit = async () => {
    if (!values.email) return;

    try {
      await forgotPasswordMutation.mutateAsync({ email: values.email });
      resetForm();
      setIsCooldown(true);
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.data?.errors) {
        handleApiValidationError(error.response.data);
      }
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-xl md:text-3xl font-semibold text-pure-grey mb-10">Forgot Password</h1>

      <div className="flex w-full flex-col mb-6">
        <label htmlFor="email" className="block font-medium text-gray-700 mb-2">
          Email
        </label>
        <CustomInput
          id="email"
          placeholder="Enter Email"
          className="w-full p-6"
          value={values.email}
          onChange={(e) => setValue('email', e.target.value)}
        />
        {errors.email && <p className="text-red-500 mt-2">{errors.email}</p>}
      </div>

      <ButtonGradient
        className="w-full mt-6 py-6"
        onClick={handleSubmit}
        disabled={forgotPasswordMutation.isPending || isCooldown}
      >
        {forgotPasswordMutation.isPending
          ? 'Submitting...'
          : isCooldown
          ? `Please wait ${cooldownTime}s before trying again`
          : 'Recover Password'}
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
