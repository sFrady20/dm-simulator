import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { ElementRef, forwardRef } from "react";

const pageVariants = cva("flow-root", { variants: {}, defaultVariants: {} });

export const Page = forwardRef<
  ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof pageVariants>
>(({ className, ...props }, ref) => {
  return <div ref={ref} {...props} className={cn(pageVariants(), className)} />;
});
Page.displayName = "Page";
