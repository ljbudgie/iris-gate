import { generateUUID } from "@/lib/utils";
import type { MemoryFact } from "./types";

/**
 * In-memory store for agent long-term facts.
 *
 * For production this should be backed by Neon Postgres. The in-memory
 * Map keeps the initial implementation simple and dependency-free.
 */
const facts = new Map<string, MemoryFact>();

export function storeFact(key: string, value: string): MemoryFact {
  const fact: MemoryFact = {
    id: generateUUID(),
    key,
    value,
    createdAt: new Date().toISOString(),
  };
  facts.set(fact.id, fact);
  return fact;
}

export function getFact(id: string): MemoryFact | undefined {
  return facts.get(id);
}

export function searchFacts(query: string): MemoryFact[] {
  const lower = query.toLowerCase();
  return Array.from(facts.values()).filter(
    (f) =>
      f.key.toLowerCase().includes(lower) ||
      f.value.toLowerCase().includes(lower)
  );
}

export function getAllFacts(): MemoryFact[] {
  return Array.from(facts.values());
}

export function removeFact(id: string): boolean {
  return facts.delete(id);
}
