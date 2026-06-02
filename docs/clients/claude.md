# Claude and Claude Code

Claude products support MCP in different ways depending on the surface you use. Claude web and desktop connector features may differ from Claude Code. Use the current Anthropic documentation for the exact UI, then use Memside's hosted MCP URL.

Memside MCP server URL:

```text
https://api.memside.com/mcp/
```

## Claude Web or Desktop

If your Claude plan supports remote MCP connectors, add Memside as a remote MCP server and use OAuth when available. After the login flow completes, Claude can call Memside tools for search, context fetch, and continuity workflows.

## Claude Code

For Claude Code, add Memside as a remote MCP server using the current Claude Code MCP command or configuration flow. If Claude Code asks for a header, use a Memside API key as a bearer token.

Example command:

```bash
claude mcp add --transport http --header "Authorization: Bearer mem_sk_your_memside_api_key" memside https://api.memside.com/mcp/
```

If you want the server available across projects, use the current Claude Code user-scope option when adding the server.

Example prompt after setup:

```text
Use Memside resume context for this repository before proposing changes.
```

## Notes

Claude Code and Claude web connectors are related but not identical. If one supports a connection mode before the other, use the mode supported by that specific product.
