# Public API Reference

This page covers the public API-key surface used by scripts, examples, and MCP clients that support bearer headers. It does not describe private application internals.

Base URL:

```text
https://api.memside.com
```

Authentication:

```text
Authorization: Bearer mem_sk_your_key_here
```

Do not send API keys in query strings.

Machine-readable contract: [openapi.json](../openapi.json)

## Response Envelope

Successful responses generally include useful resource fields directly in the JSON payload. MCP-style responses may include an `ok` field and request metadata.

Example success shape:

```json
{
  "ok": true,
  "request_id": "req_example",
  "matches": []
}
```

Example error shape:

```json
{
  "ok": false,
  "error": {
    "code": "unauthorized",
    "message": "Missing credentials",
    "status": 401,
    "retryable": false
  }
}
```

Common HTTP status codes:

| Status | Meaning |
| --- | --- |
| 200 | Request succeeded |
| 201 | Resource was created |
| 400 | Invalid request or unsupported argument |
| 401 | Missing or invalid credentials |
| 403 | Authenticated, but access is not allowed |
| 404 | Resource was not found for the authenticated user |
| 409 | Resource version or state conflict |
| 413 | Request exceeds a published payload bound |
| 422 | Request validation failed |
| 429 | Rate limit exceeded |
| 500 | Server error |
| 503 | Service temporarily unavailable |

## Supported API-Key Routes

These routes are intended for public API-key callers.

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/context/startup` | Load compact startup context |
| `GET` | `/context/resume` | Load resume context from a checkpoint or scope |
| `GET` | `/context/workspace-profile` | Build a compact workspace profile |
| `GET` | `/memories` | List memories available to the authenticated user |
| `GET` | `/memories/search` | Search memories with query and filters |
| `GET` | `/memories/{id}` | Fetch one memory by id |
| `GET` | `/memories/{id}/revisions` | List sanitized revision history for one accessible memory |
| `GET` | `/memories/{id}/context-map` | Fetch a bounded connected-context view for one accessible memory |
| `GET` | `/memories/batch?memory_ids={id}&memory_ids={id}` | Fetch 1-8 exact known memories in one bounded read |
| `POST` | `/memories` | Create a memory |
| `PATCH` | `/memories/{id}` | Update a memory |
| `DELETE` | `/memories/{id}` | Delete a memory with explicit confirmation when allowed |
| `GET` | `/subjects` | List and filter Subjects |
| `POST` | `/subjects` | Create a Subject |
| `GET` | `/subjects/{id}` | Fetch one Subject |
| `PATCH` | `/subjects/{id}` | Update one Subject |
| `GET` | `/subjects/{id}/memories` | List non-secret memories linked to a Subject |
| `GET` | `/memories/{id}/subjects` | List Subjects linked to a non-secret memory |
| `POST` | `/subjects/{id}/memories` | Link a non-secret memory to a Subject |
| `DELETE` | `/subjects/{id}/memories/{memory_id}` | Unlink a memory from a Subject |
| `GET` | `/subjects/{id}/context` | Fetch bounded, sanitized Subject Context |
| `GET` | `/subjects/{id}/facts` | List eligible active Facts and optional public history |
| `GET` | `/subjects/{id}/memory-insights` | List pending Memory Insights for an accessible Subject |
| `POST` | `/subjects/{id}/fact-suggestions` | Propose a source-backed Fact change for user review |
| `POST` | `/subjects/{id}/deletion/prepare` | Preview Subject deletion without mutation |
| `DELETE` | `/subjects/{id}` | Delete a Subject with explicit confirmation when allowed |

Availability can be narrower than the app UI. If a route returns an access error for an API key, use the Memside app or contact support.

## Approved Workflows

The 26 routes above support five public workflows:

- load startup, resume, or workspace context
- create, search, read, update, inspect, and explicitly delete memories
- organize non-secret memories with Subjects and links
- read eligible Facts and submit source-backed Fact Suggestions
- read bounded Context Maps and pending Memory Insights

## App-Only Surfaces

The public API-key surface is intentionally smaller than the Memside app. Account management, sensitive app-session flows, private file access, billing, admin, and other non-public product surfaces are not general API-key routes.

## Memory Sensitivity

Public and private memories can be available to connected AI tools when the authenticated user asks for them and the access path allows it.

Secret memories are app-only and are excluded from AI-facing MCP and API-key flows.

The bounded batch read preserves first-seen order, removes duplicate IDs,
charges rate limits per unique ID, limits each memory body to 2,000 characters
and combined body text to 12,000 characters, and returns an item-level result
for each accessible or unavailable ID. Raw attachment data is never returned.
API-key requests report secret and foreign-owner IDs as unavailable without
returning or confirming their contents.

All resource reads are owner-scoped. A caller cannot use a known identifier to
read another user's resource. Secret memories and secret-derived context remain
outside API-key and AI-facing responses.

## Attachment Metadata

Eligible memory responses may include safe attachment metadata such as an
identifier, filename, media type, size, and whether metadata is available.
Public API-key responses do not include raw attachment bytes, private storage
locations, signed download URLs, or storage-provider details.

## Destructive Confirmation

Memory deletion requires both the account permission and an exact,
resource-specific confirmation:

```json
{
  "delete_confirmation": "CONFIRM_DELETE_memory-id"
}
```

The JavaScript and Python SDK methods accept this confirmation as their second
argument. Neither SDK retries writes automatically.

Subject deletion uses a separate preparation request. The preview returns the
exact confirmation and explains the effect before any mutation. Confirmed
deletion removes the Subject, its links, Facts, and pending suggestions while
preserving linked memories. The SDK never constructs the confirmation.

## Updates and Concurrency

Memory updates may include `expected_version`. When the supplied value no
longer matches the current Memory version, the API returns a version conflict
instead of silently overwriting newer data.

```json
{
  "text": "Travel checklist\nPack a reusable bottle.",
  "expected_version": 2
}
```

Fetch the latest Memory and decide whether to retry. Neither SDK automatically
retries writes.

## Facts and Suggestions

Fact retrieval defaults to active, non-secret Facts. Callers may explicitly
request eligible history, but public responses omit private review metadata
and app-only fields.

Fact Suggestions require a source Memory and a stable caller-provided
`idempotency_key`. Replaying the same suggestion with the same key returns the
existing result instead of creating a duplicate. API-key callers cannot
directly mutate Facts or list, accept, edit, or reject pending suggestions.
Those review actions remain signed-in-user behavior.

## Connected Context and Insights

The Context Map is a bounded read that summarizes eligible connections around
one accessible Memory. It does not return secret memories or raw attachment
data.

The API-key Insight route is read-only and limited to pending items. Refresh,
review, and undo actions remain signed-in application behavior.

## SDK Error Compatibility

The SDKs parse the current public error envelope and compatibility responses
that contain a string or structured `detail`. Errors expose the HTTP status,
stable code when available, retryability, request ID, safe details, and the
`Retry-After` header when present.

## Rate Limits and Retries

Every API-key request is rate limited. A throttled request returns `429` and a
`Retry-After` header. Wait for that duration before retrying a read. Do not
automatically retry creates, updates, links, suggestions, or deletions because
the caller must decide whether replay is safe.

Bounded exact-ID batch reads charge per unique requested ID. Fact Suggestions
use a caller-supplied `idempotency_key`, so replaying the same logical
suggestion with the same key returns the existing result.

## Versioning and Compatibility

The curated OpenAPI document and SDK packages identify their public contract
version. Additive methods and fields are introduced without removing existing
methods. Incompatible changes require an explicit migration path and changelog
entry; deprecated behavior remains documented during its compatibility period.

The SDKs accept both the current error envelope and documented legacy
`detail` responses during the V2 compatibility period.

## Troubleshooting

If an API request fails:

- confirm the `Authorization` header is present
- confirm the key starts with `mem_sk_`
- confirm the route supports API-key access
- avoid query-string keys
- check whether the memory is outside the API-key access boundary
- include the client name, route, error text, and approximate time when contacting support
