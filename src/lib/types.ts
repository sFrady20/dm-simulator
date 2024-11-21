export type Message = {
  id: number;
  text: string;
  type: "sent" | "received";
};
