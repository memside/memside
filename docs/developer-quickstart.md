# Developer Quickstart

This guide is for developers who want to connect Memside quickly without reading every product doc first.

## 1. Choose a Connection Path

| Use case | Recommended path |
| --- | --- |
| ChatGPT, Grok, Claude, or another hosted client with OAuth | Remote MCP with OAuth |
| IDEs and coding agents such as VS Code, GitHub Copilot, Cursor, Claude Code, Codex, Antigravity, opencode, or a local MCP client | Remote MCP with bearer header |
| Scripts, automation, or direct API access | Direct API with a Memside API key |

Hosted MCP server:

```text
https://api.memside.com/mcp/
```

API base URL:

```text
https://api.memside.com
```

## 2. Try the Direct API

Create a Memside API key in the app, then set it as an environment variable.

macOS or Linux:

```bash
export MEMSIDE_API_KEY="mem_sk_your_key_here"
```

Windows PowerShell:

```powershell
$env:MEMSIDE_API_KEY = "mem_sk_your_key_here"
```

Run:

```bash
curl https://api.memside.com/context/startup \
  -H "Authorization: Bearer $MEMSIDE_API_KEY"
```

Expected result: JSON from Memside. If the key is missing or invalid, Memside returns an auth error.

## 3. Run the JavaScript Example

The JavaScript examples use the built-in Node `fetch` API and do not require a package install.

```bash
cd examples/javascript
npm run startup
```

Other available scripts:

```bash
npm run search -- launch
npm run create-memory
```

The create-memory example writes to your Memside account. Read the script before running it.

## 4. Connect VS Code or Copilot

If Memside appears in the VS Code MCP server gallery, install it from there.

If it does not appear yet, use manual config. Open Command Palette, run `MCP: Open User Configuration`, and add:

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "memside-api-key",
      "description": "Memside API key",
      "password": true
    }
  ],
  "servers": {
    "memside": {
      "type": "http",
      "url": "https://api.memside.com/mcp/",
      "headers": {
        "Authorization": "Bearer ${input:memside-api-key}"
      }
    }
  }
}
```

Then run `MCP: List Servers`, start `memside`, and confirm the server shows as running.

See [VS Code](clients/vscode.md) for registry, manifest, and manual setup paths.

## 5. What to Try First

After connecting an AI client, ask:

```text
Use Memside startup context and tell me what context you found.
```

For direct API work, start with:

- `GET /context/startup`
- `GET /memories/search?q=launch&limit=5`
- `POST /memories`

See [Public API Reference](public-api.md) for supported routes and response shapes.

## Safety Notes

- Do not put API keys in URLs.
- Do not commit API keys into shared config files.
- Secret memories are excluded from AI-facing MCP and API-key flows.
- Some app features are intentionally app-only and are not exposed to API-key callers.
