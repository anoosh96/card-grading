import { AddonProps } from "@/types";
import Image from "next/image";


export default function Addon({icon, title, desc} : AddonProps){
  return(
    <div className="rounded-3xl border-2 border-soft-grey py-14 px-10 flex items-center gap-4">
      <Image src={icon} width={40} height={40} alt="credit card icon"/>
      <div>
         <h3 className="text-charcol text-xl font-medium">{title}</h3>
         <p className="text-charcol mt-2 font-normal">{desc}</p>
      </div>
    </div>
  )
}