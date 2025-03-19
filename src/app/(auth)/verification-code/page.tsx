'use client'

import { ButtonGradient } from "@/components/common/ButtonGradient";
import CustomInput from "@/components/common/CustomInput";
import Link from "next/link";
import { useRef } from "react";


export default function VerificationCodePage() {
  // const codeRef = useRef<HTMLDivElement>(null)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
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
            <CustomInput ref={(el) => {
              inputRefs.current[i] = el;
            }} key={i} id={`code_digit_${i}`} name={`code_digit_${i}`} placeholder="0" type="text" maxLength={1} className="w-full lg:p-6 text-center" onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)} />
          ))}
        </div>
      </div>
      <ButtonGradient className="w-full mt-6 py-6">Submit</ButtonGradient>
      <div className="mt-4 font-medium text-center">
        <span>Did&#39;t recieve the code? <Link href={"/sign-up"} className="text-light-red">Resend Code!</Link></span>
      </div>
    </div>
  )
}