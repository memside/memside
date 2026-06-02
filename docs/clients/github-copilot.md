# GitHub Copilot

GitHub Copilot in VS Code can use Memside through MCP when MCP servers are enabled for your account, workspace, or organization. This lets Copilot Chat retrieve project memory, checkpoints, operating rules, and profile context from Memside while you work in a repository.

Memside MCP server URL:

```text
https://api.memside.com/mcp/
```

## VS Code Setup

GitHub Copilot in VS Code uses VS Code MCP server configuration. For the full setup guide, see [VS Code](vscode.md).

The simplest setup is to add Memside to your workspace MCP config:

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

For most users, workspace config is the easiest place to start because it keeps the Memside connection tied to the repository you are working in.

## User-Level Setup

If you want Memside available across projects, VS Code also supports user-level MCP configuration. Open the Command Palette and use `MCP: Open User Configuration` or `MCP: Add Server`, then use the same Memside MCP URL and bearer header.

## Suggested Use

Ask Copilot Chat to load Memside context before it starts changing code. A useful pattern is to retrieve the active checkpoint and operating rules, then ask Copilot to summarize what it found.

Example:

```text
Use Memside to fetch the current repository checkpoint and operating rules before editing.
```

## Notes

Some GitHub Copilot plans and organizations can enable, restrict, or disable MCP usage through policy. If Copilot does not show MCP tools after setup, check your VS Code version, Copilot extension version, workspace trust state, and organization policy.
