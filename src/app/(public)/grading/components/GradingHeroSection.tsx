import Image from "next/image";

export default function GradingHeroSection () {
  return(
    <div className="grid lg:grid-cols-2 gap-2 p-10">
      {/* Left Card Section */}
      <div>
        <Image src={"/assets/images/grading-cards.svg"} width={590} height={462} alt="cards image"/>
      </div>

      {/* Right Content */}
      <div className="relative">
        <div className="absolute -right-20 -bottom-10 lg:bottom-20 xl:right-0 -z-10">
          <Image src={"/assets/images/ornament-dots.svg"} width={170} height={200} alt="ornament dots image"/>
        </div>

        <div className="flex flex-col justify-center w-[75%] h-full mt-10 lg:mt-0 relative z-10">
          <div className="ml-auto mr-14"> 
            <Image src={"/assets/images/wings-up.svg"} width={50} height={60} alt="vector image" />
          </div>
          <h1 className="pl-3 text-3xl font-bold text-black">Effortless Card Grading with AI Precision</h1>
          <h4 className="pl-3 text-lg font-regular mt-4">Easily grade your cards in three steps: submit the form, mail your cards, 
            and let our AI analyze their condition.
          </h4>
          <div className="mr-auto mt-2"> 
            <Image src={"/assets/images/wings-down.svg"} width={50} height={60} alt="vector image down" />
          </div>
          <div className="mx-auto -mt-8"> 
            <Image src={"/assets/images/ornament-line.svg"} width={200} height={120} alt="ornament dots image" /> 
          </div>
        </div>
      </div>
    </div>
  )
}