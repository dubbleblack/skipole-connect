# Skipole Connect for Cursor

Skipole is an AI-native data broker. We source good data and make it easy to buy
and use. The marketplace serves developers and AI agents; PAYG requires no
mandatory subscription or sales call.

[Browse and buy licensed audiences](https://skipoledata.com/marketplace?utm_source=cursor#marketing-professionals).
Paid REST commerce is Production verified; paid Cursor/MCP purchases remain independently unverified.

[Website purchasing is live](https://skipoledata.com/marketplace#marketing-professionals):
Marketing Professionals at $0.05 per delivered record, $2 minimum Checkout.
The live quote enforces current supplier allowance and reliable delivery
capacity. No plan upgrade or sales call is required for supported quantities.
See [customer-approved hosted purchases](../HOSTED-PURCHASES.md) for signed quote
links and authenticated retrieval. Paid MCP/SDK round trips remain unverified;
the connection instructions below are not evidence of paid-flow verification.

This is a Cursor plugin package in the public Skipole repository. The owner reports
submitting the repository to the official publisher portal; no public listing or
approval is confirmed. The existing service is
`https://skipole-data-platform.replit.app/mcp`. A read-only Cursor OAuth session
and `skipole_list_products` call have been Production verified; paid Cursor/MCP
purchasing remains unverified.

## Package contents

- `.cursor-plugin/plugin.json`: Cursor plugin manifest.
- `mcp.json`: proposed remote MCP connection with no embedded credentials.
- `skills/skipole/SKILL.md`: agent guidance for accurate, safe Skipole integration.
- `assets/skipole-icon-512.png`: official, unmodified 512×512 PNG icon.
- `../.cursor-plugin/marketplace.json`: repository-root marketplace manifest,
  resolving this existing plugin from the `cursor` directory.

## Native submission and installation

The owner must sign in at <https://cursor.com/marketplace/publish> and apply as
a publisher, then submit <https://github.com/dubbleblack/skipole-connect>.
The repository contains a multi-plugin-layout manifest with exactly one plugin,
`skipole-connect`. Choose Sales / GTM Data where the form offers those categories.
See [the prepared application details](../NATIVE-DIRECTORY-SUBMISSIONS.md).

Do not claim that a GitHub package, a manually configured MCP connection or an
owner-operated repository marketplace is a listing in Cursor's public directory.
An official install link will be reported only when Cursor provides a real listing.
No `/add-plugin skipole-connect` public-directory installation is claimed today.

For a no-terminal pre-publication install, download this repository's ZIP from
GitHub, extract it, then use Cursor **Customize → Import from Disk** and select
the extracted `cursor` folder. Reload Cursor and inspect the skill and MCP server.
If local imports are disabled by an Enterprise administrator, do not bypass that
policy. A team admin can alternatively import the repository under
**Dashboard → Plugins & MCPs → Team Marketplaces → Add Marketplace**.
These local/team installations do not establish public marketplace discovery.

## Current connection status

The deployed Skipole API service contains a Streamable HTTP MCP endpoint with OAuth sign-in, authorization code with PKCE, resource metadata, scoped read access, and connected-app revocation. Cursor OAuth and the read-only product-list tool have been verified. Connecting Cursor does not require creating server signing secrets.

## Configure Cursor

For an independent custom-connection check, copy the `mcpServers` entry from `mcp.json` into your project's `.cursor/mcp.json`
or your global Cursor MCP settings. Enable the server and complete Skipole OAuth
in the browser when prompted. Review the requested catalog and usage scopes.
Test listing catalog metadata and reading your own usage before calling this
client connection verified. Do not put private keys or OAuth secrets in this file.

The implemented `skipole_quote_purchase` tool prepares a signed approval link
for customer-approved hosted Checkout. `skipole_get_order` and
`skipole_download_order` read the customer's existing licensed delivery with
`orders:read` consent; no tool approves payment. This paid Cursor journey has
not been independently verified. See [the purchase guide](../START-HERE.md).

REST remains available separately. Use API keys only from trusted server-side code. The public catalog does not return licensed records. Paid enrichment, search, and export tools are disabled.

## Marketplace release blockers

1. Check the existing owner-submitted publisher application for its review result.
   Do not create a second application or claim approval before a public listing
   appears.
2. Once approved, verify the public marketplace listing and install link. No
   purchase or supplier call is needed for that check.

Package checks run with `node --test cursor/test/plugin.test.mjs` from the
repository root. These validate packaging, not an authenticated Cursor session.

This integration package is licensed under Apache-2.0. No Cursor partnership or approval is claimed.
