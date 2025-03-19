'use client'

import { ButtonGradient } from "@/components/common/ButtonGradient";
import CustomInput from "@/components/common/CustomInput";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function ForgotPasswordPage() {

  const router = useRouter()

  return (
    <div className="mt-4">
      <h1 className="text-xl md:text-3xl font-semibold text-pure-grey mb-10">Forgot Password</h1>
      <div className="flex w-full flex-col mb-6">
        <label htmlFor="email" className="block font-medium text-gray-700 mb-2">
          Email
        </label>
        <CustomInput id="email" placeholder="Enter Email" className="w-full p-6" />
      </div>
      <ButtonGradient className="w-full mt-6 py-6" onClick={() => router.push('/verification-code')}>Recover Password</ButtonGradient>
      <div className="mt-4 text-lg font-medium text-center">
        <span>Don&#39;t have an account? <Link href={"/sign-up"} className="text-light-red">Sign Up!</Link></span>
      </div>
    </div>
  )
}