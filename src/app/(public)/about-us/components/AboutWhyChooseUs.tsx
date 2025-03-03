import Image from "next/image";
import React from "react";
const features = [
  {
    title: "Advanced AI Grading",
    description: "Cutting-edge technology ensures precise, unbiased, and consistent grading.",
    icon: <Image alt="Mingcute Icon" src={"/icons/ai-grading.svg"} width={75} height={75} />,
  },
  {
    title: "Fast Turnaround",
    description: "Get your cards graded quicker than traditional grading companies.",
    icon: <Image alt="Mingcute Icon" src={"/icons/fast-turnaround.svg"} width={75} height={75} />,
  },
  {
    title: "Trusted by collectors",
    description: "Lorem ipsum dolor sit amet consectetur. Elit pellentesque eleifend vitae tellus amet nec enim.",
    icon: <Image alt="Mingcute Icon" src={"/icons/medal-icon.svg"} width={75} height={75} />,
  },
  {
    title: "Affordable Pricing",
    description: "Lorem ipsum dolor sit amet consectetur. Elit pellentesque eleifend vitae tellus amet nec enim.",
    icon: <Image alt="Mingcute Icon" src={"/icons/affordable-pricing.svg"} width={75} height={75} />,
  },
  {
    title: "Secure and Reliable",
    description: "Lorem ipsum dolor sit amet consectetur. Elit pellentesque eleifend vitae tellus amet nec enim.",
    icon: <Image alt="Mingcute Icon" src={"/icons/secure.svg"} width={75} height={75} />,
  },
  {
    title: "Transparency",
    description: "Lorem ipsum dolor sit amet consectetur. Elit pellentesque eleifend vitae tellus amet nec enim.",
    icon: <Image alt="Mingcute Icon" src={"/icons/transparency.svg"} width={75} height={75} />,
  },
];

const AboutWhyChooseUs = () => {
  return (
    <section className="relative mx-auto  px-4 md:px-10 py-16">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-y-10 gap-x-0 items-center">
        {/* Left Content */}
        <div className="pl-5 col-span-2 flex flex-col gap-5">
          <div className="relative"><Image className="relative right-10 top-9" src={"/assets/images/rainbow.svg"} width={240} height={182} alt="rainbow"/></div>
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
          <p className="text-sm text-charcol max-w-sm">
            Lorem ipsum dolor sit amet consectetur. Gravida quis potenti tortor ultricies fringilla viverra.
          </p>
        </div>

        {/* Right Content */}
        <div className="col-span-3 grid grid-cols-2 gap-10">
          {/* Feature Cards */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div> */}

          {features.map((feature, index) => (
            <div className="relative">
            <div
              key={index}
              className={`relative flex w-full max-w-sm items-start space-x-4 rounded-2xl bg-white pt-4 pb-9 px-5 shadow-xl md:max-w-xs ${
                index === 2 ? "invisible": ""
              } ${ index == 0 ? "top-24" : "" } ${ index == 4 ? "bottom-24" : "" } 
                ${ index == 3 ? "right-0 md:right-[3%] lg:right-[8%] xl:right-[15%] 2xl:right-[30%]" : ""} `}
            >
              <div className="flex flex-col gap-3">
                {/* Icon */}
                <div className="rounded-lg bg-beige text-2xl">{feature.icon}</div>
                {/* Text */}
                <div>
                  <h3 className="text-lg font-medium text-charcol">{feature.title}</h3>
                  <p className="mt-1 text-sm text-charcol">{feature.description}</p>
                </div>
              </div>
            </div>
           </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutWhyChooseUs;
