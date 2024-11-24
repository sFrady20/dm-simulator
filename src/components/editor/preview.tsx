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
