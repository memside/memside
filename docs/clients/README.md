# Connect AI Clients

Memside is designed to work as a continuity layer across multiple AI clients. The hosted MCP server is:

```text
https://api.memside.com/mcp/
```

Use OAuth when the client supports remote MCP OAuth. Use API-key bearer authentication when the client supports remote MCP headers or direct API calls but does not support OAuth.

Client support changes quickly. The pages in this section give practical setup notes for common tools, but always compare them with the current client documentation if a UI or config format has changed.

## Client Guides

- [ChatGPT](chatgpt.md)
- [Grok](grok.md)
- [Claude and Claude Code](claude.md)
- [Cursor](cursor.md)
- [Codex](codex.md)
- [Google Antigravity](antigravity.md)
- [opencode](opencode.md)

## Choosing Auth

OAuth is preferred when available because it lets the client complete a scoped sign-in flow. API keys are useful for clients that support custom headers but do not yet support OAuth for remote MCP.

Do not put API keys in URLs. Use bearer headers or the client's secure environment variable mechanism.
