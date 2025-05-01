// components/CardDetailedView.tsx
"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSubmissionStore } from "@/stores/submissionStore";
import SubmissionSummary from "./SubmissionSummary";
import CardImages from "@/app/(user)/user-dashboard/submission-status/order-details/CardImages";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import { Button } from "@/components/ui/button";
import { SubmissionData } from "../add-post/add-post-types";
import { formatSubmissionStatus } from "@/app/(user)/lib/utils/helpers";
import { useUpdateSubmission } from "@/hooks/useUpdateSubmission";
import { submissionStatus } from "@/app/(user)/lib/utils/constants";
import { FlexibleRecord } from "@/types";
import { formatToUSTimezone, padId } from "@/lib/utils";

const OrderDetails = () => {

  const { submission, setSubmission } = useSubmissionStore()
  const router = useRouter()
  const updateSubmission = useUpdateSubmission()



  const updateStatus = () => {

    const values: FlexibleRecord = {
      submissionStatus: submissionStatus.SUBMISSION_REJECTED
    };

    // Call the mutation with our submission data
    updateSubmission.mutate({
      id: submission.id,
      values
    }, {
      onSuccess: (data) => {
        // Update the submission store with the response data
        const updatedSubmission = data.data.submission

        // Update our local submission state
        setSubmission({
          submissionStatus: updatedSubmission.submissionStatus
        });

        // Navigate to submission status page
        router.push(`/dashboard/submission-status/${submission.id}`);
      }
    });
  };

  const submissionSummaryData: SubmissionData = {
    name: submission?.fullName as string,
    email: submission?.email as string,
    orderId: padId(submission.id),
    cardName: submission.cardName,
    category: submission.category,
    yearOfRelease: String(submission.yearOfRelease),
    condition: submission.conditionEstimate,
    submissionDate: formatToUSTimezone(submission.submissionDate as string),
    status: formatSubmissionStatus(submission.submissionStatus),
  };

  // Memoized preview URLs
  const frontImagePreview = useMemo(() => {
    if (!submission.frontImage) return undefined;
    if (typeof submission.frontImage === 'string') return submission.frontImage;
    return URL.createObjectURL(submission.frontImage as File);
  }, [submission.frontImage]);

  const backImagePreview = useMemo(() => {
    if (!submission.backImage) return undefined;
    if (typeof submission.backImage === 'string') return submission.backImage;
    return URL.createObjectURL(submission.backImage as File);
  }, [submission.backImage]);

  return (
    <div className="bg-white border-md px-4 py-4 rounded-md">
      <div className="mb-2">
        <h1 className="heading-primary font-bold mb-1">Submission Status</h1>
        <p className="heading-tertiary text-muted-foreground">
          Latest actions across the grading workflow
        </p>
      </div>

      <div>
        <CardImages
          frontImage={frontImagePreview || "/assets/images/default-front.png"}
          backImage={backImagePreview || "/assets/images/default-back.png"}
        />
      </div>

      <SubmissionSummary
        title="Submission Summary"
        data={submissionSummaryData}
        onSubmit={() => { }}
        classNames="mt-4"
      />

      <div className="flex items-center gap-6 ml-2 sm:ml-6 mt-4">
        <Button
          onClick={updateStatus}
          variant={"ghost"}
          className="rounded-full text-light-grey-100 heading-secondary font-medium bg-[#E0E0E0] hover:bg-gray-300 hover:text-black"
          disabled={updateSubmission.isPending || submission.submissionStatus == submissionStatus.SUBMISSION_REJECTED}
          >
            {updateSubmission.isPending ? "Updating..." : "Reject Submission"}
        </Button>
        <ButtonGradient
          onClick={() => router.push(`/dashboard/grading-review`)}
          className="max-w-[8rem] w-full"
          disabled={submission.submissionStatus == submissionStatus.SUBMISSION_REJECTED}
        >
          Start Grading
        </ButtonGradient>
      </div>
    </div>
  );
};

export default OrderDetails;
