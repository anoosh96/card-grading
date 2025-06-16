'use client'

import React, { useState, useEffect } from "react";
import { SkeletonCard } from "@/components/skeletons/DashboardSkeleton"; // Assuming this handles a single card skeleton
import { useSubmissionAnalysis } from "@/hooks/useSubmissionAnalysis"; // Your hook
import Image from "next/image";

// Generic Counting Card Component
interface CountingCardProps {
  icon: React.ReactNode; // Component for the icon
  value: number | string | undefined | null; // The target value
  unit: string; // e.g., "Cards", "Days"
  label: string; // e.g., "Graded This Month", "In Progress"
  suffix?: string; // Optional suffix for the number, e.g., "Days"
  decimalPlaces?: number; // Number of decimal places for the animation
}

export const CountingCard: React.FC<CountingCardProps> = ({
  icon: Icon,
  value,
  unit,
  label,
  suffix = '',
  decimalPlaces = 0,
}) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (typeof value === 'number' && value >= 0) {
      const start = 0;
      const end = value;
      const duration = 1000; // milliseconds
      let startTime: number | null = null;

      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;

        if (progress < 1) {
          let animatedValue = start + progress * (end - start);
          setCurrentValue(parseFloat(animatedValue.toFixed(decimalPlaces)));
          requestAnimationFrame(animateCount);
        } else {
          setCurrentValue(end);
        }
      };

      requestAnimationFrame(animateCount);
    } else if (typeof value === 'string') {
      setCurrentValue(parseFloat(value)); // For string numbers, handle as float
    } else {
      setCurrentValue(0); // Default for undefined/null/error
    }
  }, [value, decimalPlaces]);

  // Handle case where value is explicitly 'Error' or undefined/null
  const displayValue = typeof value === 'string' && isNaN(parseFloat(value))
    ? 'Error'
    : value === undefined || value === null
      ? '...'
      : currentValue.toFixed(decimalPlaces);


  return (
    <div className="bg-white w-full rounded-[1.25rem] p-7 shadow-sm">
      <div className="flex flex-col items-start gap-6 mb-4">
        <div className={``}>
          {Icon}
        </div>

        <div>
          <div className="flex items-end">
            <h2 className="text-[2rem] text-charcol font-bold">
              {displayValue}
            </h2>
            <p className="text-base text-charcol px-2 mb-1">{unit}</p>
          </div>
        </div>
      </div>

      <h3 className="font-semibold text-xl text-charcol">{label}</h3>
    </div>
  );
};

function DashboardSubmissionCard() {
  const { data, isLoading, isError } = useSubmissionAnalysis();

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
          label="Graded This Month"
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
        value={data?.totalCardsGradedThisMonth ?? 0} // Assuming your API returns this field
        unit="Cards"
        label="Graded This Month"
      />

      {/* In Progress Card */}
      <CountingCard
        icon={<Image src={'/icons/in-progress.svg'} width={55} height={55} alt="icon" />}
        value={data?.cardsInProgress ?? 0} // Assuming your API returns this field
        unit="Cards"
        label="In Progress"
      />

      {/* Avg. Turnaround Time Card */}
      <CountingCard
        icon={<Image src={'/icons/turnaround-time.svg'} width={55} height={55} alt="icon" />}
        value={data?.avgTurnaroundTime ?? 0} // Assuming your API returns this field (e.g., in days)
        unit="Days"
        label="Avg. Turnaround Time"
        decimalPlaces={1} // Assuming average time might have decimals
      />
    </div>
  );
}

export default DashboardSubmissionCard;