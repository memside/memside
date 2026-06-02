# opencode

opencode supports MCP servers through its configuration. Remote MCP and OAuth support may vary by opencode version, so use the current opencode docs for the latest authentication behavior.

Memside MCP server URL:

```text
https://api.memside.com/mcp/
```

## Remote MCP Setup

If your opencode version supports OAuth for remote MCP servers, configure Memside as a remote server and complete the OAuth flow.

If your version supports remote servers with headers but not OAuth, create a Memside API key and pass it as a bearer token.

Config example:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "memside": {
      "type": "local",
      "command": [
        "npx",
        "-y",
        "mcp-remote",
        "https://api.memside.com/mcp/",
        "--header",
        "Authorization: Bearer mem_sk_your_memside_api_key"
      ],
      "enabled": true
    }
  }
}
```

Common config file locations:

- Windows: `C:\Users\<your-user>\.config\opencode\opencode.json`
- macOS: `~/.config/opencode/opencode.json`

## Suggested Use

Use Memside when opencode needs durable project context before planning, coding, or reviewing.

Example:

```text
Use the memside MCP tools to find the active checkpoint and relevant operating rules.
```

## Notes

Be selective with MCP servers in opencode. MCP tool descriptions and results add context, so only enable the servers you need for the current workflow.
