"use client";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ChangeEvent, ComponentProps, useRef } from "react";

export function MultilineInput(
  props: ComponentProps<typeof Textarea> & { maxRows?: number }
) {
  const { maxRows, rows = 1, onChange, className, ...rest } = props;

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
    <Textarea
      ref={textareaRef}
      {...rest}
      onChange={handleInput}
      rows={rows}
      className={cn("min-h-[none] resize-none max-h-[none]", className)}
    />
  );
}
