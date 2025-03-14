import Image from "next/image";

interface CardImagesProps {
  frontImage: string
  backImage: string
}

export default function CardImages({frontImage, backImage} : CardImagesProps) {
  return(
    <div>
      <h2 className="text-2xl font-semibold">Card Images</h2>

      <div className="relative flex justify-around mt-2 pb-8 border border-soft-grey">
        <div className="flex flex-col gap-4 items-center justify-center z-10">
          <p className="text-white text-center text-xl py-4">Front Side</p>
          <Image src={frontImage} width={300} height={341} alt="card image" />
        </div>
        <div className="flex flex-col gap-4 items-center justify-center z-10">
          <p className="text-white text-center py-3 text-xl">Back Side</p>
          <Image src={backImage} width={300} height={341} alt="card image" />
        </div>

        <div className="bg-custom-gradient w-full h-[60px] absolute top-0 z-0"></div>
      </div>
    </div>
  ) 
}