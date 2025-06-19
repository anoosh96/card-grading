// "use client";

// import CardImages from "@/app/(user)/user-dashboard/submission-status/card-details/CardImages";
// import { ChevronDown } from "lucide-react";
// import React, { useMemo, useState } from "react";
// import SubmissionSummary from "../submission-status/components/SubmissionSummary";
// import { SubmissionData } from "../submission-status/add-post/add-post-types";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { ButtonGradient } from "@/components/common/ButtonGradient";
// import AiGrading from "./components/AiGrading";
// import { useSubmissionStore } from "@/stores/submissionStore";
// import { submissionStatus } from "@/app/(user)/lib/utils/constants";
// import { formatToUSTimezone, padId } from "@/lib/utils";

// const GradingReview = () => {
//   const router = useRouter();
//   const [isSummaryView, setIsSummaryView] = useState(false);

//   const { submission } = useSubmissionStore()

//   // Memoized preview URLs
//   const frontImagePreview = useMemo(() => {
//     if (!submission.frontImage) return undefined;
//     if (typeof submission.frontImage === 'string') return submission.frontImage;
//     return URL.createObjectURL(submission.frontImage as File);
//   }, [submission.frontImage]);

//   const backImagePreview = useMemo(() => {
//     if (!submission.backImage) return undefined;
//     if (typeof submission.backImage === 'string') return submission.backImage;
//     return URL.createObjectURL(submission.backImage as File);
//   }, [submission.backImage]);

//   const handleUpdate = (updatedData: SubmissionData) => {
//     console.log(updatedData)
//     //setData(updatedData);
//   };

//   // Prepare data for the SubmissionSummary component
//   const summaryData = useMemo(() => {
//     return {
//       cardName: submission.cardName,
//       category: submission.category,
//       yearOfRelease: submission.yearOfRelease?.toString() || "",
//       condition: submission.conditionEstimate,
//       submissionDate:  formatToUSTimezone(submission.submissionDate || ''),
//       status: submission.submissionStatus,
//       name: submission.fullName as string,
//       email: submission.email as string,
//       orderId: padId(submission.id)
//     };
//   }, [submission]);

//   return (
//     <div className="bg-white border-md px-4 py-4 rounded-md">
//       <div className="mb-4">
//         <h1 className="heading-primary font-bold mb-1">
//           Card Review & Grading
//         </h1>
//         <p className="heading-tertiary text-muted-foreground">
//           Analyze card condition and finalize the grading decision
//         </p>
//       </div>

//       {
//         !submission.id || submission.submissionStatus == submissionStatus.SUBMISSION_PENDING
//           ?
//             <p className="mt-6 text-neutral-grey">No Submission Selected for Grading Review.</p>
//           :
//           <>
//             <CardImages
//               frontImage={frontImagePreview || "/assets/images/default-front.png"}
//               backImage={backImagePreview || "/assets/images/default-back.png"}
//             />

//             <div className="relative rounded-md flex-between bg-light-grey mt-3">
//               {!isSummaryView && (
//                 <h3 className="text-2xl font-semibold p-4">Submission Summary</h3>
//               )}
//               <p
//                 onClick={() => setIsSummaryView(!isSummaryView)}
//                 className={
//                   "absolute top-5 right-3 bg-light-red rounded-full p-1 cursor-pointer"
//                 }
//               >
//                 <ChevronDown
//                   className={`w-4 h-4 text-white ${isSummaryView ? "rotate-180" : ""
//                     }`}
//                 />
//               </p>

//               {isSummaryView && (
//                 <SubmissionSummary
//                   title="Submission Summary"
//                   data={summaryData}
//                   onSubmit={handleUpdate}
//                 />
//               )}
//             </div>

//             {/* AI Grading */}
//             <AiGrading className="mt-4" aiData={{grade: submission.grade as number, aiRemarks: submission.aiRemarks as string}}/>

//             <div className="flex items-center gap-4 md:gap-8 mt-4">
//               <Button
//                 onClick={() => router.back()}
//                 variant={"ghost"}
//                 className="rounded-full heading-secondary bg-[#E0E0E0] hover:bg-gray-300 hover:text-black"
//               >
//                 Reject Submission
//               </Button>
//               <ButtonGradient
//                 onClick={() =>
//                   router.push("/dashboard/grading-review/generate-certificate")
//                 }
//               >
//                 Generate Certificate
//               </ButtonGradient>
//             </div>
//           </>

//       }
//     </div>
//   );
// };

// export default GradingReview;


const GradingReviewPage = () => {
  return(
    <h1>Grading Review Page</h1>
  )
}

export default GradingReviewPage