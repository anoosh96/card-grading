"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomCheckboxProps {
  className?: string;
  text?: string;
  size?: 'lg' | 'md' | 'sm';
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function CustomCheckbox({
  className,
  text = 'I agree to the Terms and Conditions.',
  size = 'sm',
  checked,
  onChange
}: CustomCheckboxProps) {
  const sizeMap = {
    'sm': { dimensions: 'h-4 w-4', text: 'heading-tertiary' },
    'md': { dimensions: 'h-6 w-6', text: 'text-lg' },
    'lg': { dimensions: 'h-8 w-8', text: 'text-xl' }
  };

  const handleClick = () => {
    onChange(!checked);
  };

  return (
    <div className={cn("flex items-center my-1 gap-2 bg-black text-pure-white", className)}>
      <button
        onClick={handleClick}
        className={`relative flex ${sizeMap[size]['dimensions']} items-center justify-center border border-secondary-grey bg-primary-grey`}
        aria-checked={checked}
        role="checkbox"
      >
        {checked && (
          <Check className="h-4 w-4 text-secondary-grey" strokeWidth={4} />
        )}
      </button>
      <label
        onClick={handleClick}
        className={`${sizeMap[size]['text']} font-medium cursor-pointer`}
      >
        {text}
      </label>
    </div>
  );
}
