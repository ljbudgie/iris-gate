/**
 * PersonGate types — sovereign data handling for The Burgess Principle.
 *
 * PersonGate (@iris-gate/person) ensures that any task involving a specific
 * person's case, facts, appeal, or decision routes through cryptographic
 * commitments rather than exposing raw personal data externally.
 *
 * Every interaction is tagged SOVEREIGN or NULL.
 */

import type { GovernanceStatus } from "@/lib/federation/types";

// ---------------------------------------------------------------------------
// Vault record — a single committed fact stored locally
// ---------------------------------------------------------------------------

export type VaultRecord = {
  /** Unique identifier for this vault record. */
  id: string;

  /** The user ID this record belongs to. */
  userId: string;

  /** Category of the fact (e.g. "appeal", "adjustment", "decision"). */
  category: VaultCategory;

  /** The raw personal facts — kept locally, never sent externally. */
  facts: string;

  /** SHA-256 cryptographic commitment of the facts. */
  commitment: string;

  /** Governance status at time of creation. */
  governanceStatus: GovernanceStatus;

  /** ISO 8601 timestamp of when this record was created. */
  createdAt: string;

  /** ISO 8601 timestamp of last update. */
  updatedAt: string;
};

export type VaultCategory =
  | "appeal"
  | "adjustment"
  | "decision"
  | "case_facts"
  | "request"
  | "evidence"
  | "correspondence"
  | "general";

// ---------------------------------------------------------------------------
// Cryptographic commitment — sent to external systems instead of raw facts
// ---------------------------------------------------------------------------

export type Commitment = {
  /** The SHA-256 hash of the user's facts. */
  hash: string;

  /** The vault record ID this commitment references. */
  vaultRecordId: string;

  /** User ID (never includes the facts themselves). */
  userId: string;

  /** ISO 8601 timestamp of commitment generation. */
  timestamp: string;

  /** The Burgess Principle certification mark. */
  certificationMark: string;
};

// ---------------------------------------------------------------------------
// Receipt — returned by external systems after processing a commitment
// ---------------------------------------------------------------------------

export type Receipt = {
  /** The commitment hash this receipt validates. */
  commitmentHash: string;

  /** The governance status assigned by the external system. */
  status: GovernanceStatus;

  /** The external system/institution that processed this. */
  respondent: string;

  /** ISO 8601 timestamp of receipt. */
  respondedAt: string;

  /** Optional response content from the institution. */
  responseContent?: string;

  /** Digital signature from the respondent (opaque string). */
  signature?: string;
};

// ---------------------------------------------------------------------------
// Challenge — a NULL receipt that requires escalation
// ---------------------------------------------------------------------------

export type Challenge = {
  /** Unique challenge ID. */
  id: string;

  /** The vault record this challenge relates to. */
  vaultRecordId: string;

  /** The user ID. */
  userId: string;

  /** The commitment that received a NULL response. */
  commitment: Commitment;

  /** The NULL receipt that triggered this challenge. */
  receipt: Receipt;

  /** Generated advocacy language for escalation. */
  advocacyText: string;

  /** Current status of the challenge. */
  status: ChallengeStatus;

  /** ISO 8601 timestamp of challenge creation. */
  createdAt: string;
};

export type ChallengeStatus =
  | "open"
  | "escalated"
  | "resolved"
  | "tribunal_ready";

// ---------------------------------------------------------------------------
// PersonGate operation results
// ---------------------------------------------------------------------------

export type CommitResult = {
  /** The vault record created. */
  vaultRecord: VaultRecord;

  /** The commitment generated for external use. */
  commitment: Commitment;
};

export type ReceiveResult = {
  /** Whether the receipt validated against the commitment. */
  valid: boolean;

  /** The governance status from the receipt. */
  status: GovernanceStatus;

  /** If NULL, the challenge that was automatically created. */
  challenge?: Challenge;
};

// ---------------------------------------------------------------------------
// Vault state — persistent across sessions
// ---------------------------------------------------------------------------

export type VaultState = {
  /** All vault records for this user. */
  records: VaultRecord[];

  /** All active challenges (NULL cases). */
  challenges: Challenge[];

  /** Summary counts for quick reference. */
  summary: {
    totalRecords: number;
    sovereignCount: number;
    nullCount: number;
    openChallenges: number;
  };
};
