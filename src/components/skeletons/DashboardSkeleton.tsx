// components/skeletons/DashboardSkeleton.tsx
import { cn } from "@/lib/utils";
import React from "react";

// components/skeletons/DashboardSkeleton.tsx

// ... existing code (keep any other skeleton components)

export const SkeletonCard = () => {
  return (
    <div className="w-full">
      {/* Total Submissions Card */}
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

        {/* "Total Submissions" text placeholder */}
        <div className="h-6 bg-gray-200 rounded w-40 mt-2"></div>
      </div>

      {/* Submission Sources Card */}
      {/*
  <div className="bg-white w-full rounded-[1.25rem] p-6 shadow-sm">
    <!-- Container with white background, rounded corners, padding, and shadow -->

    <!-- Header -->
    <div className="flex flex-col items-start justify-between mb-3">
      <!-- Title placeholder -->
      <div className="h-6 bg-gray-200 rounded w-48 mb-3"></div>

      <!-- Separator -->
      <div className="w-full h-[1px] bg-gray-200 mt-3"></div>
    </div>

    <!-- Filter badge placeholder -->
    <div className="bg-gray-200 w-48 h-10 rounded-2xl"></div>

    <div className="w-full flex flex-col gap-5 lg:flex-row">
      <!-- Main content row -->

      <!-- Left side - list of data rows -->
      <div className="flex justify-between items-center gap-6 mt-7 xl:mt-4 w-11/12">
        <div className="space-y-8 w-full md:w-1/2 xl:w-1/3">
          <!-- By Post row -->
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-4 w-8 rounded-sm bg-gray-200"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-14"></div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </div>

          <!-- By Form row -->
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-4 w-8 rounded-sm bg-gray-200"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-14"></div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </div>
        </div>
      </div>

      <!-- Right side - pie chart placeholder -->
      <div className="flex items-center justify-center w-36 h-32">
        <div className="w-[120px] h-[120px] rounded-full border-8 border-gray-200 flex items-center justify-center">
          <div className="w-[80px] h-[80px] rounded-full bg-white"></div>
        </div>
      </div>
    </div>
  </div>
*/}
    </div>
  );
};

// components/skeletons/DashboardSkeleton.tsx

// ... existing code

export const SkeletonTracking = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm animate-pulse">
      {/* Header */}
      <div className="flex items-center p-5 justify-between mb-8">
        <div className="flex flex-col gap-1">
          <div className="h-8 bg-gray-200 rounded w-40"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mt-1"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto md:max-w-full">
        <table className="w-full min-w-[600px] md:min-w-[800px] lg:min-w-full">
          <thead>
            <tr className="border-b px-16">
              <th className="text-left py-3 pl-4 lg:pl-16 pr-4">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </th>
              <th className="text-left py-3 pl-4 lg:pl-16 pr-4">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </th>
              <th className="text-left py-3 lg:pl-16  px-4">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </th>
              {/* <th className="text-left py-3 px-4 invisible">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </th> */}
              <th className="text-left py-3 pl-4 pr-4 lg:pr-16">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="border-b last:border-0">
                <td className="py-5 pl-4 lg:pl-16 pr-4">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </td>
                <td className="py-4 pl-4 lg:pl-16 pr-4">
                  <div className="flex gap-2 items-center">
                    <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded  w-32"></div>
                  </div>
                </td>
                <td className="py-4 pl-4 lg:pl-16 pr-4">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </td>
                {/* <td className="py-3 px-4 invisible">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </td> */}
                 <td className="py-4 pl-4 pr-4">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </td>
                <td className="py-4 px-4">
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination skeleton */}
        <div className="flex justify-center items-center gap-4 mt-6 mb-8">
          <div className="w-20 h-8 bg-gray-200 rounded"></div>
          <div className="w-24 h-6 bg-gray-200 rounded"></div>
          <div className="w-20 h-8 bg-gray-200 rounded"></div>
        </div>
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
        <div className="hidden md:block w-96">
          <div className="h-10 bg-gray-200 rounded-md w-full"></div>
        </div>

        <div className="flex items-center w-full lg:w-auto justify-end lg:justify-normal gap-4">
          {/* Notification button placeholder */}
          <div className="relative">
            <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
            <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-gray-300"></div>
          </div>

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
          <div className="col-span-full flex flex-col gap-2 mt-4">
            <div className="h-5 w-40 bg-gray-200 rounded" />
            <div className="h-12 w-full bg-gray-200 rounded-md" />
          </div>

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
    <section className="bg-gray-50 min-h-screen animate-pulse">
      {/* Header Section */}
      <div className="bg-white p-7 mb-6">
        {/* Title */}
        <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>

        {/* Submission Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Name */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-2/3"></div>
          </div>

          {/* Email */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          </div>

          {/* Submission Type */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-2/3"></div>
          </div>

          {/* Turnaround Time */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-2/5 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      {/* Cards Content */}
      <div className="px-7 pb-7">
        {/* Search and Filter Bar Skeleton */}
        <div className="bg-white rounded-lg p-6 mb-6 flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-grow w-full">
            <div className="h-12 bg-gray-200 rounded-md w-full"></div> {/* Search Input */}
          </div>
          <div className="w-full sm:w-auto">
            <div className="h-12 bg-gray-200 rounded-md w-40"></div> {/* Status Select */}
          </div>
          <div className="w-full sm:w-auto">
            <div className="h-10 bg-gray-200 rounded-md w-24"></div> {/* Clear Filters Button */}
          </div>
        </div>

        {/* Existing Cards Section Skeleton */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="h-6 bg-gray-200 rounded w-64 mb-6"></div> {/* "Existing Cards" title */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Generate 6 skeleton cards */}
            {[...Array(6)].map((_, index) => (
              <SkeletonCardItem key={index} />
            ))}
          </div>
          {/* Pagination Controls Skeleton */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <div className="h-10 bg-gray-200 rounded-md w-24"></div> {/* Previous Button */}
            <div className="h-10 bg-gray-200 rounded-md w-10"></div> {/* Page 1 Button */}
            <div className="h-10 bg-gray-200 rounded-md w-10"></div> {/* Page 2 Button */}
            <div className="h-10 bg-gray-200 rounded-md w-10"></div> {/* Page 3 Button */}
            <div className="h-10 bg-gray-200 rounded-md w-24"></div> {/* Next Button */}
          </div>
        </div>

        {/* New Bulk Card Input Form Section Skeleton (if applicable, assuming it's usually shown) */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="h-6 bg-gray-200 rounded w-48"></div> {/* "Add New Cards" title */}
            <div className="flex items-center gap-4">
              <div className="h-5 bg-gray-200 rounded w-40"></div> {/* Card count text */}
              <div className="h-10 bg-gray-200 rounded-md w-32"></div> {/* Add New Card Slot Button */}
            </div>
          </div>

          {/* Skeleton for New Card input fields (one row) */}
          <div className="hidden lg:block bg-light-grey rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <div className="grid grid-cols-[2fr_1.5fr_1fr_0.5fr] gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <div className="h-6 bg-gray-200 rounded w-2/3"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mx-auto"></div>
            </div>
            <div className="grid grid-cols-[2fr_1.5fr_1fr_0.5fr] items-start gap-4 p-4 border-b border-gray-100 bg-white">
              <div className="h-14 bg-gray-100 rounded-md w-full"></div>
              <div className="h-14 bg-gray-100 rounded-md w-full"></div>
              <div className="h-14 bg-gray-100 rounded-md w-full"></div>
              <div className="h-8 bg-gray-100 rounded-full w-8 mx-auto"></div>
            </div>
          </div>
          {/* Mobile version of new card skeleton (one card) */}
          <div className="lg:hidden space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                <div className="h-6 bg-gray-200 rounded w-24"></div>
                <div className="h-8 bg-gray-200 rounded-full w-8"></div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-1"></div>
                  <div className="h-10 bg-gray-100 rounded-md w-full"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
                    <div className="h-10 bg-gray-100 rounded-md w-full"></div>
                  </div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
                    <div className="h-10 bg-gray-100 rounded-md w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-6">
          <div className="h-12 bg-gray-200 rounded-full w-32"></div> {/* Back button */}
          <div className="h-12 bg-gray-200 rounded-full w-48"></div> {/* Save New Cards button */}
        </div>
      </div>
    </section>
  );
}

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
