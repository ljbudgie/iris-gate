"use client";

import { PanelLeftIcon } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { ModelSelectorLogo } from "@/components/ai-elements/model-selector";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { chatModels } from "@/lib/ai/models";
import { SparklesIcon } from "./icons";
import { VisibilitySelector, type VisibilityType } from "./visibility-selector";

function PureChatHeader({
  chatId,
  selectedVisibilityType,
  isReadonly,
  currentModelId,
}: {
  chatId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
  currentModelId?: string;
}) {
  const { state, toggleSidebar, isMobile } = useSidebar();

  const currentModel = currentModelId
    ? chatModels.find((m) => m.id === currentModelId)
    : undefined;

  if (state === "collapsed" && !isMobile) {
    return null;
  }

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-2 bg-sidebar px-3">
      <Button
        className="md:hidden"
        onClick={toggleSidebar}
        size="icon-sm"
        variant="ghost"
      >
        <PanelLeftIcon className="size-4" />
      </Button>

      <Link
        className="flex items-center gap-1.5 rounded-lg px-1.5 py-1"
        href="/"
      >
        <div className="flex size-5 items-center justify-center text-primary">
          <SparklesIcon size={12} />
        </div>
        <span className="text-sm font-semibold text-foreground">Iris</span>
        <span className="hidden text-xs text-muted-foreground md:inline">
          Human-first AI
        </span>
      </Link>

      {!isReadonly && (
        <VisibilitySelector
          chatId={chatId}
          selectedVisibilityType={selectedVisibilityType}
        />
      )}

      <div className="ml-auto flex items-center gap-2">
        {currentModel && (
          <div className="flex items-center gap-1.5 rounded-full border border-border/40 bg-muted/50 px-2.5 py-1">
            <ModelSelectorLogo
              className="size-3.5 dark:invert"
              provider={currentModel.provider}
            />
            <span className="hidden text-xs font-medium text-muted-foreground sm:inline">
              {currentModel.name}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return (
    prevProps.chatId === nextProps.chatId &&
    prevProps.selectedVisibilityType === nextProps.selectedVisibilityType &&
    prevProps.isReadonly === nextProps.isReadonly &&
    prevProps.currentModelId === nextProps.currentModelId
  );
});
