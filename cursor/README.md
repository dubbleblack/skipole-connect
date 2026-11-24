# Skipole Connect for Cursor

Skipole is an AI-native data broker. We source good data and make it easy to buy
and use. The marketplace serves developers and AI agents; PAYG requires no
mandatory subscription or sales call.
Skipole is a self-service licensed audience-data marketplace for developers and AI agents.
**Your tools. Our data.** PAYG requires no mandatory subscription or sales call.
Consumer Data and Consumer Intent are for audience marketing; Business Data and
B2B Intent are for business research, not sales outreach. Review each product's
fields and permitted purpose in the live catalog.

[Browse and buy licensed audiences](https://skipoledata.com/marketplace?utm_source=cursor#marketing-professionals).
Paid REST commerce is Production verified; paid Cursor/MCP purchases remain independently unverified.

[Website purchasing is live](https://skipoledata.com/marketplace#marketing-professionals):
four active offers are $0.05 per delivered record on Pay As You Go, with a
$2.00 minimum Checkout before applicable taxes. The Marketing department preset
is a filter on Business Data for business research, not permission to market or
conduct sales outreach.
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
`skipole-connect`. Choose a category that accurately describes licensed business
research and developer integration; do not describe the product as sales
prospecting or claim marketing permissions for Business Data.
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

The current workspace source exposes catalog and schema discovery, quote
preparation, owned-order status/retrieval, usage reads, legacy credit estimates,
and public intent-topic lookup. See the
[MCP tool inventory](../MCP-TOOL-INVENTORY.md) for scopes and side effects. The
three legacy enrichment/build/export/job-refresh tools are not registered for
public MCP discovery. An authenticated Cursor Production session verified
exactly eight tools, the four active audience schemas, and workspace usage.
The quote-selection guidance update still requires API publication.

## Configure Cursor

For an independent custom-connection check, copy the `mcpServers` entry from `mcp.json` into your project's `.cursor/mcp.json`
or your global Cursor MCP settings. Enable the server and complete Skipole OAuth
in the browser when prompted. Review the requested catalog and usage scopes.
Only read-only product catalog discovery is currently verified. Usage and paid
tool calls still need separate verification. Do not put private keys or OAuth
secrets in this file.

For current cash-priced audiences, use `skipole_list_products` →
`skipole_get_schema` → `skipole_quote_purchase`. Do not use
`skipole_estimate_cost` for these products; it handles only legacy credit
estimates and does not return their signed cash approval link.
`skipole_quote_purchase` returns the authenticated workspace's current verified
pricing tier, per-record rate, total, and signed customer approval link.
Preparing it records a quote event and reads price/capacity state, but creates
no Checkout session, charge, order, or supplier-record request.
`skipole_get_order` and
`skipole_download_order` read the customer's existing licensed delivery with
`orders:read` consent; no tool approves payment. This paid Cursor journey has
not been independently verified. See [the purchase guide](../START-HERE.md).

REST remains available separately. Use API keys only from trusted server-side
code. The public catalog does not return licensed records. The public
`skipole_search` MCP tool searches intent-topic taxonomy only; it does not
retrieve purchased audience data. Legacy enrichment, audience build/export,
and job-refresh tools are not exposed through MCP.

## Marketplace release blockers

1. Check the existing owner-submitted publisher application for its review result.
   Do not create a second application or claim approval before a public listing
   appears.
2. Once approved, verify the public marketplace listing and install link. No
   purchase or supplier call is needed for that check.

Package checks run with `node --test cursor/test/plugin.test.mjs` from the
repository root. These validate packaging, not an authenticated Cursor session.

This integration package is licensed under Apache-2.0. No Cursor partnership or approval is claimed.
