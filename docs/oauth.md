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

## Operator Note

For the hosted production service, Google login used by the MCP OAuth flow must allow this callback:

```text
https://api.memside.com/oauth/callback
```

The normal web login flow also uses the auth-service callback:

```text
https://auth.memside.com/api/auth/callback/google
```

Both callbacks are needed because website login and MCP connector login use different public domains.
