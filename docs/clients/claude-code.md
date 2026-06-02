# Claude Code

Claude Code can use Memside as a remote MCP server for project continuity, checkpoints, operating rules, and saved memory context. This is useful when you want Claude Code to understand the current repository state before planning, editing, or reviewing code.

Memside MCP server URL:

```text
https://api.memside.com/mcp/
```

## Setup

Add Memside as a remote HTTP MCP server with a Memside API key bearer header:

```bash
claude mcp add --transport http --header "Authorization: Bearer mem_sk_your_memside_api_key" memside https://api.memside.com/mcp/
```

If you want Memside available across all Claude Code projects, add the user scope flag:

```bash
claude mcp add --transport http --scope user --header "Authorization: Bearer mem_sk_your_memside_api_key" memside https://api.memside.com/mcp/
```

After adding the server:

1. Run `claude mcp list` to confirm it was added.
2. Open Claude Code.
3. Use `/mcp` to check server status if needed.

Claude Code stores local or user-scope servers in `~/.claude.json`. Project-scope servers are stored in `.mcp.json` at the project root.

## Suggested Use

Ask Claude Code to load Memside context before it starts work. The most useful pattern is to fetch the current checkpoint and operating rules, then ask Claude Code to explain its understanding before it edits files.

Example:

```text
Use Memside resume context for this repository before proposing changes.
```

## Notes

Claude Code's native Windows notes for local `npx`-based stdio servers do not apply to the Memside remote HTTP setup above. Memside is added as a remote HTTP MCP server.
