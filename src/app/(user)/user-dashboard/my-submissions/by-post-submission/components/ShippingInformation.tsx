"use client";

import { ButtonGradient } from "@/components/common/ButtonGradient";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import { Button } from "@/components/ui/button";
import { FormStepProps } from "@/types";
import { useEnums } from "@/hooks/useEnums";
import { useFormState } from "@/hooks/useFormState";
import { useSubmissionStore } from "@/stores/submissionStore";
import { submissionSources } from "@/app/(user)/lib/utils/constants";

export default function ShippingInformation({ handleNext, handlePrevious }: FormStepProps) {
  // Fetch enums using useEnums
  const { data: enumsData, isLoading, isError, error } = useEnums();

  // Access zustand store to set submission data
  const { submission, setSubmission} = useSubmissionStore((state) => state);

  // Destructure enums from the fetched data
  const { cardTypes, conditionEstimates, serviceTypes } = enumsData || {};

  // Initialize form state with useFormState
  const { values, errors, handleChange, setValue, setError } = useFormState({
    cardName: submission.cardName,
    category: submission.category,
    yearOfRelease: submission.yearOfRelease,
    conditionEstimate: submission.conditionEstimate,
    serviceType: submission.serviceType,  // Added serviceType field
    fullName: submission.fullName,
    shippingAddress: submission.shippingAddress,
    phoneNumber: submission.phoneNumber,
    submissionSource: submissionSources.BY_POST
  });

  // — Validation before advancing —
  const validateForm = (): boolean => {
    let ok = true
    if (!values.fullName) {
      setError('fullName', 'Full name is required.')
      ok = false
    }
    if (!values.shippingAddress) {
      setError('shippingAddress', 'Shipping address is required.')
      ok = false
    }
    if (!values.phoneNumber) {
      setError('phoneNumber', 'Phone number is required.')
      ok = false
    }
    if (!values.cardName) {
      setError('cardName', 'Card name is required.')
      ok = false
    }
    if (!values.category) {
      setError('category', 'Category is required.')
      ok = false
    }
    if (!values.yearOfRelease) {
      setError("yearOfRelease", "Year of release is required.");
      ok = false;
    } else {
      const year = parseInt(values.yearOfRelease as string);
      const currentYear = new Date().getFullYear();
      
      if (isNaN(year)) {
        setError("yearOfRelease", "Please enter a valid number for year.");
        ok = false;
      } else if (year < 1800 || year > currentYear + 1) {
        setError("yearOfRelease", `Year must be between 1800 and ${currentYear + 1}.`);
        ok = false;
      }
    }
    if (!values.conditionEstimate) {
      setError('conditionEstimate', 'Condition estimate is required.')
      ok = false
    }
    if (!values.serviceType) {
      setError('serviceType', 'Service type is required.')
      ok = false
    }
    return ok
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;
    // Update zustand store with form data
    setSubmission({
      fullName: values.fullName,
      shippingAddress: values.shippingAddress,
      phoneNumber: values.phoneNumber,
      cardName: values.cardName,
      category: values.category,
      yearOfRelease: Number(values.yearOfRelease),
      conditionEstimate: values.conditionEstimate,
      serviceType: values.serviceType,  // Added serviceType to submission
      submissionSource: values.submissionSource
    });

    handleNext();
  };

   // Conditional rendering while data is loading or if there's an error
   if (isLoading) {
    return <div>Loading enums...</div>;
  }

  if (isError) {
    return <div>Error loading enums: {error?.message}</div>;
  }


  return (
    <div>
      <h1 className="heading-primary font-bold">Shipping Information</h1>
      <p className="text-neutral-grey mt-4">Enter your shipping details</p>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mt-8 p-2 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block font-semibold mb-2">Full Name</label>
            <CustomInput
              id="fullName"
              name="fullName"
              placeholder="Enter Full Name"
              className="w-full p-6"
              value={values.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <p className="text-red-500 mt-1 text-sm">{errors.fullName}</p>
            )}
          </div>

          {/* Shipping Address */}
          <div>
            <label className="block font-semibold mb-2">Shipping Address</label>
            <CustomInput
              id="shippingAddress"
              name="shippingAddress"
              placeholder="Enter Shipping Address"
              className="w-full p-6"
              value={values.shippingAddress}
              onChange={handleChange}
            />
            {errors.shippingAddress && (
              <p className="text-red-500 mt-1 text-sm">{errors.shippingAddress}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block font-semibold mb-2">Phone Number</label>
            <CustomInput
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter Phone Number"
              className="w-full p-6"
              value={values.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 mt-1 text-sm">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Card Name */}
          <div>
            <label className="block font-semibold mb-2">Card Name</label>
            <CustomInput
              id="cardName"
              name="cardName"
              placeholder="Enter Card Name"
              className="w-full p-6"
              value={values.cardName}
              onChange={handleChange}
            />
            {errors.cardName && (
              <p className="text-red-500 mt-1 text-sm">{errors.cardName}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold mb-2">Category</label>
            <CustomSelect
              options={cardTypes}
              selectedOption={values.category || "Select Category"}
              borderColor="border-transparent"
              bg="bg-light-grey"
              setSelectedOption={(value) => setValue("category", value as string)}
              className="relative"
            />
            {errors.category && (
              <p className="text-red-500 mt-1 text-sm">{errors.category}</p>
            )}
          </div>

          {/* Year of Release */}
          <div>
            <label className="block font-semibold mb-2">Year of Release</label>
            <CustomInput
              id="year"
              name="yearOfRelease"
              placeholder="Year of Release"
              className="w-full p-6"
              value={values.yearOfRelease as number}
              onChange={handleChange}
            />
            {errors.yearOfRelease && (
              <p className="text-red-500 mt-1 text-sm">{errors.yearOfRelease}</p>
            )}
          </div>

          {/* Condition */}
          <div>
            <label className="block font-semibold mb-2">Condition (Your Estimate)</label>
            <CustomSelect
              options={conditionEstimates}
              selectedOption={values.conditionEstimate || "Select Condition"}
              borderColor="border-transparent"
              bg="bg-light-grey"
              setSelectedOption={(value) => setValue("conditionEstimate", value as string)}
              className="relative"
            />
            {errors.conditionEstimate && (
              <p className="text-red-500 mt-1 text-sm">{errors.conditionEstimate}</p>
            )}
          </div>

          {/* Service Type */}
          <div>
            <label className="block font-semibold mb-2">Service Type</label>
            <CustomSelect
              options={serviceTypes}
              selectedOption={values.serviceType || "Select Service Type"}
              borderColor="border-transparent"
              bg="bg-light-grey"
              setSelectedOption={(value) => setValue("serviceType", value as string)}
              className="relative"
            />
            {errors.serviceType && (
              <p className="text-red-500 mt-1 text-sm">{errors.serviceType}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-6 mt-8">
            <Button
              size={"lg"}
              className="h-auto font-semibold bg-soft-grey rounded-full text-pure-grey py-3 px-14 text-base hover:bg-soft-grey"
              onClick={handlePrevious}
            >
              Back
            </Button>
            <ButtonGradient size={"lg"} className="py-3 px-14 h-auto" type="submit">
              Next
            </ButtonGradient>
          </div>
        </div>
      </form>
    </div>
  );
}
