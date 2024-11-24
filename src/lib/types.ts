import { DateValue } from "react-aria-components";

export type Message = {
  id: number;
  text: string;
  time: DateValue;
  type: "sent" | "received";
  read?: string;
};
