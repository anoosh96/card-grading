"use client";

import Image from "next/image";
import Link from "next/link";
import { ButtonGradient } from "./ButtonGradient";
import CustomInput from "./CustomInput";

type ContactFormProps = {
  isHideContactForm?: boolean;
};
export default function Footer({ isHideContactForm = false }: ContactFormProps) {
  return (
    <footer className="relative flex flex-col justify-between items-start min-h-[320px] w-full bg-[url('/assets/images/bg-footer-section.svg')] bg-cover bg-center text-black py-8">
      {/* Top Right Decorative Image */}
      <Image
        src="/assets/images/footer-top-right-vector-boxes.svg"
        alt="Top Right Decoration"
        width={150}
        height={150}
        className="absolute top-0 right-0 block"
      />

      {/* Bottom Left Decorative Image */}
      <Image
        src="/assets/images/footer-bottom-left-vector-boxes.svg"
        alt="Bottom Left Decoration"
        width={150}
        height={150}
        className="absolute z-10 bottom-0 left-0 block"
      />

      <div className=" grid grid-cols-1 md:grid-cols-4 gap-8 px-10">
        <div>
          <h2 className="font-bold text-sm">LOGO</h2>
          <p className="mt-2 text-sm">15 Barford Drive, Chester Le Street, County Durham, DH23HR</p>
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

      <div className="flex flex-col justify-start md:justify-center w-full px-10 lg:px-0 mt-10 lg:mt-1 lg:justify-center">
        <div className="relative md:mx-auto">
          {!isHideContactForm ? (
            <div className="flex w-full mt-10 lg:mt-1  lg:justify-center">
              <div className="flex flex-col w-full  z-50  pb-5 items-start">
                <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-3">
                    <label className="block text-sm text-charcol font-medium">Name</label>
                    <CustomInput
                      onChange={(e) => {
                        console.log({ val: e.target.value });
                      }}
                      placeholder="Enter Name"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="block text-sm text-charcol font-medium">Email</label>
                    <CustomInput
                      onChange={(e) => {
                        console.log({ val: e.target.value });
                      }}
                      placeholder="Enter Email"
                      type="email"
                      className="font-medium"
                    />
                    {/* <input
                      type="email"
                      placeholder="Enter Email"
                      // className="w-full text-sm placeholder:text-neutral-grey font-medium px-4 bg-light-grey py-2 rounded-full border-none focus:outline-none focus-visible:outline-none bg-gray-100"
                    /> */}
                  </div>
                </div>
                <ButtonGradient className="mt-5 z-50 py-4 px-8 ">Get In Touch</ButtonGradient>
              </div>
            </div>
          ) : null}
          <div className="w-full h-[1px] bg-soft-grey mb-3" />
          <div className="text-center z-50 lg:text-center text-sm">
            &copy; Copyright <Link href="#">Terms & Conditions</Link> - AI-Powered Pokémon Card Grading | Fast, Accurate & Transparent.
          </div>
        </div>
      </div>
    </footer>
  );
}
