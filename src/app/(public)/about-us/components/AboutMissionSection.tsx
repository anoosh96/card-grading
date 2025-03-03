'use client'

import Hoverable from "@/components/common/Hoverable";
import MissionArrowDown from "@/components/svgs/MissionArrowDown";
import MissionArrowLeft from "@/components/svgs/MissionArrowLeft";
import MissionArrowRight from "@/components/svgs/MissionArrowRight";
import MissionArrowUp from "@/components/svgs/MissionArrowUp";
import React from "react";

function AboutMissionSection() {
  return (
    <section className="px-4 md:px-10 flex flex-col gap-5 pb-36">
      <h1 className="text-[2rem] font-bold text-charcol">Our Mission</h1>
      <div className="flex flex-col justify-center items-center h-[620px] bg-white">
        <div className="relative flex items-center justify-center w-full xl:max-w-3xl">
          {/* Mission A Arrow */}
          {/* <div className="relative flex"> */}
          <Hoverable className="absolute top-5 flex flex-col items-center scale-75 md:scale-90 lg:scale-100" >
            { (isHovered, setIsHovered) => (
              <>
                <MissionArrowDown hover={isHovered} setHover={setIsHovered}  />
                <span className={`${ isHovered ? 'text-white' : 'text-charcoal'} absolute w-full top-24 leading-relaxed font-semibold  -rotate-90 text-2xl`}>Mission C</span>
                <p className="hidden xl:block absolute bottom-5 text-start text-sm text-charcol left-32 w-72">
                  C Lorem ipsum dolor sit amet consectetur.
                  <br />
                  Sed pulvinar praesent magnis duis done.
                </p>
              </>
            )
           } 
          </ Hoverable>
          {/* <p className="text-xs translate-x-4 text-center w-40 mt-2">
          Missio C Lorem ipsum dolor sit amet consectetur. Sed pulvinar praesent magnis duis done.
        </p> */}
          {/* </div> */}

          {/* Mission B Arrow */}
          <Hoverable className="absolute right-16 flex flex-col items-center scale-75 md:scale-90 lg:scale-100" >
            { (isHovered, setIsHovered) => (
              <>
                <MissionArrowRight hover={isHovered} setHover={setIsHovered}  />
                <span className={`${ isHovered ? 'text-white' : 'text-charcoal'} absolute w-full top-16 left-2 flex justify-center leading-relaxed font-semibold text-2xl`}>Mission B</span>
                <p className="text-sm  hidden xl:block text-charcol absolute top-16 -right-[19rem] w-72">
                  B Lorem ipsum dolor sit amet consectetur. <br />
                  Sed pulvinar praesent magnis duis done.
                </p>
              </>
            )
           } 
          </ Hoverable>

          {/* Mission C Arrow */}
          <Hoverable className="absolute bottom-3 flex flex-col items-center w-auto scale-75 md:scale-90 lg:scale-100">
            { (isHovered, setIsHovered) => (
              <>
                <MissionArrowUp hover={isHovered} setHover={setIsHovered}  />
                <span className={`${ isHovered ? 'text-white' : 'text-charcoal'} absolute w-full top-20 leading-relaxed font-semibold  -rotate-90 text-2xl`}>Mission A</span>
                <p className="absolute hidden xl:block  top-5 text-start text-sm text-charcol left-32 w-72">
                  A Lorem ipsum dolor sit amet consectetur.
                  <br />
                  Sed pulvinar praesent magnis duis done.
                </p>
              </>
            )
           } 
          </ Hoverable>

          {/* Mission D Arrow */}
          <Hoverable className="absolute bottom-3 flex flex-col items-center w-auto scale-75 md:scale-90 lg:scale-100">
            { (isHovered, setIsHovered) => (
              <>
                <MissionArrowUp hover={isHovered} setHover={setIsHovered}  />
                <span className={`${ isHovered ? 'text-white' : 'text-charcoal'} absolute w-full top-20 leading-relaxed font-semibold  -rotate-90 text-2xl`}>Mission A</span>
                <p className="absolute hidden xl:block  top-5 text-start text-sm text-charcol left-32 w-72">
                  A Lorem ipsum dolor sit amet consectetur.
                  <br />
                  Sed pulvinar praesent magnis duis done.
                </p>
              </>
            )
           } 
          </ Hoverable>

          <Hoverable className="absolute left-16 flex flex-col items-center transform scale-75 md:scale-90 lg:scale-100">
            { (isHovered, setIsHovered) => (
              <>
                <MissionArrowLeft hover={isHovered} setHover={setIsHovered}  />
                <span className={`${ isHovered ? 'text-white' : 'text-charcoal'} absolute w-full top-16 -left-2 flex justify-center leading-relaxed font-semibold text-2xl`}>Mission D</span>
                <p className="text-sm hidden xl:block text-charcol absolute top-16 -left-[17rem] w-72">
                  D Lorem ipsum dolor sit amet consectetur.
                 <br /> Sed pulvinar praesent magnis duis done.
                </p>
              </>
            )
           } 
          </ Hoverable>
          {/* Central Point */}
          {/* <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-sm font-bold">Center</span>
        </div> */}
        </div>
      </div>
    </section>
  );
}

export default AboutMissionSection;
