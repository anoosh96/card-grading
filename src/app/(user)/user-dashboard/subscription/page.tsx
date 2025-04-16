'use client'

import { Button } from "@/components/ui/button"
import SubscriptionBox from "../my-submissions/SubscriptionBox"
import { ButtonGradient } from "@/components/common/ButtonGradient"
import { useUserStore } from "@/stores/userStore";


export default function SubscriptionPage() {
  const { user } = useUserStore();

  console.log(user)

  const subscriptionData = user?.subscription
    ? {
      status: user.subscription.status,
      renewalDate: user.subscription.renewalDate,
      totalCards: user.subscription.cardLimit,
      cardsUsed: user.subscription.cardsUsed,
      type: user.subscription.service?.name as string,
      cardLimit: user.subscription.cardLimit
    }
    : null;

  return (
    <section className="bg-white rounded-lg p-7">
      <h1 className="heading-primary font-bold">Manage Your Subscription</h1>
      <p className="text-neutral-grey mt-4">Choose a plan that suits your needs and upgrade anytime.</p>

      <h2 className="text-2xl my-8 font-semibold">Current Subscription Details</h2>

      {subscriptionData ? (
        <SubscriptionBox className="mt-6" data={subscriptionData} />
      ) : (
        <p className="mt-6 text-neutral-grey">No subscription information available.</p>
      )}

      {/* Buttons */}
      <div className="flex gap-6 mt-8">
        <Button
          size={"lg"}
          className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-3 px-14 text-base hover:bg-soft-grey"
        >
          Cancel Subscription
        </Button>
        <ButtonGradient size={"lg"} className="py-3 px-14 h-auto" type="submit">
          Change Plan
        </ButtonGradient>
      </div>
    </section>
  )
}