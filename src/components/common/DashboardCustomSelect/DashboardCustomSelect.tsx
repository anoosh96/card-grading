"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DashboardCustomSelectProps,
  SelectTheme,
} from "./DashboardCustomSelect.type";

const defaultTheme: SelectTheme = {
  trigger: {
    bg: "bg-white",
    text: "text-pure-white",
    border: "border-[#fff]",
    hover: "hover:bg-dark-grey",
    focus: "!focus:none",
  },
  content: {
    bg: "bg-dark-grey",
    border: "border-gray-700",
    // For Moving on Top
    className: "z-[1000]",
  },
  item: {
    hover: "hover:bg-black",
    focus: "focus:bg-gray-700/50",
    text: "text-stroke-grey focus:text-pure-white",
  },
  addButton: {
    bg: "bg-transparent",
    text: "text-white text-xs",
    border: "border-stroke-grey",
    hover: "",
  },
  dropDownIcon: {
    color: "pure-white",
  },
};

const DashboardCustomSelect: React.FC<DashboardCustomSelectProps> = ({
  options,
  placeholder = "Select an option",
  value,
  onChange,
  className,
  theme = defaultTheme,
}) => {
  // Merge default theme with custom theme
  const mergedTheme: SelectTheme = { ...defaultTheme, ...theme };

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          `flex items-center justify-between w-full px-4 py-5 rounded-full text-sm sm:text-base transition-colors`,
          mergedTheme?.trigger?.bg,
          mergedTheme?.trigger?.text,
          mergedTheme?.trigger?.border,
          mergedTheme?.trigger?.hover,
          mergedTheme?.trigger?.focus,
          className
        )}
      >
        <SelectValue
          className="data-[state=checked]:font-semibold"
          placeholder={placeholder}
        />
      </SelectTrigger>
      <SelectContent
        position="popper"
        style={{ maxHeight: "var(--radix-select-content-available-height)" }}
        className={cn(
          "rounded-lg overflow-y-auto",
          mergedTheme?.content?.bg,
          mergedTheme?.content?.border,
          mergedTheme?.content?.className,
          `data-[state=open]:text-${mergedTheme?.dropDownIcon?.color}`
        )}
      >
        <SelectGroup>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className={cn(
                "cursor-pointer",
                mergedTheme?.item?.hover,
                mergedTheme?.item?.focus,
                mergedTheme?.item?.text,
                "hover:fill-black"
              )}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DashboardCustomSelect;
