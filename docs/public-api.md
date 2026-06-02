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
| 429 | Rate limit exceeded |
| 500 | Server error |

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
| `POST` | `/memories` | Create a memory |
| `PATCH` | `/memories/{id}` | Update a memory |
| `DELETE` | `/memories/{id}` | Delete a memory when allowed |

Availability can be narrower than the app UI. If a route returns an access error for an API key, use the Memside app or contact support.

## App-Only Surfaces

The public API-key surface is intentionally smaller than the Memside app. Account management, sensitive app-session flows, private file access, billing, admin, and other non-public product surfaces are not general API-key routes.

## Memory Sensitivity

Public and private memories can be available to connected AI tools when the authenticated user asks for them and the access path allows it.

Secret memories are app-only and are excluded from AI-facing MCP and API-key flows.

## Troubleshooting

If an API request fails:

- confirm the `Authorization` header is present
- confirm the key starts with `mem_sk_`
- confirm the route supports API-key access
- avoid query-string keys
- check whether the memory is outside the API-key access boundary
- include the client name, route, error text, and approximate time when contacting support
