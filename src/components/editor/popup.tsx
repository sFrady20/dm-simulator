"use client";

import "react-image-crop/dist/ReactCrop.css";
import { default as NextImage } from "next/image";
import { useEditor } from "./provider";
import { Dialog, DialogContent } from "../ui/dialog";
import { Crop, ReactCrop } from "react-image-crop";
import { useCallback, useRef, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

const cropped = (
  screenshot: string | null,
  crop: Crop | undefined,
  imageEl: HTMLImageElement
) =>
  new Promise<HTMLCanvasElement>((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = 450;
    canvas.height = 920;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = screenshot!;

    if (crop) {
      canvas.width = crop.width * (450 / imageEl.width);
      canvas.height = crop.height * (920 / imageEl.height);
    }

    img.onload = () => {
      const sx = crop ? -crop.x * (450 / imageEl.width) : 0;
      const sy = crop ? -crop.y * (920 / imageEl.height) : 0;
      ctx!.drawImage(img, sx, sy, 450, 920);
      resolve(canvas);
    };
  });

export const EditorPopup = function () {
  const imageRef = useRef<HTMLImageElement>(null);

  const editor = useEditor();
  const screenshot = editor((x) => x.screenshot);

  const [crop, setCrop] = useState<Crop>();

  if (!screenshot) return null;

  return (
    <Dialog
      open={!!screenshot}
      onOpenChange={(open) => {
        if (!open) editor.setState({ screenshot: null });
      }}
    >
      <DialogContent className="flex flex-col md:flex-row gap-0 max-w-[800px] w-auto p-0">
        <div className="w-[500px] bg-black rounded-xl p-8">
          <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
            <NextImage
              ref={imageRef}
              src={screenshot!}
              alt="screenshot"
              width={450}
              height={920}
              draggable={false}
              className="h-[60vh] w-auto select-none"
            />
          </ReactCrop>
        </div>
        <div className="py-12 px-8 flex flex-col gap-4 justify-start">
          <Button
            className="min-w-[200px]"
            onClick={async () => {
              const canvas = await cropped(screenshot, crop, imageRef.current!);
              const data = canvas.toDataURL("image/png");
              const link = document.createElement("a");
              link.href = data;
              link.download = "screenshot.png";
              link.click();
            }}
          >
            <i className="icon-[heroicons--arrow-down-tray] text-lg" />
            <div>Download</div>
          </Button>

          <Button
            variant={"outline"}
            onClick={async () => {
              const canvas = await cropped(screenshot, crop, imageRef.current!);
              const blob = await new Promise<Blob | null>((resolve) =>
                canvas.toBlob(resolve)
              );
              if (!blob) {
                toast.error("Failed to copy to clipboard");
                return;
              }
              navigator.clipboard.write([
                new ClipboardItem({
                  "image/png": blob,
                }),
              ]);
            }}
          >
            <i className="icon-[heroicons--clipboard] text-lg" />
            <div>Copy to clipboard</div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};