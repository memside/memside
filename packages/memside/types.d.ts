export type MemorySensitivity = "public" | "private";
export type MemoryStatus = "active" | "archived" | "completed";
export type MemoryType =
  | "note"
  | "task"
  | "event"
  | "shopping-list"
  | "wishlist"
  | "prompt"
  | "idea"
  | "goal"
  | "log"
  | "operating_rule";

export interface AttachmentMetadata {
  id?: string;
  filename?: string;
  mime_type?: string;
  type?: string;
  size_bytes?: number;
  size?: number;
  metadata_available?: boolean;
}

export interface TaskState {
  goal?: string;
  status?: string;
  progress?: number;
  priority?: string;
  assigned_to?: string;
  next_steps?: string[];
  parent_id?: string;
  depends_on?: string[];
  blockers?: string[];
  done_when?: string[];
  outputs?: string[];
  result?: string;
  failed_attempts?: string[];
  notes?: string;
  decisions?: string[];
  questions?: string[];
  references?: string[];
  rule_ids?: string[];
}

export interface OperatingRule {
  id?: string;
  title: string;
  instruction_text: string;
  scope_level: string;
  scope_ref?: string | null;
  applies_to_modes?: string[] | null;
  status: string;
  instruction_truncated?: boolean;
}

export interface OperatingRuleInput {
  title: string;
  instruction_text: string;
  scope_level: string;
  scope_ref?: string;
  applies_to_modes?: string[];
  priority?: number;
  status?: string;
}

export interface TaskStateInput extends TaskState {
  goal: string;
  status: string;
}

export interface SubtaskCreate {
  goal: string;
  priority?: string;
  assigned_to?: string;
  next_steps?: string[];
  done_when?: string[];
}

export interface Memory {
  id: string;
  type: string;
  text: string;
  title?: string | null;
  body?: string | null;
  status: string;
  occurred_at: string;
  created_at: string;
  updated_at: string;
  due_date?: string | null;
  sensitivity: MemorySensitivity;
  version: number;
  tags?: string[] | null;
  preview_text?: string | null;
  attachments: AttachmentMetadata[];
  task_state?: TaskState | null;
  operating_rule?: OperatingRule | null;
}

export interface MemoryCreateInput {
  type: MemoryType;
  text?: string;
  status?: MemoryStatus;
  occurred_at?: string;
  sensitivity?: MemorySensitivity;
  tags?: string[];
  due_date?: string | null;
  task_state?: TaskStateInput;
  subtasks?: SubtaskCreate[];
  operating_rule?: OperatingRuleInput;
}

export interface MemoryUpdateInput {
  text?: string;
  type?: MemoryType;
  status?: MemoryStatus;
  occurred_at?: string;
  sensitivity?: MemorySensitivity;
  tags?: string[];
  due_date?: string | null;
  task_state?: TaskStateInput | null;
  task_changes?: Partial<TaskState>;
  expected_version?: number;
  operating_rule?: OperatingRuleInput;
}

export interface MemoryListParams {
  limit?: number;
  offset?: number;
  sort_by?: string;
  status?: MemoryStatus;
  type?: MemoryType;
  sensitivity?: MemorySensitivity;
  tags?: string[];
  due_before?: string;
  due_after?: string;
}

export interface MemorySearchParams extends MemoryListParams {
  q?: string;
  match_any?: boolean;
  date_from?: string;
  date_to?: string;
  has_task_state?: boolean;
  task_status?: string;
  task_priority?: string;
  task_assigned_to?: string;
  parent_id?: string;
}

export interface MemoryBatchSuccess {
  ok: true;
  id: string;
  text: string;
  type: string;
  status: string;
  sensitivity: MemorySensitivity;
  tags: string[];
  occurred_at?: string | null;
  due_date?: string | null;
  version: number;
  attachments: AttachmentMetadata[];
  task_state?: TaskState | null;
  operating_rule?: OperatingRule | null;
}

export interface BatchItemError {
  code: string;
  message: string;
  status: number;
  retryable: boolean;
}

export interface MemoryBatchFailure {
  ok: false;
  requested_id: string;
  error: BatchItemError;
}

export interface MemoryBatchResult {
  ok: true;
  items: Array<MemoryBatchSuccess | MemoryBatchFailure>;
  count: number;
  unique_requested_count: number;
  success_count: number;
  error_count: number;
  total_body_chars: number;
}

export interface MemoryRevision {
  version: number;
  text: string;
  title: string;
  body: string;
  text_unavailable: boolean;
  status: string;
  sensitivity: MemorySensitivity;
  type: string;
  tags?: string[] | null;
  task_state?: TaskState | null;
  snapshot_at?: string | null;
  changed_fields: string[];
  diff_summary: string;
  operating_rule?: OperatingRule | null;
  attachments: AttachmentMetadata[];
}

export interface MemoryRevisionList {
  revisions: MemoryRevision[];
}

export interface MemoryDeleteResult {
  deleted: true;
  id: string;
}

export interface ContextParams {
  scope_level?: string;
  scope_ref?: string;
  mode?: string;
  profile_id?: string;
  budget_mode?: string;
}

export interface StartupContextParams extends ContextParams {
  checkpoint_id?: string;
}

export interface ResumeContextParams extends ContextParams {
  checkpoint_id?: string;
}

export interface WorkspaceProfileParams extends ContextParams {
  scope_ref: string;
}

export interface ContextMeta {
  scope_level?: string | null;
  scope_ref?: string | null;
  mode?: string | null;
  truncated?: boolean;
  budget?: Record<string, unknown>;
  retrieval?: Record<string, unknown>;
}

export interface StartupContext {
  operating_rules: OperatingRule[];
  active_checkpoint_summary?: Record<string, unknown> | null;
  latest_checkpoint_reference?: Record<string, unknown> | null;
  relevant_memory_previews: Array<Record<string, unknown>>;
  capture_guidance?: Record<string, unknown>;
  capture_nudge?: Record<string, unknown> | null;
  user_ai_profile_hint?: Record<string, unknown> | null;
  meta: ContextMeta;
  size_label?: string;
  last_context_loaded?: Record<string, unknown>;
}

export interface ResumeContext extends StartupContext {
  checkpoint?: Record<string, unknown> | null;
  resume_instructions?: string | null;
}

export interface WorkspaceProfile {
  project?: string | null;
  purpose?: string | null;
  current_state?: string | null;
  current_priority?: string | null;
  next_action?: string | null;
  key_decisions: string[];
  open_questions: string[];
  resume_instructions?: string | null;
  operating_rules: OperatingRule[];
  relevant_memory_previews: Array<Record<string, unknown>>;
  latest_checkpoint_reference?: Record<string, unknown> | null;
  context_sources?: Array<Record<string, unknown>>;
  user_ai_profile_hint?: Record<string, unknown> | null;
  meta: ContextMeta;
  size_label?: string;
  last_context_loaded?: Record<string, unknown>;
}
