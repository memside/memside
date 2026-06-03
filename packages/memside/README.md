# Memside JavaScript SDK

Lightweight JavaScript client for the public Memside API.

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

## Supported API Areas

This package wraps public Memside API-key routes:

- startup context
- resume context
- workspace profile
- memory listing
- memory search
- memory fetch
- memory create
- memory update
- memory delete, when allowed by the API

This package does not include private Memside application source, account/session internals, billing internals, admin routes, database details, or MCP server implementation.

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
- `requestId`
- `details`

## Requirements

Node.js 18 or newer.

## Links

- [Memside public docs](https://github.com/memside/memside)
- [Memside MCP server](https://api.memside.com/mcp/)
