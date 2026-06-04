# Privacy and Data

Memside is built around user-owned memory context. The product helps you carry useful context across AI tools without making that context public by default.

Memories are scoped to the signed-in user. API and MCP access use the authenticated account, and attempts to access another user's data are designed to fail without exposing that data.

For the formal policy, see the Memside product site:

- Privacy Policy: https://www.memside.com/privacy
- Terms of Service: https://www.memside.com/terms

## AI-Facing Access

MCP, OAuth, and API-key flows are designed for controlled AI access. A connected AI tool can only use the Memside actions available to the connection you authorize.

AI-facing responses are designed to be selective and context-conscious. Secret memories are excluded from normal AI-facing MCP and API-key flows.

Memside does not automatically push your full memory base to external AI services. When you use a connected AI app, MCP client, direct API client, or AI provider, information may be sent to that service as needed to fulfill your request. Those third-party services may process data under their own terms and privacy policies.

Review tool requests before approving actions, especially actions that create, update, export, or delete information.

## Revoke and Disconnect

If you disconnect an OAuth connector or revoke an API key, that client is no longer authorized to call Memside with that credential. If you permanently delete your Memside account, active connector and API access associated with that account is removed as part of account deletion.

Do not share OAuth codes, access tokens, refresh tokens, API keys, or screenshots that expose credentials. If you believe a credential was exposed, remove the connector or revoke the key as soon as possible.

## Deletion and Retention

You can delete individual memories in Memside. You can also delete your account from the Memside app.

Account deletion removes your account and associated user content from active systems, subject to limited retention for operational, security, support, backup, legal, or abuse-prevention needs. The current standard phase-out period for those limited records is up to 30 days unless a longer period is required by law or a legitimate security need.

## Security

Memside uses encryption in transit and applies encryption at rest to protected user-authored content and other sensitive information where appropriate. Some operational and security information may still be processed as needed to provide, secure, troubleshoot, prevent abuse, and maintain the service.

Do not put passwords, recovery codes, payment details, or other highly sensitive secrets into normal memories. Use secret sensitivity where you need stronger AI-facing boundaries.

## Attachments

Attachments are handled by backend endpoints with ownership checks. A storage object existing in cloud storage does not make it a public API resource.

Do not share private attachment links or API tokens in public issue reports. If support needs an example, send only the minimum information needed to reproduce the issue.

## Support and Security Reports

For product support, email support@memside.com.

For security reports, see SECURITY.md and avoid posting private details in public issues.
