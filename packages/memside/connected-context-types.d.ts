import type { MemorySensitivity } from "./types.js";

export type ContextMapNodeKind =
  | "source"
  | "linked"
  | "subject_member"
  | "suggested"
  | "checkpoint";

export interface ContextMapMemoryNode {
  id: string;
  node_kind: ContextMapNodeKind;
  title: string;
  type: string;
  status: string;
  sensitivity: MemorySensitivity;
  preview_text?: string | null;
  tags: string[];
  reason: string;
  reason_code: string;
  subject_ids: string[];
  relationship_type?: "related_to" | "depends_on" | null;
  relationship_direction?: "outbound" | "inbound" | null;
}

export interface ContextMapSubjectNode {
  id: string;
  name: string;
  subject_type: string;
  linked_by: "user" | "agent" | "system";
  linked_memory_count: number;
  active_fact_count: number;
  reason: string;
}

export interface ContextMapFact {
  id: string;
  subject_id: string;
  subject_name: string;
  fact_type: string;
  fact_text: string;
  source_memory_id: string;
  source_memory_title: string;
}

export interface ContextMapEntity {
  entity_type: string;
  value: string;
}

export interface ContextMapLink {
  url: string;
  source_memory_id: string;
  source_memory_title: string;
}

export interface ContextMapMeta {
  single_hop: true;
  memory_limit: number;
  subject_limit: number;
  fact_limit: number;
  link_limit: number;
  memories_truncated: boolean;
  subjects_truncated: boolean;
  facts_truncated: boolean;
  links_truncated: boolean;
}

export interface ContextMap {
  source_memory: ContextMapMemoryNode;
  connected_memories: ContextMapMemoryNode[];
  subjects: ContextMapSubjectNode[];
  facts: ContextMapFact[];
  shared_entities: ContextMapEntity[];
  links: ContextMapLink[];
  meta: ContextMapMeta;
  returned_count: number;
  truncated: boolean;
  facts_truncated: boolean;
}

export interface MemoryInsightEvidence {
  fact_id?: string | null;
  source_memory_id?: string | null;
  source_memory_version?: number | null;
  fact_source_version?: number | null;
  current_source_version?: number | null;
  matching_fact_id?: string | null;
  fact_type?: string | null;
  subject_id?: string | null;
  active_linked_memory_count?: number | null;
}

export interface MemoryInsight {
  id: string;
  subject_id: string;
  fact_id?: string | null;
  related_fact_id?: string | null;
  source_memory_id?: string | null;
  insight_type: string;
  proposed_action: string;
  evidence: MemoryInsightEvidence;
  status: "pending";
  created_at: string;
}

export interface MemoryInsightList {
  items: MemoryInsight[];
  count: number;
}

export interface MemoryInsightListOptions {
  limit?: number;
}
