# API Keys

Memside API keys are for direct API access from scripts, tools, and MCP clients that support bearer-token authentication.

Create an API key from the Memside app in the developer or API key settings area. Copy the key when it is shown, because the full secret is only displayed once.

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
POST /memories
PATCH /memories/{id}
DELETE /memories/{id}
GET /context/startup
GET /context/resume
GET /context/workspace-profile
```

Some app-only routes are not available to API-key callers. Account management, sensitive app-session flows, private file access, billing, admin, and other non-public product surfaces remain outside the general API-key boundary.

## Example

```bash
curl https://api.memside.com/context/startup \
  -H "Authorization: Bearer mem_sk_your_key_here"
```

See the examples folder for more.

For route details, response shapes, and app-only boundaries, see [Public API Reference](public-api.md).
