"use client";

import { useApp } from "@/components/app/provider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateAndTimeInput } from "@/components/ui/date-and-time-input";
import { useEditor } from "./provider";
import { Composer } from "../ui/composer";

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
    <div className="flex flex-col gap-2 p-2 bg-secondary rounded-lg">
      <div className="flex flex-col md:flex-row items-center gap-2">
        <DateAndTimeInput
          hideTimeZone
          className={"w-full"}
          value={newMessageTime || undefined}
          onValueChange={(x) => {
            editor.setState({ time: x });
          }}
        />
        <Tabs
          value={newMessageType}
          onValueChange={(x) => editor.setState({ type: x as any })}
          className="w-full md:w-auto"
        >
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="received" className="flex-1">
              Received
            </TabsTrigger>
            <TabsTrigger value="sent" className="flex-1">
              Sent
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Composer
        value={newMessage}
        onChange={(e) =>
          editor.setState((x) => {
            x.message = e.target.value;
          })
        }
        placeholder="New message"
      >
        <Button
          onClick={addMessage}
          className="self-end pointer-events-auto"
          size={"sm"}
          variant={"ghost"}
        >
          <i className="icon-[heroicons--paper-airplane] text-lg" />
          <div>Add Message</div>
        </Button>
      </Composer>
    </div>
  );
};
