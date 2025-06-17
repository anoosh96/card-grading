import Hexagon from "@/components/svgs/Hexagon";
import { BulkCardProps } from "./OurServices";


export default function BulkCard({price, turnAroundTime, color, cards, className}: BulkCardProps ) {
  return (
    <div className={`mb-28 ${className}`}> {/* Add relative positioning to the common parent */}
      <div className="relative w-full lg:w-[800px] flex items-center justify-end" style={{  filter: 'drop-shadow(-1px 2px 10px rgba(50, 50, 0, 0.23))'}}>
        {/* Outer Hexagon / Arrow Shape */}
        <div
          className="bg-white h-[180px] flex items-center pr-[180px] w-full"
          style={{
            clipPath: 'polygon(0% 50%, 8% 0%, 90% 0%, 100% 50%, 90% 100%, 8% 100%)',
            zIndex: 1, /* Ensure it's below the absolute hexagon if they overlap */
          }}
        >
          {/* Content inside the outer shape */}
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-around w-full pl-12 sm:pl-20">
            <div className="">
              <p className="text-sm md:text-lg text-neutral-grey">Price Per Card</p>
              <p className="text-sm md:text-base text-charcol mt-1">£{price}</p>
            </div>
            <div className="">
              <p className="text-sm md:text-lg text-neutral-grey">Turnaround Time</p>
              <p className="text-sm md:text-base text-charcol mt-1">{turnAroundTime}</p>
            </div>
          </div>
        </div>

        {/* Inner Hexagon (absolute positioned to break out) */}
        <div
          className={`absolute right-0 top-1/2 -translate-y-1/2 w-[220px] h-[200px] bg-[${color}] flex items-center justify-center text-center text-4xl font-bold shadow-lg`}
          style={{
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            zIndex: 2, /* Ensure it's above the outer shape */
            right: '-50px' /* Adjust this value to control how much it "spans out" */
          }}
        >
          <div>
            <p>{cards}+</p>
            <p className="text-lg">Cards</p>
          </div>
        </div>

        <div
          className={`absolute right-[125px] -top-[7px] -translate-y-1/2 w-[25px] h-[25px] bg-[${color}] shadow-lg`}
          style={{
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            zIndex: 10, /* Ensure it's above the outer shape */
          }}
        >
        </div>
      
        <div className="absolute right-[80px] -bottom-[40px] z-10">
          <Hexagon width={80} height={80} fill={color}/>
        </div>
      </div>
    </div>
  );
}