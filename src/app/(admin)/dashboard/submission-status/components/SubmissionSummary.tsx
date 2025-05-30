/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import { SubmissionData } from "../add-post/add-post-types";
import CustomSelect from "@/components/common/CustomSelect";
import { useEnums } from "@/hooks/useEnums";

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
  // Fetch enums for dropdown options
  const { data: enumData, isLoading } = useEnums();

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    onSubmit(formData);
    setIsEditing?.(false);
  };

  const handleCancel = () => {
    setFormData(data);
    setIsEditing?.(false);
  };

  // Get dropdown options from enum data
  const getCategoryOptions = () => {
    // You might need to adjust these based on your actual enum data structure
    return enumData?.cardTypes || [];
  };

  const getConditionOptions = () => {
    return enumData?.conditionEstimateOptions ||
      ["MINT", "NEAR_MINT", "GOOD", "FAIR", "POOR"];
  };

  const getStatusOptions = () => {
    return enumData?.submissionStatusOptions ||
      ["SUBMISSION_PENDING", "SUBMISSION_RECEIVED", "GRADING_IN_PROGRESS", "GRADING_COMPLETE"];
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
                className={`grid sm:grid-cols-2 py-1 ${key === "submissionDate" || key === "status"
                  ? "text-[18px] font-medium"
                  : ""
                  }`}
              >
                <span className="font-medium text-gray-900">{label}</span>
                {isEditing ? (
                  isDropdownField(key) ? (
                    // Render CustomSelect for dropdown fields
                    <div className="w-full">
                      <CustomSelect
                        options={getOptionsForField(key)}
                        selectedOption={value || ""}
                        setSelectedOption={(selected) => handleChange(key, selected as string)}
                        borderColor="border-gray-300"
                        bg="bg-white"
                        className="w-full"
                      />
                    </div>
                  ) : (
                    // Render regular input for other fields
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="border border-gray-300 bg-white rounded-lg p-4 w-full"
                    />
                  )
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