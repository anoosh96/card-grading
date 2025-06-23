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
    description: "Competitive pricing makes grading accessible to all collectors.",
    icon: <Image alt="Mingcute Icon" src={"/icons/affordable-pricing.svg"} width={75} height={75} />,
  },
  {
    title: "Secure and Reliable",
    description: "Your cards are handled with the utmost care and returned safely.",
    icon: <Image alt="Mingcute Icon" src={"/icons/secure.svg"} width={75} height={75} />,
  },
  {
    title: "Transparency",
    description: "Clear grading criteria with high-quality scans of your graded cards.",
    icon: <Image alt="Mingcute Icon" src={"/icons/transparency.svg"} width={75} height={75} />,
  },
];

const AboutWhyChooseUs = () => {
  return (
    <section className="relative mx-auto  px-4 md:px-10 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-10 gap-x-1 items-center">
        {/* Left Content */}
        <div className="pl-5 col-span-2 flex flex-col gap-5">
          <div className="relative"><Image className="relative right-10 top-9" src={"/assets/images/rainbow.svg"} width={240} height={182} alt="rainbow" /></div>
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
          <p className="text-base text-charcol max-w-sm space-y-2 pr-4">
            <div>
              <span className="font-bold text-green-600">✓</span><strong className="ml-2">Precision You Can Trust</strong>
              <p>Our AI technology is trained to detect every detail — delivering consistent, unbiased grades every time.</p>
            </div>
            <div>
              <span className="font-bold text-green-600">✓</span><strong className="ml-2">Fast Turnaround, No Compromise</strong>
              <p>Get your cards back quickly without ever sacrificing quality. Speed and accuracy go hand-in-hand at Precision Grading.</p>
            </div>
            <div>
              <span className="font-bold text-green-600">✓</span><strong className="ml-2">Affordable for All Collectors</strong>
              <p>We believe grading shouldn’t cost a fortune. Our transparent pricing makes professional grading accessible to everyone</p>
            </div>
            <div>
              <span className="font-bold text-green-600">✓</span><strong className="ml-2">Built by Collectors, for Collectors</strong>
              <p>We understand what matters to you — because we’re collectors too. Your cards are treated with the same care we give our own.</p>
            </div>
            <div>
              <span className="font-bold text-green-600">✓</span><strong className="ml-2">A Community, Not Just a Service</strong>
              <p>Join a growing community of collectors who value fairness, trust, and a shared passion for the hobby.</p>
            </div>
          </p>
        </div>

        {/* Right Content */}
        <div className="col-span-3 grid grid-cols-2 gap-10">
          {/* Feature Cards */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div> */}

          {features.map((feature, index) => (
            <div className="relative" key={index}>
              <div
                key={index}
                className={`relative flex w-full max-w-sm items-start space-x-4 rounded-2xl bg-white pt-4 pb-9 px-5 shadow-[5px_5px_15px_rgba(0,0,0,0.1)] md:max-w-xs ${index === 2 ? "invisible" : ""
                  } ${index == 0 ? "top-24" : ""} ${index == 4 ? "bottom-24" : ""}
                ${index == 3 ? "right-0 md:right-[3%] lg:right-[6%] xl:right-[12%] 2xl:right-[30%]" : ""} `}
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