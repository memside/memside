# Connect Claude and Other MCP Clients

Memside uses MCP so AI tools can access user-approved memory context through a standard tool interface. The hosted MCP endpoint is:

```text
https://api.memside.com/mcp/
```

Use OAuth if your client supports remote MCP OAuth. Use API-key bearer authentication only when your client explicitly supports bearer tokens for remote MCP servers.

## Remote MCP Setup

In a remote MCP client, add Memside as a server with the hosted URL and choose the authentication method supported by that client. If OAuth is available, prefer OAuth because it gives the client a scoped token flow instead of asking you to handle a long-lived API key.

If the client only supports API keys, create a Memside API key in the Memside app and pass it as a bearer token. Keep that key private and revoke it from Memside settings if you stop using the client.

## Local MCP Setup

Some tools still expect local MCP servers instead of hosted remote servers. In that case, use the client documentation for remote HTTP MCP support or wait until the client supports hosted MCP with OAuth or bearer tokens.

Memside does not require a local bridge for the hosted service. The preferred setup is direct remote MCP access to `https://api.memside.com/mcp/`.

## What To Expect

MCP clients can search memories, fetch selected memory details, get startup or resume context, and create or update memory context when the user asks. Secret memories are not included in AI-facing MCP flows.

If a client has trouble connecting, check whether it supports remote MCP over HTTP and which authentication methods it accepts.
