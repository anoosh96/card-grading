// components/skeletons/DashboardSkeleton.tsx
import { cn } from "@/lib/utils";
import React from "react";

// components/skeletons/DashboardSkeleton.tsx

// ... existing code (keep any other skeleton components)

export const SkeletonCard = () => {
  return (
    <div className="flex items-stretch flex-col lg:flex-row gap-5 animate-pulse">
      {/* Total Submissions Card */}
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

        {/* "Total Submissions" text placeholder */}
        <div className="h-6 bg-gray-200 rounded w-40 mt-2"></div>
      </div>

      {/* Submission Sources Card */}
      <div className="bg-white w-full rounded-[1.25rem] p-6 shadow-sm">
        {/* Header */}
        <div className="flex flex-col items-start justify-between mb-3">
          {/* Title placeholder */}
          <div className="h-6 bg-gray-200 rounded w-48 mb-3"></div>
          {/* Separator */}
          <div className="w-full h-[1px] bg-gray-200 mt-3"></div>
        </div>

        {/* Filter badge */}
        <div className="bg-gray-200 w-48 h-10 rounded-2xl"></div>

        <div className="w-full flex flex-col gap-5 lg:flex-row">
          {/* Left side - percentages */}
          <div className="flex justify-between items-center gap-6 mt-7 xl:mt-4 w-11/12">
            <div className="space-y-8 w-full md:w-1/2 xl:w-1/3">
              {/* By Post row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Color indicator */}
                  <div className="h-4 w-8 rounded-sm bg-gray-200"></div>
                </div>
                {/* Text placeholders */}
                <div className="h-4 bg-gray-200 rounded w-14"></div>
                <div className="h-4 bg-gray-200 rounded w-8"></div>
              </div>

              {/* By Form row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Color indicator */}
                  <div className="h-4 w-8 rounded-sm bg-gray-200"></div>
                </div>
                {/* Text placeholders */}
                <div className="h-4 bg-gray-200 rounded w-14"></div>
                <div className="h-4 bg-gray-200 rounded w-8"></div>
              </div>
            </div>
          </div>

          {/* Right side - pie chart */}
          <div className="flex items-center justify-center w-36 h-32">
            {/* Pie chart placeholder */}
            <div className="w-[120px] h-[120px] rounded-full border-8 border-gray-200 flex items-center justify-center">
              <div className="w-[80px] h-[80px] rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// components/skeletons/DashboardSkeleton.tsx

// ... existing code

export const SkeletonTracking = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm animate-pulse">
      {/* Header */}
      <div className="flex items-center p-5 justify-between mb-4">
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
              <th className="text-left py-3 px-4">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </th>
              <th className="text-left py-3 px-4">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </th>
              <th className="text-left py-3 pl-4 pr-4 lg:pr-16">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="border-b last:border-0">
                <td className="py-3 pl-4 lg:pl-16 pr-4">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </td>
                <td className="py-3 pl-4 lg:pl-16 pr-4">
                  <div className="flex gap-2 items-center">
                    <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-[35px] h-[40px] bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </td>
                <td className="py-3 px-4">
                  <div className="h-8 bg-gray-200 rounded-full w-24"></div>
                </td>
                <td className="py-3 px-4">
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