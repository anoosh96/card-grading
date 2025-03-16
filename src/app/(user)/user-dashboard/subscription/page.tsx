import { Button } from "@/components/ui/button"
import SubscriptionBox from "../my-submissions/SubscriptionBox"
import { ButtonGradient } from "@/components/common/ButtonGradient"

const subscriptionData = {
  status: 'active',
  type: 'premium',
  renewalDate: '2025-03-06',
  totalCards: 20,
  cardsUsed: 14
}

export default function SubscriptionPage() {
  return (
    <section className="bg-white rounded-lg p-7">
      <h1 className="text-4xl font-bold">Manage Your Subscription</h1>
      <p className="text-neutral-grey mt-4">Choose a plan that suits your needs and upgrade anytime.</p>

      <h2 className="text-2xl my-8 font-semibold">Current Subscription Details</h2>

      <SubscriptionBox data={subscriptionData}/>

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