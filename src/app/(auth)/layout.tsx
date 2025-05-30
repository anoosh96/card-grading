import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid lg:grid-cols-2 overflow-hidden">
      <div className="flex flex-col items-center justify-start lg:mt-32 z-30 mb-14 lg:mb-0">
        <div className="p-10 lg:p-0 w-full md:w-[55%]">
          <Link href="/" className="text-2xl font-semibold block mb-16">
            <Image src={"/assets/images/logo.png"} alt="logo" width={80} height={80} className="w-28 h-28 -ml-[20px]" />
          </Link>
          {children}
        </div>
      </div>
      <div className="h-screen">
        <Image src={"/assets/images/auth-pic.png"} alt="card image" width={760} height={1024} className="max-w-4xl w-full h-auto lg:h-screen object-fill clip-curve" />
      </div>
    </section>
  )
}
