import { ButtonGradient } from "@/components/common/ButtonGradient";
import SmallProgressBar from "../../components/SmallProgressBar";
import { cn } from "@/lib/utils";
import { Subscription } from "@/types";
import { capitalize } from "../../lib/utils/helpers";

interface SubscriptionBoxProps {
  className?: string
  data: Subscription
}

export default function SubscriptionBox({ className, data }: SubscriptionBoxProps) {
  return (
    <div>
      <div className={cn("bg-custom-gradient flex justify-between items-center p-6", className)}>
        <h3 className="text-white font-bold text-2xl">{data?.status == 'active' ? `${capitalize(data.type)} Subscription` : 'Subscription Needed'}</h3>
        <div className="rounded-3xl bg-white text-primary px-12 py-2 text-lg">{capitalize(data.status)}</div>
      </div>
      {
        data.status == 'active' ?
          <div className="p-4 border border-soft-grey">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col">
                <span className="text-neutral-grey">Subscription renews on</span>
                <span className="text-xl">March 27, 2025</span>
              </div>
              <div>
                <ButtonGradient size={'lg'} className="p-2 bg-custom-gradient-2">Manage Subscription</ButtonGradient>
              </div>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-neutral-grey">Cards Remaining</span>
              <span className="">14 / 20</span>
            </div>
            <SmallProgressBar progress={75} />

            <p className="text-neutral-grey mt-4">You have used 14 out of your 20 card grading slots this month.</p>
          </div>
          :
          <div className="p-7 border border-soft-grey">
             <p className="">Your subscription is not active. Please activate a subscription to submit your card.</p>
             <ButtonGradient size={'lg'} className="px-4 py-2 bg-custom-gradient-2 mt-4">Activate Subscription</ButtonGradient>
          </div>
      }
    </div>
  )
}