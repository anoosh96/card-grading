'use client'

import { Button } from "@/components/ui/button";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import { FormStepProps } from "@/types";
import ProgressTracker from "../../../submission-status/order-tracking/ProgressTracker";
import { useSubmissionStore } from "@/stores/submissionStore";
import { useRouter } from "next/navigation";


export default function Tracking({ handlePrevious }: FormStepProps) {

  const { submission, resetSubmission } = useSubmissionStore()
  //console.log(submission)
  const router = useRouter()

  const completeSubmission = () => {
    resetSubmission()
    router.push('/user-dashboard')
  }

  return (
    <section className="bg-white">
      <h1 className="heading-primary font-bold">Track Your Submission</h1>
      <p className="mt-4 mb-10">Monitor the progress of your card grading</p>

      <ProgressTracker trackingNumber={submission.trackingNumber} overallProgress={submission.overallProgress} estimatedCompletion={submission.estimatedCompletion} submissionStatus={submission.submissionStatus} />

      <div className="flex gap-6 mt-8">
        <Button
          size={"lg"} 
          className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-3 px-14 text-base hover:bg-soft-grey"
          onClick={handlePrevious}
          disabled
        >
          Back
        </Button>
        <ButtonGradient size={"lg"} className="py-3 px-14 h-auto" onClick={completeSubmission}>
          Done
        </ButtonGradient>
      </div>
    </section>
  )
}