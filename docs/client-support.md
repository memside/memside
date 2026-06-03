# Client Support Matrix

This matrix summarizes public Memside setup paths. Client UI and MCP behavior can change, so treat this as practical setup guidance rather than a permanent compatibility guarantee.

| Client | Recommended auth | Setup path | Status |
| --- | --- | --- | --- |
| ChatGPT | OAuth | Custom MCP connector | Supported setup path |
| Grok | OAuth | Custom MCP connector | Supported setup path |
| Claude web or desktop | OAuth, when available | Remote MCP connector | Supported setup path |
| Claude Code | API-key bearer header | CLI MCP config | Supported setup path |
| VS Code | API-key bearer header | MCP Registry, manifest install, or manual config | Supported setup path |
| GitHub Copilot in VS Code | API-key bearer header | VS Code MCP config | Uses the VS Code setup path |
| Cursor | OAuth or API-key bearer header, depending on version | Remote MCP config | Supported setup path |
| Codex | API-key bearer header, depending on surface | MCP config | Supported setup path |
| Google Antigravity | API-key bearer header, depending on version | MCP config | Supported setup path |
| opencode | OAuth or API-key bearer header, depending on version | MCP config | Supported setup path |

## Known Limitations

- Client galleries can lag the official MCP Registry API.
- Some clients support OAuth for remote MCP, while others require bearer headers.
- Manual config is the most reliable fallback when a gallery or marketplace does not show Memside.
- API-key callers do not get every Memside app feature.
- Secret memories are excluded from AI-facing MCP and API-key flows.
