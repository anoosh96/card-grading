import { ButtonGradient } from "@/components/common/ButtonGradient";
import { Button } from "@/components/ui/button";
import { FormStepProps } from "@/types";
import SubmissionSummary from "../../SubmissionSummary";
import SubscriptionBox from "../../SubscriptionBox";
import CustomCheckbox from "@/components/common/CustomCheckbox";
import { useState } from "react";
import CustomModal from "@/components/common/CustomModal";
import { useCreateSubmission } from "@/hooks/useCreateSubmission";
import { useSubmissionStore } from "@/stores/submissionStore";
import { useUserStore } from "@/stores/userStore";
import { useUser } from "@/hooks/useUser";
import { Loader2 } from "lucide-react";
import { submissionData } from "@/app/(admin)/dashboard/submission-status/SubmissionStatus.constant";


export default function Subscription({ handleNext, handlePrevious }: FormStepProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);  // <-- this controls the checkbox

  const { submission, setSubmission } = useSubmissionStore();
  const { user } = useUserStore();
  const { refetch: refetchUser } = useUser();


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

  const createSubmission = useCreateSubmission();

  const handleSubmit = () => {
    // Validate images before submitting
    if (!submission.frontImage || !submission.backImage) {
      alert("Please upload both front and back images.");
      return;
    }

    createSubmission.mutate({
      values: {
        cardName: submission.cardName,
        category: submission.category,
        yearOfRelease: Number(submission.yearOfRelease),
        conditionEstimate: submission.conditionEstimate,
        serviceType: submission.serviceType,
        submissionSource: submission.submissionSource,
      },
      frontImage: submission.frontImage,
      backImage: submission.backImage
    }, {
      onSuccess: async (data) => {
        const trackingData = data.data.submission
        setSubmission({ trackingNumber: trackingData.trackingNumber, overallProgress: trackingData.overallProgress, estimatedCompletion: trackingData.estimatedCompletion, submissionStatus: trackingData.submissionStatus })
        await refetchUser()
        setIsModalOpen(true);
      }
    });
  };

  return (
    <section className="bg-white">
      <h1 className="heading-primary font-bold">Review & Make Payment</h1>
      <p className="text-neutral-grey mt-4">Review your submission and complete payment</p>

      <SubmissionSummary fields={{
        cardName: submission.cardName,
        category: submission.category,
        year: submission.yearOfRelease,
        condition: submission.conditionEstimate
      }} className="mt-6" />

      {subscriptionData ? (
        <SubscriptionBox className="mt-6" data={subscriptionData} />
      ) : (
        <p className="mt-6 text-neutral-grey">No subscription information available.</p>
      )}


      {/* Controlled Checkbox */}
      <CustomCheckbox
        className="bg-white mt-4"
        checked={isChecked}
        onChange={setIsChecked}
      />

      {/* Buttons */}
      <div className="flex gap-6 mt-8">
        <Button
          size="lg"
          className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-3 px-14 text-base hover:bg-soft-grey"
          onClick={handlePrevious}
          disabled={createSubmission.isPending}
        >
          Back
        </Button>
        <ButtonGradient size="lg" className="py-3 px-14 h-auto" onClick={handleSubmit} disabled={!isChecked || createSubmission.isPending || (!subscriptionData || submissionData.status !== 'ACTIVE') }>
          {createSubmission.isPending ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </ButtonGradient>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        title="Your Card has been Submitted for Grading"
        icon_url="/icons/success.svg"
        message={`Your Tracking Number: ${submission.trackingNumber}`}
        onConfirm={() => {
          handleNext();
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
  );
}
