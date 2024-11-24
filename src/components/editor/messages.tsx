"use client";

import { useApp } from "@/components/app/provider";
import { Button } from "@/components/ui/button";
import { MultilineInput } from "@/components/ui/multiline-input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateAndTimeInput } from "@/components/ui/date-and-time-input";
import { useEditor } from "./provider";

export const EditorMessagesFields = () => {
  const app = useApp();
  const editor = useEditor();

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
        x.time = x.time?.add({ minutes: 1 }) ?? null;
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Tabs
        value={newMessageType}
        onValueChange={(x) => editor.setState({ type: x as any })}
      >
        <TabsList className="w-full">
          <TabsTrigger value="received" className="flex-1">
            Received
          </TabsTrigger>
          <TabsTrigger value="sent" className="flex-1">
            Sent
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <DateAndTimeInput
        hideTimeZone
        value={newMessageTime || undefined}
        onValueChange={(x) => {
          editor.setState({ time: x });
        }}
      />
      <div className="flex flex-row gap-2">
        <MultilineInput
          value={newMessage}
          onChange={(e) =>
            editor.setState((x) => {
              x.message = e.target.value;
            })
          }
          placeholder="New message"
        />
        <Button onClick={addMessage} className="self-end">
          Add
        </Button>
      </div>
    </div>
  );
};
