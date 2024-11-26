"use client";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ChangeEvent, ComponentProps, useRef } from "react";

export function Composer(
  props: ComponentProps<typeof Textarea> & { maxRows?: number }
) {
  const { maxRows, rows = 1, onChange, className, children, ...rest } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e);
    if (e.defaultPrevented) return;

    const textarea = e.target;
    textarea.style.height = "auto";

    const style = window.getComputedStyle(textarea);
    const borderHeight =
      parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth);
    const paddingHeight =
      parseInt(style.paddingTop) + parseInt(style.paddingBottom);

    const lineHeight = parseInt(style.lineHeight);
    const maxHeight = maxRows
      ? lineHeight * maxRows + borderHeight + paddingHeight
      : Infinity;

    const newHeight = Math.min(textarea.scrollHeight + borderHeight, maxHeight);

    textarea.style.height = `${newHeight}px`;
  };

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        {...rest}
        onChange={handleInput}
        rows={rows}
        className={cn(
          "min-h-[none] resize-none max-h-[none] bg-background rounded-lg border-0 w-full p-2 pb-[52px] block",
          className
        )}
      />
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none p-2 flex flex-row gap-2 justify-end">
        {children}
      </div>
    </div>
  );
}
