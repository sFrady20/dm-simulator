"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { ElementRef, forwardRef } from "react";

//
export const SegmentedControl = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div"> & {
    value: string;
    onValueChange: (value: string) => void;
  }
>(({ className, children, value, onValueChange, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn("inline-flex h-9 rounded-lg bg-input/50 p-0.5", className)}
    >
      <RadioGroup
        value={value}
        onValueChange={onValueChange}
        className="w-full group relative inline-grid grid-cols-[1fr_1fr] items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/2 after:rounded-md after:bg-background after:shadow-sm after:shadow-black/5 after:ring-offset-background after:transition-transform after:duration-300 after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] has-[:focus-visible]:after:ring-2 has-[:focus-visible]:after:ring-ring has-[:focus-visible]:after:ring-offset-2 data-[state=off]:after:translate-x-0 data-[state=on]:after:translate-x-full"
        data-state={value}
      >
        {children}
      </RadioGroup>
    </div>
  );
});
SegmentedControl.displayName = "Toggle";

//

export const SegmentedControlOption = forwardRef<
  ElementRef<"label">,
  ComponentPropsWithoutRef<"label"> & { value: string }
>(({ className, children, value, ...props }, ref) => {
  return (
    <label
      ref={ref}
      {...props}
      className={cn(
        "relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center whitespace-nowrap px-4 group-data-[state=off]:text-muted-foreground/70",
        className
      )}
    >
      <span>{children}</span>
      <RadioGroupItem value={value} className="sr-only" />
    </label>
  );
});
SegmentedControlOption.displayName = "ToggleOption";
