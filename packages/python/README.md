# Memside Python SDK

Python client for Memside AI continuity, portable context, checkpoints, operating rules, User AI Profile, and AI Skills.

## Install

```bash
pip install memside
```

## Usage

```python
from memside import MemsideClient

client = MemsideClient(api_key="mem_sk_your_key_here")

startup = client.context_startup()
print(startup)
```

You can also set the API key through the environment:

```bash
MEMSIDE_API_KEY=mem_sk_your_key_here
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

## Requirements

Python 3.9 or newer.
