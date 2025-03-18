/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import { SubmissionData } from "../add-post-types";

interface SubmissionSummaryProps {
  title: string;
  data: SubmissionData;
  isEditable?: boolean;
  onSubmit: (updatedData: SubmissionData) => void;
  classNames?: string;
}

const SubmissionSummary = ({
  title,
  data,
  isEditable = false,
  onSubmit,
  classNames,
}: SubmissionSummaryProps) => {
  const [formData, setFormData] = useState<SubmissionData>(data);
  const [isEditing, setIsEditing] = useState(false);

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
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(data);
    setIsEditing(false);
  };

  const fields = Object.keys(data).map((key) => ({
    label: key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase()),
    value: formData[key as keyof SubmissionData],
    key: key as keyof SubmissionData,
  }));

  return (
    <div
      className={`w-full bg-light-grey rounded-md shadow-sm overflow-hidden ${classNames}`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>

          {isEditable && (
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="text-green-500 hover:text-green-700"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-light-red hover:text-red-700"
                  >
                    <X size={18} />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-light-red hover:text-orange-700"
                >
                  <Pencil size={18} />
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
                className={`grid grid-cols-2 py-1 ${
                  key === "submissionDate" || key === "status"
                    ? "text-[18px] font-medium"
                    : ""
                }`}
              >
                <span className="font-medium text-gray-900">{label}</span>
                {isEditing ? (
                  key === "condition" ? (
                    <textarea
                      value={value}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full min-h-[60px] resize-y"
                    />
                  ) : (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="border border-gray-300 bg-white rounded px-2 py-1 w-full"
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
