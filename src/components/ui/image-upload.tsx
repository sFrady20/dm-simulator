"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { CircleUserRound, X } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

const variants = cva("", {
  variants: { shape: { square: "", circle: "rounded-full" } },
  defaultVariants: { shape: "square" },
});

export default function ImageUpload(
  props: {
    format?: "blob-url" | "data-url";
    url?: string;
    onUrlChange?: (url: string | undefined) => void;
    fileName?: string;
    onFileNameChange?: (fileName: string | undefined) => void;
  } & VariantProps<typeof variants>
) {
  const {
    url,
    onUrlChange,
    fileName,
    onFileNameChange,
    format = "blob-url",
    shape,
  } = props;

  const previewRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleThumbnailClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        onFileNameChange?.(file.name);

        if (format === "blob-url") {
          const dataUrl = URL.createObjectURL(file);
          previewRef.current = dataUrl;
          onUrlChange?.(dataUrl);
        } else if (format === "data-url") {
          const reader = new FileReader();
          reader.onload = (e) => {
            const dataUrl = e.target?.result as string;
            previewRef.current = dataUrl;
            onUrlChange?.(dataUrl);
          };
          reader.readAsDataURL(file);
        }
      }
    },
    [format]
  );

  const handleRemove = useCallback(() => {
    url && URL.revokeObjectURL(url);
    onFileNameChange?.(undefined);
    onUrlChange?.(undefined);
    previewRef.current = null;
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  useEffect(() => {
    return () => {
      previewRef.current && URL.revokeObjectURL(previewRef.current);
    };
  }, []);

  return (
    <div>
      <div className="relative inline-flex">
        <Button
          variant="outline"
          className={cn(
            "relative size-16 overflow-hidden",
            variants({ shape })
          )}
          onClick={handleThumbnailClick}
          aria-label={url ? "Change image" : "Upload image"}
        >
          {url ? (
            <Image
              className="h-full w-full object-cover"
              src={url}
              alt="Preview of uploaded image"
              layout="fill"
            />
          ) : (
            <div aria-hidden="true">
              <CircleUserRound
                className="opacity-60"
                size={16}
                strokeWidth={2}
              />
            </div>
          )}
        </Button>
        {url && (
          <Button
            onClick={handleRemove}
            size="icon"
            variant="destructive"
            className="absolute -right-2 -top-2 size-6 rounded-full border-2 border-background"
            aria-label="Remove image"
          >
            <X size={16} />
          </Button>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
          aria-label="Upload image file"
        />
      </div>
      {fileName && (
        <p className="mt-2 text-xs text-muted-foreground">{fileName}</p>
      )}
      <div className="sr-only" aria-live="polite" role="status">
        {url ? "Image uploaded and preview available" : "No image uploaded"}
      </div>
    </div>
  );
}
