import CardImages from "@/app/(user)/user-dashboard/order-details/CardImages";
import React from "react";

const GradingReview = () => {
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
        frontImage="/assets/images/mike-trout.png"
        backImage="/assets/images/mike-trout.png"
      />

      <div className="rounded-full px-4 py-2 bg-light-grey mt-3">
        <h3 className="text-[24px] font-semibold">Submission Summary</h3>
      </div>
    </div>
  );
};

export default GradingReview;
