"use client";

import { ButtonGradient } from "@/components/common/ButtonGradient";
import { Button } from "@/components/ui/button";
import { FormStepProps, Service } from "@/types";
import CustomCheckbox from "@/components/common/CustomCheckbox";
import { useState } from "react";
import { useSubmissionStore } from "@/stores/submissionStore";
import { useUserStore } from "@/stores/userStore";
import { Loader2 } from "lucide-react";
import ReviewSubmissionTable from "./ReviewSubmissionTable";
import { useCheckoutSession } from "@/hooks/useCheckoutSession";

export default function Payment({ handleNext, handlePrevious }: FormStepProps) {
  const [isChecked, setIsChecked] = useState(false);
  const { submission, setSubmission } = useSubmissionStore();
  const { user } = useUserStore();
  const checkout = useCheckoutSession();

  const getService = (id: number) => {
    const services = submission.services;
    return services?.find((service) => service.id == id);
  };

  const getPricePerCard = (numberOfCards: number) => {
    return numberOfCards <= 24 ? 13 : numberOfCards <= 49 ? 12 : 10;
  }

  const totalSubmission =
    submission.cards?.reduce((acc, card) => {
      const { pricePerCard } = getService(card.serviceId as number) as Service;
      return acc + pricePerCard;
    }, 0) || (getPricePerCard(submission.numberOfCards || 0) * (submission.numberOfCards || 0));

  const totalCards = submission.cards?.length || submission.numberOfCards || 0;

  const handleSubmit = async () => {
    const data = await checkout.mutateAsync({
      cards: submission.cards,
      shippingFullName: submission.fullName as string,
      shippingAddress: submission.shippingAddress as string,
      shippingPhone: submission.phoneNumber as string,
      shippingEmail: submission.email as string,
      bulkCardValue: submission.bulkCardValue,
      totalCost: totalSubmission,
      numberOfCards: totalCards,
      userId: user?.id as number,
      bulkDescription: submission?.bulkDescription,
      submissionId: submission.id ? Number(submission.id) : undefined,
    });

    console.log(data)

    if (data?.data.checkoutUrl && data?.data.submissionId) {
      setSubmission({ id: data?.data.submissionId })
      window.location.href = data.data.checkoutUrl;
    } else {
      alert(data.message || "Error creating checkout session");
    }
  };

  return (
    <section className="bg-white">
      <h1 className="heading-primary font-bold">Review & Make Payment</h1>
      <p className="text-neutral-grey mt-4">Review your submission and complete payment</p>

      <ReviewSubmissionTable submission={submission} totalCost={totalSubmission} />

      <CustomCheckbox
        className="bg-white mt-8"
        checked={isChecked}
        onChange={setIsChecked}
      />

      <div className="flex gap-6 mt-8">
        <Button
          size="lg"
          className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-3 px-14 text-base hover:bg-soft-grey"
          onClick={handlePrevious}
          disabled={checkout.isPending}
        >
          Back
        </Button>
        <ButtonGradient
          size="lg"
          className="py-3 px-14 h-auto"
          onClick={handleSubmit}
          disabled={!isChecked || checkout.isPending}
        >
          {checkout.isPending ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Proceeding...
            </>
          ) : (
            "Proceed to Checkout"
          )}
        </ButtonGradient>
      </div>
    </section>
  );
}
