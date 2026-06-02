# Connect ChatGPT with Memside MCP

Memside exposes a hosted MCP server that ChatGPT can connect to when your ChatGPT plan and workspace support custom MCP connectors.

Use this server URL:

```text
https://api.memside.com/mcp/
```

## Setup

Open ChatGPT connector setup, add a new MCP connector, and choose OAuth when asked for the authentication method. Enter the Memside MCP server URL, continue through the OAuth login flow, and sign in with your Memside account.

After the OAuth flow completes, ChatGPT should be able to call Memside tools for search, memory lookup, checkpoint work, and approved memory creation or updates. The exact list of tools may change as Memside improves the MCP surface.

## What ChatGPT Can Access

ChatGPT can only access data for the Memside account that completed the OAuth flow. Secret memories are excluded from AI-facing MCP access, and private attachments still go through owner-scoped backend checks.

Memside uses preview-first responses where possible. Search and startup tools are designed to give useful orientation without dumping every full memory body into the chat.

## Common Values

MCP server URL:

```text
https://api.memside.com/mcp/
```

OAuth authorization is handled by Memside. You should not paste a Google, GitHub, or Memside password into ChatGPT itself.

## Troubleshooting

If OAuth fails, remove the connector and add it again after the issue is fixed. Some clients cache failed connector setup state.

See [Troubleshooting](troubleshooting.md) for common OAuth errors.
