# Google Antigravity

Google Antigravity supports MCP configuration through its MCP server management flow. Use Memside as a remote MCP server when your Antigravity version supports the required remote transport and authentication.

Memside MCP server URL:

```text
https://api.memside.com/mcp/
```

## Setup

Open Antigravity's MCP server management UI and add a server named `memside`. In the current Antigravity flow, open Settings, open Antigravity user settings, go to Customizations, and choose Open MCP Config. This opens `mcp_config.json`.

Add the Memside server entry and save the file:

```json
{
  "mcpServers": {
    "memside": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://api.memside.com/mcp/",
        "--header",
        "Authorization: Bearer mem_sk_your_memside_api_key"
      ]
    }
  }
}
```

Common config file locations:

- Windows: `C:\Users\<your-user>\.gemini\antigravity\mcp_config.json`
- macOS: `~/.gemini/antigravity/mcp_config.json`

Restart Antigravity after saving the config. If your Antigravity version offers a native OAuth remote-server flow, use OAuth and the same Memside MCP URL.

## Suggested Use

Antigravity is useful when an agent needs project context while working inside an IDE. Memside can provide the latest checkpoint, rules, and related project notes without requiring the user to paste long context into the IDE.

Example:

```text
Use Memside to load the startup context for this workspace, then inspect the current task.
```

## Notes

Antigravity's MCP configuration format may change across releases. If a raw config example stops working, use the built-in MCP server UI and the Memside URL above.
