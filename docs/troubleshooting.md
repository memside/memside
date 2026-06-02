# Troubleshooting

This page covers common setup issues for Memside MCP and API-key access.

## Google Shows `client_id` Missing

This usually means the OAuth request was created without a Google client ID. For the hosted Memside service, this is a server configuration issue, not something the user can fix locally.

If you see this while setting up a ChatGPT MCP connector, remove the connector and try again after the issue is fixed. If it still happens, contact support with the client name and time of the failed attempt.

## Google Shows `redirect_uri_mismatch`

This means Google rejected the callback URL used during OAuth. For hosted Memside MCP setup, this is usually a Memside configuration issue.

If the error screen shows a redirect URL, include it in your support request. The expected hosted MCP callback is:

```text
https://api.memside.com/oauth/callback
```

Do not post OAuth codes, tokens, API keys, or screenshots with private account data in a public issue.

## Connector Setup Still Uses an Old Failed State

Some clients cache failed connector setup attempts. Remove the connector completely, close the setup flow, and add it again.

If the OAuth screen opens inside an embedded browser, try again from a normal browser if the client gives that option.

## API Key Does Not Work

Check that the key is sent as a bearer token:

```bash
Authorization: Bearer mem_sk_your_key_here
```

Do not send the key as a query parameter. Also confirm the route supports API-key access, because some routes are session-app only.

## Need Help

Email [support@memside.com](mailto:support@memside.com) with the client name, setup method, error text, and approximate time of the attempt.
