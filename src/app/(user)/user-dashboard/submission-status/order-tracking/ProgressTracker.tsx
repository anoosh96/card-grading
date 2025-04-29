import Image from "next/image";
import { FaInfoCircle } from "react-icons/fa";
import SmallProgressBar from "../../../components/SmallProgressBar";

interface TrackingProps {
  trackingNumber: string;
  overallProgress: number;
  estimatedCompletion: string;
  submissionStatus: string;
}

export default function ProgressTracker({ trackingNumber, overallProgress, estimatedCompletion, submissionStatus }: TrackingProps) {

  const statusMap: Record<string, number> = {
    SUBMISSION_RECEIVED: 1,
    GRADING_IN_PROGRESS: 2,
    GRADING_COMPLETE: 3
  };

  return(
    <div className="p-4 sm:p-7 space-y-4 sm:space-y-6 bg-light-grey rounded-xl shadow-md">
      <div className="flex items-start flex-col sm:flex-row">
        <h2 className="text-2xl sm:text-3xl mb-2 sm:mb-0">Tracking Number</h2>
        <div className="text-light-red bg-transparent-red p-1 sm:p-2 ml-0 sm:ml-auto">#{trackingNumber}</div>
      </div>
      <p className="text-lg">Overall Progress</p>

      <div className="w-full">
        <div className="flex gap-2 sm:gap-4 w-full items-center">
          <Image src={"/icons/tickmark.svg"} alt="tick image" width={40} height={40} className="w-10 h-10 sm:w-14 sm:h-14"/>
          <div className="w-full">
            <div className="flex gap-2 sm:gap-4 items-center mb-2">
              <div className="text-xl leading-none">{overallProgress}%</div>
              <div className="text-pure-grey leading-none">Grading</div>
            </div>
            <SmallProgressBar progress={overallProgress} />
          </div>
        </div>
        <div className="mt-4 sm:mt-8 pl-2 sm:pl-4 space-y-4 sm:space-y-6">
          <div className="flex items-center gap-4 sm:gap-8">
              <div className={`flex items-center justify-center rounded-full w-6 h-6 sm:w-8 sm:h-8 ${statusMap[submissionStatus] >= 1 ? 'bg-light-red text-white': 'bg-soft-grey text-black'}  text-sm`}>
                <span>1</span>
              </div>
              <div>
                <h3 className="text-charcol text-base sm:text-lg">Submission Received</h3>
                <p className="mt-1 text-neutral-grey text-sm">Your postcard submission has been received at our grading center</p>
              </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-8">
              <div className={`flex items-center justify-center rounded-full w-6 h-6 sm:w-8 sm:h-8 ${statusMap[submissionStatus] >= 2 ? 'bg-light-red text-white': 'bg-soft-grey text-black'}`}>
                <span>2</span>
              </div>
              <div>
                <h3 className="text-charcol text-base sm:text-lg">Grading in Progress</h3>
                <p className="mt-1 text-neutral-grey text-sm">Your postcard is currently being evaluated by our expert graders</p>
              </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-8">
              <div className={`flex items-center justify-center rounded-full w-6 h-6 sm:w-8 sm:h-8 ${statusMap[submissionStatus] >= 3 ? 'bg-light-red text-white': 'bg-soft-grey text-black'}`}>
                <span>3</span>
              </div>
              <div>
                <h3 className="text-charcol text-base sm:text-lg">Grading Complete</h3>
                <p className="mt-1 text-neutral-grey text-sm">Grading will be completed and your postcard will be prepared for return</p>
              </div>
          </div>
          <div className="bg-transparent-red p-4 sm:p-8 flex items-center text-light-red">
             <FaInfoCircle className="text-xl sm:text-2xl bg-transparent" />
             <p className="text-lg sm:text-xl ml-2 sm:ml-6 font-regular">Estimated completion: <span className="font-light">{estimatedCompletion}</span></p>
          </div>
        </div>
      </div>    
    </div>
  )
}