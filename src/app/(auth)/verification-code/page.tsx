'use client'

import { ButtonGradient } from "@/components/common/ButtonGradient";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useCallback } from "react";
import { useFormState } from "@/hooks/useFormState";
import { useVerifyEmail } from "@/hooks/useVerifyEmail";
import { useResendVerification } from "@/hooks/useResendVerification";
import { AxiosError } from "axios";
import { useUserStore } from "@/stores/userStore";
import { User } from "@/types";

export default function VerificationCodePage() {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const { user, setUser } = useUserStore()

  const { values, setValue, errors, resetForm, handleApiValidationError } = useFormState({
    code: ['', '', '', '', '', ''],
  });

  const verifyCodeMutation = useVerifyEmail();
  const resendCodeMutation = useResendVerification();

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...values.code];
      newCode[index] = value;
      setValue('code', newCode);

      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values.code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = useCallback(async () => {
    const code = values.code.join('');
    if (code.length < 6) {
      return;
    }

    try {
      await verifyCodeMutation.mutateAsync({ code });
      resetForm();
      setUser({ ...user, emailVerified: true } as User)
      router.push('/user-dashboard');
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.data?.errors) {
        handleApiValidationError(error.response.data);
      }
      verifyCodeMutation.reset();
    }
  }, [values]);

  useEffect(() => {
    const code = values.code.join('');
    if (code.length === 6) {
      handleSubmit();
    }
  }, [values]);

  const handleResendCode = async () => {
    await resendCodeMutation.mutateAsync();
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-xl md:text-3xl font-medium text-pure-grey mb-2">Verification Code</h1>
      <p className="text-charcol text-sm mb-4">We have sent a code to you email address, please enter the code.</p>
      <div className="w-full flex-col mb-6">
        <label htmlFor="code" className="block text-lg font-medium text-gray-700 mb-2">
          Enter Code
        </label>
        <div className="flex gap-2 justify-start">
          {Array.from({ length: 6 }, (_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-gray-300 text-center text-xl focus:outline-none focus:border-light-red bg-transparent"
              value={values.code[i]}
              onChange={(e) => {
                const newValue = e.target.value;
                if (/^[0-9]?$/.test(newValue)) {
                  handleChange(i, newValue);
                }
              }}
              onKeyDown={(e) => handleKeyDown(i, e)}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
            />
          ))}
        </div>
        {errors.code && <p className="text-red-500 mt-2 text-center">{errors.code}</p>}
      </div>

      <ButtonGradient
        className="w-full mt-6 py-6"
        onClick={handleSubmit}
        disabled={verifyCodeMutation.isPending}
      >
        {verifyCodeMutation.isPending ? 'Verifying...' : 'Submit'}
      </ButtonGradient>

      <div className="mt-4 font-medium text-center">
        <span>
          Didn&#39;t receive the code?{" "}
          <button
            className="text-light-red underline"
            type="button"
            onClick={handleResendCode}
            disabled={resendCodeMutation.isPending}
          >
            {resendCodeMutation.isPending ? 'Resending...' : 'Resend Code!'}
          </button>
        </span>
      </div>
    </div>
  );
}
