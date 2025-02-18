import React from "react";
import Image from "next/image";

function KeyFeaturesSection() {
  return (
    <section className="py-6 md:py-10">
      <div className="mx-auto">
        <div className="flex flex-col items-start w-full gap-5">
          <h2 className="text-[2rem] font-bold">Key Features</h2>
          <div className="relative w-full justify-center flex">
            <Image
              src={"/assets/images/key-features-section.svg"}
              alt="Key Features Of Precision Grading"
              width={985}
              height={315}
              className="w-3/4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default KeyFeaturesSection;
