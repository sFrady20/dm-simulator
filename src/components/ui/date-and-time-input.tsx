// Dependencies: pnpm install react-aria-components

"use client";

import {
  DateField,
  DateFieldProps,
  DateInput,
  DateSegment,
  DateValue,
  Label,
} from "react-aria-components";

interface DateInputProps
  extends Omit<DateFieldProps<DateValue>, "value" | "onChange"> {
  value?: DateValue;
  onValueChange?: (value: DateValue | null) => void;
  label?: string;
  hint?: string;
}

export function DateAndTimeInput(props: DateInputProps) {
  const { value, onValueChange, hint, label, ...rest } = props;

  return (
    <DateField
      className="space-y-2"
      granularity="minute"
      hourCycle={12}
      value={value}
      onChange={onValueChange}
      {...rest}
    >
      {label && (
        <Label className="text-sm font-medium text-foreground">{label}</Label>
      )}
      <DateInput className="relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-[3px] data-[focus-within]:ring-ring/20">
        {(segment) => (
          <DateSegment
            segment={segment}
            className="inline rounded p-0.5 text-foreground caret-transparent outline outline-0 data-[disabled]:cursor-not-allowed data-[focused]:bg-accent data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]:text-muted-foreground/70 data-[type=literal]:text-muted-foreground/70 data-[disabled]:opacity-50"
          />
        )}
      </DateInput>
      {hint && (
        <p
          className="mt-2 text-xs text-muted-foreground"
          role="region"
          aria-live="polite"
        >
          {hint}
        </p>
      )}
    </DateField>
  );
}
