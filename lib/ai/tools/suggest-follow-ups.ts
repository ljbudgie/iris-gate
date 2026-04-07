import { tool } from "ai";
import { z } from "zod";

export const suggestFollowUps = tool({
  description:
    "Suggest 2-3 concise follow-up questions the user might want to ask next, based on the current conversation. Call this after every conversational response. Do NOT call after creating, editing, or updating artifacts.",
  inputSchema: z.object({
    suggestions: z
      .array(z.string())
      .min(2)
      .max(3)
      .describe("2-3 concise, relevant follow-up questions"),
  }),
  // Pass-through: the model generates suggestions via tool call and the UI
  // extracts them from the tool output to render as clickable chips.
  execute: ({ suggestions }) => {
    return { suggestions };
  },
});
