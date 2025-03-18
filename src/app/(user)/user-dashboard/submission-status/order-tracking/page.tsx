'use client'

import { Button } from "@/components/ui/button";
import ProgressTracker from "./ProgressTracker";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import { useRouter } from "next/navigation";


export default function OrderTracking() {
  const router = useRouter()

  return (
    <section className="p-7 bg-white">
      <h1 className="heading-primary font-bold">Order Tracking</h1>
      <p className="mt-4 mb-10">Monitor the progress of your card grading</p>

      <ProgressTracker />

      <div className="flex gap-6 mt-8">
        <Button 
          size={"lg"} 
          className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-3 px-14 text-base hover:bg-soft-grey"
          onClick={() => router.back() }
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