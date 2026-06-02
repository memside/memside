# VS Code

VS Code can connect to Memside through MCP when GitHub Copilot Chat and MCP servers are enabled. This lets Copilot Chat use Memside for project memory, checkpoints, operating rules, and profile context while you work in a repository.

Memside MCP server URL:

```text
https://api.memside.com/mcp/
```

## Install From MCP Registry

If Memside is shown in the MCP Registry or VS Code MCP server gallery, use the Install MCP server button and choose VS Code or VS Code Insiders. VS Code can install the server in your user profile or in the current workspace.

After installation, open Copilot Chat, switch to Agent mode, and check the tools menu to confirm Memside tools are available.

## Workspace Setup

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
  "servers": {
    "memside": {
      "type": "http",
      "url": "https://api.memside.com/mcp/",
      "headers": {
        "Authorization": "Bearer mem_sk_your_memside_api_key"
      }
    }
  }
}
```

Workspace config is useful when you want the Memside connection tied to one repository. Include `.vscode/mcp.json` in source control only if the file does not contain real secrets.

## User-Level Setup

If you want Memside available across projects, open the Command Palette and use `MCP: Open User Configuration` or `MCP: Add Server`. Use the same Memside MCP URL and bearer header.

Avoid hardcoding real API keys in shared files. For team workspaces, use local user configuration or VS Code input variables instead of committing secrets.

## Suggested Use

Ask Copilot Chat to load Memside context before it starts changing code.

Example:

```text
Use Memside to fetch the current repository checkpoint and operating rules before editing.
```

## Notes

Some GitHub Copilot plans and organizations can enable, restrict, or disable MCP usage through policy. If Memside tools do not appear after setup, check your VS Code version, Copilot extension version, workspace trust state, MCP server status, and organization policy.
