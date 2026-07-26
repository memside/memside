# Changelog

## Unreleased

## 0.2.0 - 2026-07-26

- Repaired the JavaScript and Python SDK baseline with valid Memory create
  inputs, explicit deletion confirmation, compatible public and legacy error
  parsing, `Retry-After` exposure, and opt-in deployed read tests.
- Added concrete TypeScript contracts and lightweight Python `TypedDict`
  exports for the existing Context and Memory methods.
- Replaced development-specific sample memories with neutral everyday
  examples.

- Added direct API and JavaScript/Python SDK support for reading 1-8 exact
  known Memory IDs in one bounded request, matching the hosted MCP batch-read
  capability while preserving API-key privacy and rate-limit boundaries.

## 2026-06-04, third-party MCP directory metadata

Added Glama ownership metadata and Open Plugins/Cursor discovery metadata for the hosted Memside MCP server.

Updated public MCP registry and Cursor docs to distinguish official MCP Registry metadata from third-party directory metadata and to keep shared files free of credentials.

## 2026-06-04, connector safety and privacy docs

Updated public privacy, OAuth, support, and security docs with clearer AI connector safety, third-party AI provider, revoke/disconnect, deletion/retention, and high-level encryption language.
## 2026-06-03, JavaScript and Python SDKs

Published the `memside` npm and PyPI packages and added SDK setup details to the public README.

## 2026-06-02, developer-friendly public repo pass

Added a developer quickstart, public API reference, runnable JavaScript examples, VS Code setup notes, public issue templates, and a lightweight docs check workflow.

Improved API-key guidance so developers can more clearly understand supported routes, access boundaries, and safe setup practices.

## 2026-06-02, metadata and licensing cleanup

Added a restricted public repository license for Memside-owned documentation, examples, and registry metadata.

Added MCP Registry checks, endpoint guidance, and registry publish workflow coverage.

Updated `server.json` metadata to include the public Memside website and bump the registry metadata version to `1.0.2`.

Simplified public OAuth troubleshooting so user-facing docs stay focused on setup errors and support details.

## 2026-06-02

Initial public repository setup for Memside.

Included public setup docs for hosted MCP access, API-key examples, support information, security reporting, and the public repo boundary.

Expanded the public docs into a technical overview and integration handbook covering AI continuity, token savings, memory sensitivity, Operating Rules, User AI Profile, AI Skills, GitHub Copilot, and common MCP clients.

Replaced the permissive repository license with an all-rights-reserved copyright and use notice for the public documentation and examples.

Added MCP Registry metadata and a dedicated VS Code MCP setup guide for installing Memside as a remote MCP server.
