// components/skeletons/DashboardSkeleton.tsx
import { cn } from "@/lib/utils";
import React from "react";

// components/skeletons/DashboardSkeleton.tsx

// ... existing code (keep any other skeleton components)

export const SkeletonCard = () => {
  return (
    <div className="bg-white w-full rounded-[1.25rem] p-7 py-9 shadow-sm animate-pulse">
      <div className="flex flex-col items-start gap-6 mb-4">
        <div className="">
          {/* Placeholder for the icon */}
          <div className="h-[55px] w-[55px] bg-gray-300 rounded-full"></div>
        </div>
        <div>
          <div className="flex items-end">
            {/* Placeholder for the large number */}
            <div className="h-10 bg-gray-300 rounded w-16"></div>
            {/* Placeholder for "Cards" text */}
            <div className="h-6 bg-gray-200 rounded w-20 px-2 mb-1 ml-2"></div>
          </div>
        </div>
      </div>
      {/* Placeholder for "Total Cards" heading */}
      <div className="h-6 bg-gray-200 rounded w-32"></div>
    </div>
  );
};

// components/skeletons/DashboardSkeleton.tsx

// ... existing code

export const SkeletonTracking = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm animate-pulse">
      <div className="flex items-center p-5 justify-between mb-4">
        <div className="flex flex-col gap-1">
          <div className="h-8 bg-gray-200 rounded w-48 mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-24"></div>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[600px] md:min-w-[800px] lg:min-w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 pl-4 lg:pl-16 pr-4 text-xs md:text-base">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </th>
              <th className="text-left py-3 pl-4 lg:pl-16 pr-4 text-xs md:text-base">
                <div className="h-4 bg-gray-200 rounded w-28"></div>
              </th>
              <th className="text-left py-3 px-4 text-xs md:text-base">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </th>
              <th className="text-left py-3 pl-4 pr-4 lg:pr-16 text-xs md:text-base">
                <div className="h-4 bg-gray-200 rounded w-28"></div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Array(2).fill(0).map((_, rowIndex) => ( // Repeat for 2 rows as in your example
              <tr key={rowIndex} className="border-b last:border-0">
                <td className="py-5 pl-4 lg:pl-16 pr-4 text-xs md:text-base">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </td>
                <td className="py-3 pl-4 lg:pl-16 pr-4 text-xs md:text-base">
                  <div className="flex gap-2 items-center">
                    <div className="h-4 w-4 bg-gray-200 rounded"></div> {/* Calendar icon placeholder */}
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                </td>
                <td className="py-3 px-4 text-xs md:text-base">
                  <div className="h-4 bg-gray-200 rounded w-10"></div>
                </td>
                <td className="py-3 px-4 text-xs lg:text-base">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </td>
                <td className="py-3 px-4">
                  <div className="h-6 w-6 bg-gray-200 rounded-full"></div> {/* Ellipsis icon placeholder */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const SkeletonSidebar = () => {
  return (
    <div className="hidden md:flex flex-col bg-white w-20 lg:w-72 h-screen fixed left-0 top-0 shadow-sm animate-pulse">
      <div className="p-4 flex justify-center lg:justify-start">
        <div className="h-8 bg-gray-200 rounded-full w-8 lg:w-32"></div>
      </div>
      <div className="p-4 space-y-6 mt-10">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="h-6 w-6 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-24 hidden lg:block"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// components/skeletons/DashboardSkeleton.tsx

// ... existing code (keep any other skeleton components)

export const SkeletonHeader = () => {
  return (
    <header className="bg-white ml-0 md:ml-20 lg:ml-72 animate-pulse">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search input placeholder */}
        <div className="invisible w-96">
          <div className="h-10 bg-gray-200 rounded-md w-full"></div>
        </div>

        <div className="flex items-center w-full lg:w-auto justify-end lg:justify-normal gap-4">
          {/* Notification button placeholder */}
          {/* <div className="relative">
            <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
            <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-gray-300"></div>
          </div> */}

          {/* Profile section placeholder */}
          <div className="flex items-center gap-3">
            {/* Avatar placeholder */}
            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>

            {/* User info placeholder - hidden on mobile */}
            <div className="items-center gap-3 hidden md:flex">
              <div>
                {/* Name placeholder */}
                <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                {/* Email placeholder */}
                <div className="h-3 bg-gray-200 rounded w-32"></div>
              </div>
              {/* Arrow down icon placeholder */}
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen flex">
      <SkeletonSidebar />
      <div className="flex flex-col w-full">
        <SkeletonHeader />
        <main className="p-5 bg-light-grey ml-0 md:ml-20 lg:ml-72">
          <div className="space-y-10">
            <SkeletonCard />
            <SkeletonTracking />
          </div>
        </main>
      </div>
    </div>
  );
};

interface SubscriptionBoxSkeletonProps {
  className?: string;
  isActive?: boolean; // Optional prop to show active or inactive state skeleton
}

export function SubscriptionBoxSkeleton({ className, isActive = true }: SubscriptionBoxSkeletonProps) {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className={cn("bg-gradient-to-r from-gray-300 to-gray-200 flex justify-between items-center p-6", className)}>
        <div className="h-8 bg-gray-400 rounded w-48"></div>
        <div className="rounded-3xl bg-gray-400 w-24 h-8"></div>
      </div>

      {/* Body */}
      {isActive ? (
        <div className="p-4 border border-gray-200">
          {/* Renewal date and button */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col">
              <div className="h-4 bg-gray-200 rounded w-40 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-32"></div>
            </div>
            <div>
              <div className="h-10 bg-gray-300 rounded-md w-40"></div>
            </div>
          </div>

          {/* Cards remaining */}
          <div className="flex justify-between mb-4">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-lg bg-gray-200">
            <div className="bg-gray-300 h-2 rounded-lg w-3/4"></div>
          </div>

          {/* Bottom text */}
          <div className="h-4 bg-gray-200 rounded w-full mt-4"></div>
        </div>
      ) : (
        <div className="p-7 border border-gray-200">
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-10 bg-gray-300 rounded-md w-48 mt-4"></div>
        </div>
      )}
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
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="h-5 w-40 bg-gray-200 rounded" />
              <div className="h-12 w-full bg-gray-200 rounded-md" />
            </div>
          ))}

          {/* Payment method select */}
          {/* <div className="col-span-full flex flex-col gap-2 mt-4">
            <div className="h-5 w-40 bg-gray-200 rounded" />
            <div className="h-12 w-full bg-gray-200 rounded-md" />
          </div> */}

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

// components/skeletons/OrderDetailsSkeleton.tsx
export function OrderDetailsSkeleton() {
  return (
    <div className="bg-white border-md px-4 py-4 rounded-md animate-pulse">
      {/* Header Section */}
      <div className="mb-2">
        <div className="h-7 bg-gray-200 rounded w-48 mb-1"></div>
        <div className="h-4 bg-gray-200 rounded w-64"></div>
      </div>

      {/* Card Images Section */}
      <div>
        <div className="h-7 bg-gray-200 rounded w-36 mb-2"></div>

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

      {/* Submission Summary Section */}
      <div className="w-full bg-light-grey rounded-md shadow-sm overflow-hidden mt-4">
        <div className="p-4">
          {/* Summary Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 bg-gray-200 rounded w-48"></div>
          </div>

          {/* Summary Fields */}
          <div className="space-y-4 px-4">
            {/* Generate multiple field rows */}
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
};

export function ProgressTrackerSkeleton() {
  return (
    <div className="p-4 sm:p-7 space-y-4 sm:space-y-6 bg-light-grey rounded-xl shadow-md animate-pulse">
      {/* Tracking Number Header */}
      <div className="flex items-start flex-col sm:flex-row">
        <div className="h-8 bg-gray-200 rounded w-48 mb-2 sm:mb-0"></div>
        <div className="h-8 bg-gray-200 rounded w-32 ml-0 sm:ml-auto"></div>
      </div>

      {/* Overall Progress text */}
      <div className="h-6 bg-gray-200 rounded w-36"></div>

      <div className="w-full">
        {/* Progress percentage row */}
        <div className="flex gap-2 sm:gap-4 w-full items-center">
          {/* Tick image placeholder */}
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gray-200"></div>
          <div className="w-full">
            <div className="flex gap-2 sm:gap-4 items-center mb-2">
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>
            {/* Progress bar placeholder */}
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-gray-300 rounded-full w-3/4"></div>
            </div>
          </div>
        </div>

        {/* Progress steps */}
        <div className="mt-4 sm:mt-8 pl-2 sm:pl-4 space-y-4 sm:space-y-6">
          {/* Step 1 */}
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="flex items-center justify-center rounded-full w-6 h-6 sm:w-8 sm:h-8 bg-gray-300">
              <span className="opacity-0">1</span>
            </div>
            <div>
              <div className="h-5 bg-gray-200 rounded w-40 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="flex items-center justify-center rounded-full w-6 h-6 sm:w-8 sm:h-8 bg-gray-300">
              <span className="opacity-0">2</span>
            </div>
            <div>
              <div className="h-5 bg-gray-200 rounded w-40 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="flex items-center justify-center rounded-full w-6 h-6 sm:w-8 sm:h-8 bg-gray-300">
              <span className="opacity-0">3</span>
            </div>
            <div>
              <div className="h-5 bg-gray-200 rounded w-40 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>
          </div>

          {/* Estimated completion box */}
          <div className="bg-gray-200 p-4 sm:p-8 flex items-center rounded-md">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <div className="h-6 bg-gray-300 rounded w-56 ml-2 sm:ml-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function OrderTrackingSkeleton() {
  return (
    <section className="p-7 bg-white animate-pulse">
      {/* Header */}
      <div className="h-8 bg-gray-200 rounded w-40 mb-4"></div>
      <div className="h-5 bg-gray-200 rounded w-72 mt-4 mb-10"></div>

      {/* Progress Tracker */}
      <ProgressTrackerSkeleton />

      {/* Buttons */}
      <div className="flex gap-6 mt-8">
        <div className="h-12 bg-gray-200 rounded-full w-32"></div>
        <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-32"></div>
      </div>
    </section>
  );
};

// components/skeletons/SubmissionCardsListSkeleton.tsx

export function SubmissionCardsListSkeleton() {
  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="bg-white p-7 mb-6 animate-pulse">
        {/* Submission ID Heading */}
        <div className="h-8 bg-gray-300 rounded w-80 mb-6"></div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="h-4 bg-gray-200 rounded w-28 mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-48"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-7 pb-7">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg p-6 mb-6 flex flex-col sm:flex-row gap-4 items-center animate-pulse">
          {/* Search Input Skeleton */}
          <div className="w-full sm:w-1/2">
            <div className="h-10 bg-gray-200 rounded-full w-full"></div>
          </div>
          {/* Filter Button Skeleton */}
          <div className="w-full sm:w-1/2">
            <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
          </div>
        </div>

        {/* Existing Cards Section */}
        <div className="bg-white rounded-lg p-6 mb-6 animate-pulse">
          {/* Heading for Existing Cards */}
          <div className="h-7 bg-gray-300 rounded w-48 mb-6"></div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(2)].map((_, i) => ( // Render 2 skeleton cards
              <div key={i} className="relative group">
                <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    {/* Card Name Skeleton */}
                    <div className="h-5 bg-gray-300 rounded w-32"></div>
                    {/* Status Tag Skeleton */}
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  </div>
                  <div className="space-y-3">
                    {/* Category, Year, Service Skeletons */}
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="flex justify-between">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                        <div className="h-4 bg-gray-300 rounded w-24"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* No buttons included as per request */}
      </div>
    </section>
  );
};

// Individual card skeleton component
export function SkeletonCardItem() {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      {/* Card Header */}
      <div className="flex justify-between items-start mb-4">
        {/* Card Name */}
        <div className="h-6 bg-gray-200 rounded w-40"></div>
        {/* Status Badge */}
        <div className="h-6 bg-gray-200 rounded-full w-24"></div>
      </div>

      {/* Card Details */}
      <div className="space-y-3">
        {/* Category Row */}
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>

        {/* Year Row */}
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-10"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>

        {/* Service Row */}
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-14"></div>
          <div className="h-4 bg-gray-200 rounded w-28"></div>
        </div>
      </div>
    </div>
  );
}

interface ProgressBarSkeletonProps {
  className?: string;
  // You can pass a `stepsCount` prop if you want to dynamically control
  // how many skeleton steps are rendered. Defaulting to 4 for example.
  stepsCount?: number;
}

export const ProgressBarSkeleton: React.FC<ProgressBarSkeletonProps> = ({ className, stepsCount = 4 }) => {
  // Create a dummy array to map over for the number of steps
  const skeletonSteps = Array.from({ length: stepsCount });

  // A fixed width for the "progress" part of the bar in the skeleton
  // This simulates some progress without dynamic calculation
  const skeletonProgressWidth = 'w-3/4'; // Example: 75% progress for the skeleton

  return (
    <div className={cn("relative h-2 rounded-2xl w-full", className)}>
      {/* Background track */}
      <div className="absolute h-2 top-0 w-full bg-gray-200 rounded-2xl"></div>

      {/* Pulsing progress bar */}
      <div
        className={cn(
          "absolute h-2 top-0 rounded-2xl bg-gray-300 animate-pulse",
          skeletonProgressWidth
        )}
      ></div>

      {/* Step indicators and labels */}
      <div className={`absolute -top-5 left-0 right-0 w-full flex justify-between`}>
        {skeletonSteps.map((_, i) => {
          // Determine alignment for first, middle, and last step labels
          const itemsAlignment =
            i === 0
              ? 'items-start'
              : i === skeletonSteps.length - 1
                ? 'items-end'
                : 'items-center';

          // Adjust margin for the first label to align with the circle
          const firstLabelMargin = i === 0 ? '-ml-[10px]' : '';

          // Calculate an appropriate width for the skeleton text label
          // Adjust 'w-16' (small) to 'w-24' (larger) or similar based on typical label length
          const labelWidth = 'w-16 sm:w-24'; // Example: 16 units on small, 24 on sm+

          return (
            <div
              key={i}
              className={`flex flex-col gap-1 justify-center ${itemsAlignment}`}
            >
              {/* Pulsing circle for step indicator */}
              <div
                className={`rounded-full bg-gray-200 h-12 w-12 flex justify-center items-center animate-pulse`}
              >
                {/* No content inside skeleton circle */}
              </div>
              {/* Pulsing rectangle for step label */}
              <span
                className={cn(
                  `h-4 bg-gray-200 rounded animate-pulse`,
                  labelWidth,
                  firstLabelMargin // Apply the specific margin only for the first label
                )}
              ></span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
