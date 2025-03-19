import { StepCardProps } from "@/types";
import Image from "next/image";

export default function StepCard ({ image, title, desc } : StepCardProps) {
  return (
    <div className="flex flex-col gap-6 items-center justify-center mb-10 xl:mb-0">
      <div className="relative w-[220px] h-[140px] lg:h-[160px] xl:w-[224px] xl:h-[180px]"><Image src={image} fill alt="step image" className="object-contain"/></div>
      <h2 className="text-light-red lg:text-xl lg:mt-8">{title}</h2>
      <p className="h-[4rem] text-sm lg:text-base text-charcol text-center px-8 lg:px-4">{desc}</p>
    </div>
  )
}