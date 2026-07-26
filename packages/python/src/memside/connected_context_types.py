from typing import List, Literal, Optional, TypedDict

from .types import MemorySensitivity


class ContextMapMemoryNodeRequired(TypedDict):
    id: str
    node_kind: Literal[
        "source",
        "linked",
        "subject_member",
        "suggested",
        "checkpoint",
    ]
    title: str
    type: str
    status: str
    sensitivity: MemorySensitivity
    tags: List[str]
    reason: str
    reason_code: str
    subject_ids: List[str]


class ContextMapMemoryNode(ContextMapMemoryNodeRequired, total=False):
    preview_text: Optional[str]
    relationship_type: Optional[Literal["related_to", "depends_on"]]
    relationship_direction: Optional[Literal["outbound", "inbound"]]


class ContextMapSubjectNode(TypedDict):
    id: str
    name: str
    subject_type: str
    linked_by: Literal["user", "agent", "system"]
    linked_memory_count: int
    active_fact_count: int
    reason: str


class ContextMapFact(TypedDict):
    id: str
    subject_id: str
    subject_name: str
    fact_type: str
    fact_text: str
    source_memory_id: str
    source_memory_title: str


class ContextMapEntity(TypedDict):
    entity_type: str
    value: str


class ContextMapLink(TypedDict):
    url: str
    source_memory_id: str
    source_memory_title: str


class ContextMapMeta(TypedDict):
    single_hop: Literal[True]
    memory_limit: int
    subject_limit: int
    fact_limit: int
    link_limit: int
    memories_truncated: bool
    subjects_truncated: bool
    facts_truncated: bool
    links_truncated: bool


class ContextMap(TypedDict):
    source_memory: ContextMapMemoryNode
    connected_memories: List[ContextMapMemoryNode]
    subjects: List[ContextMapSubjectNode]
    facts: List[ContextMapFact]
    shared_entities: List[ContextMapEntity]
    links: List[ContextMapLink]
    meta: ContextMapMeta
    returned_count: int
    truncated: bool
    facts_truncated: bool


class MemoryInsightEvidence(TypedDict, total=False):
    fact_id: Optional[str]
    source_memory_id: Optional[str]
    source_memory_version: Optional[int]
    fact_source_version: Optional[int]
    current_source_version: Optional[int]
    matching_fact_id: Optional[str]
    fact_type: Optional[str]
    subject_id: Optional[str]
    active_linked_memory_count: Optional[int]


class MemoryInsightRequired(TypedDict):
    id: str
    subject_id: str
    insight_type: str
    proposed_action: str
    evidence: MemoryInsightEvidence
    status: Literal["pending"]
    created_at: str


class MemoryInsight(MemoryInsightRequired, total=False):
    fact_id: Optional[str]
    related_fact_id: Optional[str]
    source_memory_id: Optional[str]


class MemoryInsightList(TypedDict):
    items: List[MemoryInsight]
    count: int
