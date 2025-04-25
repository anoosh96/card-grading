import Image from "next/image";
import React from "react";
import { AuthRedirect } from "./AuthRedirect";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid lg:grid-cols-2 overflow-hidden">
      <div className="flex flex-col items-center justify-start lg:mt-44 z-30 mb-14 lg:mb-0">
        <div className="p-10 lg:p-0 w-full md:w-[55%]">
          <Link href="/" className="inline-block text-3xl mb-10 lg:mb-20 mt-10 lg:mt-0 font-bold">
            Logo
          </Link>
          <AuthRedirect>{ children }</AuthRedirect>
        </div>
      </div>
      <div className="relative">
        <Image src={"/assets/images/login-image.svg"} alt="card image" width={760} height={1024} className="w-full rotate-x-50" />
        <Image src={"/assets/images/login-overlay-left.svg"} width={760} height={1024} alt="overlay" className="w-full absolute right-0 top-[200px]" />
        <Image src={"/assets/images/login-overlay.svg"} width={760} height={1024} alt="overlay" className="w-full absolute right-[75%] top-0 z-10" />
        <Image src={"/assets/images/red-line.svg"} width={200} height={1024} alt="overlay" className="w-auto h-full absolute right-[69%] top-0 z-20" />
        <Image src={"/assets/images/red-lines.svg"} width={200} height={1024} alt="overlay" className="absolute right-[27%] bottom-0  z-20" />
      </div>
    </section>
  )
}
