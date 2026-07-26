# JavaScript Examples

These examples use the built-in Node `fetch` API against the public Memside API.

Requirements:

- Node 20 or newer
- a Memside API key

Set your API key first.

macOS or Linux:

```bash
export MEMSIDE_API_KEY="mem_sk_your_key_here"
```

Windows PowerShell:

```powershell
$env:MEMSIDE_API_KEY = "mem_sk_your_key_here"
```

## Run

```bash
npm run startup
```

Search memories:

```bash
npm run search -- packing
```

Read compact Context:

```bash
npm run context -- personal-planning
```

Pass a known checkpoint ID as the second argument to include resume context.
Without one, the workflow reads startup and workspace context only.

Read Memory or Subject workflows. Omit the identifier to use the first
accessible item:

```bash
npm run memory-read -- memory-id
npm run subject-read -- subject-id
```

Create a memory:

```bash
npm run create-memory
```

The create-memory example writes to your Memside account. Read `create-memory.mjs` before running it.

Update and organization examples also write data and require explicit caller
inputs:

```bash
npm run update-memory -- memory-id 2 "Travel checklist updated"
npm run subject-workflow -- memory-id stable-idempotency-key
```

Deletion examples never construct confirmations. Prepare Subject deletion
first, then pass the exact confirmation only after reviewing it:

```bash
npm run prepare-subject-delete -- subject-id
npm run delete-subject -- subject-id exact-confirmation
npm run delete-memory -- memory-id exact-confirmation
```

## Files

- `memside-client.mjs`: small shared API helper
- `startup.mjs`: calls `GET /context/startup`
- `context-workflow.mjs`: reads startup and workspace context, plus resume
  context when a checkpoint ID is supplied
- `search.mjs`: calls `GET /memories/search`
- `memory-read-workflow.mjs`: reads one Memory, batch result, revisions,
  Context Map, and linked Subjects
- `subject-read-workflow.mjs`: reads one Subject, linked memories, Context,
  Facts, and pending Insights
- `create-memory.mjs`: calls `POST /memories`
- `update-memory.mjs`: updates with a caller-provided expected version
- `subject-workflow.mjs`: creates a Subject, links a Memory, and submits a
  caller-idempotent Fact Suggestion
- deletion scripts require caller-provided identifiers and confirmations

These examples are intentionally small. They are not a full SDK.
