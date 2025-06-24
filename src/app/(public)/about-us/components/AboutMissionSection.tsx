'use client'

import Hoverable from "@/components/common/Hoverable";
import MissionArrowDown from "@/components/svgs/MissionArrowDown";
import MissionArrowLeft from "@/components/svgs/MissionArrowLeft";
import MissionArrowRight from "@/components/svgs/MissionArrowRight";
import MissionArrowUp from "@/components/svgs/MissionArrowUp";
import React from "react";

function AboutMissionSection() {
  return (
    <section className="px-4 md:px-10 flex flex-col gap-5 md:pb-36">
      <h1 className="text-[2rem] font-bold text-charcol">Our Mission</h1>
      <div className="flex flex-col justify-center items-center bg-white py-10">
        <div className="relative flex flex-col w-full xl:max-w-3xl">

          {/* Mission A Arrow */}
          <div className="flex w-full justify-center relative top-[150px] sm:top-[90px] lg:top-[70px]">
            <Hoverable className="flex flex-col items-center w-auto scale-50 sm:scale-90 lg:scale-100">
              {(isHovered, setIsHovered) => (
                <>
                  <MissionArrowUp hover={isHovered} setHover={setIsHovered} />
                  <span className={`${isHovered ? 'text-white' : 'text-charcoal'} absolute w-full top-20 leading-relaxed font-semibold  -rotate-90 text-2xl`}>Mission A</span>
                  <p className={`block absolute top-5 text-start text-sm text-charcol left-32 w-72`}>
                    To become one of the leading Collectible
                    <br />
                    grading companies in the UK.
                  </p>
                </>
              )
              }
            </ Hoverable>
          </div>

          {/* Mission D,B Arrow */}
          <div className="flex justify-center w-full">

          <div className="relative flex justify-center left-[65px] sm:left-[5px] lg:-left-[5px]">
            <Hoverable className="flex flex-col items-center transform scale-50 sm:scale-90 lg:scale-100">
              {(isHovered, setIsHovered) => (
                <>
                  <MissionArrowLeft hover={isHovered} setHover={setIsHovered} />
                  <span className={`${isHovered ? 'text-white' : 'text-charcoal'} absolute w-full top-16 -left-2 flex justify-center leading-relaxed font-semibold text-2xl`}>Mission D</span>
                  <p className={`block text-sm text-charcol absolute top-[130px] -left-[35px] lg:top-16 lg:-left-[14rem] w-72`}>
                    Gain customer confidence through
                    <br /> transparent and reliable services
                  </p>
                </>
              )
              }
            </ Hoverable>
            </div>


            {/* Mission B Arrow */}
            <div className="relative flex justify-center right-[65px] sm:right-[5px] lg:-right-[10px]">

            <Hoverable className="flex flex-col items-center scale-50 sm:scale-90 lg:scale-100" >
              {(isHovered, setIsHovered) => (
                <>
                  <MissionArrowRight hover={isHovered} setHover={setIsHovered} />
                  <span className={`${isHovered ? 'text-white' : 'text-charcoal'} absolute w-full top-16 left-2 flex justify-center leading-relaxed font-semibold text-2xl`}>Mission B</span>
                  <p className={`block text-sm text-charcol absolute top-[130px] -right-[100px] lg:top-16 lg:-right-[19rem] w-72`}>
                    Provide an affordable and accessible <br />
                    grading solution for collectors
                  </p>
                </>
              )
              }
            </ Hoverable>
            </div>
          </div>

          {/* Mission C Arrow */}
          {/* <div className="relative flex"> */}
          <div className="relative flex justify-center bottom-[145px] sm:bottom-[90px] lg:bottom-[70px]">
            <Hoverable className="flex flex-col items-center scale-50 sm:scale-90 lg:scale-100" >
              { (isHovered, setIsHovered) => (
                <>
                  <MissionArrowDown hover={isHovered} setHover={setIsHovered}  />
                  <span className={`${ isHovered ? 'text-white' : 'text-charcoal'} absolute w-full top-24 leading-relaxed font-semibold  -rotate-90 text-2xl`}>Mission C</span>
                  <p className={`block absolute bottom-5 text-start text-sm text-charcol left-32 w-72`}>
                    Use advanced AI technology for accuracy
                    <br />
                    and consistency in grading
                  </p>
                </>
              )
            } 
            </ Hoverable>
          </div>
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
