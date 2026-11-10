# Skipole Connect for Cursor

[Website purchasing is live](https://skipoledata.com/marketplace#marketing-professionals):
40–100 Marketing Professionals records at $0.05 per delivered record.
See [customer-approved hosted purchases](../HOSTED-PURCHASES.md) for signed quote
links and authenticated retrieval. Paid MCP/SDK round trips remain unverified;
the connection instructions below are not evidence of paid-flow verification.

This is a prepared Cursor plugin package. It is not published, submitted, or listed in the Cursor marketplace. The current remote MCP URL is `https://skipole-data-platform.replit.app/mcp`. A real Cursor authorization and tool call have not been verified.

## Package contents

- `.cursor-plugin/plugin.json`: Cursor plugin manifest.
- `mcp.json`: proposed remote MCP connection with no embedded credentials.
- `skills/skipole/SKILL.md`: agent guidance for accurate, safe Skipole integration.
- `assets/skipole-mark.svg`: package icon.

## Current connection status

The deployed Skipole API service contains a Streamable HTTP MCP endpoint with OAuth sign-in, authorization code with PKCE, resource metadata, scoped read access, and connected-app revocation. The Claude OAuth connection and read-only tools have been verified; a Cursor-specific session has not. Connecting Cursor does not require creating server signing secrets.

## Configure Cursor

Copy the `mcpServers` entry from `mcp.json` into your project's `.cursor/mcp.json`
or your global Cursor MCP settings. Enable the server and complete Skipole OAuth
in the browser when prompted. Review the requested catalog and usage scopes.
Test listing catalog metadata and reading your own usage before calling this
client connection verified. Do not put private keys or OAuth secrets in this file.

Purchases use [hosted website Checkout](https://skipoledata.com/marketplace#marketing-professionals)
when the product is enabled, not a paid MCP tool.

REST remains available separately. Use API keys only from trusted server-side code. The public catalog does not return licensed records. Paid enrichment, search, and export tools are disabled.

## Marketplace release blockers

1. Test an actual Cursor OAuth connection and read-only tool calls against the deployed endpoint.
2. Verify this package with Cursor's current plugin checks.
3. Obtain explicit authorization before submitting it to the Cursor marketplace.

This integration package is licensed under Apache-2.0. No Cursor partnership or approval is claimed.
