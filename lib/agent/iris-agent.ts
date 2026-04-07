import { generateText, streamText, tool } from "ai";
import { z } from "zod";
import { applyGovernanceGate } from "@/lib/federation/governance";
import type { ProviderResponse } from "@/lib/federation/types";
import { generateUUID } from "@/lib/utils";
import { getLanguageModel } from "../ai/providers";
import { searchFacts, storeFact } from "./memory";
import { getAgentProvider } from "./provider";
import type {
  AgentSubtask,
  AgentSynthesisResult,
  ConversationContext,
  IrisAgentConfig,
  SynthesisAttribution,
} from "./types";

const DEFAULT_CONFIG: IrisAgentConfig = {
  reasoningModelId: "mistral/mistral-small",
  maxSteps: 3,
  enableLongTermMemory: false,
};

/**
 * System prompt for the Iris Agent's synthesis step.
 */
const agentSystemPrompt = `You are the Iris Agent, a reasoning layer that synthesises responses from multiple AI models into a single, high-quality answer.

Your role:
1. ANALYSE each model's response for accuracy, completeness, and relevance.
2. CRITIQUE responses — identify factual errors, gaps, contradictions, or weak reasoning.
3. SYNTHESISE the best parts into a coherent, unified answer.
4. EXTEND with your own knowledge where all models fell short.
5. ATTRIBUTE clearly which insights came from which model.

Rules:
- Be concise and direct. The synthesis should be shorter than the combined inputs.
- If models agree on a point, state it once with confidence.
- If models disagree, explain the disagreement and provide the most likely correct answer.
- Always start your synthesis with a brief summary sentence.
- Mark any facts you cannot verify with "[unverified]".
- Maintain the Burgess Principle tone: calm, respectful, human-first.`;

/**
 * Build the user prompt for synthesis from model responses.
 */
function buildSynthesisPrompt(context: ConversationContext): string {
  const responseSections = context.modelResponses
    .map((r, i) => `### Model ${i + 1}: ${r.modelName}\n${r.content}`)
    .join("\n\n---\n\n");

  return `## User Query
${context.userQuery}

## Model Responses
${responseSections}

## Instructions
Synthesise the above responses into a single, high-quality answer. Attribute key points to their source models. Fill gaps where all models fell short. Be concise.`;
}

/**
 * Decompose a user query into subtasks for multi-step reasoning.
 */
export async function decomposeQuery(
  query: string,
  config: IrisAgentConfig = DEFAULT_CONFIG
): Promise<AgentSubtask[]> {
  try {
    const { text } = await generateText({
      model: getLanguageModel(config.reasoningModelId),
      system:
        "You are a task decomposition engine. Break the user query into 2-4 independent subtasks. Return a JSON array of objects with 'description' fields. Only return the JSON array, nothing else.",
      prompt: query,
    });

    const parsed = JSON.parse(text) as Array<{ description: string }>;
    return parsed.map((item) => ({
      id: generateUUID(),
      description: item.description,
      status: "pending" as const,
    }));
  } catch {
    // Fallback: treat the whole query as a single subtask
    return [
      {
        id: generateUUID(),
        description: query,
        status: "pending" as const,
      },
    ];
  }
}

/**
 * Run the Iris Agent synthesis on a set of model responses.
 *
 * This is the core function: it takes the user query + model responses,
 * analyses/critiques/synthesises them, and returns a governed result.
 */
export async function synthesiseResponses(
  context: ConversationContext,
  config: IrisAgentConfig = DEFAULT_CONFIG
): Promise<AgentSynthesisResult> {
  const agentProvider = getAgentProvider();

  const prompt = buildSynthesisPrompt(context);

  // Gather relevant long-term memory facts
  let memoryContext = "";
  if (config.enableLongTermMemory) {
    const relevantFacts = searchFacts(context.userQuery);
    if (relevantFacts.length > 0) {
      memoryContext = `\n\n## Relevant Facts from Memory\n${relevantFacts.map((f) => `- ${f.key}: ${f.value}`).join("\n")}`;
    }
  }

  const tools = {
    storeKeyFact: tool({
      description:
        "Store an important fact learned during synthesis for future reference.",
      inputSchema: z.object({
        key: z.string().describe("A short label for the fact"),
        value: z.string().describe("The fact content"),
      }),
      execute: ({ key, value }) => {
        const fact = storeFact(key, value);
        return { stored: true, factId: fact.id };
      },
    }),
    searchMemory: tool({
      description: "Search long-term memory for relevant facts.",
      inputSchema: z.object({
        query: z.string().describe("Search query"),
      }),
      execute: ({ query }) => {
        const results = searchFacts(query);
        return {
          facts: results.map((f) => ({ key: f.key, value: f.value })),
        };
      },
    }),
  };

  const { text } = await generateText({
    model: getLanguageModel(config.reasoningModelId),
    system: agentSystemPrompt + memoryContext,
    prompt,
    tools: config.enableLongTermMemory ? tools : undefined,
    maxSteps: config.maxSteps,
  });

  // Build attributions from the model responses
  const attributions: SynthesisAttribution[] = context.modelResponses.map(
    (r) => ({
      sourceId: r.modelId,
      sourceName: r.modelName,
      sourceType: "model" as const,
      summary: `Response from ${r.modelName}`,
    })
  );

  // Add the agent itself as a source
  attributions.push({
    sourceId: "iris-agent",
    sourceName: "Iris Agent",
    sourceType: "agent" as const,
    summary: "Synthesis, critique, and gap-filling by the Iris Agent",
  });

  // Apply governance gate — agent starts as NULL
  const agentResponse: ProviderResponse = {
    providerId: agentProvider.id,
    providerName: agentProvider.name,
    content: text,
    governanceStatus: agentProvider.governanceStatus,
    respondedAt: new Date().toISOString(),
  };

  const gatedResponse = applyGovernanceGate(agentResponse);

  return {
    synthesisText: gatedResponse.content,
    attributions,
    governanceStatus: gatedResponse.governanceStatus,
    agentProviderId: agentProvider.id,
    completedAt: gatedResponse.respondedAt,
  };
}

/**
 * Stream the Iris Agent synthesis (for real-time UI updates).
 *
 * Returns an async generator that yields text chunks as the agent
 * produces its synthesis.
 */
export async function* streamSynthesis(
  context: ConversationContext,
  config: IrisAgentConfig = DEFAULT_CONFIG
): AsyncGenerator<string> {
  const prompt = buildSynthesisPrompt(context);

  let memoryContext = "";
  if (config.enableLongTermMemory) {
    const relevantFacts = searchFacts(context.userQuery);
    if (relevantFacts.length > 0) {
      memoryContext = `\n\n## Relevant Facts from Memory\n${relevantFacts.map((f) => `- ${f.key}: ${f.value}`).join("\n")}`;
    }
  }

  const { textStream } = streamText({
    model: getLanguageModel(config.reasoningModelId),
    system: agentSystemPrompt + memoryContext,
    prompt,
  });

  for await (const chunk of textStream) {
    yield chunk;
  }
}

export { DEFAULT_CONFIG as defaultAgentConfig };
