/**
 * PersonGate public API — sovereign data handling for The Burgess Principle.
 *
 * Usage:
 *   import { PersonGate } from "@/lib/person-gate";
 *   const gate = new PersonGate(userId);
 *   const { commitment } = await gate.commit({ facts, category });
 */

export { generateAdvocacyText, generateTribunalExport, isPersonalCaseMessage } from "./advocacy";
export { createCommitment, sha256, validateReceipt } from "./crypto";
export { PersonGate } from "./person-gate";
export type {
  Challenge,
  ChallengeStatus,
  Commitment,
  CommitResult,
  Receipt,
  ReceiveResult,
  VaultCategory,
  VaultRecord,
  VaultState,
} from "./types";
export {
  addChallenge,
  clearVault,
  getRecord,
  getVaultState,
  listChallenges,
  listRecords,
  storeRecord,
  updateChallengeStatus,
  updateRecordStatus,
} from "./vault";
