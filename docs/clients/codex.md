# Codex

Codex can connect to MCP servers through its MCP configuration. Use the hosted Memside MCP server when your Codex version supports remote Streamable HTTP MCP. If Codex asks for an auth header, use a Memside API key as a bearer token.

Memside MCP server URL:

```text
https://api.memside.com/mcp/
```

## CLI Setup

Use the Codex MCP command if available:

```bash
codex mcp add memside --url https://api.memside.com/mcp/
codex mcp list
```

If your Codex setup asks for authentication details, use:

```text
Authorization: Bearer mem_sk_your_memside_api_key
```

If your Codex version uses a TOML config file instead, add Memside under the MCP server configuration using the current Codex config schema. Common config locations are `~/.codex/config.toml` on macOS or Linux and `%USERPROFILE%\.codex\config.toml` on Windows.

Restart Codex after saving the server if the Memside tools do not appear immediately.

## Suggested Use

Codex is useful for implementation and review work. Memside can give Codex the project's current operating rules, checkpoint, and relevant memories before it edits files.

Example:

```text
Use Memside workspace profile and the latest checkpoint before making code changes.
```

## Notes

MCP support can vary by Codex CLI, IDE extension, and release version. If the CLI command is unavailable, check the current Codex MCP documentation for the supported config format.
