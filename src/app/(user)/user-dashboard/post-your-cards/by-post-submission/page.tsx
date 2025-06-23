'use client'

import { useEffect, useState } from "react"
import ProgressBar from "@/app/(user)/components/ProgressBar"
import ShippingInstruction from "./components/ShippingInstruction";
import ShippingInformation from "./components/ShippingInformation";
import Payment from "./components/Payment";
import { useSubmissionStore } from "@/stores/submissionStore";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProgressBarSkeleton } from "@/components/skeletons/DashboardSkeleton";

const steps = ['Shipping Instruction', 'Shipping Info', 'Review Payment'];

export default function ByFormSubmissionPage() {
  const { submission, _hasHydrated, resetSubmission } = useSubmissionStore()
  const searchParams = useSearchParams();

  const isSuccess = searchParams?.get("success") === "true";

  const [step, setStep] = useState(1)

  const handleNext = () => {
    setStep(prev => prev + 1)
  }

  const handlePrevious = () => {
    setStep(prev => prev - 1)
  }


  useEffect(() => {
    if (isSuccess) {
      resetSubmission()
    }
  }, [isSuccess])


  useEffect(() => {
    if (_hasHydrated && submission.step) {
      setStep(isSuccess ? 3 : Number(submission.step))
    }
  }, [_hasHydrated, submission.step])

  // Don't render anything until store has been hydrated
  if (!_hasHydrated) {
    return(<ProgressBarSkeleton className="mt-6 md:mt-10" stepsCount={3} />)
  }

  return (
    <section className="py-7 px-4 md:p-7 bg-white">
      <div className="mb-20">
        <ProgressBar currentStep={step == 4 ? 3 : step} steps={steps} />
      </div>

      {
        isSuccess &&
        <section className="bg-white py-16 text-center">
          <h1 className="text-3xl font-bold text-green-600">Payment Successful</h1>
          <p className="mt-4 text-lg text-gray-700">
            Thank you! Your submission has been Created.
          </p>
          <Link href={"/user-dashboard/submission-status"}>
            <Button
              className="mt-8 px-10 py-3 rounded-full bg-green-600 text-white text-base font-medium hover:bg-green-500"
            >
              Continue
            </Button>
          </Link>
        </section>
      }

      {step == 1 && <ShippingInstruction handleNext={handleNext} />}
      {step == 2 && <ShippingInformation handleNext={handleNext} handlePrevious={handlePrevious} />}
      {!isSuccess && step == 3 && <Payment handleNext={handleNext} handlePrevious={handlePrevious} />}
    </section>
  )
}