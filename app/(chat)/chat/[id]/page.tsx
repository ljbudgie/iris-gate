import { Suspense } from "react";
import { ChatShell } from "@/components/chat/shell";
import { ActiveChatProvider } from "@/hooks/use-active-chat";

export default function Page() {
  return (
    <Suspense fallback={<div className="flex h-dvh" />}>
      <ActiveChatProvider>
        <ChatShell />
      </ActiveChatProvider>
    </Suspense>
  );
}
