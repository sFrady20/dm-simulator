"use client";

import { Message } from "@/lib/types";
import { getLocalTimeZone, now } from "@internationalized/date";
import { createContext, useContext, useMemo } from "react";
import { DateValue, TimeValue } from "react-aria-components";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type AppState = {
  systemTime: DateValue;
  systemSignalStrength: number;
  systemWifiStrength: number;
  systemBatteryLevel: number;
  systemBatteryCharging: boolean;
  systemMode: "light" | "dark";
  contactName: string;
  contactAvatarUrl: string | undefined;
  contactOS: "iphone" | "android";
  messages: Message[];
};

function generateRandomPhoneNumber() {
  let phoneNumber = "+1 ";
  for (let i = 0; i < 3; i++) phoneNumber += Math.floor(Math.random() * 10);
  phoneNumber += "-";
  for (let i = 0; i < 3; i++) phoneNumber += Math.floor(Math.random() * 10);
  phoneNumber += "-";
  for (let i = 0; i < 4; i++) phoneNumber += Math.floor(Math.random() * 10);
  return phoneNumber;
}

const initialState: AppState = {
  systemTime: now(getLocalTimeZone()),
  systemSignalStrength: 1,
  systemWifiStrength: 1,
  systemBatteryLevel: 1,
  systemBatteryCharging: false,
  systemMode: "light",
  contactName: generateRandomPhoneNumber(),
  contactAvatarUrl: undefined,
  contactOS: "iphone",
  messages: [],
};

const makeStore = () => create(immer<AppState>((set) => ({ ...initialState })));

const AppContext = createContext(makeStore());

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useMemo(() => makeStore(), []);
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
