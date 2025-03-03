import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const CustomTextArea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(({ className, ...props }, ref) => {
  return (
    <div className="group relative w-full">
      {/* Gradient border - visible on group focus-within */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl transition-all duration-200",
          "group-focus-within:bg-gradient-to-r group-focus-within:from-secondary group-focus-within:via-[hsl(31,95%,49%)] group-focus-within:to-primary",
          "group-focus-within:p-[1px]"
        )}
      >
        {/* Background - changes from light grey to white */}
        <div className="h-full w-full rounded-2xl bg-light-grey group-focus-within:bg-white transition-colors duration-200" />
      </div>

      <Textarea
        ref={ref}
        className={cn(
          "relative w-full px-4 py-2 min-h-[120px]",
          "text-sm font-medium bg-transparent",
          "focus-visible:outline-none rounded-2xl",
          "placeholder:text-medium-grey",
          "border-none ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0",
          "resize-none",
          className
        )}
        {...props}
      />
    </div>
  );
});

CustomTextArea.displayName = "CustomTextArea";

export default CustomTextArea;
