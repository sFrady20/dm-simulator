"use client";

import { Message } from "@/lib/types";
import { createContext, useContext, useMemo } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type AppState = {
  contactName: string;
  contactAvatarUrl: string | undefined;
  contactAvatarFileName: string | undefined;
  messages: Message[];
};

const initialState: AppState = {
  contactName: "John Doe",
  contactAvatarUrl: undefined,
  contactAvatarFileName: undefined,
  messages: [],
};

const makeStore = () => create(immer<AppState>((set) => ({ ...initialState })));

const AppContext = createContext(makeStore());

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useMemo(() => makeStore(), []);
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
