# ChatGPT

ChatGPT can connect to Memside through a custom MCP connector when custom connectors are available for your plan or workspace.

Use this MCP server URL:

```text
https://api.memside.com/mcp/
```

Choose OAuth during connector setup. ChatGPT opens the Memside OAuth flow, you sign in with your Memside account, and ChatGPT receives an MCP token for that account.

## Setup

Open ChatGPT connector setup, create a custom MCP connector, enter the Memside MCP server URL, and choose OAuth. After the login flow completes, remove any failed earlier connector attempt and reconnect if the client appears to reuse old state.

Once connected, ask ChatGPT to use Memside when it needs durable context.

Example:

```text
Use Memside startup context for this project, then summarize the current goal and next action.
```

## Notes

Do not paste your Memside password or API key into ChatGPT. OAuth handles the connection.

If Google shows `redirect_uri_mismatch` during setup, see [Troubleshooting](../troubleshooting.md).
