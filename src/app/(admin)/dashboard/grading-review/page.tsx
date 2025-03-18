"use client";

import CardImages from "@/app/(user)/user-dashboard/submission-status/order-details/CardImages";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import SubmissionSummary from "../submission-status/add-post/components/SubmissionSummary";
import { SubmissionData } from "../submission-status/add-post/add-post-types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import AiGrading from "./components/AiGrading";

const GradingReview = () => {
  const router = useRouter();
  const [isSummaryView, setIsSummaryView] = useState(false);

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
      <div className="mb-4">
        <h1 className="heading-primary font-bold mb-1">
          Card Review & Grading
        </h1>
        <p className="heading-tertiary text-muted-foreground">
          Analyze card condition and finalize the grading decision
        </p>
      </div>

      <CardImages
        frontImage="/assets/images/mike-trout.svg"
        backImage="/assets/images/mike-trout.svg"
      />

      <div className="relative rounded-md flex-between bg-light-grey mt-3">
        {!isSummaryView && (
          <h3 className="text-2xl font-semibold p-4">Submission Summary</h3>
        )}
        <p
          onClick={() => setIsSummaryView(!isSummaryView)}
          className={
            "absolute top-5 right-3 bg-light-red rounded-full p-1 cursor-pointer"
          }
        >
          <ChevronDown
            className={`w-4 h-4 text-white ${
              isSummaryView ? "rotate-180" : ""
            }`}
          />
        </p>

        {isSummaryView && (
          <SubmissionSummary
            title="Submission Summary"
            data={data}
            onSubmit={handleUpdate}
          />
        )}
      </div>

      {/* AI Grading */}
      <AiGrading className="mt-4" />

      <div className="flex items-center gap-4 md:gap-8 mt-4">
        <Button
          onClick={() => router.back()}
          variant={"ghost"}
          className="rounded-full heading-secondary bg-[#E0E0E0] hover:bg-gray-300 hover:text-black"
        >
          Reject Submission
        </Button>
        <ButtonGradient
          onClick={() =>
            router.push("/dashboard/grading-review/generate-certificate")
          }
        >
          Generate Certificate
        </ButtonGradient>
      </div>
    </div>
  );
};

export default GradingReview;
