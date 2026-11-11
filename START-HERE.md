# Find data. See the price. Pay. Receive it. Repeat.

**Paid REST commerce is Production verified.** An explicitly authorized internal
test collected $2.00, automatically delivered 40 licensed Marketing records and
retrieved all 40 through authenticated REST CSV access (HTTP 200). Payment
reconciled exactly once. This is not a claim of outside customers, paid SDK/MCP
verification or official platform approval.

[Buy on Skipole](https://skipoledata.com/marketplace?utm_source=github#marketing-professionals)
or integrate the same customer-approved purchase flow into your app or agent.
No subscription, prepaid credits or enterprise approval is required.

## Choose your entry point

Coding agents can start with [AGENTS.md](AGENTS.md). It states the real API
contract, human payment boundary, idempotency rules and verification limits.

**Installable SDK packages:** the tested JavaScript archive and Python wheel are
[published on GitHub](https://github.com/dubbleblack/skipole-connect/releases/tag/sdk-v0.1.0-alpha.1).
The Python SDK is also [published on PyPI](https://pypi.org/project/skipole-data/):
`python -m pip install skipole-data`. See the language guides below for usage.
JavaScript is [published on npm](https://www.npmjs.com/package/@skipole/sdk):
`npm install @skipole/sdk@alpha` (verified version `0.1.0-alpha.1`).
The explicit tag is required because `latest` still points to the staging
placeholder. Public installation, import and TypeScript declarations are verified.
The official MCP Registry lists
[`io.github.dubbleblack/skipole-connect`](https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.dubbleblack%2Fskipole-connect)
as active; paid MCP/SDK purchases remain independently unverified.

| Environment | Existing setup guide | What it connects |
| --- | --- | --- |
| Claude / Claude Code | [Claude](claude/README.md) | Remote MCP with customer OAuth |
| Cursor | [Cursor](cursor/README.md) | Remote MCP configuration and plugin source |
| Replit | [Replit](replit/README.md) | Server-side REST / SDK and agent guidance |
| Codex | [Codex](codex/README.md) | Remote HTTP MCP with customer OAuth |
| Lovable | [Lovable](lovable/README.md) | Server-side REST; chat MCP is separate |
| Vercel | [Vercel](vercel/README.md) | Server-side REST / SDK with secret API keys |
| JavaScript / TypeScript | [npm installation and usage](javascript/README.md) | Signed quotes, owned orders and CSV retrieval |
| Python | [SDK source](python/README.md) | The same customer-approved purchase contract |

These are setup guides and source code, not official platform listings or
partnerships. npm, PyPI and MCP Registry publication are not required to use
the website or the source SDKs. Never put an API key in client-side code or chat.

## Purchase flow

1. Sign in to Skipole and create a scoped API key for server-side REST/SDK
   access, or connect the remote MCP server using customer OAuth.
2. Request a hosted purchase quote with a fresh purchase-intent UUID, quantity
   and optional department/domain criteria.
3. Present the returned signed approval link to the customer. The customer
   signs in to the quoting workspace, reviews the exact criteria and amount,
   and chooses to continue to genuine hosted Stripe Checkout.
4. Only customer-approved payment starts the existing fulfillment system.
   Order lookup and CSV retrieval use the same workspace and authorization.
5. Deliberate repeat purchase: create a new intent UUID. Checking an existing
   purchase must keep its original UUID. Repeat purchases may overlap in data.

MCP tools for this flow are `skipole_quote_purchase`,
`skipole_get_order` and `skipole_download_order`.
They cannot approve payment or charge the customer. See
[the full contract and SDK examples](HOSTED-PURCHASES.md).

## Real availability, without sales gates

PAYG is $0.05 per delivered record. Optional Builder pricing is $29/month plus
$0.04 per delivered record; optional Scale is $99/month plus $0.03 per delivered
record, when membership signup is enabled in the live service. Membership
fees include no records. The $2 purchase minimum corresponds to 40, 50 or 67
requested records respectively. All plans use the same supplier and delivery
capacity checks.

Marketing is the default department. The same licensed search accepts department
and optional business-email-domain criteria; named configurations are search
presets, not guaranteed datasets or record counts. Fields are first name, last
name, business email and LinkedIn URL. Shortfalls are refunded at the purchased
rate; zero valid records means a full refund.

The current single-file maximum is 3,965 records for those fields, or less when
supplier allowance is lower. Use the live quote's supported maximum. This is a
temporary delivery constraint, not a commercial record cap, subscription
requirement or reason to contact sales.

## Verification boundary

The scoped REST quote → signed customer approval → customer-paid Stripe Live
Checkout → automated encrypted fulfillment → authenticated CSV retrieval flow
passed in Production for 40 Marketing records at $0.05 each ($2.00). The temporary
verification key was revoked. The original historical orders were unchanged.

Claude catalog/usage access is verified. **Paid SDK and MCP round trips and other
native host sessions remain independently unverified.** Their source and mocked
contract tests do not establish paid native-client operation.

A no-payment verification may create a quote, check that its approval is bound
to the correct workspace and inspect the displayed price. It must not pay or
request supplier data. An end-to-end paid verification needs separate explicit
customer spending authorization; completed authorized orders can be used for
non-billable authenticated retrieval checks.
