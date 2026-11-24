# Hosted cash purchases for developers and agents

**Paid REST commerce is Production verified.** One explicitly authorized internal
verification purchase completed the scoped REST quote, signed customer approval,
customer-paid Stripe Live Checkout ($2.00 for 40 Business Data records selected
with a Marketing department preset for business research), automated
encrypted fulfillment, and authenticated REST CSV retrieval (HTTP 200). All 40
licensed records passed CSV validation. Payment reconciled once; no refund was due.
This verifies the REST path, not outside-customer acquisition or future coverage.
**Paid SDK and MCP purchases remain independently unverified.** Their source and
mocked contract tests are not native-client paid verification.

[Purchase on the live website](https://skipoledata.com/marketplace#marketing-professionals)
or use the customer-approved flow below. Package registries and optional
subscriptions are not prerequisites for website purchasing or using this SDK source.

This flow reuses Skipole's existing orders, hosted Stripe Checkout, payment
verification, once-only audience build, supplier budget, shortfall refunds and
encrypted My Orders delivery. No monthly plan or prepaid credits are required.
Business Data uses the existing advanced-search product. Its department presets
are filters on that single business-research product, not separate products or
permission to market or conduct sales outreach. The supplier documents
up to 1,000,000 records per build, but the current reliable single-file delivery
bound is 3,965 records for these four fields, or less if allowance is lower.
Use the maximum returned by the quote/approval flow; a supplier ceiling is not
a promise that Skipole currently delivers that quantity. Larger requests receive
the supported quantity before payment, not an enterprise-sales requirement.
Pricing is $0.05/record PAYG, $0.04 with an active Builder membership ($29/month),
or $0.03 with an active Scale membership ($99/month). Memberships, when separately
enabled, change price, not volume limits. The $2 minimum means at least
40/50/67 records respectively. No included records or prepaid credits.

Quotes check the current supplier ledger; Checkout atomically reserves capacity
before creating the hosted payment session. A quote does not hold records.
Supplier overages are prohibited. Large jobs run asynchronously after verified
payment and deliver through authenticated My Orders and the same CSV API.
CSV input is bounded at 512 MiB and compressed delivery at 32 MiB inside the
existing encrypted envelope. An unusable bulk export is not delivered; its
existing order receives the existing full-refund handling without a rebuild.

## One flow, with explicit human payment approval

1. Sign in to Skipole and create an API key in **Dashboard → API keys**.
   Select `catalog:read` and `orders:read`. Keep the key in server-side secrets.
   A subscription is not required to create or rotate a key.
2. Request a quote using a new UUID for this purchase intent. This does not
   create an order or Checkout session, reserve supplier units, charge a card,
   consume credits or contact the data supplier.
3. Present the returned `approvalUrl` to the customer. It carries an expiring,
   workspace-bound signed quote in the URL fragment, not an API credential.
   The customer must sign in to the workspace that requested the quote,
   review it, continue to existing hosted Checkout and explicitly approve payment.
   An agent must never complete payment on the customer's behalf without
   separate, explicit spending authorization.
4. The payment webhook and existing worker fulfill the paid order once.
   Find the resulting order using your original purchase intent UUID and the
   same workspace's API key. No customer needs to copy an order ID to you.
5. For another intentional purchase, request a new quote with a new UUID.
   Reopening the same purchase intent is not authorization for another charge.
   Repeat purchases can overlap in records; cross-order uniqueness is not promised.

The quote is not authentication and cannot authorize another workspace.
An expired quote or a changed quantity/rate requires a new quote; never change a
signed purchase silently. Do not put approval URLs in logs or public repositories.

## JavaScript

Install the published client with `npm install @skipole/sdk`. See the
[practical business-research and retrieval example](CUSTOMER-EXAMPLES.md).

```js
import { randomUUID } from "node:crypto";
import { SkipoleClient } from "@skipole/sdk";

const skipole = new SkipoleClient({
  apiKey: process.env.SKIPOLE_API_KEY,
  integrationSource: "javascript",
});
const intentKey = randomUUID(); // persist for this intentional purchase
const quote = await skipole.quoteHostedPurchase({
  quantity: 40,
  idempotencyKey: intentKey,
  criteria: { departments: ["engineering"] }, // legacy Business Data filters; business research only
});
// Display quote.approvalUrl to the human customer. Do not automatically pay.
// After the customer proceeds, find the order by the intent you already saved.
// Before Checkout creates an order, this returns 404 rather than creating one.
const order = await skipole.getPurchase(intentKey);
if (order.csvAvailable) {
  const csv = await skipole.downloadOrderCsv(order.orderId);
  // Store/process licensed CSV in your authorized server-side application.
}
```

## Python

Install the published client with `python -m pip install skipole-data`.

```python
import os
from uuid import uuid4
from skipole import SkipoleClient

skipole = SkipoleClient(api_key=os.environ["SKIPOLE_API_KEY"])
intent_key = str(uuid4())  # persist for this intentional purchase
quote = skipole.quote_hosted_purchase(
    quantity=40,
    idempotency_key=intent_key,
    criteria={"departments": ["engineering"]},  # Business Data research only
)
# Present quote["approvalUrl"] to the human. Never automatically pay.
# Before Checkout creates an order, this returns 404; it never creates one.
order = skipole.get_purchase(intent_key)
if order["csvAvailable"]:
    csv = skipole.download_order_csv(order["orderId"])
```

Status reads and CSV downloads never poll, build or export anything at DataMoon.
They read the existing Skipole order and licensed delivery. A not-ready,
blocked, expired or foreign-workspace delivery returns an explicit error.
Neither SDK automatically retries purchases, polls jobs or initiates refunds.
Honor the workspace API rate limit and `Retry-After`; do not spin in tight loops.

## MCP

### Configurable audiences and repeat purchases

The published API accepts optional legacy `criteria` for the Business Data
product only. Omit `criteria` only when you intentionally want its default
department filter; the filter does not change the `business_research` purpose.
For other active products, construct `productRequest` from that product's live
`cashPurchase.requestSchema`. Do not combine the two inputs.

```js
const quote = await skipole.quoteHostedPurchase({
  quantity: 40,
  idempotencyKey: crypto.randomUUID(), // persist this NEW intentional purchase
  criteria: { departments: ["engineering"], emailDomain: "example.com" },
});
// Present approvalUrl to the customer. Never approve or pay on their behalf.
```

Python accepts the same object as `criteria=...`; MCP's `skipole_quote_purchase`
accepts optional legacy Business Data `criteria`. Department values are search
filters, not guaranteed coverage or permission for outreach. The Business Data
output fields are `first_name`, `last_name`, `business_email`, and `linkedin_url`;
other active products have their own live schemas. Fulfillment and refunds use
actual delivery.

Customers can save configurations in the website and reuse them with a new
quote and explicitly approved purchase. Saved criteria are not automatic supplier
jobs or payment permission. Repeat purchases may contain previously purchased
records. Larger supported purchases use the same method and account, without
upgrading or contacting sales. A documented supplier ceiling does not establish
Skipole's current deliverable quantity: the live delivery bound and reservable
allowance apply equally to all pricing tiers. Do not assume a 100,000-record
purchase is admitted merely because the API accepts a numeric quantity.

Bulk MCP retrieval returns authenticated download locations rather than placing
the contact list in the model's context. Use My Orders with the owning browser
session or the CSV API with an `orders:read` API key. This is prepared behavior,
not evidence of an independently verified paid Production MCP round trip.

The public MCP server exposes eight customer-facing tools. Their exact effects
and current evidence are in the
[MCP tool inventory](./MCP-TOOL-INVENTORY.md). Paid MCP client execution is not
independently verified.

| Tool | Required scope | Effect |
| --- | --- | --- |
| `skipole_list_products` | `catalog:read` | Read the active product catalog |
| `skipole_get_schema` | `catalog:read` | Read the current product-specific filters, fields, purpose, and price metadata |
| `skipole_quote_purchase` | `catalog:read` | Record and return a signed quote plus the customer approval link; no Checkout, payment, order, or supplier request |
| `skipole_search` | `catalog:read` | Search the public intent-topic taxonomy; upstream lookup only, no audience records or build |
| `skipole_estimate_cost` | `catalog:read` | Legacy credit estimate; active cash audience offers reject the legacy quote path; no submission or hosted customer approval link |
| `skipole_get_usage` | `usage:read` | Read this workspace's usage and legacy credit summary |
| `skipole_get_order` | `orders:read` | Read this workspace's existing order status and delivery summary |
| `skipole_download_order` | `orders:read` | Retrieve this workspace's existing licensed CSV or authenticated bulk download instructions |

Existing catalog/usage-only connections do **not** gain licensed-record access.
The user must explicitly approve `orders:read` in a new OAuth consent.
Revoking that connected application revokes access. Public MCP discovery no
longer includes the legacy `skipole_enrich`, `skipole_create_export`, or
`skipole_get_job_status` tools. There is no MCP card-charge tool in this cash
workflow; the customer separately approves hosted Checkout.

## Supported environments

- **Claude Desktop/Code, Cursor, Codex:** use the existing remote MCP setup
  guides; added cash tools remain unverified in these clients until release
  checks complete. Do not imply a native marketplace listing or partnership.
- **Replit:** store the API key in Replit Secrets and run the SDK on the server.
- **Vercel:** keep the key in server environment variables; perform SDK calls
  from a server function, not browser code.
- **Lovable:** use a trusted server/backend function. Never expose the key in
  client JavaScript or chat context.

REST uses `POST /api/v1/customer/purchase-quotes`,
`GET /api/v1/customer/purchases/{idempotencyKey}`,
`GET /api/v1/customer/orders/{orderId}` and
`GET /api/v1/customer/orders/{orderId}/csv`. SDKs send the key in the
Authorization header, not a URL. Ordinary website purchases remain available
independently of npm, PyPI, MCP Registry or optional membership releases.
