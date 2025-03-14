import { ButtonGradient } from "@/components/common/ButtonGradient";
import SmallProgressBar from "../../components/SmallProgressBar";
import { cn } from "@/lib/utils";

interface SubscriptionBoxProps {
  className?: string
}

export default function SubscriptionBox({ className } : SubscriptionBoxProps) {
  return(
    <div>
      <div className={cn("bg-custom-gradient flex justify-between items-center p-6", className)}>
         <h3 className="text-white font-bold text-2xl">Premium Subscription</h3>
         <div className="rounded-3xl bg-white text-primary px-12 py-2 text-lg">Active</div>
      </div>
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
    </div>
  )
}