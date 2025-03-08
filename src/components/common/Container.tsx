import React from "react";
import Header from "./Header";
import EllipsesIcon from "@/components/svgs/EllipsesIcon";
import Footer from "./Footer";
import Image from "next/image";

function Container({
  children,
  isWithBackground = false,
  isHideContactFormFooter = false,
  cloudBackground = false
}: Readonly<{
  children: React.ReactNode;
  isWithBackground?: boolean;
  cloudBackground?: boolean;
  isHideContactFormFooter?: boolean;
}>) {
  return (
    <>
      <div className="relative flex flex-col min-h-screen">
        {isWithBackground ? (
          <>
            {/* Background Image with Responsive Styling */}
            <div
              className="absolute inset-0 w-full h-[60vh] bg-no-repeat bg-cover bg-center"
              style={{
                backgroundImage: `url(/assets/images/bg-hero-section.svg)`,
              }}
            />
            {/* Responsive Ellipses Icon Positioned to the Right */}
            <EllipsesIcon className="absolute top-0 right-0  h-auto" />
          </>
        ) : null}
        {
          cloudBackground ? (
            <Image src={"/assets/images/cloud-bg.svg"} width={850} height={900} alt="cloud background" className="h-[1000px] md:h-[900px] absolute top-0 lg:-left-[170px] xl:-left-[0] xl:w-[50%] object-cover"/>
          ) : null
        }
        <Header />
        <main className="relative flex-grow w-full overflow-hidden mt-20">{children}</main>
        <Footer isHideContactForm={isHideContactFormFooter} />
      </div>
    </>
  );
}

export default Container;
