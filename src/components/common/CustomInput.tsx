'use client'

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface CustomInputProps extends React.ComponentProps<"input"> {
  isShowSearchIcon?: boolean;
}
const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(({ className, isShowSearchIcon = false, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="group relative w-full">
      {isShowSearchIcon ? (
        <Image
          width={20}
          height={20}
          alt="Placeholder Search Icon"
          src={"/icons/search-icon.svg"}
          className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 z-20"
        />
      ) : null}

      {props.type == 'password' ? (
        <Image
          width={20}
          height={20}
          alt="Placeholder Search Icon"
          src={`/icons/${ !showPassword ? 'hide-password' : 'password'}.svg`}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 z-20 cursor-pointer"
        />
      ) : null}

      {/* Gradient border - visible on group focus-within */}
      <div
        className={cn(
          "absolute inset-0 rounded-full transition-all duration-200",
          "group-focus-within:bg-gradient-to-r group-focus-within:from-secondary group-focus-within:via-[hsl(31,95%,49%)] group-focus-within:to-primary",
          "group-focus-within:p-[1px]"
        )}
      >
        {/* Background - changes from light grey to white */}
        <div className="h-full w-full rounded-full bg-light-grey group-focus-within:bg-white transition-colors duration-200" />
      </div>

      <Input
        ref={ref}
        className={cn(
          `relative w-full ${isShowSearchIcon ? "pl-10 pr-4" : "py-[0.625rem]"}`,
          "text-sm font-medium bg-transparent",
          "focus-visible:outline-none rounded-full",
          "placeholder:text-neutral-grey",
          "border-none ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0",
          className
        )}
        {...props}
        type={props.type == 'password' ? showPassword ? 'text' : 'password' : props.type }
      />
    </div>
  );
});

CustomInput.displayName = "CustomInput";

export default CustomInput;
