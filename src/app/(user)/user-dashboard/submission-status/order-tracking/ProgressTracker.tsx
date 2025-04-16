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
    <div className="p-7 space-y-6 bg-light-grey rounded-xl shadow-mg">
      <div className="flex items-start">
        <h2 className="text-3xl">Tracking Number</h2>
        <div className="text-light-red bg-transparent-red p-2 ml-40">#{trackingNumber}</div>
      </div>
      <p className="text-lg">Overall Progress</p>

      <div className="w-full">
        <div className="flex gap-4 w-full items-center">
          <Image src={"/icons/tickmark.svg"} alt="tick image" width={55} height={55}/>
          <div className="w-full">
            <div className="flex gap-4 items-center mb-2">
              <div className="text-xl leading-none">{overallProgress}%</div>
              <div className="text-pure-grey leading-none">Grading</div>
            </div>
            <SmallProgressBar progress={overallProgress} />
          </div>
        </div>
        <div className="mt-8 pl-4 space-y-6">
          <div className="flex items-center gap-8">
              <div className={`flex items-center justify-center rounded-full w-8 h-6 sm:h-8 ${statusMap[submissionStatus] >= 1 ? 'bg-light-red': 'bg-soft-grey'} text-white text-sm`}>
                <span>1</span>
              </div>
              <div>
                <h3 className="text-charcol">Submission Received</h3>
                <p className="mt-1 text-neutral-grey">Your postcard submission has been received at our grading center</p>
              </div>
          </div>
          <div className="flex items-center gap-8">
              <div className={`flex items-center justify-center rounded-full w-8 h-6 sm:h-8 ${statusMap[submissionStatus] >= 2 ? 'bg-light-red text-white': 'bg-soft-grey text-black'}`}>
                <span>2</span>
              </div>
              <div>
                <h3 className="text-charcol">Grading in Progress</h3>
                <p className="mt-1 text-neutral-grey">Your postcard is currently being evaluated by our expert graders</p>
              </div>
          </div>
          <div className="flex items-center gap-8">
              <div className={`flex items-center justify-center rounded-full w-8 h-6 sm:h-8 ${statusMap[submissionStatus] >= 3 ? 'bg-light-red text-white': 'bg-soft-grey text-black'}`}>
                <span>3</span>
              </div>
              <div>
                <h3 className="text-charcol">Grading Complete</h3>
                <p className="mt-1 text-neutral-grey">Grading will be completed and your postcard will be prepared for return</p>
              </div>
          </div>
          <div className="bg-transparent-red p-8 flex items-center text-light-red">
             <FaInfoCircle className="text-2xl bg-transparent" />
             <p className="text-2xl ml-6 font-regular">Estimated completion: <span className="font-light">{estimatedCompletion}</span></p>
          </div>
        </div>
      </div>    
    </div>
  )
}