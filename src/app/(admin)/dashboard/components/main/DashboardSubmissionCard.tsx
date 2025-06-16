'use client'

import React, { useState, useEffect } from "react";
import { SkeletonCard } from "@/components/skeletons/DashboardSkeleton"; // Assuming this handles a single card skeleton
import Image from "next/image";
import { useAdminSubmissionAnalysis } from "@/hooks/useAdminSubmissionAnalysis";
import { CountingCard } from "@/app/(user)/components/main/DashboardSubmissionCard";

// Generic Counting Card Component

function DashboardSubmissionCard() {
  const { data, isLoading, isError } = useAdminSubmissionAnalysis();

  if (isLoading) {
    // Render 3 skeleton cards if still loading
    return (
      <div className="flex items-stretch flex-col lg:flex-row gap-5">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  // Handle error state for all cards
  if (isError) {
    return (
      <div className="flex items-stretch flex-col lg:flex-row gap-5">
        <CountingCard
          icon={<Image src={'/icons/cards-graded.svg'} width={55} height={55} alt="icon" />}
          value="Error"
          unit="Cards"
          label="Total"
        />
        <CountingCard
          icon={<Image src={'/icons/in-progress.svg'} width={55} height={55} alt="icon" />}
          value="Error"
          unit="Cards"
          label="In Progress"
        />
        <CountingCard
          icon={<Image src={'/icons/turnaround-time.svg'} width={55} height={55} alt="icon" />}
          value="Error"
          unit="Days"
          label="Avg. Turnaround Time"
          decimalPlaces={1} // Example for decimal places
        />
      </div>
    );
  }

  return (
    <div className="flex items-stretch flex-col lg:flex-row gap-5">
      {/* Graded This Month Card */}
      <CountingCard
        icon={<Image src={'/icons/cards-graded.svg'} width={55} height={55} alt="icon" />}
        value={data?.totalCards ?? 0} // Assuming your API returns this field
        unit="Cards"
        label="Total Cards"
      />

      {/* In Progress Card */}
      <CountingCard
        icon={<Image src={'/icons/turnaround-time.svg'} width={55} height={55} alt="icon" />}
        value={data?.inProcessingCount ?? 0} // Assuming your API returns this field
        unit="Cards"
        label="Cards in Process"
      />

      {/* Avg. Turnaround Time Card */}
      <CountingCard
        icon={<Image src={'/icons/shipments.svg'} width={55} height={55} alt="icon" />}
        value={data?.totalPendingCards ?? 0} // Assuming your API returns this field (e.g., in days)
        unit="Shipments"
        label="Pending Shipments"
      />
    </div>
  );
}

export default DashboardSubmissionCard;