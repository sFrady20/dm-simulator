"use client";

import Image from "next/image";
import { useApp } from "./providers/app";
import ImageUpload from "./ui/image-upload";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Toggle, ToggleOption } from "./ui/toggle";
import { MultilineInput } from "./ui/multiline-input";
import TimeInput from "./ui/time-input";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { TimeValue } from "react-aria-components";

const messageVariants = cva(
  "rounded-lg border border-border/50 bg-background px-2 py-1.5 text-xs shadow-xl w-auto",
  {
    variants: {
      type: {
        sent: "self-end rounded-br-sm",
        received: "self-start rounded-bl-sm",
      },
    },
  }
);

export function EditorPreview() {
  const app = useApp();

  const name = app((x) => x.contactName);
  const url = app((x) => x.contactAvatarUrl);
  const fileName = app((x) => x.contactAvatarFileName);
  const messages = app((x) => x.messages);

  return (
    <div>
      <div className="flex flex-row items-center justify-center gap-4">
        <Image
          src={url || ""}
          alt={fileName || ""}
          width={100}
          height={100}
          className="rounded-full"
        />
        <div>{name}</div>
      </div>

      <div className="flex flex-col gap-4">
        {messages.map((msg) => (
          <div key={msg.id} className={cn(messageVariants({ type: msg.type }))}>
            <div>{msg.text}</div>
            <div className="text-xs text-muted-foreground">
              {msg.type === "sent" ? "Sent" : "Received"} at{" "}
              {msg.time?.toString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const editor = create(
  immer<{
    type: "sent" | "received";
    message: string;
    time: TimeValue | null;
  }>((set) => ({
    type: "received",
    message: "",
    time: null,
  }))
);

export const EditorFields = () => {
  const app = useApp();

  const avatarUrl = app((x) => x.contactAvatarUrl);
  const name = app((x) => x.contactName);

  const newMessageType = editor((x) => x.type);
  const newMessage = editor((x) => x.message);
  const newMessageTime = editor((x) => x.time);

  const addMessage = () => {
    if (newMessage.trim() && !!newMessageTime) {
      app.setState((x) => {
        x.messages.push({
          id: Date.now(),
          text: newMessage,
          type: newMessageType,
          time: newMessageTime,
        });
      });
      editor.setState((x) => {
        x.message = "";
      });
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-center gap-4">
        <ImageUpload
          shape={"circle"}
          url={avatarUrl}
          onUrlChange={(url) =>
            app.setState((x) => {
              x.contactAvatarUrl = url;
            })
          }
        />
        <div className="flex flex-col gap-2">
          <Input
            value={name}
            onChange={(e) => app.setState({ contactName: e.target.value })}
          />
          <Toggle>
            <ToggleOption>Android</ToggleOption>
            <ToggleOption>iPhone</ToggleOption>
          </Toggle>
        </div>
      </div>
      <div className="mt-4">
        <h3>Add Message</h3>
        <div className="flex flex-col gap-2">
          <Toggle>
            <ToggleOption>Received</ToggleOption>
            <ToggleOption>Sent</ToggleOption>
          </Toggle>
          <MultilineInput
            value={newMessage}
            onChange={(e) =>
              editor.setState((x) => {
                x.message = e.target.value;
              })
            }
            placeholder="New message"
          />
          <TimeInput
            value={newMessageTime || undefined}
            onValueChange={(x) => {
              editor.setState({ time: x });
            }}
          />
          <Button onClick={addMessage}>Add</Button>
        </div>
      </div>
    </div>
  );
};
