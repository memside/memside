# OAuth Notes

Memside uses OAuth for hosted MCP connector setup. This lets clients such as ChatGPT, Claude, Grok, and other compatible AI tools connect without asking you to paste a Memside password into the client.

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

During MCP OAuth setup, Memside may send you through a normal account login step. The OAuth access granted to the MCP client is tied to your Memside account and the Memside MCP resource.

Review the client and connection request before approving access. Connected AI tools can process information they are authorized to access, and third-party tools may have their own terms and privacy policies.

## Revoke and Disconnect

If you no longer trust a connector, remove or disconnect Memside from that AI tool's app or connector settings where supported. If the connection uses a Memside API key instead of OAuth, revoke the key in Memside settings.

If you permanently delete your Memside account, active connector and API access associated with that account is removed as part of account deletion.

Do not share OAuth codes, access tokens, refresh tokens, or API keys. If you think a token or key was exposed, remove the connector or revoke the key as soon as possible.

## Discovery Checks

If a client has trouble starting OAuth, first check that the public discovery documents are reachable:

```text
https://api.memside.com/.well-known/oauth-protected-resource
https://api.memside.com/.well-known/oauth-authorization-server
```

Both endpoints return JSON from the Memside API domain. If either URL fails, the connector will usually fail before the user reaches the login step.

For user-facing setup errors, see [Troubleshooting](troubleshooting.md).
