import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { ElementRef, forwardRef } from "react";

const sectionVariants = cva("flow-root", {
  variants: {
    spacing: {
      tight: "my-4",
      normal: "my-8",
      loose: "my-12",
    },
  },
  defaultVariants: { spacing: "normal" },
});

export const Section = forwardRef<
  ElementRef<"section">,
  React.ComponentPropsWithoutRef<"section"> &
    VariantProps<typeof sectionVariants>
>(({ className, spacing, ...props }, ref) => {
  return (
    <section
      ref={ref}
      {...props}
      className={cn(sectionVariants({ spacing }), className)}
    />
  );
});

Section.displayName = "Section";

//

const sectionContainerVariants = cva("container mx-auto", {
  variants: {},
  defaultVariants: {},
});

export const SectionContainer = forwardRef<
  ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> &
    VariantProps<typeof sectionContainerVariants>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn(sectionContainerVariants(), className)}
    />
  );
});

SectionContainer.displayName = "SectionContainer";
