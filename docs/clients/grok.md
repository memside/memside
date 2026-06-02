# Grok

Grok can connect to Memside through its custom MCP connector flow with OAuth. Use this when you want Grok to reuse the same project memory, checkpoints, operating rules, and profile context that you use with other AI tools.

Memside MCP server URL:

```text
https://api.memside.com/mcp/
```

## Setup

1. Open Grok on desktop or in your browser.
2. Open Settings.
3. Open Connectors.
4. Choose Add custom connector or Add MCP connector.
5. Choose OAuth if Grok asks for the authentication type.
6. Set Name to `Memside`.
7. Set MCP Server URL to `https://api.memside.com/mcp/`.
8. Save the connector.
9. When Grok asks for authentication, sign in with your Memside account through OAuth.

After authentication, Memside should be available as a connector in Grok. Restart Grok once if the connector does not appear immediately.

You do not need to paste a Memside API key into Grok for this connector flow.

## Suggested Use

Grok can use Memside as a memory and continuity source when you want to carry context from another AI tool into Grok.

Example:

```text
Use Memside to find the latest checkpoint for this project and continue from the saved next action.
```

## Notes

xAI may change the connector UI over time. If labels move, use the current custom MCP connector path, choose OAuth, and keep the Memside MCP server URL unchanged.
