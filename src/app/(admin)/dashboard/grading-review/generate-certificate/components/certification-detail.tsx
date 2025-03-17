"use client";

import type React from "react";

import { useState } from "react";
import { Pencil, Check } from "lucide-react";

type CertificationDetailsProps = {
  className?: string;
  initialData?: {
    certifiedBy: string;
    adminName: string;
    adminSignature: string;
  };
  onSave?: (data: {
    certifiedBy: string;
    adminName: string;
    adminSignature: string;
  }) => void;
};

export function CertificationDetails({
  className,
  initialData = {
    certifiedBy: "",
    adminName: "Admin Name",
    adminSignature: "",
  },
  onSave,
}: CertificationDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    if (onSave) {
      onSave(formData);
    }
  };

  return (
    <div className={`bg-light-grey rounded-lg p-6 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Certification Details
        </h2>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="text-red-500 hover:text-red-600 transition-colors"
          aria-label={isEditing ? "Save changes" : "Edit certification details"}
        >
          {isEditing ? (
            <Check className="h-5 w-5" />
          ) : (
            <Pencil className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="space-y-4 mx-3 heading-tertiary text-charcol font-medium">
        <div className="flex items-center py-1">
          <span className="w-40">Certified By</span>
          {isEditing ? (
            <input
              type="text"
              name="certifiedBy"
              value={formData.certifiedBy}
              onChange={handleInputChange}
              className="text-gray-900 border-b border-gray-300 focus:border-gray-500 focus:outline-none px-1 py-0.5 w-full max-w-xs"
              placeholder="Enter certifier name"
            />
          ) : (
            <span className="text-gray-900">
              {formData.certifiedBy || "—"}
            </span>
          )}
        </div>

        <div className="flex items-center py-1">
          <span className="w-40">Admin Name</span>
          {isEditing ? (
            <input
              type="text"
              name="adminName"
              value={formData.adminName}
              onChange={handleInputChange}
              className="text-gray-900 border-b border-gray-300 focus:border-gray-500 focus:outline-none px-1 py-0.5 w-full max-w-xs"
              placeholder="Enter admin name"
            />
          ) : (
            <span className="text-gray-900">
              {formData.adminName || "—"}
            </span>
          )}
        </div>

        <div className="flex items-center py-1">
          <span className="w-40">Admin Signature</span>
          {isEditing ? (
            <input
              type="text"
              name="adminSignature"
              value={formData.adminSignature}
              onChange={handleInputChange}
              className="text-gray-900 border-b border-gray-300 focus:border-gray-500 focus:outline-none px-1 py-0.5 w-full max-w-xs"
              placeholder="Enter signature"
            />
          ) : (
            <div className="w-full max-w-xs">
              {formData.adminSignature ? (
                <span className="text-gray-900">
                  {formData.adminSignature}
                </span>
              ) : (
                <div className="border-b border-gray-300 w-full h-px mt-4"></div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
