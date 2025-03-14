"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomCheckboxProps {
  className?: string
}

export default function CustomCheckbox({ className }: CustomCheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={cn("flex items-center my-1 gap-2 bg-black text-pure-white", className)}>
      <button
        onClick={handleClick}
        className="relative flex h-4 w-4 items-center justify-center border border-secondary-grey bg-primary-grey"
        aria-checked={isChecked}
        role="checkbox"
      >
        {isChecked && (
          <Check className="h-4 w-4 text-secondary-grey" strokeWidth={4} />
        )}
      </button>
      <label
        onClick={handleClick}
        className="heading-tertiary font-medium cursor-pointer"
      >
        I agree to the Terms and Conditions.
      </label>
    </div>
  );
}
