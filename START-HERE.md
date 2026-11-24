# Find data. See the price. Pay. Receive it. Repeat.

**Paid REST commerce is Production verified.** An explicitly authorized internal
test collected $2.00, automatically delivered 40 Business Data records selected
with a Marketing department preset for the permitted business-research purpose,
and retrieved all 40 through authenticated REST CSV access (HTTP 200). The
department filter does not grant marketing or sales-outreach rights. Payment
reconciled exactly once. This is not a claim of outside customers, paid SDK/MCP
verification or official platform approval.

[Buy on Skipole](https://skipoledata.com/marketplace?utm_source=github#marketing-professionals)
or integrate the same customer-approved purchase flow into your app or agent.
No subscription, prepaid credits or enterprise approval is required.

## Choose your entry point

Start with practical customer examples in [the quickstart](CUSTOMER-EXAMPLES.md): business research,
targeted B2B audiences, human-approved AI agents, Replit/Vercel REST, and published
JavaScript/Python clients. Each recipe identifies its purchase or retrieval path.
Already purchased and received a B2B audience? Use the
[Clay HTTP API as Source guide](clay/README.md) to import that existing order into
a Clay table without starting another purchase or supplier request.

Coding agents can start with [AGENTS.md](AGENTS.md). It states the real API
contract, human payment boundary, idempotency rules and verification limits.

**Installable SDK packages:** the tested JavaScript archive and Python wheel are
[published on GitHub](https://github.com/dubbleblack/skipole-connect/releases/tag/sdk-v0.1.0-alpha.1).
The Python SDK is also [published on PyPI](https://pypi.org/project/skipole-data/):
`python -m pip install skipole-data`. See the language guides below for usage.
JavaScript is [published on npm](https://www.npmjs.com/package/@skipole/sdk):
`npm install @skipole/sdk` (latest verified version `0.1.0-alpha.3`).
The default `latest` tag selects the real SDK rather than the staging placeholder.
Public installation, import and TypeScript declarations are verified.
The official MCP Registry lists
[`io.github.dubbleblack/skipole-connect`](https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.dubbleblack%2Fskipole-connect)
as active; paid MCP/SDK purchases remain independently unverified.

| Environment | Existing setup guide | What it connects |
| --- | --- | --- |
| Claude / Claude Code | [Claude](claude/README.md) | Remote MCP with customer OAuth |
| ChatGPT | [ChatGPT](chatgpt/README.md) | Remote MCP guidance; no listing or paid purchase claim |
| Cursor | [Cursor](cursor/README.md) | Remote MCP configuration and plugin source |
| Replit | [Replit](replit/README.md) | Server-side REST / SDK and agent guidance |
| ChatGPT | [ChatGPT](chatgpt/README.md) | Synthetic read-only REST example; no app submission verified |
| Codex | [Codex](codex/README.md) | Remote HTTP MCP with customer OAuth |
| Lovable | [Lovable](lovable/README.md) | Server-side REST; chat MCP is separate |
| Vercel | [Vercel](vercel/README.md) | Server-side REST / SDK with secret API keys |
| JavaScript / TypeScript | [npm installation and usage](javascript/README.md) | Signed quotes, owned orders and CSV retrieval |
| Python | [SDK source](python/README.md) | The same customer-approved purchase contract |
| Clay | [Import an existing B2B order](clay/README.md) | Read-only, authenticated table import |

These are setup guides and source code, not official platform listings or
partnerships. Cursor Production OAuth and read-only catalog access are verified;
the owner-reported Cursor and Replit submissions have no independently
confirmed review outcome. Claude client testing and directory submission are
not independently confirmed. npm, PyPI and MCP Registry publication are not required to use
the website or the source SDKs. Never put an API key in client-side code or chat.

## Purchase flow

1. Sign in to Skipole and create a scoped API key for server-side REST/SDK
   access, or connect the remote MCP server using customer OAuth.
2. Read the live catalog and use an active product's `cashPurchase` schema to
   prepare `productRequest`, with a fresh purchase-intent UUID and matching
   quantity. The legacy Business Data `criteria` input is not a schema for all
   four active products; never combine it with `productRequest`.
3. Present the returned signed approval link to the customer. The customer
   signs in to the quoting workspace, reviews the exact criteria and amount,
   and chooses to continue to genuine hosted Stripe Checkout.
4. Only customer-approved payment starts the existing fulfillment system.
   Order lookup and CSV retrieval use the same workspace and authorization.
5. Deliberate repeat purchase: create a new intent UUID. Checking an existing
   purchase must keep its original UUID. Repeat purchases may overlap in data.

For the four active cash-priced audience offers, use the MCP sequence
`skipole_list_products` → `skipole_get_schema` →
`skipole_quote_purchase`; then the customer reviews and approves Checkout.
`skipole_estimate_cost` is for legacy credit estimation only and is not the
cash quote tool. The signed quote reports the authenticated workspace's actual
`pricingTier`, unit rate, amount and expiry. Quote preparation records a quote
event, but creates no Checkout, charge or supplier-record request.
After delivery, use `skipole_get_order` / `skipole_download_order` with the
required `orders:read` consent. These MCP tools cannot approve payment or charge
the customer. See
[the full contract and SDK examples](HOSTED-PURCHASES.md) and the
[complete MCP tool inventory](MCP-TOOL-INVENTORY.md).

## Real availability, without sales gates

PAYG is $0.05 per delivered record. Optional Builder pricing is $29/month plus
$0.04 per delivered record; optional Scale is $99/month plus $0.03 per delivered
record, when membership signup is enabled in the live service. Membership
fees include no records. The $2 purchase minimum corresponds to 40, 50 or 67
requested records respectively. All plans use the same supplier and delivery
capacity checks.

For Business Data (`audience-advanced-search`), department presets and optional
business-email-domain filters are configurations of that one product, not
separate products or permitted purposes. Its only allowed purpose is
`business_research`; the Marketing department preset does not permit marketing
or sales outreach. Its current listed fields are first name, last name, business
email and LinkedIn URL. The other products have their own live filters and
output fields. Shortfalls are refunded at the purchased rate; zero valid records
means a full refund.

The current single-file maximum is 3,965 records for those fields, or less when
supplier allowance is lower. Use the live quote's supported maximum. This is a
temporary delivery constraint, not a commercial record cap, subscription
requirement or reason to contact sales.

## Verification boundary

The scoped REST quote → signed customer approval → customer-paid Stripe Live
Checkout → automated encrypted fulfillment → authenticated CSV retrieval flow
passed in Production for 40 Business Data records selected with a Marketing
department preset at $0.05 each ($2.00). The temporary
verification key was revoked. The original historical orders were unchanged.

Cursor Production OAuth and read-only catalog access are verified. Claude
client access and directory submission are not independently confirmed.
**Paid SDK and MCP round trips remain independently unverified.** Source and
mocked contract tests do not establish paid native-client operation.

A no-payment verification may create a quote, check that its approval is bound
to the correct workspace and inspect the displayed price. It must not pay or
request supplier data. An end-to-end paid verification needs separate explicit
customer spending authorization; completed authorized orders can be used for
non-billable authenticated retrieval checks.
