import Image from "next/image";

interface CardImagesProps {
  frontImage: string
  backImage: string
  title?: string
  classNames?: string
}

export default function CardImages({frontImage, backImage, title, classNames} : CardImagesProps) {
  return(
    <div className={`${classNames}`}>
      <h2 className="text-2xl font-semibold">{ title ? title : 'Card Images' }</h2>

      <div className="relative flex flex-col sm:flex-row sm:justify-around mt-2 pb-8 border border-soft-grey">
        <div className="flex flex-col gap-4 items-center justify-center z-10 mb-10 sm:mb-0">
          <p className="text-white text-center text-xl py-4">Front Side</p>
          <Image src={frontImage} width={300} height={341} alt="card image" className="w-[300px] h-[341px] object-contain" />
        </div>
        <div className="flex flex-col gap-4 items-center justify-center z-10">
          <p className="text-white text-center py-4 text-xl">Back Side</p>
          <Image src={backImage} width={300} height={341} alt="card image" className="w-[300px] h-[341px] object-contain"/>
        </div>

        <div className="bg-custom-gradient w-full h-[60px] absolute top-0 z-0"></div>
        <div className="sm:hidden bg-custom-gradient w-full h-[60px] absolute top-1/2 z-0"></div>
      </div>
    </div>
  ) 
}