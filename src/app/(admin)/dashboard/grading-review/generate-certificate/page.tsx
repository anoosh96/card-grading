"use client";

import CardImages from "@/app/(user)/user-dashboard/order-details/CardImages";
import React, { useState } from "react";
import { GenerateCertificateSummary } from "./components/generate-certificate-summary";
import { Button } from "@/components/ui/button";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import { CertificationDetails } from "./components/certification-detail";

const GenerateCertificate = () => {
  const [certificationData, setCertificationData] = useState({
    certifiedBy: "",
    adminName: "Admin Name",
    adminSignature: "",
  });

  const handleSaveCertification = (data: {
    certifiedBy: string;
    adminName: string;
    adminSignature: string;
  }) => {
    setCertificationData(data);
    console.log("Saved certification data:", data);
  };

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

      <CardImages
        frontImage="/assets/images/mike-trout.svg"
        backImage="/assets/images/mike-trout.svg"
      />

      <GenerateCertificateSummary
        title="Submission Summary"
        className="mt-4"
        // Personal Information
        name="Henrietta Bogisich"
        email="bogisich@gmail.com"
        orderId="01"
        cardName="Charizard Holo"
        category="Pokemon"
        yearOfRelease="1999"
        condition="Good"
        // Submission Details
        submissionType="Online"
        aiAnalysisSummary="Scratches, Centering, Discoloration"
        finalGrade="9/10"
      />

      <CertificationDetails
        initialData={certificationData}
        onSave={handleSaveCertification}
        className="mt-4"
      />

      <div className="flex items-center gap-6 mt-4 ml-2 md:ml-4">
        <Button
          // onClick={() => router.back()}
          variant={"ghost"}
          className="rounded-full heading-secondary bg-[#E0E0E0] hover:bg-gray-300 hover:text-black"
        >
          Download PDF
        </Button>
        <ButtonGradient type="submit">Confirm & Notify User</ButtonGradient>
      </div>
    </div>
  );
};

export default GenerateCertificate;
