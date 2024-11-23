"use client";

import { useApp } from "./providers/app";
import ImageUpload from "./ui/image-upload";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MultilineInput } from "./ui/multiline-input";
import TimeInput from "./ui/time-input";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { TimeValue } from "react-aria-components";
import {
  Phone,
  PhoneBezel,
  PhoneContent,
  PhoneInterface,
  PhoneScreen,
} from "./phone";
import { AnimatePresence } from "motion/react";
import { IMessageScreenMessage as Message } from "./phone/screens/imessage";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export function EditorPreview() {
  const app = useApp();

  const name = app((x) => x.contactName);
  const url = app((x) => x.contactAvatarUrl);
  const messages = app((x) => x.messages);

  return (
    <div>
      <Phone>
        <PhoneContent>
          <PhoneScreen
            variant="imessage"
            name={name}
            avatar={url}
            className="pt-[162px]"
          >
            <div className="px-[40px] py-[16px] flex flex-col gap-[10px] w-full">
              <AnimatePresence>
                {messages.map((message) => (
                  <Message
                    key={message.id}
                    {...message}
                    variants={{
                      initial: {},
                      animate: {},
                      exit: {},
                    }}
                    initial={"initial"}
                    animate={"animate"}
                    exit={"exit"}
                  >
                    {message.text}
                  </Message>
                ))}
              </AnimatePresence>
            </div>
          </PhoneScreen>
          <PhoneInterface variant="iphone" />
        </PhoneContent>
        <PhoneBezel variant="iphone-16-pro-black-titanium" />
      </Phone>
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
  const os = app((x) => x.contactOS);

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
          <Tabs
            value={os}
            onValueChange={(x) => app.setState({ contactOS: x as any })}
          >
            <TabsList className="w-full">
              <TabsTrigger value="iphone" className="flex-1">
                iPhone
              </TabsTrigger>
              <TabsTrigger value="android" className="flex-1">
                Android
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="mt-4">
        <h3>Add Message</h3>
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
