"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useEditor } from "./provider";
import { toPng } from "html-to-image";

export const EditorScreenshot = () => {
  const [flashKey, setFlashKey] = useState<number | null>(null);

  const editor = useEditor();
  const phoneEl = editor((x) => x.phoneEl);

  return (
    <div>
      {flashKey != null && (
        <div
          key={flashKey}
          className="fixed pointer-events-none inset-0 z-[200] bg-white animate-flash"
        />
      )}
      <Button
        className="w-full"
        onClick={async () => {
          setFlashKey(Math.random());

          try {
            if (!phoneEl) throw new Error("Phone SVG not found");

            // Convert the SVG to a PNG
            const pngDataUrl = await toPng(phoneEl as any, {
              cacheBust: true,
              canvasWidth: 450,
              canvasHeight: 920,

              filter: (node) => {
                if (node?.getAttribute?.("data-role") === "bezel") return false;
                if (node?.getAttribute?.("data-role") === "screen_mask")
                  return false;
                return true;
              },
            });

            // Create an Image object to get the dimensions
            const img = new Image();
            img.src = pngDataUrl;
            await new Promise((resolve) => (img.onload = resolve));

            // Create a canvas to crop the image
            const canvas = document.createElement("canvas");
            canvas.width = 450;
            canvas.height = 920;
            const ctx = canvas.getContext("2d");

            const bezelMargin = 24;

            // Set canvas size to image size minus 48px (24px on each side)
            canvas.width = img.width - bezelMargin * 2;
            canvas.height = img.height - bezelMargin * 2;

            // Draw the image on the canvas with negative offsets to crop
            ctx!.drawImage(
              img,
              -bezelMargin,
              -bezelMargin,
              img.width,
              img.height
            );

            // Convert the cropped canvas to a Blob
            const screenshot = canvas.toDataURL("image/png");
            editor.setState({ screenshot });

            // const croppedBlob = await new Promise<Blob | null>((resolve) => {
            //   canvas.toBlob(resolve, "image/png");
            // });

            // if (!croppedBlob) throw new Error("Failed to create blob");

            // // Create a link to download the cropped image
            // const link = document.createElement("a");
            // link.href = URL.createObjectURL(croppedBlob);
            // link.download = "phone_screenshot.png";
            // link.click();
          } catch (err: any) {
            console.error(err);
            toast.error(`Failed to take screenshot: ${err.message || err}`, {
              position: "top-center",
            });
          }
        }}
      >
        <i className="icon-[heroicons--camera-solid] text-lg" />
        <div>Screenshot</div>
      </Button>
    </div>
  );
};
