# Find data. See the price. Pay. Receive it. Repeat.

[Buy on Skipole](https://skipoledata.com/marketplace#marketing-professionals)
or integrate the same customer-approved purchase flow into your app or agent.
No subscription, prepaid credits or enterprise approval is required.

## Choose your entry point

| Environment | Existing setup guide | What it connects |
| --- | --- | --- |
| Claude / Claude Code | [Claude](claude/README.md) | Remote MCP with customer OAuth |
| Cursor | [Cursor](cursor/README.md) | Remote MCP configuration and plugin source |
| Replit | [Replit](replit/README.md) | Server-side REST / SDK and agent guidance |
| Codex | [Codex](codex/README.md) | Remote HTTP MCP with customer OAuth |
| Lovable | [Lovable](lovable/README.md) | Server-side REST; chat MCP is separate |
| Vercel | [Vercel](vercel/README.md) | Server-side REST / SDK with secret API keys |
| JavaScript / TypeScript | [SDK source](javascript/README.md) | Signed quotes, owned orders and CSV retrieval |
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

The website has completed a real paid licensed-data delivery. Claude catalog and
usage access has been verified. An ordinary Production customer also verified
the scoped REST quote and authenticated, signed approval review for 40 records
at $0.05 each ($2.00), without creating Checkout or paying during the check.
The temporary narrowly scoped verification key was revoked afterward.

MCP and SDK purchase contract checks are mocked. The Production test account had
no delivered order, so developer CSV retrieval, **a full paid Production developer
round trip and other native host sessions remain independently unverified**.
Do not describe those as operational merely because their setup guide or
implementation is public.

A no-payment verification may create a quote, check that its approval is bound
to the correct workspace and inspect the displayed price. It must not pay or
request supplier data. An end-to-end paid verification needs separate explicit
customer spending authorization; completed authorized orders can be used for
non-billable authenticated retrieval checks.
