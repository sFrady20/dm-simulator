"use client";

import { getLocalTimeZone, now } from "@internationalized/date";
import { createContext, useContext, useMemo } from "react";
import { DateValue, TimeValue } from "react-aria-components";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type EditorState = {
  type: "sent" | "received";
  message: string;
  time: DateValue | null;
};

const initialState: EditorState = {
  type: "received",
  message: "",
  time: now(getLocalTimeZone()),
};

const makeStore = () =>
  create(immer<EditorState>((set) => ({ ...initialState })));

const EditorContext = createContext(makeStore());

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useMemo(() => makeStore(), []);
  return (
    <EditorContext.Provider value={store}>{children}</EditorContext.Provider>
  );
};

export const useEditor = () => useContext(EditorContext);
