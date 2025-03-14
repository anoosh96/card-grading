import React, { FC } from "react";

interface AiGradingProps {
  className?: string;
}

const AiGrading: FC<AiGradingProps> = ({ className }) => {
  return (
    <div
      className={`w-full p-4 bg-light-grey rounded-lg shadow-sm ${className}`}
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">AI Grading</h2>

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
          <span className="text-sm text-gray-900">9 / 10</span>
        </div>

        {/* <!-- Modify Grade Manually --> */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Modify Grade Manually</span>
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-1 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Grade 9</option>
              <option>Grade 8</option>
              <option>Grade 7</option>
              <option>Grade 6</option>
              <option>Grade 5</option>
              <option>Grade 4</option>
              <option>Grade 3</option>
              <option>Grade 2</option>
              <option>Grade 1</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiGrading;
