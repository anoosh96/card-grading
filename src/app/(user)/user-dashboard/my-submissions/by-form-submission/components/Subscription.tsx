import { ButtonGradient } from "@/components/common/ButtonGradient";
import { Button } from "@/components/ui/button";
import { FormStepProps } from "@/types";
import SubmissionSummary from "../../SubmissionSummary";
import SubscriptionBox from "../../SubscriptionBox";
import { Checkbox } from "@radix-ui/react-checkbox";
import CustomCheckbox from "@/components/common/CustomCheckbox";

const summaryFields = {
  cardName: 'Charizard Holo',
  category: 'Pokemon',
  year: '1999',
  condition: 'Good'
}

const subscriptionData = {
  status: 'active',
  renewalDate: '',
  totalCards: 20,
  cardsUsed: 14
}


export default function Subscription({ handleNext, handlePrevious }: FormStepProps) {

  return (
    <section className="bg-white p-7">
      <h1 className="text-4xl font-bold">Review & Make Payment</h1>
      <p className="text-neutral-grey mt-4">Review your submission and complete payment</p>


      <SubmissionSummary fields={summaryFields} className="mt-6" />
      <SubscriptionBox className="mt-6" />

      <CustomCheckbox className="bg-white mt-4" />

      {/* Buttons */}
      <div className="flex gap-6 mt-8">
        <Button
          size={"lg"}
          className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-3 px-14 text-base hover:bg-soft-grey"
          onClick={handlePrevious}
        >
          Back
        </Button>
        <ButtonGradient size={"lg"} className="py-3 px-14 h-auto" type="submit">
          Next
        </ButtonGradient>
      </div>
    </section>
  )
}