"use client";

import CardImages from "@/app/(user)/user-dashboard/submission-status/order-details/CardImages";
import React, { useMemo, useState } from "react";
import { GenerateCertificateSummary } from "./components/generate-certificate-summary";
import { Button } from "@/components/ui/button";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import { CertificationDetails } from "./components/certification-detail";
import ConfirmationModal from "@/modals/ConfirmationModal";
import { useSubmissionStore } from "@/stores/submissionStore";

const GenerateCertificate = () => {
  const [isConfirmDoc, setIsConfirmDoc] = useState(false);
  const [certificationData, setCertificationData] = useState({
    certifiedBy: "",
    adminName: "Admin Name",
    adminSignature: "",
  });

  const submission = useSubmissionStore((state) => state.submission);

  const handleSaveCertification = (data: {
    certifiedBy: string;
    adminName: string;
    adminSignature: string;
  }) => {
    setCertificationData(data);
    console.log("Saved certification data:", data);
  };

  // Memoized preview URLs
  const frontImagePreview = useMemo(() => {
    if (!submission.frontImage) return undefined;
    if (typeof submission.frontImage === 'string') return submission.frontImage;
    return URL.createObjectURL(submission.frontImage as File);
  }, [submission.frontImage]);

  const backImagePreview = useMemo(() => {
    if (!submission.backImage) return undefined;
    if (typeof submission.backImage === 'string') return submission.backImage;
    return URL.createObjectURL(submission.backImage as File);
  }, [submission.backImage]);

  return (
    <div className="bg-white border-md px-4 py-4 rounded-md">
      <div className="mb-2">
        <h1 className="heading-primary font-bold mb-1">
          Official Card Grading Certificate
        </h1>
        <p className="heading-tertiary text-muted-foreground">
          Certificate ID: #{submission.trackingNumber}
        </p>
      </div>

      <CardImages
        frontImage={frontImagePreview || "/assets/images/default-front.png"}
        backImage={backImagePreview || "/assets/images/default-back.png"}
      />

      <GenerateCertificateSummary
        title="Submission Summary"
        className="mt-4"
        // Personal Information
        name={submission.fullName || "N/A"}
        email={submission.email || "N/A"}
        orderId={submission.id}
        cardName={submission.cardName}
        category={submission.category}
        yearOfRelease={submission.yearOfRelease?.toString() || "N/A"}
        condition={submission.conditionEstimate}
        // Submission Details
        submissionType={submission.submissionSource}
        aiAnalysisSummary={submission.aiRemarks || "N/A"}
        finalGrade={submission.grade ? `${submission.grade}/10` : "N/A"}
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
        <ButtonGradient onClick={() => setIsConfirmDoc(true)}>
          Confirm & Notify User
        </ButtonGradient>
      </div>

      <ConfirmationModal
        isOpen={isConfirmDoc}
        title="Your Card is Submit for Grading"
        message="Your Tracking Number:"
        trackNo={987654321}
        onConfirm={() => {
          setIsConfirmDoc(false);
        }}
        onClose={() => setIsConfirmDoc(false)}
        cn="!p-8"
      />
    </div>
  );
};

export default GenerateCertificate;
