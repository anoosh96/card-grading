"use client";

import CardImages from "@/app/(user)/user-dashboard/submission-status/order-details/CardImages";
import React, { useMemo, useState } from "react";
import { GenerateCertificateSummary } from "./components/generate-certificate-summary";
import { Button } from "@/components/ui/button";
import { ButtonGradient } from "@/components/common/ButtonGradient";
import { CertificationDetails } from "./components/certification-detail";
import { useSubmissionStore } from "@/stores/submissionStore";
import { padId } from "@/lib/utils";
import CustomModal from "@/components/common/CustomModal";
import { FlexibleRecord } from "@/types";
import { submissionStatus } from "@/app/(user)/lib/utils/constants";
import { useUpdateSubmission } from "@/hooks/useUpdateSubmission";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const GenerateCertificate = () => {
  const [isConfirmDoc, setIsConfirmDoc] = useState(false);
  const [certificationData, setCertificationData] = useState({
    certifiedBy: "",
    adminName: "Admin Name",
    adminSignature: "",
  });

  const { submission, setSubmission } = useSubmissionStore();
  const updateSubmission = useUpdateSubmission();
  const router = useRouter();


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

  const updateStatus = () => {

    const values: FlexibleRecord = {
      submissionStatus: submissionStatus.GRADING_COMPLETE
    };

    // Call the mutation with our submission data
    updateSubmission.mutate({
      id: submission.id,
      values
    }, {
      onSuccess: (data) => {
        // Update the submission store with the response data
        const updatedSubmission = data.data.submission

        // Update our local submission state
        setSubmission({
          submissionStatus: updatedSubmission.submissionStatus
        });

        setIsConfirmDoc(true);
      }
    });
  };

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
        orderId={padId(submission.id)}
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
        <ButtonGradient onClick={updateStatus} disabled={updateSubmission.isPending}>
          {updateSubmission.isPending ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
               Confirming...
            </>
          ) : (
            "Confirm & Notify User"
          )}
        </ButtonGradient>
      </div>

      <CustomModal
        isOpen={isConfirmDoc}
        icon_url="/icons/success.svg"
        title="Card has been graded"
        message="User has been Notified about the Grading Decision."
        onConfirm={() => {
          setIsConfirmDoc(false);
          router.push("/dashboard");
        }}
        onCancel={() => setIsConfirmDoc(false)}
        cn="!p-16 !rounded-2xl"
        yes_btn_text="Done"
        no_btn_text="Cancel"
        icon_bg="bg-transparent"
        icon_h={60}
        icon_w={60}
      />
    </div>
  );
};

export default GenerateCertificate;
