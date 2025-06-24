import AvatarGroup from "@/components/common/AvatarGroup";
import Image from "next/image";
import React from "react";

// function AboutStorySection() {
//   return (
//     <section className="mb-24 px-4 md:px-10">
//       <div className="grid md:grid-cols-2 gap-12 items-center">
//         <div className="relative flex justify-start md:justify-center">
//           {/* <div className="relative  z-20"> */}

//           {/* </div> */}
//           <div className="relative w-fit min-h-[600px] justify-start flex rounded-lg">
//             <div className="absolute top-12 -right-10 z-40  flex flex-col items-center bg-white px-6 py-7 rounded-xl shadow-lg">
//               <div className="text-sm text-charcol">Monthly Members</div>
//               <div className="text-[2rem] font-bold text-charcol">5000+</div>
//             </div>
//             <div className="relative w-auto min-h-[600px]">
//               <div className="relative w-full min-h-[600px]">
//                 <AboutStorySectionLeftFrame />
//               </div>
//               <div className="absolute w-3/4 md:w-auto  h-[502px] top-14 right-4">
//                 <Image
//                   src="/assets/images/about-mission-section-image.png"
//                   alt="Team celebration"
//                   width={500}
//                   height={502}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//             <div className="absolute -bottom-6 -left-6 bg-white px-6 py-7 rounded-xl shadow-lg z-10 flex flex-col items-center gap-2">
//               <AvatarGroup />

//               <div className="font-medium text-lg text-charcol">8000+ reviews</div>
//             </div>
//           </div>
//         </div>
//         <div>
//           <h2 className="text-3xl font-bold mb-6">Our Story</h2>
//           <div className="space-y-4">
//             <p className="text-gray-600">
//               Lorem ipsum dolor sit amet consectetur. Tellus est elementum facilisi condimentum viverra curabitur nec nulla. Ornare lorem nibh tempor
//               quam erat quis. Ut nibh accumsan duis morbi amet eget. Ultricies id sed adipiscing cras. Sed semper sodales mauris viverra est gravida
//               eros faucibus. Id elementum neque gravida dictum ipsum. Velit enim urna ut pretium enim varius.
//             </p>
//             <p className="text-gray-600">
//               Lorem ipsum dolor sit amet consectetur. Blandit et arcu accumsan ut aliquet dignissim integer sollicitudin. Tincidunt tempus a etiam
//               tellus arcu nec ipsum.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
function AboutStorySection() {
  return (
    <section className="mb-24 px-4 md:px-10">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* <div className="relative flex justify-center">
          <div className="relative w-full max-w-[500px] md:w-auto">
           
            <div className="relative aspect-square md:min-h-[600px] w-full">
              
              <div className="absolute inset-0 w-full h-full">
               
                <Image
                  src={"/assets/images/about-story-frame.svg"}
                  width={500}
                  height={602}
                  alt="Frame"
                  className="w-full max-w-md md:max-w-fit md:w-auto h-full object-contain"
                />
              </div>

              
              <div className="absolute top-12 -right-10 inset-0 w-full h-full p-8 md:p-14">
                <Image
                  src="/assets/images/about-mission-section-image.png"
                  alt="Team celebration"
                  fill
                  className="object-cover object-center max-w-96 md:max-w-fit md:w-auto"

                
                />
              </div>

             
              <div className="absolute top-4 md:top-12 right-2 md:-right-10 z-40 bg-white px-4 py-3 md:px-6 md:py-7 rounded-xl shadow-lg">
                <div className="text-xs md:text-sm text-charcol">Monthly Members</div>
                <div className="text-2xl md:text-[2rem] font-bold text-charcol">5000+</div>
              </div>

             
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 md:-bottom-6 md:-left-6 bg-white px-4 py-3 md:px-6 md:py-7 rounded-xl shadow-lg z-10 w-max">
                <AvatarGroup  />
                <div className="text-sm md:text-lg font-medium text-charcol">8000+ reviews</div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="relative flex justify-center">
          <div className="absolute top-10 md:top-12 lg:top-14 xl:top-16 -right-2 lg:-right-10 z-40  flex flex-col items-center bg-white px-3 py-3 lg:px-6 lg:py-7 rounded-xl shadow-lg">
            <div className="text-sm text-charcol">Monthly Members</div>
            <div className="text-lg lg:text-[2rem] font-bold text-charcol">5000+</div>
          </div>
          <Image src={"/assets/images/about-story-left-image.png"} width={500} height={602} alt="Frame" className="w-full  object-contain" />
          <div className="absolute -bottom-6 left-0 md:-left-6 bg-white px-3 py-3 lg:px-6 lg:py-7 rounded-xl shadow-lg z-10 flex flex-col items-center gap-2">
            <AvatarGroup />
            <div className="font-medium text-sm lg:text-lg text-charcol">8000+ reviews</div>
          </div>
        </div>

        {/* Right Content (unchanged) */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              At Precision Grading, we’re collectors first. We know the excitement of pulling a rare card, and the frustration of sending it off for 
              grading only to face long waits, high costs, and inconsistent results. <br /> <br />
              That’s why we built Precision Grading: an AI-powered platform created by collectors, for collectors. 
              Our goal is simple, to make professional card grading affordable, fast, and reliable. <br /> <br />
              With cutting-edge AI technology at our core, we deliver consistent, high-quality grades without the hefty price tag.
              We pride ourselves on quick turnaround times, but we never sacrifice the accuracy and care your cards deserve. <br /> <br />
              Beyond grading, Precision Grading is a community, a place where collectors can connect, share, and celebrate the hobby we all love. <br /> <br />
              Grading should be precise, fair, and accessible. That’s our promise to every collector. That’s Precision Grading.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutStorySection;
