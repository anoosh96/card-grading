'use client'

import { useState } from "react"
import CardDetails from "./components/CardDetails"
import ProgressBar from "@/app/(user)/components/ProgressBar"
import Subscription from "./components/Subscription"
import Tracking from "./components/Tracking"


export default function ByFormSubmissionPage() {
  const [step, setStep] = useState(1)

  const handleNext = () => {
    setStep(prev => prev + 1)
  }

  const handlePrevious = () => {
    setStep(prev => prev - 1)
  }

  return (
    <section className="p-7 bg-white">
      <div className="mb-20">
        <ProgressBar currentStep={step} />
      </div>

      { step == 1 &&  <CardDetails handleNext={handleNext}/> }
      { step == 2 &&  <Subscription handleNext={handleNext} handlePrevious={handlePrevious}/> }
      { step == 3 &&  <Tracking handleNext={handleNext} handlePrevious={handlePrevious}/> }

    </section>
  )
}