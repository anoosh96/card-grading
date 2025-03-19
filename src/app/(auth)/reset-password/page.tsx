'use client'

import { ButtonGradient } from "@/components/common/ButtonGradient";
import CustomInput from "@/components/common/CustomInput";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function ResetPasswordPage() {

  const router = useRouter()

  return (
    <div className="mt-4">
      <h1 className="text-xl lg:text-3xl font-semibold text-pure-grey mb-10">Reset Password</h1>
      <div className="flex w-full flex-col mb-6">
        <label htmlFor="password" className="block font-medium text-gray-700 mb-2">
          Password
        </label>
        <CustomInput id="password" placeholder="Enter Password" className="w-full p-6" />
      </div>
      <div className="flex w-full flex-col">
        <label htmlFor="confirmPassword" className="block font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <CustomInput id="confirmPassword" placeholder="Enter Password" type="password" className="w-full p-6" />
      </div>
      <ButtonGradient className="w-full mt-6 py-6" onClick={() => router.push('/login') }>Update Password</ButtonGradient>
      <div className="mt-4 font-medium text-center">
        <span>Remember your Password? <Link href={"/login"} className="text-light-red">Log In Here!</Link></span>
      </div>
    </div>
  )
}