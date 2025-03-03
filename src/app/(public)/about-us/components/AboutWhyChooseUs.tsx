import Image from "next/image";
import React from "react";
const features = [
  {
    title: "AI-driven accuracy",
    description: "Lorem ipsum dolor sit amet consectetur. Elit pellentesque eleifend vitae tellus amet nec enim.",
    icon: <Image alt="Mingcute Icon" src={"/icons/mingcute-icon.svg"} width={40} height={40} />,
  },
  {
    title: "Commitment to quality",
    description: "Lorem ipsum dolor sit amet consectetur. Elit pellentesque eleifend vitae tellus amet nec enim.",
    icon: <Image alt="Mingcute Icon" src={"/icons/handshake-icon.svg"} width={40} height={40} />,
  },
  {
    title: "Trusted by collectors",
    description: "Lorem ipsum dolor sit amet consectetur. Elit pellentesque eleifend vitae tellus amet nec enim.",
    icon: <Image alt="Mingcute Icon" src={"/icons/medal-icon.svg"} width={40} height={40} />,
  },
];

const AboutWhyChooseUs = () => {
  return (
    <section className="relative mx-auto  px-4 md:px-10 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
          <p className="text-sm text-charcol max-w-sm">
            Lorem ipsum dolor sit amet consectetur. Gravida quis potenti tortor ultricies fringilla viverra.
          </p>
        </div>

        {/* Right Content */}
        <div className="relative flex flex-col gap-6">
          {/* Feature Cards */}
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>

          <div className="relative space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`relative flex w-full max-w-sm items-start space-x-4 rounded-2xl bg-white p-5 shadow-xl md:max-w-xs ${
                  index === 0 ? "mr-auto" : index === 1 ? "ml-auto" : "mr-auto"
                }`}
              >
                <div className="flex flex-col gap-2">
                  {/* Icon */}
                  <div className="flex w-fit rounded-md p-4 justify-center items-center bg-biege">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-beige text-2xl">{feature.icon}</div>
                  </div>
                  {/* Text */}
                  <div>
                    <h3 className="text-lg font-medium text-charcol">{feature.title}</h3>
                    <p className="mt-1 text-sm text-charcol">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWhyChooseUs;
