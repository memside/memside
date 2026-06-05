# Cursor

Cursor supports MCP servers, including remote servers. Use Memside as a remote Streamable HTTP MCP server when your Cursor version supports OAuth for remote MCP.

Memside MCP server URL:

```text
https://api.memside.com/mcp/
```

## Setup

Use Cursor's MCP settings or `mcp.json` flow and add Memside as a remote server. The exact UI can change, but the important value is the Memside MCP URL.

Project config example:

```json
{
  "mcpServers": {
    "memside": {
      "type": "streamable-http",
      "url": "https://api.memside.com/mcp/"
    }
  }
}
```

Common config locations:

- Project config: `.cursor/mcp.json`
- Global config: `~/.cursor/mcp.json`

If Cursor starts an OAuth flow, sign in with your Memside account. If your Cursor version expects headers instead of OAuth, use a Memside API key as a bearer token only if the client supports secure header configuration.

This public repository also includes a root [`.mcp.json`](../../.mcp.json) for directory discovery. Do not add real API keys or user-specific headers to shared repository metadata.

## Cursor Plugin Metadata

This repository includes Cursor plugin metadata at [`.cursor-plugin/plugin.json`](../../.cursor-plugin/plugin.json). The plugin references the root [`.mcp.json`](../../.mcp.json), which points Cursor to Memside's hosted remote MCP server.

The plugin metadata is for discovery and installation. It does not include API keys, bearer tokens, OAuth tokens, or user-specific headers.

## Suggested Use

Cursor is a strong fit for project continuity. Ask it to pull Memside context before planning a change, reviewing a diff, or resuming work in a repository.

Example:

```text
Use Memside to fetch the current project checkpoint and any operating rules before editing.
```
