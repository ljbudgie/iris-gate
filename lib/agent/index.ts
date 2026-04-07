export {
  defaultAgentConfig,
  decomposeQuery,
  streamSynthesis,
  synthesiseResponses,
} from "./iris-agent";
export { getAllFacts, removeFact, searchFacts, storeFact } from "./memory";
export { getAgentProvider, isAgentSovereign } from "./provider";
export type {
  AgentSubtask,
  AgentSynthesisResult,
  ConversationContext,
  IrisAgentConfig,
  MemoryFact,
  ModelResponse,
  SynthesisAttribution,
} from "./types";
