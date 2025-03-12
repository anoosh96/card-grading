import Image from "next/image";
import { FaInfoCircle } from "react-icons/fa";


export default function ProgressTracker() {
  return(
    <div className="p-7 space-y-6 bg-light-grey rounded-xl shadow-mg">
      <div className="flex items-start">
        <h2 className="text-3xl">Tracking Number</h2>
        <div className="text-light-red bg-transparent-red p-2 ml-40">#123456789</div>
      </div>
      <p className="text-lg">Overall Progress</p>

      <div className="w-full">
        <div className="flex gap-4 w-full items-center">
          <Image src={"/icons/tickmark.svg"} alt="tick image" width={55} height={55}/>
          <div className="w-full">
            <div className="flex gap-4 items-center mb-2">
              <div className="text-xl leading-none">80%</div>
              <div className="text-pure-grey leading-none">Grading</div>
            </div>
            <div className="w-full h-2 rounded-lg bg-soft-grey">
              <div className="bg-custom-gradient h-2 w-2/3 rounded-lg"></div>
            </div>
          </div>
        </div>
        <div className="mt-8 pl-4 space-y-6">
          <div className="flex items-center gap-8">
              <div className="flex items-center justify-center rounded-full w-8 h-6 sm:h-8 bg-light-red text-white text-sm">
                <span>1</span>
              </div>
              <div>
                <h3 className="text-charcol">Submission Received</h3>
                <p className="mt-1 text-neutral-grey">Your postcard submission has been received at our grading center</p>
              </div>
          </div>
          <div className="flex items-center gap-8">
              <div className="flex items-center justify-center rounded-full w-8 h-6 sm:h-8 bg-light-red text-white">
                <span>2</span>
              </div>
              <div>
                <h3 className="text-charcol">Grading in Progress</h3>
                <p className="mt-1 text-neutral-grey">Your postcard is currently being evaluated by our expert graders</p>
              </div>
          </div>
          <div className="flex items-center gap-8">
              <div className="flex items-center justify-center rounded-full w-8 h-6 sm:h-8 bg-soft-grey text-black">
                <span>3</span>
              </div>
              <div>
                <h3 className="text-charcol">Grading Complete</h3>
                <p className="mt-1 text-neutral-grey">Grading will be completed and your postcard will be prepared for return</p>
              </div>
          </div>
          <div className="bg-transparent-red p-8 flex items-center text-light-red">
             <FaInfoCircle className="text-2xl bg-transparent" />
             <p className="text-2xl ml-6 font-regular">Estimated completion: <span className="font-light">5-7 Days</span></p>
          </div>
        </div>
      </div>    
    </div>
  )
}