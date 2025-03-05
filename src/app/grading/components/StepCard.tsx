import { StepCardProps } from "@/types";
import Image from "next/image";

export default function StepCard ({ image, title, desc } : StepCardProps) {
  return (
    <div className="flex flex-col gap-6 items-center justify-center w-[260px] mb-10 xl:mb-0">
      <div className="relative w-[258px] h-[240px]"><Image src={image} fill alt="step image" className="object-cover"/></div>
      <h2 className="text-light-red text-xl">{title}</h2>
      <p className="h-[4rem] text-charcol text-center">{desc}</p>
    </div>
  )
}