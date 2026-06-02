# Troubleshooting

This page covers common setup issues for Memside MCP and API-key access.

## Google Shows `client_id` Missing

This usually means the OAuth request was created without a Google client ID. For the hosted Memside service, this is a server configuration issue, not something the user can fix locally.

If you see this while setting up a ChatGPT MCP connector, remove the connector and try again after the issue is fixed. If it still happens, contact support with the time of the failed attempt.

## Google Shows `redirect_uri_mismatch`

This means Google rejected the callback URL used during OAuth. For the hosted MCP connector flow, the required callback is:

```text
https://api.memside.com/oauth/callback
```

For normal website login, the Google callback is:

```text
https://auth.memside.com/api/auth/callback/google
```

Both may be needed in the Google OAuth app because the website and MCP connector flows use different domains.

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
