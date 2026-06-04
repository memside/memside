# MCP Registry Metadata

Memside is published to the official MCP Registry as a hosted remote MCP server.

Registry name:

```text
io.github.memside/memside
```

Remote MCP URL:

```text
https://api.memside.com/mcp/
```

The registry metadata lives in [`server.json`](../server.json). It uses the official server schema and the `remotes` property for a Streamable HTTP server.

## What `server.json` Does

`server.json` tells MCP registries and downstream MCP marketplaces how to find Memside. It does not contain private source code, secrets, deployment settings, or user data.

The file includes:

- the registry name
- the display title and short description
- the public GitHub repository URL
- the metadata version
- the remote MCP endpoint
- the required bearer header for API-key based clients

## Third-Party Directory Metadata

Some third-party MCP directories use their own repository metadata in addition to the official MCP Registry file.

Memside includes:

- [`glama.json`](../glama.json) for Glama repository ownership claiming.
- [`.plugin/plugin.json`](../.plugin/plugin.json) for Open Plugins metadata.
- [`.mcp.json`](../.mcp.json) for Open Plugins and Cursor-style MCP discovery.

These files describe Memside as a hosted remote MCP server at:

```text
https://api.memside.com/mcp/
```

They must not contain real API keys, OAuth client secrets, reviewer credentials, private URLs, or internal architecture notes.

If a directory reports the hosted MCP server as unhealthy, keep the MCP endpoint authenticated. Do not make the MCP endpoint public just to satisfy a crawler. Use the correct MCP URL, OAuth setup, API-key setup where supported, or the directory's private verification process.

Glama domain ownership through `/.well-known/glama.json` must be served by the live domain being claimed. Adding that file to this public repository alone does not make it available at `https://www.memside.com/.well-known/glama.json` or `https://api.memside.com/.well-known/glama.json`.

## Registry Checks

Before publishing a new metadata version, check that `server.json` still parses and matches the official schema.

Useful checks:

```bash
node -e "JSON.parse(require('fs').readFileSync('server.json', 'utf8')); console.log('server.json parses')"
```

```bash
python -m pip install jsonschema
curl -L "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json" -o server.schema.json
python -c "import json; from pathlib import Path; from jsonschema import Draft7Validator, FormatChecker; schema=json.loads(Path('server.schema.json').read_text()); data=json.loads(Path('server.json').read_text()); Draft7Validator(schema, format_checker=FormatChecker()).validate(data); print('server.json schema validation OK')"
```

```bash
curl "https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.memside%2Fmemside"
```

The registry response should include `io.github.memside/memside` and should mark the latest published version as active.

## Endpoint Checks

Unauthenticated requests to the MCP endpoint should fail with an authentication error, not a missing route:

```bash
curl -i https://api.memside.com/mcp/
```

Expected result:

```text
HTTP/1.1 401 Unauthorized
```

OAuth discovery should be reachable:

```bash
curl -i https://api.memside.com/.well-known/oauth-protected-resource
curl -i https://api.memside.com/.well-known/oauth-authorization-server
```

Expected result:

```text
HTTP/1.1 200 OK
```

These checks confirm that the public registry URL points at the hosted MCP and OAuth surface. Authenticated MCP tool calls require a real Memside OAuth token or API key.

## Publishing

The GitHub Actions workflow publishes metadata when a `v*` tag is pushed.

Use a new `server.json` version for each registry metadata update. Published registry versions are treated as immutable, so avoid reusing an existing version number for changed metadata.
