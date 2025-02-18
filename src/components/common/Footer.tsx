"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[url('/assets/images/bg-footer-section.svg')] bg-cover bg-center text-black py-8 px-10">
      {/* Top Right Decorative Image */}
      <Image
        src="/assets/images/footer-top-right-vector-boxes.svg"
        alt="Top Right Decoration"
        width={150}
        height={150}
        className="absolute top-0 right-0 hidden md:block"
      />

      {/* Bottom Left Decorative Image */}
      <Image
        src="/assets/images/footer-bottom-left-vector-boxes.svg"
        alt="Bottom Left Decoration"
        width={150}
        height={150}
        className="absolute bottom-0 left-0 hidden md:block"
      />

      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-bold text-sm">LOGO</h2>
          <p className="mt-2 text-sm">Lysanne Parkways, East Genevieveboro 55322-8037</p>
          <div className="flex items-center gap-4 mt-4">
            <Link href="#">
              <Image src="/icons/insta-icon.svg" alt="Instagram" width={24} height={24} />
            </Link>
            <Link href="#">
              <Image src="/icons/youtube-icon.svg" alt="YouTube" width={24} height={24} />
            </Link>
            <Link href="#">
              <Image src="/icons/twitter-icon.svg" alt="Twitter" width={24} height={24} />
            </Link>
            <Link href="#">
              <Image src="/icons/facebook-icon.svg" alt="Facebook" width={24} height={24} />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="flex flex-col w-1/2  border-b pb-5 items-start">
          <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-3">
              <label className="block text-sm font-medium">Name</label>
              <div className="relative w-full">
                {/* Gradient border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[hsl(48,100%,50%)] via-[hsl(31,95%,49%)] to-[hsl(11,89%,47%)] p-[1px] peer-focus-visible:p-[2px] transition-all duration-200">
                  {/* White background inside the border */}
                  <div className="h-full w-full rounded-full bg-white "></div>
                </div>

                {/* Input itself */}
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="peer relative w-full px-4 py-2 bg-transparent focus-visible:outline-none rounded-full"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full px-4 bg-light-grey py-2 rounded-full border-none focus:outline-none focus-visible:outline-none bg-gray-100"
              />
            </div>
          </div>
          <Button className="mt-5 rounded-full bg-custom-gradient py-6 px-8 text-base">Get In Touch</Button>
        </div>
        {/* <button className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-2 px-6 rounded-md">Get In Touch</button> */}
      </div>

      <div className="text-center mt-3 text-sm">
        &copy; Copyright <Link href="#">Terms & Conditions</Link> - AI-Powered Pokémon Card Grading | Fast, Accurate & Transparent.
      </div>
    </footer>
  );
}
