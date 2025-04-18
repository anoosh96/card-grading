import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";

interface SubmissionSourcesProps {
  byFormPercentage: number;
  byPostPercentage: number;
}

export function SubmissionSources({ byFormPercentage, byPostPercentage }: SubmissionSourcesProps) {
  return (
    <div className="bg-white w-full rounded-[1.25rem] p-6 shadow-sm">
      <div className="flex flex-col items-start justify-between mb-3">
        <h3 className="font-semibold text-xl">Submission Sources</h3>
        <Separator className="w-full h-[1px] bg-soft-grey mt-3" />
      </div>

      <div className="bg-light-grey w-fit px-5 py-2 rounded-2xl flex items-center">
        <div className="flex items-center gap-8 h-8">
          <span className="text-sm text-pure-grey">By Post</span>
          <Separator className="w-[1px] bg-soft-grey h-full" />
          <span className="text-sm text-pure-grey">By Form</span>
        </div>
      </div>

      <div className="w-full flex flex-col gap-5 lg:flex-row ">
        <div className="flex justify-between items-center gap-6 mt-7 xl:mt-4 w-11/12">
          <div className="space-y-8 w-full md:w-1/2 xl:w-1/3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-4 w-8 rounded-sm bg-primary" />
              </div>
              <span className="text-sm">By Post</span>
              <span className="text-sm">{byPostPercentage}%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-4 w-8 rounded-sm bg-secondary" />
              </div>
              <span className="text-sm">By Form</span>
              <span className="text-sm">{byFormPercentage}%</span>
            </div>
          </div>
        </div>
        <div className="flex relative items-start justify-start">
          <Image src={"/assets/images/chart-progress-creative.svg"} className="w-36 h-32" alt="Pie Chart Progress" width={160} height={130} />
        </div>
      </div>
    </div>
  );
}
