---
name: skipole-connect
description: Adds Skipole catalog, customer usage, or synthetic-demo access to a Replit app using the documented REST API. Use when a builder asks to connect Skipole to an application.
---

# Add Skipole to a Replit application

## Confirm the actual capability

1. Read the current Skipole API documentation and catalog status.
2. Use the public catalog to display available product metadata. Treat `planned` and `preview` as not available for paid retrieval.
3. Never present synthetic demo fields as real data.
4. Do not build enrichment, search, or exports as live operations. They remain disabled until licensing, provider credentials, pricing, and spending controls are confirmed.

## Configure a customer API key

- Ask the customer to add the key in Replit Secrets as `SKIPOLE_API_KEY`.
- Read it only in server-side code with `process.env.SKIPOLE_API_KEY`.
- Never print the value, return it to the browser, or add it to source control.
- Use a key with only the scopes needed: `catalog:read`, `demo:read`, or `usage:read`.
- Revoke and replace a key if it is exposed.

## Call the REST API

Use the local `@skipole/sdk` source from the approved package or the public HTTPS routes. Handle authentication, entitlement, and rate-limit errors. Respect `Retry-After`; do not perform unbounded automatic retries.

For browser interfaces, create a backend route that authorizes the signed-in app user before calling Skipole. Do not proxy arbitrary user-supplied URLs or expose upstream provider credentials.

## MCP and OAuth

The current MCP endpoint is `https://skipole-data-platform.replit.app/mcp`. Claude's read-only connection is verified; do not claim Replit-client authentication or tool calls have been tested. Discover OAuth endpoints from server metadata and do not reuse a REST API key as an OAuth token.
