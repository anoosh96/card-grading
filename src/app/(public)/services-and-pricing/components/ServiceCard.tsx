import { ServiceCardProps } from "@/types";
import Image from "next/image";


export default function ServiceCard({ name, price, features }: ServiceCardProps) {
  return (
    <div className="flex flex-col items-center w-[20rem] lg:w-[30rem]">
      <div className="bg-custom-gradient text-white text-center py-12 px-6 w-3/4 rounded-2xl rounded-b-none shadow-md">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <p className="mt-2 text-xl font-bold">${price} <span className="text-sm font-normal">per card</span></p>
      </div>
      <div className="relative flex flex-col justify-between items-center bg-light-grey rounded-2xl shadow-lg px-6 w-full mx-auto h-[32rem] lg:h-[28rem] pt-16 pb-12 z-2">
        <Image src={"/assets/images/shadow.svg"} width={45} height={34} className="absolute -top-4 left-4 -z-[1]" alt="shadow image"/>
        <Image src={"/assets/images/shadow-right.svg"} width={45} height={34} className="absolute -top-4 right-4 -z-[1]" alt="shadow image"/>

        {/* Content */}
        <div className="flex flex-col justify-between h-full">
          <div className="space-y-6 xl:space-y-8">
            {features.map((item, index) => (
              <div key={index} className="flex space-x-4 items-start">
                <Image src={"/icons/star.svg"} width={24} height={24} className="w-[24px] h-[24px]" alt="star icon"/>
                <p className="text-gray-800 leading-1 text-left xl:text-lg">{item}</p>
              </div>
            ))}
          </div>

          {/* Button */}
        <div className="-mb-2">
          <button className="w-full py-4 text-white font-medium rounded-full bg-custom-gradient shadow-md">
            Buy Now
          </button>
        </div>
        </div>
      </div>
    </div>
  )
}