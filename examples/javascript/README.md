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
npm run search -- launch
```

Create a memory:

```bash
npm run create-memory
```

The create-memory example writes to your Memside account. Read `create-memory.mjs` before running it.

## Files

- `memside-client.mjs`: small shared API helper
- `startup.mjs`: calls `GET /context/startup`
- `search.mjs`: calls `GET /memories/search`
- `create-memory.mjs`: calls `POST /memories`

These examples are intentionally small. They are not a full SDK.
