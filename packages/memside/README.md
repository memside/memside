# Memside JavaScript SDK

JavaScript client for Memside AI continuity, portable context, checkpoints, operating rules, User AI Profile, and AI Skills.

Documentation: [JavaScript SDK](https://docs.memside.com/developers/javascript-sdk/)

## Install

```bash
npm install memside
```

## Usage

```js
import { MemsideClient } from "memside";

const memside = new MemsideClient({
  apiKey: process.env.MEMSIDE_API_KEY
});

const startup = await memside.context.startup();
console.log(startup);
```

Create a memory with the public `type` and `text` fields:

```js
const memory = await memside.memories.create({
  type: "note",
  text: "Packing checklist\nBring a charger and a reusable bottle.",
  sensitivity: "private"
});
```

Use the current version when updating a Memory you previously read:

```js
const updated = await memside.memories.update(memory.id, {
  text: "Packing checklist\nBring a charger and a reusable bottle.",
  expected_version: memory.version
});
```

Create a Subject and link a non-secret memory:

```js
const subject = await memside.subjects.create({
  name: "Weekend reading",
  subject_type: "topic",
  aliases: ["Reading list"]
});

await memside.subjects.linkMemory(subject.id, memory.id);
const context = await memside.subjects.getContext(subject.id);
```

Read eligible Facts and propose a source-backed addition for user review:

```js
const facts = await memside.subjects.listFacts(subject.id);

const suggestion = await memside.subjects.suggestFact(subject.id, {
  suggestion_type: "add_fact",
  proposed_fact_type: "preference",
  proposed_fact_text: "Prefers printed books for long-form reading.",
  source_memory_id: memory.id,
  idempotency_key: "reading-preference-v1"
});
```

Fact Suggestions remain pending until a signed-in user reviews them. The SDK
does not expose direct Fact mutation or suggestion review.

Read a bounded Context Map and pending Memory Insights:

```js
const contextMap = await memside.memories.getContextMap(memory.id);
const history = await memside.memories.getRevisions(memory.id);
const insights = await memside.subjects.listMemoryInsights(subject.id, {
  limit: 25
});
```

Insight refresh, review, and undo remain signed-in application actions.

Prepare Subject deletion without changing data:

```js
const preview = await memside.subjects.prepareDelete(subject.id);
console.log(preview.required_confirmation);
```

The SDK does not generate or submit Subject deletion confirmation
automatically.

Deletion requires the resource-specific confirmation returned by your
application workflow:

```js
await memside.memories.delete(
  memory.id,
  `CONFIRM_DELETE_${memory.id}`
);
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

This package does not include private Memside application source, account/session internals, billing internals, admin routes, database details, or MCP server implementation.

## API Reference

| Namespace | Methods |
| --- | --- |
| `context` | `startup`, `resume`, `workspaceProfile` |
| `memories` | `list`, `search`, `get`, `getBatch`, `getRevisions`, `getContextMap`, `listSubjects`, `create`, `update`, `delete` |
| `subjects` | `list`, `create`, `get`, `update`, `listMemories`, `linkMemory`, `unlinkMemory`, `getContext`, `listFacts`, `suggestFact`, `listMemoryInsights`, `prepareDelete`, `delete` |

See the curated
[OpenAPI document](https://raw.githubusercontent.com/memside/memside/main/openapi.json)
for public request and response fields.

## API Keys

Create a Memside API key in the Memside app and pass it as `apiKey`, or set:

```bash
MEMSIDE_API_KEY=mem_sk_your_key_here
```

Do not commit real API keys to source control.

## Errors

Failed API requests throw `MemsideError` with:

- `status`
- `code`
- `retryable`
- `retryAfter`
- `requestId`
- `details`

For `429` responses, wait for `retryAfter` before retrying a read. The SDK does
not automatically retry writes.

Eligible responses contain attachment metadata only. Raw attachment data,
private storage locations, and signed download URLs are not returned through
the public API-key contract.

## Compatibility

The package uses additive public methods and typed fields where possible.
Breaking changes require a documented migration path. The client accepts the
current public error envelope and documented legacy `detail` responses during
the V2 compatibility period.

## Requirements

Node.js 18 or newer.

## Links

- [Memside public docs](https://github.com/memside/memside)
- [Memside MCP server](https://api.memside.com/mcp/)
