"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeliveryOption {
  id: string;
  title: string;
  price: number;
  compensation: string;
  description: string;
}

interface CustomRadioButtonProps {
  className?: string;
  options: DeliveryOption[];
  selectedOption: string | null;
  onSelect: (optionId: string) => void;
}

export default function CustomRadioButton({
  className,
  options,
  selectedOption,
  onSelect
}: CustomRadioButtonProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {options.map((option) => (
        <div
          key={option.id}
          className={cn(
            "flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all",
            selectedOption === option.id
              ? "border-amber-500 bg-amber-50"
              : "border-gray-200 hover:border-gray-300"
          )}
          onClick={() => onSelect(option.id)}
        >
          <div className="flex-shrink-0 mt-1">
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                selectedOption === option.id
                  ? "border-amber-500 bg-amber-500"
                  : "border-gray-300 bg-white"
              )}
            >
              {selectedOption === option.id && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{option.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-gray-900">£{option.price.toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-1">{option.compensation}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
