'use client'

import { ButtonGradient } from "@/components/common/ButtonGradient";
import CustomInput from "@/components/common/CustomInput";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useFormState } from "@/hooks/useFormState";
import { useVerifyEmail } from "@/hooks/useVerifyEmail";
import { useResendVerification } from "@/hooks/useResendVerification";
import { AxiosError } from "axios";

export default function VerificationCodePage() {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const { values, setValue, errors, resetForm, handleApiValidationError } = useFormState({
    code: ''
  });

  const verifyCodeMutation = useVerifyEmail();
  const resendCodeMutation = useResendVerification();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;

    if (/^[0-9]?$/.test(value)) {
      const newCode = values.code.split('');
      newCode[index] = value;
      setValue('code', newCode.join(''));

      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    if (values.code.length < 6) {
      return; // optionally show error toast or mark fields invalid
    }

    try {
      await verifyCodeMutation.mutateAsync({ code: values.code });
      resetForm();
      router.push('/user-dashboard');
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.data?.errors) {
        handleApiValidationError(error.response.data);
      }
    }
  };

  const handleResendCode = async () => {
    await resendCodeMutation.mutateAsync();
  };

  return (
    <div className="mt-4">
      <h1 className="text-xl md:text-3xl font-medium text-pure-grey mb-10">Verification Code</h1>
      <div className="flex w-full flex-col mb-6">
        <label htmlFor="code" className="block text-lg font-medium text-gray-700 mb-2">
          Enter Code
        </label>
        <div className="flex gap-2">
          {Array.from({ length: 6 }, (_, i) => (
            <CustomInput
              ref={(el) => { inputRefs.current[i] = el; }}
              key={i}
              id={`code_digit_${i}`}
              name={`code_digit_${i}`}
              placeholder="0"
              type="text"
              maxLength={1}
              className="w-full lg:p-6 text-center"
              value={values.code[i] || ''}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>
        {errors.code && <p className="text-red-500 mt-2">{errors.code}</p>}
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
