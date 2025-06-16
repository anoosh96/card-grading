// "use client";

// import ImageEditor from "@/components/common/ImagePicker/ImageEditor";
// import CustomInput from "@/components/common/CustomInput";
// import CustomSelect from "@/components/common/CustomSelect";
// import { Button } from "@/components/ui/button";
// import { ButtonGradient } from "@/components/common/ButtonGradient";
// import { useRouter } from "next/navigation";
// import { useEnums } from "@/hooks/useEnums";
// import { useSubmissionStore } from "@/stores/submissionStore";
// import { FormStepProps } from "@/types";
// import { useEffect, useMemo } from "react";
// import { useFormState } from "@/hooks/useFormState";
// import { submissionSources } from "@/app/(user)/lib/utils/constants";

// export default function CardDetails({ handleNext }: FormStepProps) {
//   const { data: enums } = useEnums();
//   const { submission, setSubmission } = useSubmissionStore();
//   const router = useRouter();

//   const {
//     values,
//     errors,
//     handleChange,
//     setValue,
//     setError,
//     clearError,
//   } = useFormState({
//     cardName: submission.cardName,
//     category: submission.category,
//     cardType: submission.cardType,
//     yearOfRelease: submission.yearOfRelease,
//     conditionEstimate: submission.conditionEstimate,
//     serviceType: submission.serviceType,
//     frontImage: submission.frontImage,
//     backImage: submission.backImage,
//     submissionSource: submissionSources.BY_FORM,
//   });

//   useEffect(() => {
//     Object.entries(submission).forEach(([key, value]) => {
//       setValue(key as keyof typeof values, value);
//     });
//   }, [submission]);

//   const handleUploadImage = (type: "frontImage" | "backImage", file: File) => {
//     setValue(type, file);
//     setSubmission({ [type]: file });
//     clearError(type);
//   };

//   const handleRemoveImage = (type: "frontImage" | "backImage") => {
//     setValue(type, null);
//     setSubmission({ [type]: null });
//     clearError(type);
//   };

//   const handleSelectChange = (field: keyof typeof values, selected: string) => {
//     setValue(field, selected);
//     setSubmission({ [field]: selected });
//     clearError(field);
//   };

//   const validateForm = () => {
//     let isValid = true;

//     if (!values.cardName) {
//       setError("cardName", "Card name is required.");
//       isValid = false;
//     }

//     if (!values.category) {
//       setError("category", "Category is required.");
//       isValid = false;
//     }

//     if (!values.yearOfRelease) {
//       setError("yearOfRelease", "Year of release is required.");
//       isValid = false;
//     } else {
//       const year = parseInt(values.yearOfRelease as string);
//       const currentYear = new Date().getFullYear();

//       if (isNaN(year)) {
//         setError("yearOfRelease", "Please enter a valid number for year.");
//         isValid = false;
//       } else if (year < 1800 || year > currentYear + 1) {
//         setError("yearOfRelease", `Year must be between 1800 and ${currentYear + 1}.`);
//         isValid = false;
//       }
//     }

//     if (!values.conditionEstimate) {
//       setError("conditionEstimate", "Condition estimate is required.");
//       isValid = false;
//     }

//     if (!values.serviceType) {
//       setError("serviceType", "Service type is required.");
//       isValid = false;
//     }

//     if (!values.frontImage) {
//       setError("frontImage", "Front image is required.");
//       isValid = false;
//     }

//     if (!values.backImage) {
//       setError("backImage", "Back image is required.");
//       isValid = false;
//     }

//     return isValid;
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setSubmission({ ["submissionSource"]: "BY_FORM" });

//     console.log("Stored Submission Data:", submission);
//     handleNext();
//   };

//   // Memoized preview URLs
//   const frontImagePreview = useMemo(() => {
//     if (!values.frontImage) return undefined;
//     return URL.createObjectURL(values.frontImage as File);
//   }, [values.frontImage]);

//   const backImagePreview = useMemo(() => {
//     if (!values.backImage) return undefined;
//     return URL.createObjectURL(values.backImage as File);
//   }, [values.backImage]);

//   return (
//     <div>
//       <h1 className="heading-primary font-bold">Enter Your Card Details</h1>
//       <p className="text-medium-grey mt-2">
//         Provide information about the card you&#39;re submitting
//       </p>

//       <div className="overflow-hidden mt-8">
//         <h3 className="heading-tertiary mb-2">Card Images</h3>
//         <form className="w-full" onSubmit={handleSubmit}>
//           <div className="flex-between gap-4 flex-col md:flex-row">
//             <div className="w-full">
//               <ImageEditor
//                 image={
//                   frontImagePreview
//                     ? { url: frontImagePreview, alt: "Front" }
//                     : undefined
//                 }
//                 placeholder="Drag and drop your card front image here"
//                 onAddImage={(file) => handleUploadImage("frontImage", file[0])}
//                 onDeleteImage={() => handleRemoveImage("frontImage")}
//               />
//               {errors.frontImage && (
//                 <p className="text-red-500 mt-1 text-sm">{errors.frontImage}</p>
//               )}
//             </div>

//             <div className="w-full">
//               <ImageEditor
//                 image={
//                   backImagePreview
//                     ? { url: backImagePreview, alt: "Back" }
//                     : undefined
//                 }
//                 placeholder="Drag and drop your card back image here"
//                 onAddImage={(file) => handleUploadImage("backImage", file[0])}
//                 onDeleteImage={() => handleRemoveImage("backImage")}
//               />
//               {errors.backImage && (
//                 <p className="text-red-500 mt-1 text-sm">{errors.backImage}</p>
//               )}
//             </div>
//           </div>

//           <div className="mt-8 p-2 space-y-4">
//             <div>
//               <label className="block font-semibold mb-2">Card Name</label>
//               <CustomInput
//                 id="cardName"
//                 name="cardName"
//                 placeholder="Enter Card Name"
//                 className="w-full p-6"
//                 value={values.cardName}
//                 onChange={(e) => {
//                   handleChange(e);
//                   setSubmission({ cardName: e.target.value });
//                   clearError("cardName");
//                 }}
//               />
//               {errors.cardName && (
//                 <p className="text-red-500 mt-1 text-sm">{errors.cardName}</p>
//               )}
//             </div>

//             <div>
//               <label className="block font-semibold mb-2">Category</label>
//               <CustomSelect
//                 options={enums?.cardTypes}
//                 selectedOption={values.category || "Select Category"}
//                 borderColor="border-transparent"
//                 bg="bg-light-grey"
//                 setSelectedOption={(value) => {
//                   handleSelectChange("category", value as string);
//                 }}
//                 className="relative"
//               />
//               {errors.category && (
//                 <p className="text-red-500 mt-1 text-sm">{errors.category}</p>
//               )}
//             </div>

//             <div>
//               <label className="block font-semibold mb-2">Year of Release</label>
//               <CustomInput
//                 id="yearOfRelease"
//                 name="yearOfRelease"
//                 placeholder="Year of Release"
//                 className="w-full p-6"
//                 value={values.yearOfRelease as number}
//                 onChange={(e) => {
//                   handleChange(e);
//                   setSubmission({ yearOfRelease: e.target.value });
//                   clearError("yearOfRelease");
//                 }}
//               />
//               {errors.yearOfRelease && (
//                 <p className="text-red-500 mt-1 text-sm">{errors.yearOfRelease}</p>
//               )}
//             </div>

//             <div>
//               <label className="block font-semibold mb-2">Condition (Your Estimate)</label>
//               <CustomSelect
//                 options={enums?.conditionEstimates}
//                 selectedOption={values.conditionEstimate || "Select Condition"}
//                 borderColor="border-transparent"
//                 bg="bg-light-grey"
//                 setSelectedOption={(value) => {
//                   handleSelectChange("conditionEstimate", value as string);
//                 }}
//                 className="relative"
//               />
//               {errors.conditionEstimate && (
//                 <p className="text-red-500 mt-1 text-sm">{errors.conditionEstimate}</p>
//               )}
//             </div>

//             <div>
//               <label className="block font-semibold mb-2">Service Type</label>
//               <CustomSelect
//                 options={enums?.serviceTypes}
//                 selectedOption={values.serviceType || "Select Service"}
//                 borderColor="border-transparent"
//                 bg="bg-light-grey"
//                 setSelectedOption={(value) => {
//                   handleSelectChange("serviceType", value as string);
//                 }}
//                 className="relative"
//               />
//               {errors.serviceType && (
//                 <p className="text-red-500 mt-1 text-sm">{errors.serviceType}</p>
//               )}
//             </div>

//             <div className="flex gap-2 lg:gap-6 mt-8">
//               <Button
//                 size={"lg"}
//                 type="button"
//                 className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-3  px-8 lg:px-14 text-base hover:bg-soft-grey"
//                 onClick={() => router.back()}
//               >
//                 Back
//               </Button>
//               <ButtonGradient
//                 size={"lg"}
//                 className="py-3 px-8 lg:px-14 h-auto"
//                 type="submit"
//               >
//                 Next
//               </ButtonGradient>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
