from typing import List, Literal, Optional, TypedDict

from .types import MemorySensitivity


SubjectStatus = Literal["active", "archived"]
FactType = Literal[
    "preference",
    "requirement",
    "constraint",
    "contact",
    "decision",
    "risk",
    "status",
    "custom",
]


class SubjectCreateRequired(TypedDict):
    name: str


class SubjectCreate(SubjectCreateRequired, total=False):
    subject_type: str
    aliases: List[str]


class SubjectUpdate(TypedDict, total=False):
    name: str
    subject_type: str
    aliases: List[str]
    status: SubjectStatus


class Subject(TypedDict):
    id: str
    name: str
    subject_type: str
    aliases: List[str]
    status: SubjectStatus
    linked_memory_count: int
    created_at: str
    updated_at: str


class SubjectMemoryRequired(TypedDict):
    memory_id: str
    title: str
    type: str
    status: str
    sensitivity: MemorySensitivity
    tags: List[str]
    linked_by: str
    linked_at: str


class SubjectMemory(SubjectMemoryRequired, total=False):
    preview_text: Optional[str]
    reason_code: Optional[str]
    reason: Optional[str]


class SubjectMemoryLinkResult(TypedDict):
    linked: bool
    memory: SubjectMemory


class SubjectMemoryUnlinkResult(TypedDict):
    removed: bool


class SubjectFactSource(TypedDict):
    memory_id: str
    memory_version: int
    memory_title: str
    created_by_type: Literal["user", "agent", "system"]


class SubjectFactRequired(TypedDict):
    id: str
    subject_id: str
    fact_type: FactType
    fact_text: str
    status: Literal["active", "archived"]
    sensitivity: MemorySensitivity
    source: SubjectFactSource
    observed_at: str
    reviewed_at: str
    created_at: str
    updated_at: str


class SubjectFact(SubjectFactRequired, total=False):
    valid_from: Optional[str]
    valid_to: Optional[str]
    archived_at: Optional[str]


class SubjectFactList(TypedDict):
    items: List[SubjectFact]
    count: int


class FactSuggestionCreateRequired(TypedDict):
    suggestion_type: Literal["add_fact", "update_fact"]
    proposed_fact_type: FactType
    proposed_fact_text: str
    source_memory_id: str
    idempotency_key: str


class FactSuggestionCreate(FactSuggestionCreateRequired, total=False):
    target_fact_id: str


class FactSuggestionSource(TypedDict):
    memory_id: str
    memory_version: int
    memory_title: str


class FactSuggestionRequired(TypedDict):
    id: str
    subject_id: str
    suggestion_type: Literal["add_fact", "update_fact"]
    source: FactSuggestionSource
    status: str
    created_at: str


class FactSuggestion(FactSuggestionRequired, total=False):
    target_fact_id: Optional[str]
    proposed_fact_type: Optional[FactType]
    proposed_fact_text: Optional[str]


class SubjectNextActionRequired(TypedDict):
    memory_id: str
    title: str
    next_action: str


class SubjectNextAction(SubjectNextActionRequired, total=False):
    due_date: Optional[str]


class SubjectImportantLink(TypedDict):
    url: str
    source_memory_id: str
    source_memory_title: str


class SubjectContext(TypedDict):
    subject: Subject
    facts: List[SubjectFact]
    fact_alerts: List[SubjectFact]
    memories: List[SubjectMemory]
    next_actions: List[SubjectNextAction]
    important_links: List[SubjectImportantLink]
    pending_suggestion_count: int
    returned_count: int
    truncated: bool
    facts_truncated: bool


class SubjectDeletionPreview(TypedDict):
    subject: Subject
    linked_memory_count: int
    required_confirmation: str
    memories_will_be_deleted: Literal[False]
    message: str


class SubjectDeleteResult(TypedDict):
    deleted: Literal[True]
    subject_id: str
    memories_deleted: Literal[False]
