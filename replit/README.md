# Skipole integration starter for Replit

[Browse and buy licensed audiences](https://skipoledata.com/marketplace?utm_source=replit#marketing-professionals).
Paid REST commerce is Production verified; a native paid Replit/SDK session is not independently verified.

[Website purchasing is live](https://skipoledata.com/marketplace#marketing-professionals):
Marketing Professionals at $0.05 per delivered record, $2 minimum Checkout.
The live quote enforces current supplier allowance and reliable delivery
capacity. No plan upgrade or sales call is required for supported quantities.
See [customer-approved hosted purchases](../HOSTED-PURCHASES.md) for signed quote
links and authenticated retrieval. Paid MCP/SDK round trips remain unverified;
the connection instructions below are not evidence of paid-flow verification.

This is a code starter and agent-readable setup guide, not an official Replit integration or marketplace listing.

## Setup

1. Add the customer's API key as a Replit Secret named `SKIPOLE_API_KEY`. Do not paste it into source files or chat.
2. Install the published `@skipole/sdk` from npm, or `skipole-data` from PyPI for Python.
3. Call Skipole from backend routes. Keep authenticated responses behind the application's own user authorization.
4. Start with the public catalog. It returns metadata only and may contain planned products.
5. Use `catalog:read` for catalog and signed cash quotes, `orders:read` for owned
   licensed deliveries, and `usage:read` only when needed. Do not request
   `data:write` for customer-approved hosted purchasing.
6. Use `quoteHostedPurchase`, present its `approvalUrl` to the human customer,
   then use `getOrder` and `downloadOrderCsv` after delivery. Never approve
   Checkout, charge a card, or call a supplier on the customer's behalf.
7. For repeat purchases, request a fresh quote and separate customer approval.
   Do not treat a past payment as permission to buy again.

The example in `example/` demonstrates a public catalog route and a customer usage route that fails closed unless the host app's existing authentication middleware marks the signed-in user as an authorized customer admin. It does not create a payment or call an upstream data provider.

## Agent instructions

The reusable instructions are in `.agents/skills/skipole-connect/SKILL.md`. They guide an agent to use the documented REST surface, configure Secrets safely, and report unavailable features instead of inventing behavior.

## Optional custom MCP connection for Agent

Replit's documented path is **Settings → Integrations → Your integrations → Add custom → Add personal MCP server**.
Use `https://skipole-data-platform.replit.app/mcp` as the HTTPS server URL.
Follow the available authentication flow; Skipole MCP requires OAuth with consent,
not an API key pasted into an OAuth client-secret field. If the host cannot complete
that flow, use the server-side REST starter instead and report MCP compatibility
as unverified. A Replit Agent authorization and tool call have not been verified.

See [Replit's MCP instructions](https://docs.replit.com/build/connect-via-mcp).
This is a personal custom connection, not a curated integration or partnership.

## Partner submission status

The official route is <https://replit.com/partners>, **Integration Partners**,
not the Solutions Partners consulting application. Its public form requires
contact name, business city, email, website, partnership type and proposal.
The prepared proposal is in `partner-submission.md`. A submission receipt and
Replit's acceptance are separate from packaging this starter or skill.
No native listing or first-class partnership is claimed without confirmation.
