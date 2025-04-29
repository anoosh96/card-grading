import { ButtonGradient } from "@/components/common/ButtonGradient";
import SmallProgressBar from "../../components/SmallProgressBar";
import { cn, formatDateToReadable } from "@/lib/utils";
import { Subscription } from "@/types";
import { capitalize } from "../../lib/utils/helpers";
import Link from "next/link";

interface SubscriptionBoxProps {
  className?: string
  data: Subscription
}

export default function SubscriptionBox({ className, data }: SubscriptionBoxProps) {
  const progress = data.status === 'ACTIVE' ? (data.cardsUsed / data.totalCards) * 100 : 0;

  return (
    <div className="w-full">
      <div className={cn(
        "bg-custom-gradient flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6",
        className
      )}>
        <h3 className="text-white font-bold text-xl sm:text-2xl mb-2 sm:mb-0">
          {data?.status == 'ACTIVE' ? `${capitalize(data.type)} Subscription` : 'Subscription Needed'}
        </h3>
        <div className="rounded-3xl bg-white text-primary px-6 sm:px-12 py-1 sm:py-2 text-sm sm:text-lg">
          {capitalize(data.status)}
        </div>
      </div>
      {
        data.status == 'ACTIVE' ?
          <div className="p-4 border border-soft-grey">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <div className="flex flex-col mb-2 sm:mb-0">
                <span className="text-neutral-grey text-sm">Subscription renews on</span>
                <span className="text-lg sm:text-xl">{formatDateToReadable(data.renewalDate)}</span>
              </div>
              <div>
                <Link href={"/user-dashboard/subscription"}>
                  <ButtonGradient size={'lg'} className="p-2 bg-custom-gradient-2 text-sm sm:text-base">Manage Subscription</ButtonGradient>
                </Link>
              </div>
            </div>
            <div className="flex justify-between mb-4 text-sm">
              <span className="text-neutral-grey">Cards Remaining</span>
              <span className="">{`${data.totalCards - data.cardsUsed} / ${data.totalCards} `}</span>
            </div>
            <SmallProgressBar progress={progress} />

            <p className="text-neutral-grey mt-4 text-sm">
              You have used {data.cardsUsed} out of your {data.totalCards} card grading slots this month.
            </p>
          </div>
          :
          <div className="p-4 sm:p-7 border border-soft-grey">
            <p className="text-sm">Your subscription is not active. Please activate a subscription to submit your card.</p>
            <ButtonGradient size={'lg'} className="px-4 py-2 bg-custom-gradient-2 mt-4 text-sm sm:text-base">Activate Subscription</ButtonGradient>
          </div>
      }
    </div>
  )
}