"use client";

import Image from "next/image";
import { useApp } from "./providers/app";
import ImageUpload from "./ui/image-upload";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Toggle, ToggleOption } from "./ui/toggle";
import { MultilineInput } from "./ui/multiline-input";

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
          </div>
        ))}{" "}
      </div>
    </div>
  );
}

export const EditorFields = () => {
  const app = useApp();

  const avatarUrl = app((x) => x.contactAvatarUrl);
  const avatarFileName = app((x) => x.contactAvatarFileName);
  const name = app((x) => x.contactName);
  const messages = app((x) => x.messages);

  const [newMessage, setNewMessage] = useState("");
  const [editingMessage, setEditingMessage] = useState<number | null>(null);

  const addMessage = () => {
    if (newMessage.trim()) {
      app.setState((x) => {
        x.messages.push({
          id: Date.now(),
          text: newMessage,
          type: "sent", // You can adjust this as needed
        });
      });
      setNewMessage("");
    }
  };

  const editMessage = (id: number, newText: string) => {
    app.setState((x) => {
      const messageIndex = x.messages.findIndex((m) => m.id === id);
      if (messageIndex !== -1) {
        x.messages[messageIndex].text = newText;
      }
    });
    setEditingMessage(null);
  };

  const removeMessage = (id: number) => {
    app.setState((x) => {
      x.messages = x.messages.filter((m) => m.id !== id);
    });
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
        <div>
          <Input
            value={name}
            onChange={(e) => app.setState({ contactName: e.target.value })}
          />
        </div>
      </div>
      <div className="mt-4">
        <h3>Add Message</h3>
        <div className="flex flex-col gap-2">
          <MultilineInput
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="New message"
          />
          <Toggle>
            <ToggleOption>To Me</ToggleOption>
            <ToggleOption>From Me</ToggleOption>
          </Toggle>
          <Button onClick={addMessage}>Add</Button>
        </div>
      </div>
    </div>
  );
};
