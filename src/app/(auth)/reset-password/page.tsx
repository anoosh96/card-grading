import { ButtonGradient } from "@/components/common/ButtonGradient";
import Container from "@/components/common/Container";
import CustomInput from "@/components/common/CustomInput";
import Image from "next/image";
import Link from "next/link";


export default function ResetPasswordPage() {
  return (
    <div className="mt-4">
      <h1 className="text-3xl font-medium text-pure-grey mb-10">Reset Password</h1>
      <div className="flex w-full flex-col mb-6">
        <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
          Password
        </label>
        <CustomInput id="password" placeholder="Enter Password" className="w-full p-6" />
      </div>
      <div className="flex w-full flex-col">
        <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <CustomInput id="confirmPassword" placeholder="Enter Password" type="password" className="w-full p-6" />
      </div>
      <ButtonGradient className="w-full mt-6 py-6">Update Password</ButtonGradient>
      <div className="mt-4 text-lg font-medium text-center">
        <span>Remember your Password? <Link href={"/login"} className="text-light-red">Log In Here!</Link></span>
      </div>
    </div>
  )
}