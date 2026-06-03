# Memside

Memside is an AI continuity and memory hub for people who work across ChatGPT, Claude, Grok, IDEs, coding agents, and other AI tools that support OAuth, MCP, or API-key connections. It gives you a private place to save reusable context, decisions, operating rules, project notes, and checkpoints so you can move from one AI to another without rebuilding the same background every time.

Use Memside when you want your AI context to survive beyond one chat window. A connected AI tool can retrieve the right memory, continue a project from a checkpoint, follow your saved working preferences, or create new durable context after you approve it. This repository is the public home for Memside integration docs, examples, and support information. It is not a mirror of the private production application source.

## Connect Memside

Memside supports hosted MCP access for AI tools that can connect to remote MCP servers. MCP gives compatible AI clients a standard way to use Memside as a continuity layer instead of locking your memory into one assistant.

```text
https://api.memside.com/mcp/
```

If your AI tool supports OAuth for MCP, choose OAuth during setup and sign in with your Memside account. If your tool supports API-key auth instead, create an API key in Memside and use it as a bearer token.

Start here:

- [Developer quickstart](docs/developer-quickstart.md)
- [JavaScript SDK](packages/memside/README.md)
- [Python SDK](packages/python/README.md)
- [Capabilities](docs/capabilities.md)
- [Token savings and context reuse](docs/token-savings.md)
- [Memory types and sensitivity](docs/memory-types.md)
- [Connect AI clients](docs/clients/README.md)
- [Client support matrix](docs/client-support.md)
- [Install in VS Code](docs/clients/vscode.md)
- [Use Memside with API keys](docs/api-keys.md)
- [Public API reference](docs/public-api.md)
- [MCP Registry metadata](docs/mcp-registry.md)
- [Troubleshooting](docs/troubleshooting.md)

## Developer Quickstart

Use the path that matches your tool.

| Goal | Use | Start here |
| --- | --- | --- |
| Connect ChatGPT, Grok, Claude, or another hosted client | OAuth MCP | [Client guides](docs/clients/README.md) |
| Connect IDEs and coding agents such as VS Code, Copilot, Cursor, Claude Code, Codex, Antigravity, opencode, or a local MCP client | Bearer-header MCP | [VS Code guide](docs/clients/vscode.md) |
| Call Memside from scripts or automation | API key | [API keys](docs/api-keys.md) |

For a direct API smoke test, create a Memside API key and run:

```bash
curl https://api.memside.com/context/startup \
  -H "Authorization: Bearer mem_sk_your_key_here"
```

For a runnable JavaScript example:

```bash
cd examples/javascript
npm run startup
```

Set `MEMSIDE_API_KEY` before running examples. See [Developer quickstart](docs/developer-quickstart.md) for the full setup.

## JavaScript SDK

Memside publishes a lightweight JavaScript SDK for public API-key workflows:

```bash
npm install memside
```

Basic usage:

```js
import { MemsideClient } from "memside";

const memside = new MemsideClient({
  apiKey: process.env.MEMSIDE_API_KEY
});

const startup = await memside.context.startup();
console.log(startup);
```

The JavaScript SDK wraps public Memside API routes for startup context, resume context, workspace profile, and memory operations. See [packages/memside](packages/memside/README.md) for package details.

## Python SDK

Memside also publishes a lightweight Python SDK for public API-key workflows:

```bash
pip install memside
```

Basic usage:

```python
from memside import MemsideClient

client = MemsideClient(api_key="mem_sk_your_key_here")

startup = client.context_startup()
print(startup)
```

The Python SDK wraps the same public Memside API areas as the JavaScript SDK. See [packages/python](packages/python/README.md) for package details.

## MCP Server Setup

Use this hosted MCP server URL in clients that support remote MCP:

```text
https://api.memside.com/mcp/
```

For ChatGPT, Grok, Claude, and other clients that offer OAuth during MCP setup, choose OAuth and sign in with your Memside account.

For clients that use bearer headers, create a Memside API key and pass it as:

```text
Authorization: Bearer mem_sk_your_memside_api_key
```

VS Code and GitHub Copilot can use a workspace `.vscode/mcp.json` file:

```json
{
  "servers": {
    "memside": {
      "type": "http",
      "url": "https://api.memside.com/mcp/",
      "headers": {
        "Authorization": "Bearer mem_sk_your_memside_api_key"
      }
    }
  }
}
```

Keep real API keys out of shared files. Use local user-level configuration or secret storage when the config is shared with a team.

Detailed setup guides are available for [VS Code](docs/clients/vscode.md), [GitHub Copilot](docs/clients/github-copilot.md), [ChatGPT](docs/clients/chatgpt.md), [Grok](docs/clients/grok.md), [Claude Code](docs/clients/claude-code.md), [Cursor](docs/clients/cursor.md), [Codex](docs/clients/codex.md), [Antigravity](docs/clients/antigravity.md), and [opencode](docs/clients/opencode.md).

## MCP Registry

This repository includes `server.json` for the official MCP Registry. It describes Memside as a hosted remote MCP server using Streamable HTTP at:

```text
https://api.memside.com/mcp/
```

The registry entry is published under:

```text
io.github.memside/memside
```

See [MCP Registry metadata](docs/mcp-registry.md) for validation and smoke-test notes.

## What You Can Do

With Memside connected, an AI tool can search your saved memories, fetch specific context, create new memories after you approve, update checkpoints, and build compact startup or resume packets. The goal is to keep useful context portable without turning every AI conversation into a long manual setup step.

This is useful when you want to move a project between ChatGPT, Claude, Grok, IDEs, coding agents, or other compatible AI clients. Memside can help the next AI understand what you are building, what decisions were already made, what rules it should follow, and what the next step is.

Memside keeps the normal product boundary intact. Private user data is scoped to the signed-in user, secret memories are excluded from AI-facing MCP and API-key flows, and destructive actions require stronger confirmation.

## Key Features

Memside is designed around continuity, selective context retrieval, and user control. The core features are:

- [Startup and resume context](docs/token-savings.md) for compact handoffs.
- [Operating Rules](docs/operating-rules.md) for durable behavior guidance.
- [User AI Profile](docs/user-ai-profile.md) for personal working preferences.
- [AI Skills](docs/ai-skills.md) for reusable instruction packs.
- [Public, private, and secret memories](docs/memory-types.md) for practical data boundaries.
- [MCP and API-key access](docs/clients/README.md) for connecting multiple AI clients.

## API Examples

The examples in this repo use public Memside API surfaces only.

- [curl examples](examples/curl/README.md)
- [JavaScript examples](examples/javascript/README.md)
- [Python examples](examples/python/README.md)

The JavaScript and Python examples use normal HTTP requests against public Memside API surfaces.

## Public Repo Scope

This repo contains:

- setup guides for MCP clients
- MCP Registry metadata
- technical product capability docs
- API-key usage examples
- developer quickstart and runnable examples
- public troubleshooting notes
- security and support information
- public changelog entries

This repo does not contain:

- private Memside application source
- secrets or deployment configuration
- database or internal operations notes
- non-public product architecture

## Support

For support, contact [support@memside.com](mailto:support@memside.com) or use the support links in the Memside app.

Security reports should follow [SECURITY.md](SECURITY.md).

## Copyright and Use

Copyright (c) 2026 Memside. All rights reserved.

This repository is public documentation, not open-source application code. See [LICENSE.md](LICENSE.md) for the repository terms.

Memside and related names, product concepts, documentation, and branding remain the property of their respective owners.
