"use client";

import React, { useState } from "react";
import SubmissionSummary from "../add-post/components/SubmissionSummary";
import { SubmissionData } from "../add-post/add-post-types";
import CardImages from "@/app/(user)/user-dashboard/order-details/CardImages";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CardDetailedView = () => {
  const router = useRouter();
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

  const handleUpdate = (updatedData: SubmissionData) => {
    setData(updatedData);
  };

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
          frontImage="/assets/images/mike-trout.png"
          backImage="/assets/images/mike-trout.png"
        />
      </div>

      <SubmissionSummary
        title="Submission Summary"
        data={data}
        onSubmit={handleUpdate}
        classNames="mt-4"
      />

      <div className="flex items-center gap-6 ml-2 sm:ml-6 mt-4">
        <Button
          onClick={() => router.back()}
          variant={"ghost"}
          className="rounded-full text-light-grey-100 heading-secondary font-medium bg-[#E0E0E0] hover:bg-gray-300 hover:text-black"
        >
          Reject Submissions
        </Button>
        <ButtonGradient
          onClick={() => router.push(`/dashboard/submission-status/1`)}
          className="max-w-[8rem] w-full"
        >
          Start Grading
        </ButtonGradient>
      </div>
    </div>
  );
};

export default CardDetailedView;
