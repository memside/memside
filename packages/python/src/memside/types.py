from typing import Dict, List, Literal, Optional, TypedDict, Union


MemorySensitivity = str
MemoryStatus = str
MemoryType = str
JsonObject = Dict[str, object]


class AttachmentMetadata(TypedDict, total=False):
    id: str
    filename: str
    mime_type: str
    type: str
    size_bytes: int
    size: int
    metadata_available: bool


class TaskState(TypedDict, total=False):
    goal: str
    status: str
    priority: str
    assigned_to: str
    next_steps: List[str]
    done_when: List[str]
    progress: float
    parent_id: str
    depends_on: List[str]
    blockers: List[str]
    outputs: List[str]
    result: str
    failed_attempts: List[str]
    notes: str
    decisions: List[str]
    questions: List[str]
    references: List[str]
    rule_ids: List[str]


class OperatingRule(TypedDict, total=False):
    id: str
    title: str
    instruction_text: str
    status: str
    scope_level: str
    scope_ref: Optional[str]
    applies_to_modes: Optional[List[str]]
    priority: int
    instruction_truncated: bool


class SubtaskCreate(TypedDict, total=False):
    goal: str
    priority: str
    assigned_to: str
    next_steps: List[str]
    done_when: List[str]


class MemoryCreateRequired(TypedDict):
    type: MemoryType


class MemoryCreate(MemoryCreateRequired, total=False):
    text: str
    status: MemoryStatus
    occurred_at: str
    sensitivity: MemorySensitivity
    tags: List[str]
    due_date: Optional[str]
    task_state: TaskState
    subtasks: List[SubtaskCreate]
    operating_rule: OperatingRule


class MemoryUpdate(TypedDict, total=False):
    text: str
    type: MemoryType
    status: MemoryStatus
    occurred_at: str
    sensitivity: MemorySensitivity
    tags: List[str]
    due_date: Optional[str]
    task_state: Optional[TaskState]
    task_changes: TaskState
    expected_version: int
    operating_rule: OperatingRule


class MemoryRequired(TypedDict):
    id: str
    type: str
    text: str
    status: str
    occurred_at: str
    created_at: str
    updated_at: str
    sensitivity: MemorySensitivity
    version: int
    attachments: List[AttachmentMetadata]


class Memory(MemoryRequired, total=False):
    title: Optional[str]
    body: Optional[str]
    due_date: Optional[str]
    tags: Optional[List[str]]
    preview_text: Optional[str]
    task_state: Optional[TaskState]
    operating_rule: Optional[OperatingRule]


class BatchItemError(TypedDict):
    code: str
    message: str
    status: int
    retryable: bool


class MemoryBatchSuccessRequired(TypedDict):
    ok: Literal[True]
    id: str
    text: str
    type: str
    status: str
    sensitivity: MemorySensitivity
    tags: List[str]
    occurred_at: Optional[str]
    due_date: Optional[str]
    version: int
    attachments: List[AttachmentMetadata]


class MemoryBatchSuccess(MemoryBatchSuccessRequired, total=False):
    task_state: Optional[TaskState]
    operating_rule: Optional[OperatingRule]


class MemoryBatchFailure(TypedDict):
    ok: Literal[False]
    requested_id: str
    error: BatchItemError


class MemoryBatchResult(TypedDict):
    ok: Literal[True]
    items: List[Union[MemoryBatchSuccess, MemoryBatchFailure]]
    count: int
    unique_requested_count: int
    success_count: int
    error_count: int
    total_body_chars: int


class MemoryRevisionRequired(TypedDict):
    version: int
    text: str
    title: str
    body: str
    text_unavailable: bool
    status: str
    sensitivity: MemorySensitivity
    type: str
    changed_fields: List[str]
    diff_summary: str
    attachments: List[AttachmentMetadata]


class MemoryRevision(MemoryRevisionRequired, total=False):
    tags: Optional[List[str]]
    task_state: Optional[TaskState]
    snapshot_at: Optional[str]
    operating_rule: Optional[OperatingRule]


class MemoryRevisionList(TypedDict):
    revisions: List[MemoryRevision]


class MemoryDeleteResult(TypedDict):
    deleted: Literal[True]
    id: str


class ContextMeta(TypedDict, total=False):
    scope_level: Optional[str]
    scope_ref: Optional[str]
    mode: Optional[str]
    truncated: bool
    budget: JsonObject
    retrieval: JsonObject


class StartupContext(TypedDict, total=False):
    operating_rules: List[OperatingRule]
    active_checkpoint_summary: Optional[JsonObject]
    latest_checkpoint_reference: Optional[JsonObject]
    relevant_memory_previews: List[JsonObject]
    capture_guidance: JsonObject
    capture_nudge: Optional[JsonObject]
    user_ai_profile_hint: Optional[JsonObject]
    meta: ContextMeta
    size_label: str
    last_context_loaded: JsonObject


class ResumeContext(StartupContext, total=False):
    checkpoint: Optional[JsonObject]
    resume_instructions: Optional[str]


class WorkspaceProfile(TypedDict, total=False):
    project: Optional[str]
    purpose: Optional[str]
    current_state: Optional[str]
    current_priority: Optional[str]
    next_action: Optional[str]
    key_decisions: List[str]
    open_questions: List[str]
    resume_instructions: Optional[str]
    operating_rules: List[OperatingRule]
    relevant_memory_previews: List[JsonObject]
    latest_checkpoint_reference: Optional[JsonObject]
    context_sources: List[JsonObject]
    user_ai_profile_hint: Optional[JsonObject]
    meta: ContextMeta
    size_label: str
    last_context_loaded: JsonObject
