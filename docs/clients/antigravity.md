# Google Antigravity

Google Antigravity supports MCP configuration through its MCP server management flow. Use Memside as a remote MCP server when your Antigravity version supports the required remote transport and authentication.

Memside MCP server URL:

```text
https://api.memside.com/mcp/
```

## Setup

Open Antigravity's MCP server management UI and add a remote MCP server named `memside`. Use the Memside MCP URL above.

If you edit the raw MCP config, follow the current Antigravity schema. A remote server entry should point to the Memside hosted MCP URL, and OAuth should be used if Antigravity offers it for that server.

## Suggested Use

Antigravity is useful when an agent needs project context while working inside an IDE. Memside can provide the latest checkpoint, rules, and related project notes without requiring the user to paste long context into the IDE.

Example:

```text
Use Memside to load the startup context for this workspace, then inspect the current task.
```

## Notes

Antigravity's MCP configuration format may change across releases. If a raw config example stops working, use the built-in MCP server UI and the Memside URL above.
