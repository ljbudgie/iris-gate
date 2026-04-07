import { registerProvider } from "@/lib/federation/registry";
import type { FederationProvider } from "@/lib/federation/types";

/**
 * The Iris Agent's own entry in the federation registry.
 *
 * The agent is registered as a special internal provider so it can be
 * governed (promoted to SOVEREIGN or kept at NULL) independently from
 * the base models and external federation providers.
 */
let agentProvider: FederationProvider | null = null;

const AGENT_NAME = "Iris Agent";
const AGENT_ENDPOINT = "internal://iris-agent";
const AGENT_CAPABILITIES = [
  "synthesis",
  "critique",
  "reasoning",
  "gap-filling",
];

/**
 * Get or register the Iris Agent provider.
 *
 * On first call this registers the agent in the federation registry
 * with governance status NULL. Subsequent calls return the cached
 * provider.
 */
export function getAgentProvider(): FederationProvider {
  if (agentProvider) {
    return agentProvider;
  }

  agentProvider = registerProvider({
    name: AGENT_NAME,
    endpointUrl: AGENT_ENDPOINT,
    capabilities: AGENT_CAPABILITIES,
  });

  return agentProvider;
}

/**
 * Check whether the agent has been promoted to SOVEREIGN.
 */
export function isAgentSovereign(): boolean {
  const provider = getAgentProvider();
  return provider.governanceStatus === "SOVEREIGN";
}
