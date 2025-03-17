"use client";

import DashboardCustomSelect from "@/components/common/DashboardCustomSelect/DashboardCustomSelect";
import React, { FC, useState } from "react";
import { cardGrades } from "../grading-review.constant";
import { defaultSelectTheme } from "@/utils";

interface AiGradingProps {
  className?: string;
}

const AiGrading: FC<AiGradingProps> = ({ className }) => {
  const [selectedGrade, setSelectedGrade] = useState("0");
  return (
    <div
      className={`w-full p-4 bg-light-grey rounded-lg shadow-sm ${className}`}
    >
      <h2 className="text-2xl font-semibold mb-4">AI Grading</h2>

      <div className="space-y-4">
        {/* <!-- AI Detected Issues --> */}
        <div className="flex justify-between items-start">
          <span className="text-sm text-gray-600">AI Detected Issues</span>
          <span className="text-sm text-gray-900">
            Scratches, Centering, Discoloration
          </span>
        </div>

        {/* <!-- AI Suggested Grade --> */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">AI Suggested Grade</span>
          <span className="text-sm text-gray-900">{selectedGrade} / 10</span>
        </div>

        {/* <!-- Modify Grade Manually --> */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Modify Grade Manually</span>

          <div>
            <DashboardCustomSelect
              placeholder="Grade"
              options={cardGrades}
              theme={defaultSelectTheme}
              onChange={(value) => setSelectedGrade(value)}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiGrading;
