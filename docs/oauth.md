# OAuth Notes

Memside uses OAuth for hosted MCP connector setup. This lets clients such as ChatGPT connect without asking you to paste a Memside password into the client.

The public MCP server URL is:

```text
https://api.memside.com/mcp/
```

OAuth metadata is available from the Memside API domain:

```text
https://api.memside.com/.well-known/oauth-protected-resource
https://api.memside.com/.well-known/oauth-authorization-server
```

## Login During OAuth

During MCP OAuth setup, Memside may send you through a normal account login step. The OAuth token issued to the MCP client is scoped to your Memside account and the Memside MCP resource.

Do not share OAuth codes, access tokens, refresh tokens, or API keys. If you think a token or key was exposed, remove the connector or revoke the key from Memside settings.

## Discovery Checks

If a client has trouble starting OAuth, first check that the public discovery documents are reachable:

```text
https://api.memside.com/.well-known/oauth-protected-resource
https://api.memside.com/.well-known/oauth-authorization-server
```

Both endpoints return JSON from the Memside API domain. If either URL fails, the connector will usually fail before the user reaches the login step.

For user-facing setup errors, see [Troubleshooting](troubleshooting.md).
