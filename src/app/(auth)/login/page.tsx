import { ButtonGradient } from "@/components/common/ButtonGradient";
import Container from "@/components/common/Container";
import CustomInput from "@/components/common/CustomInput";
import Image from "next/image";
import Link from "next/link";


export default function LoginPage() {
  return (
    <div className="mt-4">
      <h1 className="text-3xl font-medium text-pure-grey mb-10">Welcome Back!</h1>
      <div className="flex w-full flex-col mb-6">
        <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
          Email
        </label>
        <CustomInput id="email" placeholder="Enter Email" className="w-full p-6" />
      </div>
      <div className="flex w-full flex-col">
        <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
          Password
        </label>
        <CustomInput id="email" placeholder="Enter Password" type="password" className="w-full p-6" />
      </div>
      <div className="text-right mt-4">
        <Link href={"/forgot-password"} className="text-light-red">
          Forgot Password ?
        </ Link>
      </div>
      <ButtonGradient className="w-full mt-6 py-6">Log in</ButtonGradient>
      <div className="mt-4 text-lg font-medium text-center">
        <span>Don't have an account? <Link href={"/sign-up"} className="text-light-red">Sign Up!</Link></span>
      </div>
    </div>
  )
}