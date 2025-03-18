import { ButtonGradient } from "@/components/common/ButtonGradient";
import { Button } from "@/components/ui/button";
import { FormStepProps } from "@/types";
import SubmissionSummary from "../../SubmissionSummary";
import SubscriptionBox from "../../SubscriptionBox";
import CustomCheckbox from "@/components/common/CustomCheckbox";
import { useState } from "react";
import CustomModal from "@/components/common/CustomModal";

const summaryFields = {
  cardName: 'Charizard Holo',
  category: 'Pokemon',
  year: '1999',
  condition: 'Good'
}

const subscriptionData = {
  status: 'active',
  type: 'premium',
  renewalDate: '2025-03-06',
  totalCards: 20,
  cardsUsed: 14
}


export default function Subscription({ handleNext, handlePrevious }: FormStepProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = () => {
    //console.log("Form Data:", cardDetails);
    setIsModalOpen(true)
    //handleNext()
  };

  return (
    <section className="bg-white">
      <h1 className="heading-primary font-bold">Review & Make Payment</h1>
      <p className="text-neutral-grey mt-4">Review your submission and complete payment</p>


      <SubmissionSummary fields={summaryFields} className="mt-6" />
      <SubscriptionBox className="mt-6" data={subscriptionData} />

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
        <ButtonGradient size={"lg"} className="py-3 px-14 h-auto" type="submit" onClick={handleSubmit}>
          Submit
        </ButtonGradient>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        title="Your Card has been Submitted for Grading"
        icon_url="/icons/success.svg"
        message="Your Tracking Number: #987654321"
        onConfirm={() => {
          //console.log("Order Deleted!");
          handleNext()
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
        cn="!p-16 !rounded-2xl"
        yes_btn_text="Track"
        no_btn_text="Cancel"
        icon_bg="bg-transparent"
        icon_h={60}
        icon_w={60}
      />
    </section>
  )
}