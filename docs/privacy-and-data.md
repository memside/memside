# Privacy and Data

Memside is built around user-owned memory context. The product should help you carry useful context across AI tools without making that context public by default.

Memories are scoped to the signed-in user. API and MCP access uses the authenticated account, and cross-user object access should fail without exposing another user's data.

## AI-Facing Access

MCP and API-key flows are designed for controlled AI access. Search responses are preview-first where possible, and secret memories are excluded from AI-facing MCP and API-key flows.

An AI tool connected to Memside can only work with the permissions granted through the connection method. If you disconnect a tool or revoke an API key, that client should no longer be able to call Memside with that credential.

## Attachments

Attachments are handled by backend endpoints with ownership checks. A storage object existing in cloud storage does not make it a public API resource.

Do not share private attachment links or API tokens in public issue reports. If support needs an example, send only the minimum information needed to reproduce the issue.
