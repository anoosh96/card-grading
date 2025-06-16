export function DashboardSubmissionCardSkeleton() {
  return (
    <div className="flex items-stretch flex-col lg:flex-row gap-5 animate-pulse">
      {/* Total Cards Skeleton */}
      <div className="bg-white w-full lg:w-2/5 rounded-[1.25rem] p-7 shadow-sm">
        <div className="flex flex-col items-start gap-6 mb-4">
          {/* Icon placeholder */}
          <div className="bg-gray-200 p-3 rounded-lg w-12 h-12"></div>

          <div>
            <div className="flex items-end">
              {/* Number placeholder */}
              <div className="h-10 bg-gray-200 rounded w-20"></div>
              {/* "Cards" text placeholder */}
              <div className="h-6 bg-gray-200 rounded w-16 ml-2 mb-1"></div>
            </div>
          </div>
        </div>
        {/* "Total Cards" text placeholder */}
        <div className="h-6 bg-gray-200 rounded w-32"></div>
      </div>

      {/* Cards in Process Skeleton */}
      <div className="bg-white w-full rounded-[1.25rem] p-7 shadow-sm">
        <div className="flex flex-col items-start gap-6 mb-4">
          {/* Icon placeholder */}
          <div className="bg-gray-200 p-3 rounded-lg w-12 h-12"></div>

          <div>
            <div className="flex items-end">
              {/* Number placeholder */}
              <div className="h-10 bg-gray-200 rounded w-20"></div>
              {/* "Cards" text placeholder */}
              <div className="h-6 bg-gray-200 rounded w-16 ml-2 mb-1"></div>
            </div>
          </div>
        </div>
        {/* "Cards in Process" text placeholder */}
        <div className="h-6 bg-gray-200 rounded w-40"></div>
      </div>
    </div>
  );
}

export const SkeletonTracking = () => {
  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-sm border animate-pulse">
      {/* Header */}
      <div className="p-6 flex justify-between items-center border-b">
        <div>
          <div className="h-7 bg-gray-200 rounded w-48 mb-2"></div> {/* heading-primary */}
          <div className="h-4 bg-gray-200 rounded w-64"></div> {/* heading-tertiary */}
        </div>
        {/* Only show 'View all' skeleton if it might be rendered */}
        {/* Assuming isMoreItem is true to render this part of skeleton */}
        <div className="h-4 bg-gray-200 rounded w-24"></div> {/* View all link */}
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto p-4">
        <table className="w-full min-w-[600px] md:min-w-[800px] lg:min-w-full table-auto">
          <thead className="text-sm font-medium text-left">
            <tr>
              <th className="w-10 p-3">
                <div className="h-4 bg-gray-200 rounded w-4"></div> {/* CustomCheckbox */}
              </th>
              <th className="p-3">
                <div className="h-4 bg-gray-200 rounded w-20"></div> {/* Order No */}
              </th>
              <th className="p-3">
                <div className="h-4 bg-gray-200 rounded w-28"></div> {/* Date & Time */}
              </th>
              <th className="p-3">
                <div className="h-4 bg-gray-200 rounded w-24"></div> {/* Total Cards */}
              </th>
              <th className="p-3">
                <div className="h-4 bg-gray-200 rounded w-36"></div> {/* Cards Summary */}
              </th>
              <th className="w-10 p-3"></th> {/* For the MoreHorizontal icon */}
            </tr>
          </thead>
          <tbody className="divide-y">
            {[...Array(5)].map((_, index) => ( // Render 5 rows for example
              <tr key={index} className="hover:bg-light-grey-50">
                <td className="p-3">
                  <div className="h-4 bg-gray-200 rounded w-4"></div> {/* CustomCheckbox */}
                </td>
                <td className="p-3 font-medium">
                  <div className="h-4 bg-gray-200 rounded w-20"></div> {/* Order No value */}
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 bg-gray-200 rounded-full"></div> {/* CalendarIcon */}
                    <div className="h-4 bg-gray-200 rounded w-32"></div> {/* Date & Time value */}
                  </div>
                </td>
                <td className="p-3">
                  <div className="h-4 bg-gray-200 rounded w-16"></div> {/* Total Cards value */}
                </td>
                <td className="p-3">
                  <div className="h-4 bg-gray-200 rounded w-48"></div> {/* Cards Summary value */}
                </td>
                <td className="p-4">
                  <div className="h-6 w-6 bg-gray-200 rounded-full"></div> {/* MoreHorizontal icon */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination skeleton */}
      {/* Assuming totalPages > 1 and !isMoreItem is true to render this part of skeleton */}
      <div className="flex justify-center items-center gap-4 mt-6 mb-8">
        <div className="h-10 w-24 bg-gray-200 rounded"></div> {/* Previous button */}
        <div className="h-6 w-32 bg-gray-200 rounded"></div> {/* Page X of Y text */}
        <div className="h-10 w-24 bg-gray-200 rounded"></div> {/* Next button */}
      </div>
    </div>
  );
};

export default function CardImagesSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-36 mb-2"></div>

      <div className="relative flex justify-around mt-2 pb-8 border border-gray-200">
        {/* Front Side */}
        <div className="flex flex-col gap-4 items-center justify-center z-10">
          <div className="h-10 bg-transparent w-24"></div>
          <div className="w-[300px] h-[341px] bg-gray-200 rounded-md"></div>
        </div>

        {/* Back Side */}
        <div className="flex flex-col gap-4 items-center justify-center z-10">
          <div className="h-10 bg-transparent w-24"></div>
          <div className="w-[300px] h-[341px] bg-gray-200 rounded-md"></div>
        </div>

        {/* Gradient header placeholder */}
        <div className="bg-gray-300 w-full h-[60px] absolute top-0 z-0"></div>
      </div>
    </div>
  );
}

export function OrderDetailsSkeleton() {
  return (
    <div className="bg-white border-md px-4 py-4 rounded-md animate-pulse">
      {/* Header Section */}
      <div className="mb-2">
        <div className="h-7 bg-gray-200 rounded w-48 mb-1"></div>
        <div className="h-4 bg-gray-200 rounded w-64"></div>
      </div>

      {/* Card Images Section */}
      <CardImagesSkeleton />

      {/* Submission Summary Section */}
      <div className="w-full bg-light-grey rounded-md shadow-sm overflow-hidden mt-4">
        <div className="p-4">
          {/* Summary Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 bg-gray-200 rounded w-48"></div>
          </div>

          {/* Summary Fields */}
          <div className="space-y-4 px-4">
            {/* Generate placeholders for fields */}
            {[...Array(9)].map((_, index) => (
              <div key={index}>
                {/* Insert Divider Before Last Two Items */}
                {index === 7 && <div className="border-t border-gray-200 my-2"></div>}

                <div className={`grid grid-cols-2 py-1 ${index >= 7 ? "text-[18px] font-medium" : ""
                  }`}>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className={`h-4 ${index === 8 ? "bg-gray-300" : "bg-gray-200"} rounded w-40`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-6 ml-2 sm:ml-6 mt-4">
        <div className="h-10 bg-gray-300 rounded-full w-36"></div>
        <div className="h-10 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full w-32"></div>
      </div>
    </div>
  );
}


export function SkeletonProfilePage() {
  return (
    <section className="p-10 animate-pulse">
      {/* Profile picture and basic info */}
      <div className="flex flex-col items-start justify-center w-44 gap-2">
        <div className="relative w-32 h-32">
          <div className="w-32 h-32 rounded-full bg-gray-200" />
          <div className="absolute bottom-2 right-1 w-9 h-9 rounded-full bg-gray-300" />
        </div>

        <div className="h-5 w-32 mt-4 bg-gray-200 rounded" />
        <div className="flex gap-2 text-sm items-center mt-2">
          <div className="w-4 h-4 bg-gray-200 rounded-full" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Form inputs */}
      <div className="mt-10 w-full">
        <div className="grid grid-cols-2 gap-8 mt-8 p-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="h-5 w-40 bg-gray-200 rounded" />
              <div className="h-12 w-full bg-gray-200 rounded-md" />
            </div>
          ))}

          {/* Buttons */}
          <div className="flex gap-6 mt-8 col-span-full">
            <div className="h-12 w-40 bg-gray-300 rounded-full" />
            <div className="h-12 w-40 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}



import React from 'react';

// Skeleton Components
const SkeletonBox = ({ className = "" }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`}></div>
);

const SkeletonText = ({ className = "" }) => (
  <div className={`bg-gray-200 animate-pulse rounded h-4 ${className}`}></div>
);

const SkeletonButton = ({ className = "" }) => (
  <div className={`bg-gray-200 animate-pulse rounded-full h-12 ${className}`}></div>
);

// Grading Report Skeleton
const GradingReportSkeleton = () => (
  <div className="w-full bg-gray-50 rounded-md shadow-sm overflow-hidden">
    {/* AI Card Grading Report Section */}
    <div className="px-4 py-6 sm:px-6 md:px-10 border-b border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <SkeletonBox className="w-6 h-6 mr-4" />
          <SkeletonText className="w-48 h-6" />
        </div>
        <SkeletonBox className="w-6 h-6" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="grid sm:grid-cols-2 grid-cols-1 py-1 gap-2">
            <SkeletonText className="w-24 h-5" />
            <SkeletonText className="w-40 h-5" />
          </div>
        ))}
      </div>
    </div>

    {/* Final Grade Section */}
    <div className="px-4 py-6 sm:px-6 md:px-10 border-b border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <SkeletonBox className="w-6 h-6 mr-4" />
          <SkeletonText className="w-32 h-6" />
        </div>
        <SkeletonBox className="w-6 h-6" />
      </div>
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 grid-cols-1 py-1 gap-2">
          <SkeletonText className="w-16 h-5" />
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <SkeletonBox key={star} className="w-6 h-6 rounded-full" />
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 py-1 gap-2">
          <SkeletonText className="w-20 h-5" />
          <SkeletonText className="w-12 h-5" />
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 py-1 gap-2">
          <SkeletonText className="w-28 h-5" />
          <SkeletonText className="w-60 h-5" />
        </div>
      </div>
    </div>

    {/* AI Grading Summary Section */}
    <div className="px-4 py-6 sm:px-6 md:px-10 border-b border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <SkeletonBox className="w-6 h-6 mr-4" />
          <SkeletonText className="w-44 h-6" />
        </div>
        <SkeletonBox className="w-6 h-6" />
      </div>
      <div className="space-y-2">
        <SkeletonText className="w-full h-4" />
        <SkeletonText className="w-4/5 h-4" />
        <SkeletonText className="w-3/4 h-4" />
      </div>
    </div>

    {/* Detailed Condition Breakdown Section */}
    <div className="px-4 py-6 sm:px-6 md:px-10 border-b border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <SkeletonBox className="w-6 h-6 mr-4" />
          <SkeletonText className="w-56 h-6" />
        </div>
        <SkeletonBox className="w-6 h-6" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-2 sm:px-4">
                <SkeletonText className="w-16 h-4" />
              </th>
              <th className="py-2 px-2 sm:px-4">
                <SkeletonText className="w-32 h-4" />
              </th>
              <th className="py-2 px-2 sm:px-4">
                <SkeletonText className="w-20 h-4" />
              </th>
            </tr>
          </thead>
          <tbody>
            {['Corners', 'Edges', 'Surface', 'Centering'].map((category, index) => (
              <tr key={index} className="border-b border-gray-200 last:border-b-0">
                <td className="py-2 px-2 sm:px-4">
                  <SkeletonText className="w-16 h-4" />
                </td>
                <td className="py-2 px-2 sm:px-4">
                  <SkeletonText className="w-8 h-4" />
                </td>
                <td className="py-2 px-2 sm:px-4">
                  <div className="space-y-1">
                    <SkeletonText className="w-full h-4" />
                    <SkeletonText className="w-3/4 h-4" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Final Grade Justification Section */}
    <div className="px-4 py-6 sm:px-6 md:px-10">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <SkeletonBox className="w-6 h-6 mr-4" />
          <SkeletonText className="w-48 h-6" />
        </div>
        <SkeletonBox className="w-6 h-6" />
      </div>
      <div className="space-y-2">
        <SkeletonText className="w-full h-4" />
        <SkeletonText className="w-5/6 h-4" />
        <SkeletonText className="w-4/5 h-4" />
        <SkeletonText className="w-2/3 h-4" />
      </div>
    </div>
  </div>
);


// Main Page Skeleton
export const ReportSkeleton = () => (
  <div className="bg-white border-md px-4 py-4 rounded-md">
    <div className="mb-4">
      <SkeletonText className="w-80 h-8 mb-2" />
    </div>

    <GradingReportSkeleton />
    <CardImagesSkeleton />

    <div className="flex items-center gap-6 mt-4 ml-2 md:ml-4">
      <SkeletonButton className="w-36" />
      <SkeletonButton className="w-44" />
    </div>
  </div>
);
