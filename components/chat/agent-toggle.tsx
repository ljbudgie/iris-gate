"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

function PureAgentToggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}) {
  return (
    <button
      aria-label={enabled ? "Disable Iris Agent" : "Enable Iris Agent"}
      className={cn(
        "group relative flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-all duration-200",
        enabled
          ? "bg-primary/10 text-primary ring-1 ring-primary/20 hover:bg-primary/15"
          : "bg-muted/50 text-muted-foreground ring-1 ring-border/40 hover:bg-muted/70 hover:text-foreground"
      )}
      data-testid="agent-toggle"
      onClick={() => onToggle(!enabled)}
      title={
        enabled
          ? "Iris Agent is active — click to disable"
          : "Enable Iris Agent for model synthesis"
      }
      type="button"
    >
      <AgentToggleIcon enabled={enabled} size={12} />
      <span className="hidden sm:inline">
        {enabled ? "Agent Active" : "Enable Agent"}
      </span>
      {enabled && (
        <span className="hidden rounded bg-primary/15 px-1 py-px text-[9px] font-semibold sm:inline">
          Agent + Models
        </span>
      )}
    </button>
  );
}

function AgentToggleIcon({
  enabled,
  size = 14,
}: {
  enabled: boolean;
  size?: number;
}) {
  return (
    <svg
      className={cn(
        "transition-colors",
        enabled ? "text-primary" : "text-muted-foreground"
      )}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

export const AgentToggle = memo(PureAgentToggle);
