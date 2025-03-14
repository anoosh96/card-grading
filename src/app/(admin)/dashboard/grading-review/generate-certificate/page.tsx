import CardImages from "@/app/(user)/user-dashboard/order-details/CardImages";
import React from "react";

const GenerateCertificate = () => {
  return (
    <div className="bg-white border-md px-4 py-4 rounded-md">
      <div className="mb-2">
        <h1 className="heading-primary font-bold mb-1">
          Official Card Grading Certificate
        </h1>
        <p className="heading-tertiary text-muted-foreground">
          Certificate ID: #1234567890
        </p>
      </div>

      <CardImages frontImage="/assets/images/mike-trout.svg" backImage="/assets/images/mike-trout.svg" />
    </div>
  );
};

export default GenerateCertificate;
