# Memside

Memside is an AI continuity and memory hub for people who work across ChatGPT, Claude, developer tools, browsers, and different devices. It gives you a private place to save reusable context, decisions, operating rules, project notes, and checkpoints so you can move from one AI to another without rebuilding the same background every time.

Use Memside when you want your AI context to survive beyond one chat window. A connected AI tool can retrieve the right memory, continue a project from a checkpoint, follow your saved working preferences, or create new durable context after you approve it. This repository is the public home for Memside integration docs, examples, support information, and future SDK work. It is not a mirror of the private production application source.

## Connect Memside

Memside supports hosted MCP access for AI tools that can connect to remote MCP servers. MCP gives compatible AI clients a standard way to use Memside as a continuity layer instead of locking your memory into one assistant.

```text
https://api.memside.com/mcp/
```

If your AI tool supports OAuth for MCP, choose OAuth during setup and sign in with your Memside account. If your tool supports API-key auth instead, create an API key in Memside and use it as a bearer token.

Start here:

- [Connect ChatGPT with MCP](docs/chatgpt-mcp.md)
- [Connect Claude and other MCP clients](docs/claude-mcp.md)
- [Use Memside with API keys](docs/api-keys.md)
- [Troubleshooting](docs/troubleshooting.md)

## What You Can Do

With Memside connected, an AI tool can search your saved memories, fetch specific context, create new memories after you approve, update checkpoints, and build compact startup or resume packets. The goal is to keep useful context portable without turning every AI conversation into a long manual setup step.

This is useful when you want to move a project between ChatGPT, Claude, local coding tools, or future MCP-compatible clients. Memside can help the next AI understand what you are building, what decisions were already made, what rules it should follow, and what the next step is.

Memside keeps the normal product boundary intact. Private user data is scoped to the signed-in user, secret memories are excluded from AI-facing MCP and API-key flows, and destructive actions require stronger confirmation.

## API Examples

The examples in this repo use public Memside API surfaces only.

- [curl examples](examples/curl/README.md)
- [JavaScript examples](examples/javascript/README.md)
- [Python examples](examples/python/README.md)

The JavaScript and Python examples use normal HTTP requests. A small SDK is planned for a later phase after the public API docs settle.

## Public Repo Scope

This repo contains:

- setup guides for MCP clients
- API-key usage examples
- public troubleshooting notes
- security and support information
- public changelog entries
- future SDK planning material

This repo does not contain:

- private Memside application source
- secrets or deployment configuration
- database or internal operations notes
- private PMX internals
- non-public product architecture

## PMX

PMX stands for Protocol for Memory Exchange. Memside uses PMX-shaped memory concepts internally, but the public PMX specification will live in a separate repository after this public Memside repo is stable.

Planned repo:

```text
github.com/memside/pmx
```

## Support

For support, contact [support@memside.com](mailto:support@memside.com) or use the support links in the Memside app.

Security reports should follow [SECURITY.md](SECURITY.md).

## License

This public repository is licensed under the Apache License 2.0. See [LICENSE](LICENSE).
