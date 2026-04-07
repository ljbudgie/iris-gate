import type { GovernanceStatus, ProviderId } from "@/lib/federation/types";

/**
 * A single response from a base model, collected before agent synthesis.
 */
export type ModelResponse = {
  modelId: string;
  modelName: string;
  content: string;
  respondedAt: string;
};

/**
 * Attribution entry showing which parts came from which source.
 */
export type SynthesisAttribution = {
  sourceId: string;
  sourceName: string;
  sourceType: "model" | "agent";
  summary: string;
};

/**
 * The result of the Iris Agent's synthesis step.
 */
export type AgentSynthesisResult = {
  /** The merged/synthesised output from the agent. */
  synthesisText: string;
  /** Attribution showing which parts came from which base model vs. the agent. */
  attributions: SynthesisAttribution[];
  /** Governance status of the agent's own output (starts as NULL). */
  governanceStatus: GovernanceStatus;
  /** The provider ID of the agent in the federation registry. */
  agentProviderId: ProviderId;
  /** Timestamp of synthesis completion. */
  completedAt: string;
};

/**
 * A subtask decomposed from the user's original request.
 */
export type AgentSubtask = {
  id: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  result?: string;
};

/**
 * Short-term memory: conversation context for the current session.
 */
export type ConversationContext = {
  userQuery: string;
  modelResponses: ModelResponse[];
  previousMessages?: Array<{ role: string; content: string }>;
};

/**
 * A key fact stored in long-term memory.
 */
export type MemoryFact = {
  id: string;
  key: string;
  value: string;
  createdAt: string;
};

/**
 * Configuration for the Iris Agent.
 */
export type IrisAgentConfig = {
  /** The model ID to use for the agent's internal reasoning. */
  reasoningModelId: string;
  /** Maximum number of reasoning steps before producing output. */
  maxSteps: number;
  /** Whether to store key facts in long-term memory. */
  enableLongTermMemory: boolean;
};
