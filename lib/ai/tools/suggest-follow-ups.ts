import { tool } from "ai";
import { z } from "zod";

export const suggestFollowUps = tool({
  description:
    "Suggest 2-3 concise follow-up questions the user might want to ask next, based on the current conversation. Call this after every conversational response. Do NOT call after creating, editing, or updating artifacts. IMPORTANT: Each suggestion must be unique — never repeat a follow-up you have already suggested in this conversation. Vary the angle and topic of each suggestion (e.g. don't suggest two variations of the same question). Keep suggestions natural and conversational, not generic or robotic.",
  inputSchema: z.object({
    suggestions: z
      .array(z.string())
      .min(2)
      .max(3)
      .describe(
        "2-3 concise, relevant, non-duplicate follow-up questions. Each should explore a different angle or next step. Never repeat suggestions from earlier in the conversation."
      ),
  }),
  // Pass-through: the model generates suggestions via tool call and the UI
  // extracts them from the tool output to render as clickable chips.
  execute: ({ suggestions }) => {
    return { suggestions };
  },
});
