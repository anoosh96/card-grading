// src/components/ServiceCard.tsx

import { ServiceCardProps } from "./OurServices";

export default function ServiceCard({ name, price, tag, turnaroundTime, maxCardValue, colorClass, borderClass }: ServiceCardProps) {
  // Extract hex color from colorClass, assuming colorClass is like 'bg-[#RRGGBB]'
  // const hexColor = colorClass.replace('bg-[', '').replace(']', '');

  // // Define the width of the colored arrow part, including the point's extension
  // const arrowPartWidth = '120px'; // Approx 100px for the main block + 20px for the arrow point
  // const arrowPointOverlap = '20px'; // How much the arrow point extends into the right card

  return (
    <div className={`w-[440px] h-[220px] ${colorClass} rounded-lg flex shadow-2xl`}>
      <div className="w-[140px] flex items-center relative">
        <div className="pl-10 pb-2 relative z-[10]">
          <span className="heading-primary text-charcol font-bold">£{price}</span><span className="text-sm">&nbsp;/&nbsp;&nbsp;card</span>
        </div>

        {/* Shadow for triangle (left + top) */}
        <div className="absolute left-[111px] top-0 bottom-0 my-auto w-0 h-0 border-y-[60px] border-y-transparent border-l-[65px] border-l-black/10 z-[1] translate-x-[4px]">
        </div>

        {/* Actual yellow triangle */}
        <div className={`absolute left-28 top-0 bottom-0 my-auto w-0 h-0 border-y-[60px] border-y-transparent border-l-[65px] ${borderClass }  z-[2]`}>
        </div>
      </div>
      <div className="bg-light-grey/80 w-[357px] h-full rounded-lg -mt-[20px] -mr-[40px] pt-8 pb-4 pl-10">
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="heading-primary mb-2">
              {name}
            </div>
            <div className="text-sm text-grey">
              {tag}
            </div>
          </div>

          <div className="flex gap-8">
             <div className="mb-2">
                <div className="text-grey text-sm">
                   Turnaround Time
                </div>
                <div className="text-charcol text-sm">
                  {turnaroundTime}
                </div>
             </div>
             <div>
                <div className="text-grey text-sm">
                   Max Card Value
                </div>
                <div className="text-charcol text-sm">
                  {maxCardValue}
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  )
}