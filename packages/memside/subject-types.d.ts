import type { MemorySensitivity } from "./types.js";

export type SubjectStatus = "active" | "archived";
export type FactType =
  | "preference"
  | "requirement"
  | "constraint"
  | "contact"
  | "decision"
  | "risk"
  | "status"
  | "custom";

export interface SubjectCreateInput {
  name: string;
  subject_type?: string;
  aliases?: string[];
}

export interface SubjectUpdateInput {
  name?: string;
  subject_type?: string;
  aliases?: string[];
  status?: SubjectStatus;
}

export interface Subject {
  id: string;
  name: string;
  subject_type: string;
  aliases: string[];
  status: SubjectStatus;
  linked_memory_count: number;
  created_at: string;
  updated_at: string;
}

export interface SubjectListParams {
  q?: string;
  subjectType?: string;
  status?: SubjectStatus;
  limit?: number;
}

export interface SubjectMemoryListOptions {
  includeArchived?: boolean;
  limit?: number;
}

export interface SubjectMemory {
  memory_id: string;
  title: string;
  type: string;
  status: string;
  sensitivity: MemorySensitivity;
  preview_text?: string | null;
  tags: string[];
  linked_by: string;
  linked_at: string;
  reason_code?: string | null;
  reason?: string | null;
}

export interface SubjectMemoryLinkResult {
  linked: boolean;
  memory: SubjectMemory;
}

export interface SubjectMemoryUnlinkResult {
  removed: boolean;
}

export interface SubjectFactSource {
  memory_id: string;
  memory_version: number;
  memory_title: string;
  created_by_type: "user" | "agent" | "system";
}

export interface SubjectFact {
  id: string;
  subject_id: string;
  fact_type: FactType;
  fact_text: string;
  status: "active" | "archived";
  sensitivity: MemorySensitivity;
  source: SubjectFactSource;
  observed_at: string;
  valid_from?: string | null;
  valid_to?: string | null;
  reviewed_at: string;
  archived_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubjectFactList {
  items: SubjectFact[];
  count: number;
}

export interface SubjectFactListOptions {
  includeHistory?: boolean;
  limit?: number;
}

interface FactSuggestionCreateBase {
  proposed_fact_type: FactType;
  proposed_fact_text: string;
  source_memory_id: string;
  idempotency_key: string;
}

export interface AddFactSuggestionInput extends FactSuggestionCreateBase {
  suggestion_type: "add_fact";
  target_fact_id?: never;
}

export interface UpdateFactSuggestionInput extends FactSuggestionCreateBase {
  suggestion_type: "update_fact";
  target_fact_id: string;
}

export type FactSuggestionCreateInput =
  | AddFactSuggestionInput
  | UpdateFactSuggestionInput;

export interface FactSuggestionSource {
  memory_id: string;
  memory_version: number;
  memory_title: string;
}

export interface FactSuggestion {
  id: string;
  subject_id: string;
  suggestion_type: "add_fact" | "update_fact";
  target_fact_id?: string | null;
  proposed_fact_type?: FactType | null;
  proposed_fact_text?: string | null;
  source: FactSuggestionSource;
  status: string;
  created_at: string;
}

export interface SubjectNextAction {
  memory_id: string;
  title: string;
  next_action: string;
  due_date?: string | null;
}

export interface SubjectImportantLink {
  url: string;
  source_memory_id: string;
  source_memory_title: string;
}

export interface SubjectContext {
  subject: Subject;
  facts: SubjectFact[];
  fact_alerts: SubjectFact[];
  memories: SubjectMemory[];
  next_actions: SubjectNextAction[];
  important_links: SubjectImportantLink[];
  pending_suggestion_count: number;
  returned_count: number;
  truncated: boolean;
  facts_truncated: boolean;
}

export interface SubjectContextOptions {
  maxMemories?: number;
  maxFacts?: number;
  maxNextActions?: number;
  maxLinks?: number;
}

export interface SubjectDeletionPreview {
  subject: Subject;
  linked_memory_count: number;
  required_confirmation: string;
  memories_will_be_deleted: false;
  message: string;
}

export interface SubjectDeleteOptions {
  deleteConfirmation?: string;
}

export interface SubjectDeleteResult {
  deleted: true;
  subject_id: string;
  memories_deleted: false;
}
