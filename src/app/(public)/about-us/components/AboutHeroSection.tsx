import AboutHeroBg from "@/components/svgs/AboutHeroBg";
import Image from "next/image";

function AboutHeroSection() {
  return (
    <div className="relative flex justify-between flex-col lg:flex-row items-center lg:items-start w-full min-h-[790px] px-10 lg:px-0">
      {/* Background Image */}
      <div className="absolute inset-0 left-0 h-[90%] -z-10">
        <AboutHeroBg className="w-full h-full" />
      </div>

      {/* Left Content (Text) */}
      <div className="w-1/2 flex items-center justify-center flex-col min-h-[782px]">
        <div className="flex flex-col gap-8 max-w-lg">
          <h2 className="text-[2rem] w-3/4 text-charcol font-bold">Revolutionizing Card Grading with AI</h2>
          <p className="text-lg text-charcol text-start">
            Lorem ipsum dolor sit amet consectetur. Sed enim pellentesque massa sed felis est in orci ultrices. Mauris sagittis aliquet proin tempor.
            Nunc aliquam gravida.
          </p>
        </div>
      </div>

      {/* Right Content (Card Image) */}
      <div className="relative w-auto mt-12 lg:min-h-[790px] flex justify-center items-start lg:items-center">
        <div className="flex w-auto h-full">
          <Image
            src="/assets/images/about-hero-section-creative.svg"
            alt="Graded Card"
            width={843}
            height={809}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutHeroSection;
