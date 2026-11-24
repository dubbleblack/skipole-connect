# Skipole Connect OAuth and MCP

Skipole Connect uses the maintained `oidc-provider` authorization-server library. The resource server and authorization server use the existing Skipole API and Clerk identity. This is not Replit's managed Stripe integration and does not create a separate customer or billing system.

The current remote MCP resource URL is `https://skipole-data-platform.replit.app/mcp`. The existing OAuth issuer is intentionally unchanged by the website-domain update. MCP clients should discover issuer and authorization metadata from the server rather than hardcoding issuer values.

## Production Replit Secrets

Configure these two secrets for the deployed application:

- `SKIPOLE_OAUTH_SIGNING_JWKS`: a private JWK set for ES256 token signing. Keep private key material in Replit Secrets only.
- `SKIPOLE_OAUTH_COOKIE_KEY`: a random value with at least 32 characters for authorization-server cookies.

The production OAuth authorization server fails closed if either value is missing or invalid. Development uses process-local ephemeral keys only. Never copy development keys into production.

Optional non-secret settings:

- `SKIPOLE_MCP_OAUTH_ISSUER`: preserve the currently configured issuer. A custom-domain issuer change requires a separate migration and real-client verification.
- `SKIPOLE_MCP_RESOURCE_URL`: defaults to the issuer's `/mcp` resource.
- `SKIPOLE_MCP_ALLOWED_HOSTS`: comma-separated additional hostnames for MCP Host and Origin checks.

## Protocol and permissions

- OAuth 2.1 authorization-code flow with PKCE required.
- The server advertises `S256` PKCE and Streamable HTTP MCP resource metadata.
- Dynamic clients are restricted to public authorization-code clients. Client secrets, implicit grants, and client-credentials grants are rejected.
- Access tokens are short lived, audience-restricted JWTs. Refresh tokens are supported.
- Only `catalog:read`, `usage:read`, and `orders:read` can be granted; no
  `data:write` scope is available. `orders:read` is required to read an owned
  cash order or its existing delivery.
- Consent requires a signed-in Clerk identity and a Skipole workspace membership.
- The connection record binds the grant to the Clerk user, OAuth client, workspace, and granted scopes.
- The account dashboard lists the user's connected applications. Revocation deletes the grant's stored tokens and is checked against storage on every MCP request.
- The remote resource server verifies the signature, issuer, audience, expiry, client ID, scopes, Clerk user, workspace membership, token record, and active connection.

Authorization-server endpoints use the issuer's OAuth discovery document at `/.well-known/oauth-authorization-server`, OpenID discovery at `/.well-known/openid-configuration`, registration at `/oauth/register`, and the MCP protected-resource metadata at `/.well-known/oauth-protected-resource/mcp`.

## Data and billing boundary

The MCP server shares Skipole authentication, workspace authorization, rate
limits, and usage accounting. It does not expose upstream provider credentials.
`skipole_quote_purchase` requires `catalog:read`, records a quote event and
returns a signed quote and human approval URL; it does not create a Stripe
Checkout session, charge a card, or submit a supplier request. A customer must
separately approve payment in hosted Checkout. `skipole_get_order` and
`skipole_download_order` require `orders:read` and only read an order already
owned by the authenticated workspace. They do not poll, rebuild, export from a
supplier, retry, refund, or charge.

The public MCP surface is limited to catalog/schema discovery, quote preparation,
owned-order status and retrieval, usage reads, legacy credit estimates, and
non-billable intent-topic discovery. It does not expose enrichment execution,
audience builds, provider exports, or job refreshes. The underlying legacy
services and their separate routes remain unchanged. The four active audience
offers and their product-specific purpose, fields and filters are discoverable
through the live catalog. Email enrichment is not an active offer. The public
MCP/REST catalog and read tools do not grant permission to reuse data outside
the order's license.

See [the public MCP tool inventory](./MCP-TOOL-INVENTORY.md) for each tool's
scope, side effects, response, evidence, and remaining post-publication checks.

## Verification status

Cursor completed Production OAuth and called `skipole_list_products` without a
purchase. The separate customer-approved paid REST flow and authenticated CSV
retrieval are Production verified; that does not verify paid MCP or SDK
purchasing. The official MCP Registry lists `io.github.dubbleblack/skipole-connect`
as active. Registry publication is discovery only, not an official client
approval or a paid MCP test.
