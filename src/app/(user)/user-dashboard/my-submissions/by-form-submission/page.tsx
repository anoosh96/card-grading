'use client'

import { useEffect, useState } from "react"
import CardDetails from "./components/CardDetails"
import ProgressBar from "@/app/(user)/components/ProgressBar"
import Subscription from "./components/Subscription"
import Tracking from "./components/Tracking"
import { useSubmissionStore } from "@/stores/submissionStore"

const steps = ['Card Details', 'Subscription', 'Tracking'];


export default function ByFormSubmissionPage() {
  const { submission, setSubmission } = useSubmissionStore()
  const [step, setStep] = useState(submission.step)

  const handleNext = () => {
    setStep(prev => prev + 1)
  }

  const handlePrevious = () => {
    setStep(prev => prev - 1)
  }

  useEffect(() => {
    setSubmission({ step })
  }, [step])

  return (
    <section className="p-7 bg-white">
      <div className="mb-20">
        <ProgressBar currentStep={step} steps={steps} />
      </div>

      { step == 1 &&  <CardDetails handleNext={handleNext}/> }
      { step == 2 &&  <Subscription handleNext={handleNext} handlePrevious={handlePrevious}/> }
      { step == 3 &&  <Tracking handleNext={handleNext} handlePrevious={handlePrevious}/> }

    </section>
  )
}