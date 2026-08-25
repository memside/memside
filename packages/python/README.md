# Memside Python SDK

Python client for Memside AI continuity, portable context, and Library Templates.

Documentation: [Python SDK](https://docs.memside.com/developers/python-sdk/)

## Install

```bash
pip install memside
```

## Usage

```python
from memside import MemsideClient

client = MemsideClient(api_key="mem_sk_example_key")

startup = client.context_startup()
print(startup)
```

Create a memory with the public `type` and `text` fields:

```python
memory = client.memories_create(
    {
        "type": "note",
        "text": "Packing checklist\nBring a charger and a reusable bottle.",
        "sensitivity": "private",
    }
)
```

Use the current version when updating a previously read Memory:

```python
updated = client.memories_update(
    memory["id"],
    {
        "text": "Packing checklist\nBring a charger and a reusable bottle.",
        "expected_version": memory["version"],
    },
)
```

Create a Subject and link a non-secret memory:

```python
subject = client.subjects_create(
    {
        "name": "Weekend reading",
        "subject_type": "topic",
        "aliases": ["Reading list"],
    }
)

client.subjects_link_memory(subject["id"], memory["id"])
context = client.subjects_get_context(subject["id"])
```

Read eligible Facts and propose a source-backed addition for user review:

```python
facts = client.subjects_list_facts(subject["id"])

suggestion = client.subjects_suggest_fact(
    subject["id"],
    {
        "suggestion_type": "add_fact",
        "proposed_fact_type": "preference",
        "proposed_fact_text": (
            "Prefers printed books for long-form reading."
        ),
        "source_memory_id": memory["id"],
        "idempotency_key": "reading-preference-v1",
    },
)
```

Fact Suggestions remain pending until a signed-in user reviews them. The SDK
does not expose direct Fact mutation or suggestion review.

Read a bounded Context Map and pending Memory Insights:

```python
context_map = client.memories_get_context_map(memory["id"])
history = client.memories_get_revisions(memory["id"])
insights = client.subjects_list_memory_insights(
    subject["id"],
    limit=25,
)
```

Insight refresh, review, and undo remain signed-in application actions.

Prepare Subject deletion without changing data:

```python
preview = client.subjects_prepare_delete(subject["id"])
print(preview["required_confirmation"])
```

The SDK does not generate or submit Subject deletion confirmation
automatically.

Deletion requires the resource-specific confirmation returned by the calling
application workflow:

```python
client.memories_delete(
    memory["id"],
    f"CONFIRM_DELETE_{memory['id']}",
)
```

Search public Library Templates:

```python
templates = client.library_search_templates(
    query="project planning",
    limit=5,
)
```

Read an owned draft before making a revision-protected update:

```python
draft = client.library_read_template(
    "template-id",
    {"file_paths": ["README.md"]},
)

client.library_write_draft(
    "template-id",
    {
        "expected_fingerprint": draft["content_fingerprint"],
        "idempotency_key": "planning-template-v1",
        "files": [
            {
                "path": "README.md",
                "content": "# Project planning\n\nA simple planning checklist.",
                "target": "reusable_template",
            }
        ],
    },
)
```

Template publishing remains a separate workflow action and requires the
permissions and confirmations defined by the public contract.

The API key can also be set through the environment:

```bash
MEMSIDE_API_KEY=mem_sk_example_key
```

## Supported API Areas

This package wraps public Memside API-key routes:

- startup context
- resume context
- workspace profile
- memory listing
- memory search
- memory fetch
- memory revision history
- bounded exact-ID memory batch reads
- bounded memory Context Maps
- memory create
- memory update
- memory delete, when allowed by the API
- Subject listing, creation, retrieval, and update
- Subject-memory listing, linking, and unlinking
- bounded Subject Context
- eligible Subject Fact reads
- source-backed Fact Suggestions for signed-in-user review
- pending-only Memory Insight reads
- guarded Subject deletion preparation and confirmation
- public Library Template search
- creator-owned Template status and draft reads
- revision-protected Template draft replacement
- reviewed Template publication and visibility workflows

This package does not include private Memside application source, account/session internals, billing internals, admin routes, database details, or MCP server implementation.

## API Reference

| Area | Methods |
| --- | --- |
| Context | `context_startup`, `context_resume`, `context_workspace_profile` |
| Memories | `memories_list`, `memories_search`, `memories_get`, `memories_get_batch`, `memories_get_revisions`, `memories_get_context_map`, `memories_list_subjects`, `memories_create`, `memories_update`, `memories_delete` |
| Subjects | `subjects_list`, `subjects_create`, `subjects_get`, `subjects_update`, `subjects_list_memories`, `subjects_link_memory`, `subjects_unlink_memory`, `subjects_get_context`, `subjects_list_facts`, `subjects_suggest_fact`, `subjects_list_memory_insights`, `subjects_prepare_delete`, `subjects_delete` |
| Library | `library_search_templates`, `library_get_creator_status`, `library_read_template`, `library_write_draft`, `library_run_template_workflow` |

See the curated
[OpenAPI document](https://raw.githubusercontent.com/memside/memside/main/openapi.json)
for public request and response fields.

Public request and response shapes are exported as lightweight `TypedDict`
definitions for editors and type checkers. Failed requests raise
`MemsideError`, including `status`, `code`, `retryable`, `retry_after`,
`request_id`, and safe `details`.

For `429` responses, wait for `retry_after` before retrying a read. The SDK
does not automatically retry writes.

Eligible responses contain attachment metadata only. Raw attachment data,
private storage locations, and signed download URLs are not returned through
the public API-key contract.

## Compatibility

The package uses additive public methods and typed fields where possible.
Breaking changes require a documented migration path. The client accepts the
current public error envelope and documented legacy `detail` responses during
the V2 compatibility period.

## Requirements

Python 3.9 or newer.
