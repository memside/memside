from typing import Dict, List, Literal, TypedDict


LibraryImportTarget = Literal[
    "user_ai_profile",
    "operating_rule",
    "ai_skill",
    "memory",
    "reference",
    "example",
    "reusable_template",
]
LibraryLicense = Literal["NONE", "CC-BY-4.0", "CC0-1.0"]
LibraryWorkflowAction = Literal[
    "create",
    "submit",
    "retry_review",
    "publish",
    "unpublish",
    "republish",
]


class LibraryTemplateRead(TypedDict, total=False):
    file_paths: List[str]
    max_total_chars: int


class _LibraryDraftFileOptional(TypedDict, total=False):
    item_key: str
    skill_variant: Literal["full", "optimized"]


class LibraryDraftFile(_LibraryDraftFileOptional):
    path: str
    content: str
    target: LibraryImportTarget


class _LibraryDraftFolderOptional(TypedDict, total=False):
    description: str


class LibraryDraftFolder(_LibraryDraftFolderOptional):
    path: str
    purpose: LibraryImportTarget


class _LibraryDraftWriteOptional(TypedDict, total=False):
    folders: List[LibraryDraftFolder]


class LibraryDraftWrite(_LibraryDraftWriteOptional):
    expected_fingerprint: str
    idempotency_key: str
    files: List[LibraryDraftFile]


class _LibraryWorkflowOptional(TypedDict, total=False):
    template_id: str
    expected_fingerprint: str
    slug: str
    name: str
    summary: str
    category_slug: str
    tag_slugs: List[str]
    tag_names: List[str]
    license_id: LibraryLicense
    release_notes: str
    ownership_confirmed: bool
    public_data_confirmed: bool


class LibraryWorkflow(_LibraryWorkflowOptional):
    action: LibraryWorkflowAction
    idempotency_key: str


LibraryAutomationResponse = Dict[str, object]
