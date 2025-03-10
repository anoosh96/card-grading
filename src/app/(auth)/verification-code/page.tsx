import { ButtonGradient } from "@/components/common/ButtonGradient";
import Container from "@/components/common/Container";
import CustomInput from "@/components/common/CustomInput";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";


export default function VerificationCodePage() {
  // const codeRef = useRef<HTMLDivElement>(null)

  return (
    <div className="mt-4">
      <h1 className="text-3xl font-medium text-pure-grey mb-10">Verification Code</h1>
      <div className="flex w-full flex-col mb-6">
        <label htmlFor="code" className="block text-lg font-medium text-gray-700 mb-2">
          Enter Code
        </label>
        <div className="flex gap-2">
          {Array.from({ length: 6 }, (_, i) => (
            <CustomInput id={`code_digit_${i}`} name={`code_digit_${i}`} placeholder="0" type="text" maxLength={1} className="w-full p-6 text-center" />
          ))}
        </div>
      </div>
      <ButtonGradient className="w-full mt-6 py-6">Log in</ButtonGradient>
      <div className="mt-4 text-lg font-medium text-center">
        <span>Don't have an account? <Link href={"/sign-up"} className="text-light-red">Sign Up!</Link></span>
      </div>
    </div>
  )
}