# VS Code

VS Code can connect to Memside through MCP when GitHub Copilot Chat and MCP servers are enabled. This lets Copilot Chat use Memside for project memory, checkpoints, operating rules, and profile context while you work in a repository.

Memside MCP server URL:

```text
https://api.memside.com/mcp/
```

## Install From MCP Registry

If Memside is shown in the MCP Registry or VS Code MCP server gallery, use the Install MCP server button and choose VS Code or VS Code Insiders. VS Code can install the server in your user profile or in the current workspace.

After installation, open Copilot Chat, switch to Agent mode, and check the tools menu to confirm Memside tools are available.

The official MCP Registry API can show Memside before VS Code gallery search shows it. If gallery search does not find Memside yet, use manifest install or manual config.

## Install From Manifest

If VS Code supports manifest install, use the raw `server.json` URL:

```text
https://raw.githubusercontent.com/memside/memside/main/server.json
```

After installation, run `MCP: List Servers`, select `memside`, and start or restart it.

## Manual Workspace Setup

The direct setup path is to add Memside to your workspace MCP config:

1. Open your project in VS Code.
2. Create or open `.vscode/mcp.json`.
3. Add the Memside server entry shown below.
4. Save the file.
5. If VS Code asks whether you trust the MCP server, approve it.
6. Open Copilot Chat and start using Memside through MCP.

Use this example:

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "memside-api-key",
      "description": "Memside API key",
      "password": true
    }
  ],
  "servers": {
    "memside": {
      "type": "http",
      "url": "https://api.memside.com/mcp/",
      "headers": {
        "Authorization": "Bearer ${input:memside-api-key}"
      }
    }
  }
}
```

Workspace config is useful when you want the Memside connection tied to one repository. Include `.vscode/mcp.json` in source control only if the file does not contain real secrets.

## User-Level Setup

If you want Memside available across projects, open the Command Palette and use `MCP: Open User Configuration` or `MCP: Add Server`. Use the same Memside MCP URL and bearer header.

Avoid hardcoding real API keys in shared files. For team workspaces, use local user configuration or VS Code input variables instead of committing secrets.

## Expected Success Signals

After setup:

1. Run `MCP: List Servers`.
2. Select `memside`.
3. Start or restart the server.
4. Confirm the server state becomes running.
5. Confirm tools are discovered.

Expected output includes lines similar to:

```text
Starting server memside
Connection state: Running
Discovered tools
```

If VS Code warns that a tool has no description, update Memside or contact support with the warning text. Tool descriptions help agents decide when to call tools.

## Suggested Use

Ask Copilot Chat to load Memside context before it starts changing code.

Example:

```text
Use Memside to fetch the current repository checkpoint and operating rules before editing.
```

## Notes

Some GitHub Copilot plans and organizations can enable, restrict, or disable MCP usage through policy. If Memside tools do not appear after setup, check your VS Code version, Copilot extension version, workspace trust state, MCP server status, and organization policy.

If the registry or gallery does not show Memside, check the official MCP Registry API:

```text
https://registry.modelcontextprotocol.io/v0.1/servers?search=memside
```

If the API shows Memside but VS Code does not, use manual config and retry gallery search later.
