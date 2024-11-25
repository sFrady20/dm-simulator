"use client";

import { useApp } from "@/components/app/provider";
import {
  Phone,
  PhoneBezel,
  PhoneContent,
  PhoneInterface,
  PhoneScreen,
} from "@/components/phone";
import { IMessageScreenMessageList as MessageList } from "@/components/phone/screens/imessage";
import { useEditor } from "./provider";

export function EditorPreview() {
  const app = useApp();
  const editor = useEditor();

  const name = app((x) => x.contactName);
  const url = app((x) => x.contactAvatarUrl);
  const messages = app((x) => x.messages);
  const mode = app((x) => x.systemMode);

  return (
    <Phone
      ref={(el) => {
        editor.setState((x) => {
          x.phoneEl = el as any;
        });
      }}
      mode={mode}
    >
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