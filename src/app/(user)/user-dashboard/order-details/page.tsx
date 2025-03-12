'use client'

import { Button } from "@/components/ui/button";
import CardImages from "./CardImages";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import { useRouter } from "next/navigation";


export default function OrderDetailsPage() {

  const router = useRouter()

  return (
    <section className="bg-white p-7">
      <h1 className="text-4xl font-bold mb-10">Order Details</h1>

      <CardImages 
        frontImage="/assets/images/mike-trout.svg" 
        backImage="/assets/images/mike-trout.svg" />

      <div className="flex gap-6 mt-8">
        <Button 
          size={"lg"} 
          className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-3 px-14 text-base hover:bg-soft-grey"
          onClick={() =>  router.back()}
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