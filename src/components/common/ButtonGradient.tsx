// components/ui/custom-button.tsx
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ButtonGradientProps extends ButtonProps {
  gradient?: boolean;
}

const ButtonGradient = React.forwardRef<HTMLButtonElement, ButtonGradientProps>(({ className, gradient = true, children, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      className={cn(
        // Add your default classes here
        "rounded-full font-medium bg-custom-gradient py-3 px-5 text-base",
        // Apply gradient classes conditionally
        gradient && "bg-custom-gradient",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
});

ButtonGradient.displayName = "ButtonGradient";

export { ButtonGradient };
