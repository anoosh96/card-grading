'use client'

import { useState } from "react"
import ProgressBar from "@/app/(user)/components/ProgressBar"
import ShippingInstruction from "./components/ShippingInstruction";
import ShippingInformation from "./components/ShippingInformation";
import Subscription from "./components/Subscription";
import Tracking from "../by-form-submission/components/Tracking";

const steps = ['Shipping Instruction', 'Shipping Info', 'Subscription'];


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
        <ProgressBar currentStep={step == 4 ? 3 : step} steps={steps} />
      </div>

      { step == 1 && <ShippingInstruction handleNext={handleNext} /> }
      { step == 2 && <ShippingInformation handleNext={handleNext} handlePrevious={handlePrevious}/> }
      { step == 3 && <Subscription handleNext={handleNext} handlePrevious={handlePrevious} /> }
      { step == 4 &&  <Tracking handleNext={handleNext} handlePrevious={handlePrevious}/> }

    </section>
  )
}