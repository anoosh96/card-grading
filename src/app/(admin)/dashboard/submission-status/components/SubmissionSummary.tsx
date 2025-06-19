/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import { SubmissionData } from "../add-post/add-post-types";
import CustomSelect from "@/components/common/CustomSelect";
import { useEnums } from "@/hooks/useEnums";
import { cardStatusMap } from "@/app/(user)/lib/utils/helpers";
import CustomInput from "@/components/common/CustomInput"; // Assuming you have this component

interface SubmissionSummaryProps {
  title: string;
  data: SubmissionData;
  isEditable?: boolean;
  onSubmit: (updatedData: SubmissionData) => void;
  classNames?: string;
  isEditing?: boolean;
  setIsEditing?: (isEditing: boolean) => void;
}

const SubmissionSummary = ({
  title,
  data,
  isEditable = false,
  onSubmit,
  classNames,
  isEditing = false,
  setIsEditing,
}: SubmissionSummaryProps) => {
  const [formData, setFormData] = useState<SubmissionData>(data);
  // State to hold validation errors for each field
  const [validationErrors, setValidationErrors] = useState<
    Partial<Record<keyof SubmissionData, string>>
  >({});
  // Fetch enums for dropdown options
  const { data: enumData, isLoading } = useEnums();

  useEffect(() => {
    setFormData(data);
    setValidationErrors({}); // Clear validation errors when data changes or component mounts/updates
  }, [data]);

  // Validation function for specific fields
  const validateField = (key: keyof SubmissionData, value: string | number | null) => {
    let error = "";
    if (key === "cardName") {
      if (!value || String(value).trim() === "") {
        error = "Card name is required.";
      }
    } else if (key === "yearOfRelease") {
      if (!value) {
        error = "Year of release is required.";
      } else {
        const year = Number(value);
        const currentYear = new Date().getFullYear();
        if (isNaN(year)) {
          error = "Please enter a valid number for year.";
        } else if (year < 1800 || year > currentYear + 1) {
          error = `Year must be between 1800 and ${currentYear + 1}.`;
        }
      }
    }
    // Update the validationErrors state for the specific field
    setValidationErrors((prev) => ({
      ...prev,
      [key]: error,
    }));
    return error; // Return the error message (empty string if valid)
  };


  const handleChange = (key: keyof SubmissionData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
    // Validate the field immediately on change if it's one of the validated fields
    if (key === "cardName" || key === "yearOfRelease") {
      validateField(key, value);
    }
  };

  const handleSave = () => {
    let formIsValid = true;
    const newErrors: Partial<Record<keyof SubmissionData, string>> = {};

    // Run all validations
    const cardNameError = validateField("cardName", formData.cardName);
    if (cardNameError) {
      formIsValid = false;
      newErrors.cardName = cardNameError;
    }

    const yearOfReleaseError = validateField("yearOfRelease", formData.yearOfRelease);
    if (yearOfReleaseError) {
      formIsValid = false;
      newErrors.yearOfRelease = yearOfReleaseError;
    }

    // Set all errors at once after checking all fields
    setValidationErrors(newErrors);

    if (formIsValid) {
      onSubmit(formData);
      setIsEditing?.(false);
    }
  };

  const handleCancel = () => {
    setFormData(data);
    setValidationErrors({}); // Clear validation errors on cancel
    setIsEditing?.(false);
  };

  // Get dropdown options from enum data
  const getCategoryOptions = () => {
    return enumData?.cardTypes || [];
  };

  const getConditionOptions = () => {
    return enumData?.conditionEstimateOptions ||
      ["MINT", "NEAR_MINT", "GOOD", "FAIR", "POOR"];
  };

  const getStatusOptions = () => {
    return Object.keys(cardStatusMap);
  };

  const fields = Object.keys(data).map((key) => ({
    label: key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase()),
    value: formData[key as keyof SubmissionData],
    key: key as keyof SubmissionData,
  }));

  // Determine if a field should be rendered as a dropdown
  const isDropdownField = (key: string) => {
    return key === "category" || key === "condition" || key === "status";
  };

  // Get options for a specific dropdown field
  const getOptionsForField = (key: string) => {
    if (key === "category") return getCategoryOptions();
    if (key === "condition") return getConditionOptions();
    if (key === "status") return getStatusOptions();
    return [];
  };

  const isReadOnly = (key: string) => {
    return key === "service" || key === "orderId"
  }

  return (
    <div
      className={`w-full bg-light-grey rounded-md shadow-sm overflow-hidden ${classNames}`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">{title}</h2>

          {isEditable && (
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="text-green-500 hover:text-green-700"
                  >
                    <Check size={30} />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-light-red hover:text-red-700"
                  >
                    <X size={30} />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing?.(true)}
                  className="text-light-red hover:text-orange-700"
                >
                  <Pencil size={24} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-4 px-4"
        >
          {fields.map(({ label, value, key }, index) => (
            <div key={key}>
              {/* Insert Divider Before Submission Date */}
              {key === "submissionDate" && (
                <div className="border-t border-gray-200 my-2"></div>
              )}

              <div
                className={`grid sm:grid-cols-2 py-1`}
              >
                <span className="font-medium text-gray-900 mb-2 sm:mb-0">{label}</span>
                {isEditing ? (
                  <div className="relative"> {/* Added relative positioning for error bubble */}
                    {isDropdownField(key) ? (
                      <div className="w-full">
                        <CustomSelect
                          options={getOptionsForField(key)}
                          selectedOption={value || ""}
                          setSelectedOption={(selected) => handleChange(key, selected as string)}
                          borderColor={validationErrors[key] ? "border-red-500" : "border-gray-300"} // Apply red border on error
                          bg="bg-white"
                          className={`w-full ${validationErrors[key] ? 'error-class' : ''}`} // Apply 'error-class'
                        />
                      </div>
                    ) : (
                      // Using CustomInput for text/number fields
                      <CustomInput
                        type={key === "yearOfRelease" ? "number" : "text"}
                        value={value as string}
                        readOnly={isReadOnly(key)}
                        disabled={isReadOnly(key)}
                        onChange={(e) => handleChange(key, e.target.value)}
                        // Apply red border and 'error-class' on error
                        className={`w-full p-7 ${isReadOnly(key) ? '!bg-[#E0E0E0]' : 'bg-white'} ${validationErrors[key] ? 'border-red-500 error-class' : 'border-gray-300'}`}
                      />
                    )}
                    {/* Error message display */}
                    {validationErrors[key] && (
                      <div className="absolute -top-5 right-0 ml-2 transform -translate-y-1/2 z-10 animate-fade-in-slide-down">
                        <p className="text-xs bg-red-600 text-white py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap">
                          {validationErrors[key]}
                        </p>
                        {/* Triangle pointer for the error bubble */}
                        <div className="w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-red-600 absolute bottom-[-8px] left-1/2 -translate-x-1/2"></div>
                      </div>
                    )}
                  </div>
                ) : (
                  <span
                    className={
                      key === "status" ? "text-light-red" : "text-gray-600"
                    }
                  >
                    {value}
                  </span>
                )}
              </div>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default SubmissionSummary;