# Skipole Connect for Cursor

This is a prepared Cursor plugin package. It is not published, submitted, or listed in the Cursor marketplace. The current remote MCP URL is `https://skipole-data-platform.replit.app/mcp`. A real Cursor authorization and tool call have not been verified.

## Package contents

- `.cursor-plugin/plugin.json`: Cursor plugin manifest.
- `mcp.json`: proposed remote MCP connection with no embedded credentials.
- `skills/skipole/SKILL.md`: agent guidance for accurate, safe Skipole integration.
- `assets/skipole-mark.svg`: package icon.

## Current connection status

The Skipole API service contains a Streamable HTTP MCP endpoint and tool schemas. It includes a maintained OAuth authorization server with Clerk sign-in, authorization code with PKCE, resource metadata, scoped read access, and connected-app revocation. Production signing secrets, deployment, and real-client verification remain required.

REST remains available separately. Use API keys only from trusted server-side code. The public catalog does not return licensed records. Paid enrichment, search, and export tools are disabled.

## Marketplace release blockers

1. Configure the two production OAuth secrets, deploy the service, and test the remote endpoint with Cursor or another supported MCP client.
2. Verify this package with Cursor's current plugin checks.
3. Obtain explicit authorization before submitting it to the Cursor marketplace.

This integration package is licensed under Apache-2.0. No Cursor partnership or approval is claimed.
