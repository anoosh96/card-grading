import React from "react";
import Header from "./Header";
import EllipsesIcon from "@/components/svgs/EllipsesIcon";
import Footer from "./Footer";

function Container({
  children,
  isWithBackground = false,
  isHideContactFormFooter = false,
}: Readonly<{
  children: React.ReactNode;
  isWithBackground?: boolean;
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
        <Header />
        <main className="relative flex-grow w-full overflow-hidden mt-20">{children}</main>
        <Footer isHideContactForm={isHideContactFormFooter} />
      </div>
    </>
  );
}

export default Container;
