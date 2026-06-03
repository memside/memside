# Client Support Matrix

This matrix summarizes public Memside setup paths. Client UI and MCP behavior can change, so treat this as practical setup guidance rather than a permanent compatibility guarantee.

| Client | Recommended auth | Setup path | Current confidence | Last checked |
| --- | --- | --- | --- | --- |
| ChatGPT | OAuth | Custom MCP connector | Setup guide prepared, live retest pending | 2026-06-02 |
| Grok | OAuth | Custom MCP connector | Setup guide prepared, live retest pending | 2026-06-02 |
| Claude web or desktop | OAuth, when available | Remote MCP connector | Setup guide prepared, live retest pending | 2026-06-02 |
| Claude Code | API-key bearer header | CLI MCP config | Setup guide prepared, live retest pending | 2026-06-02 |
| VS Code | API-key bearer header | MCP Registry, manifest install, or manual config | Manual config tested with tools discovered | 2026-06-02 |
| GitHub Copilot in VS Code | API-key bearer header | VS Code MCP config | Follows VS Code path | 2026-06-02 |
| Cursor | OAuth or API-key bearer header, depending on version | Remote MCP config | Setup guide prepared, live retest pending | 2026-06-02 |
| Codex | API-key bearer header, depending on surface | MCP config | Setup guide prepared, live retest pending | 2026-06-02 |
| Google Antigravity | API-key bearer header, depending on version | MCP config | Setup guide prepared, live retest pending | 2026-06-02 |
| opencode | OAuth or API-key bearer header, depending on version | MCP config | Setup guide prepared, live retest pending | 2026-06-02 |

## Known Limitations

- Client galleries can lag the official MCP Registry API.
- Some clients support OAuth for remote MCP, while others require bearer headers.
- Manual config is the most reliable fallback when a gallery or marketplace does not show Memside.
- API-key callers do not get every Memside app feature.
- Secret memories are excluded from AI-facing MCP and API-key flows.
- Retest tool behavior after material MCP server changes.
