"use client";

import { Suspense } from "react";
import { ActiveChatProvider } from "@/hooks/use-active-chat";
import { ChatShell } from "./shell";

export function ChatView() {
  return (
    <Suspense fallback={<div className="flex h-dvh" />}>
      <ActiveChatProvider>
        <ChatShell />
      </ActiveChatProvider>
    </Suspense>
  );
}
