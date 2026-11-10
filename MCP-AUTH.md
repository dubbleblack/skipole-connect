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
- Only `catalog:read` and `usage:read` can be granted.
- Consent requires a signed-in Clerk identity and a Skipole workspace membership.
- The connection record binds the grant to the Clerk user, OAuth client, workspace, and granted scopes.
- The account dashboard lists the user's connected applications. Revocation deletes the grant's stored tokens and is checked against storage on every MCP request.
- The remote resource server verifies the signature, issuer, audience, expiry, client ID, scopes, Clerk user, workspace membership, token record, and active connection.

Authorization-server endpoints use the issuer's OAuth discovery document at `/.well-known/oauth-authorization-server`, OpenID discovery at `/.well-known/openid-configuration`, registration at `/oauth/register`, and the MCP protected-resource metadata at `/.well-known/oauth-protected-resource/mcp`.

## Data and billing boundary

The MCP server shares Skipole authentication, workspace authorization, rate limits, and usage accounting. It does not expose upstream provider credentials. Data enrichment, search, and export remain disabled until products, licensing, provider credentials, verified pricing, and spending controls are approved. No upstream data request is made and no paid data access is enabled by this integration.

The server registers catalog, schema, estimate, usage, enrichment, search, and export tools. Disabled tools explicitly return an unavailable error and do not call an upstream provider or debit credits.

## Verification status

Automated tests and development-preview HTTP checks do not establish marketplace compatibility or production readiness. Cursor or another real MCP client must be tested after production secrets are configured and the app is deployed. Do not submit or publish marketplace packages without explicit approval.
