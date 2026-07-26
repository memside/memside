# API Keys

Memside API keys are for direct API access from scripts, tools, and MCP clients that support bearer-token authentication.

Create an API key from the Memside app in the developer or API key settings area. Copy the key when it is shown, because the full secret is only displayed once.

For the shortest setup, follow the
[under-three-minute direct API check](developer-quickstart.md#2-direct-api-in-under-three-minutes).

## Authentication

Use the key as a bearer token:

```bash
Authorization: Bearer mem_sk_your_key_here
```

Do not put API keys in URLs. URLs can be logged by browsers, proxies, servers, and support tools.

## Useful Endpoints

Base URL:

```text
https://api.memside.com
```

Common public API-key routes:

```text
GET /memories
GET /memories/search
GET /memories/{id}
GET /memories/{id}/revisions
GET /memories/{id}/context-map
GET /memories/batch?memory_ids={id}&memory_ids={id}
POST /memories
PATCH /memories/{id}
DELETE /memories/{id} with delete_confirmation
GET /subjects
POST /subjects
GET /subjects/{id}
PATCH /subjects/{id}
GET /subjects/{id}/memories
GET /memories/{id}/subjects
POST /subjects/{id}/memories
DELETE /subjects/{id}/memories/{memory_id}
GET /subjects/{id}/context
GET /subjects/{id}/facts
GET /subjects/{id}/memory-insights
POST /subjects/{id}/fact-suggestions
POST /subjects/{id}/deletion/prepare
DELETE /subjects/{id} with delete_confirmation
GET /context/startup
GET /context/resume
GET /context/workspace-profile
```

API-key agents may read eligible non-secret Subject Facts and submit
source-backed Fact Suggestions. Suggestions require a stable idempotency key
and remain pending until a signed-in user reviews them in Memside. API keys
cannot directly create or edit Facts, list pending suggestions, or review
suggestions.

API-key agents may read a bounded Context Map for an accessible memory and
list pending Memory Insights for an accessible Subject. Insight refresh,
review, and undo remain signed-in application actions.

Some app-only routes are not available to API-key callers. Account management, sensitive app-session flows, private file access, billing, admin, and other non-public product surfaces remain outside the general API-key boundary.

## Example

```bash
curl https://api.memside.com/context/startup \
  -H "Authorization: Bearer mem_sk_your_key_here"
```

See the examples folder for more.

For route details, response shapes, and app-only boundaries, see [Public API Reference](public-api.md).
