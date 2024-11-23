import { TimeValue } from "react-aria-components";

export type Message = {
  id: number;
  text: string;
  time: TimeValue;
  type: "sent" | "received";
  read?: string;
};
