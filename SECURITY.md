# Security

Memside stores user-owned memory context, so security reports are taken seriously. If you find a vulnerability, please report it privately instead of opening a public issue.

Email security reports to:

```text
support@memside.com
```

Use the subject line "Security report". Please include the affected URL or feature, a clear description of the issue, and enough steps for us to reproduce it. Avoid including another person's private data, credentials, tokens, or highly sensitive content in the report.

## Public Scope

This public repository contains integration documentation and examples. The production application source, private configuration, secrets, and operational notes are not part of this repo.

For hosted Memside services, useful report areas include authentication behavior, MCP connection behavior, API-key handling, cross-user access checks, and private attachment access.

## Connector Safety Reports

If a report involves ChatGPT, Claude, Grok, an IDE, or another MCP client, include the client name, whether the connection used OAuth or API-key auth, and the approximate time of the issue. Do not include private memory contents unless we specifically ask for a minimal example.

## Out of Scope

Please do not run destructive tests, high-volume scans, spam, social engineering, or tests that try to access data belonging to other users without permission. If a test could affect service availability or user data, contact us first.

We will acknowledge good-faith security reports as quickly as possible.
