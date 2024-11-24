"use client";

import { useApp } from "./providers/app";
import ImageUpload from "./ui/image-upload";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MultilineInput } from "./ui/multiline-input";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  Phone,
  PhoneBezel,
  PhoneContent,
  PhoneInterface,
  PhoneScreen,
} from "./phone";
import { IMessageScreenMessageList as MessageList } from "./phone/screens/imessage";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { DateAndTimeInput } from "./ui/date-and-time-input";
import { getLocalTimeZone, now } from "@internationalized/date";
import { DateValue } from "react-aria-components";
import TimeInput from "./ui/time-input";
import { Slider } from "./ui/slider";

export function EditorPreview() {
  const app = useApp();

  const name = app((x) => x.contactName);
  const url = app((x) => x.contactAvatarUrl);
  const messages = app((x) => x.messages);

  return (
    <Phone>
      <PhoneContent>
        <PhoneScreen
          variant="imessage"
          name={name}
          avatar={url}
          className="pt-[182px] pb-[16px] px-[40px]"
        >
          <MessageList messages={messages} />
        </PhoneScreen>
        <PhoneInterface variant="iphone" />
      </PhoneContent>
      <PhoneBezel variant="iphone-16-pro-black-titanium" />
    </Phone>
  );
}

const editor = create(
  immer<{
    type: "sent" | "received";
    message: string;
    time: DateValue | null;
  }>((set) => ({
    type: "received",
    message: "",
    time: now(getLocalTimeZone()),
  }))
);

export const EditorFields = () => {
  const app = useApp();

  const systemTime = app((x) => x.systemTime);
  const systemSignalStrength = app((x) => x.systemSignalStrength);
  const systemWifiStrength = app((x) => x.systemWifiStrength);
  const systemBatteryLevel = app((x) => x.systemBatteryLevel);
  const systemBatteryCharging = app((x) => x.systemBatteryCharging);

  const contactAvatarUrl = app((x) => x.contactAvatarUrl);
  const contactName = app((x) => x.contactName);
  const contactOS = app((x) => x.contactOS);

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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col w-full">
        <h3>Contact</h3>
        <div className="flex flex-row items-center justify-center gap-4 w-full">
          <div className="flex flex-col gap-2">
            <ImageUpload
              shape={"circle"}
              url={contactAvatarUrl}
              onUrlChange={(url) =>
                app.setState((x) => {
                  x.contactAvatarUrl = url;
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <Input
              value={contactName}
              onChange={(e) => app.setState({ contactName: e.target.value })}
            />
            <Tabs
              value={contactOS}
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
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h3>System</h3>
        <TimeInput
          hideTimeZone
          value={systemTime}
          onValueChange={(x) => app.setState({ systemTime: x ?? undefined })}
        />

        <div>Signal strength</div>
        <Slider
          min={0}
          max={1}
          step={1 / 4}
          value={[systemSignalStrength]}
          onValueChange={([x]) => app.setState({ systemSignalStrength: x })}
        />

        <div>Wifi strength</div>
        <Slider
          min={0}
          max={1}
          step={1 / 3}
          value={[systemWifiStrength]}
          onValueChange={([x]) => app.setState({ systemWifiStrength: x })}
        />

        <div>Battery Level</div>
        <Slider
          min={0}
          max={1}
          step={1 / 9}
          value={[systemBatteryLevel]}
          onValueChange={([x]) => app.setState({ systemBatteryLevel: x })}
        />
      </div>
      <div>
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
      </div>
    </div>
  );
};
