"use client";

import { ButtonGradient } from "@/components/common/ButtonGradient";
import { Button } from "@/components/ui/button";
import { FormStepProps, Service } from "@/types";
import CustomCheckbox from "@/components/common/CustomCheckbox";
import CustomRadioButton from "@/components/common/CustomRadioButton";
import { useState } from "react";
import { useSubmissionStore } from "@/stores/submissionStore";
import { useUserStore } from "@/stores/userStore";
import { Loader2 } from "lucide-react";
import ReviewSubmissionTable from "./ReviewSubmissionTable";
import { useCheckoutSession } from "@/hooks/useCheckoutSession";

export default function Payment({ handlePrevious }: FormStepProps) {
  const [isChecked, setIsChecked] = useState(false);
  const { submission, setSubmission } = useSubmissionStore();
  const { user } = useUserStore();
  const checkout = useCheckoutSession();

  const deliveryOptions = [
    {
      id: "standard",
      title: "24 hours special delivery tracked, guaranteed by 1pm",
      price: 10.35,
      compensation: "Compensation up to £750",
      description: "Standard tracked delivery with £750 compensation coverage"
    },
    {
      id: "premium",
      title: "24 hours special delivery tracked, guaranteed by 1pm",
      price: 13.35,
      compensation: "Compensation up to £1k",
      description: "Premium tracked delivery with £1,000 compensation coverage"
    },
    {
      id: "express",
      title: "24 hours special delivery tracked, guaranteed by 1pm",
      price: 20.35,
      compensation: "Compensation up to £2.5k",
      description: "Express tracked delivery with £2,500 compensation coverage"
    }
  ];

  const getService = (id: number) => {
    const services = submission.services;
    return services?.find((service) => service.id == id);
  };

  const getPricePerCard = (numberOfCards: number) => {
    return numberOfCards <= 24 ? 13 : numberOfCards <= 49 ? 12 : 10;
  }

  const baseSubmissionCost =
    submission.cards?.reduce((acc, card) => {
      const service = getService(card.serviceId as number) as Service;
      const pricePerCard = service?.pricePerCard || 0
      return acc + pricePerCard;
    }, 0) || (getPricePerCard(submission.numberOfCards || 0) * (submission.numberOfCards || 0));

  const deliveryCost = submission.deliveryCost || 0;
  const totalSubmission = baseSubmissionCost + deliveryCost;

  const totalCards = submission.cards?.length || submission.numberOfCards || 0;

  const handleDeliverySelect = (optionId: string) => {
    const selectedOption = deliveryOptions.find(option => option.id === optionId);
    if (selectedOption) {
      setSubmission({
        selectedDeliveryOption: optionId,
        deliveryCost: selectedOption.price
      });
    }
  };

  const handleSubmit = async () => {
    const data = await checkout.mutateAsync({
      cards: submission.cards,
      shippingFullName: submission.fullName as string,
      shippingAddress: submission.shippingAddress as string,
      shippingPhone: submission.phoneNumber as string,
      shippingEmail: user?.email as string,
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

      {/* Delivery Options Section */}
      <div className="mt-8">
        <h2 className="heading-primary font-bold mb-4">Select Delivery Option</h2>
        <p className="text-neutral-grey mb-6">Choose your preferred delivery method</p>
        
        <CustomRadioButton
          options={deliveryOptions}
          selectedOption={submission.selectedDeliveryOption || null}
          onSelect={handleDeliverySelect}
          className="mb-6"
        />
      </div>

      <CustomCheckbox
        className="bg-white mt-8"
        checked={isChecked}
        onChange={setIsChecked}
      />

      <div className="flex flex-col sm:flex-row gap-6 mt-8">
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
          disabled={!isChecked || !submission.selectedDeliveryOption || checkout.isPending}
        >
          {checkout.isPending ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Proceeding...
            </>
          ) : (
            "Proceed to Payment"
          )}
        </ButtonGradient>
      </div>
    </section>
  );
}
