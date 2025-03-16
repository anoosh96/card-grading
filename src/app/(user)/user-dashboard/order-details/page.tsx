'use client'

import { Button } from "@/components/ui/button";
import CardImages from "./CardImages";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import { useRouter } from "next/navigation";
import SubmissionSummary from "@/app/(admin)/dashboard/submission-status/add-post/components/SubmissionSummary";
import { SubmissionData } from "@/app/(admin)/dashboard/submission-status/add-post/add-post-types";
import { useState } from "react";


export default function OrderDetailsPage() {

  const router = useRouter()

  const [data, setData] = useState<SubmissionData>({
      name: "Henrietta Bogisich",
      email: "bogisich@gmail.com",
      orderId: "01",
      cardName: "Charizard Holo",
      category: "Pokemon",
      yearOfRelease: "1999",
      condition: "Good",
      submissionDate: "2/27/2025",
      status: "Pending",
    });

  return (
    <section className="bg-white p-7">
      <h1 className="text-4xl font-bold mb-10">Order Details</h1>

      <CardImages
        frontImage="/assets/images/mike-trout.svg"
        backImage="/assets/images/mike-trout.svg" />

      <SubmissionSummary
        title="Submission Summary"
        data={data}
        onSubmit={(e) => (console.log(e))}
        classNames="mt-4"
      />

      <div className="flex gap-6 mt-8">
        <Button
          size={"lg"}
          className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-3 px-14 text-base hover:bg-soft-grey"
          onClick={() => router.back()}
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