# Claude

Claude products support MCP in different ways depending on the surface you use. Claude web and desktop connector features may differ from Claude Code. Use the current Anthropic documentation for the exact UI, then use Memside's hosted MCP URL.

Memside MCP server URL:

```text
https://api.memside.com/mcp/
```

## Claude Web or Desktop

If your Claude plan supports remote MCP connectors, add Memside as a remote MCP server and use OAuth when available. After the login flow completes, Claude can call Memside tools for search, context fetch, and continuity workflows.

## Claude Code

Claude Code has its own setup guide because it uses CLI/config flows rather than the same connector UI as Claude web or desktop. See [Claude Code](claude-code.md).

## Notes

Claude Code and Claude web connectors are related but not identical. Use the setup path for the specific Claude product you are connecting.
