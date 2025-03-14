'use client'

import { Button } from "@/components/ui/button";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import { FormStepProps } from "@/types";
import ProgressTracker from "../../../order-tracking/ProgressTracker";


export default function Tracking({ handleNext, handlePrevious }: FormStepProps) {

  return (
    <section className="p-7 bg-white">
      <h1 className="text-4xl font-bold">Track Your Submission</h1>
      <p className="mt-4 mb-10">Monitor the progress of your card grading</p>

      <ProgressTracker />

      <div className="flex gap-6 mt-8">
        <Button 
          size={"lg"} 
          className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-3 px-14 text-base hover:bg-soft-grey"
          onClick={handlePrevious}
        >
          Back
        </Button>
        <ButtonGradient size={"lg"} className="py-3 px-14 h-auto">
          Done
        </ButtonGradient>
      </div>
    </section>
  )
}