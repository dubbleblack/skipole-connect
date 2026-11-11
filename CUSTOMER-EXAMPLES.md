# Build something useful with licensed GTM data

[Buy a business-contact audience now](https://skipoledata.com/marketplace?utm_source=github#marketing-professionals)
or use the same human-approved purchase from your application.

**What is live:** self-service audience purchases, automated fulfillment, My Orders
CSV and authenticated REST retrieval. JavaScript is on
[npm](https://www.npmjs.com/package/@skipole/sdk), Python on
[PyPI](https://pypi.org/project/skipole-data/), and the remote server is in the
[MCP Registry](https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.dubbleblack%2Fskipole-connect).
Paid REST commerce was verified with an authorized internal purchase. SDK
installation/import and read-only Claude MCP access are verified; paid SDK/MCP
native-client purchases are **not** independently verified.

## Choose the job you want to do

| Goal | Working example | Customer's purchase |
| --- | --- | --- |
| Build a prospecting app | [JavaScript workflow](examples/prospecting.mjs) | [Sales audience](https://skipoledata.com/marketplace?utm_source=github&audience=sales#marketing-professionals) |
| Buy a targeted B2B audience | Department and optional email-domain criteria below | [Choose one of six presets](https://skipoledata.com/marketplace?utm_source=github#audience-configurations) |
| Add licensed data to an AI agent | Human-approved MCP recipe below | [Review an audience](https://skipoledata.com/marketplace?utm_source=github#marketing-professionals) |
| Use REST from Replit or Vercel | [Framework-neutral server functions](examples/rest-audience.mjs) | [Replit](https://skipoledata.com/marketplace?utm_source=replit#marketing-professionals) / [Vercel](https://skipoledata.com/marketplace?utm_source=vercel#marketing-professionals) |
| Purchase and retrieve in Python | [Python workflow](examples/prospecting.py) | [Sales audience](https://skipoledata.com/marketplace?utm_source=github&audience=sales#marketing-professionals) |

## Before you integrate

Create your own workspace and a server-side API key with `catalog:read` and
`orders:read` in [Developer Access](https://skipoledata.com/dashboard/api-keys).
Keep the key in your hosting platform's secrets. Do not put it in browser code,
chat, URLs or logs. Your app must authenticate its users and restrict access to
the owning workspace before calling these helpers. They are not anonymous public
HTTP handlers and must not expose a shared master API key.

PAYG is $0.05 per delivered record with a $2 minimum Checkout. No subscription,
prepaid balance or sales call is required. Optional Builder/Scale memberships
change the rate, not the supplier or delivery limits. A 100-record example is
$5 PAYG before applicable taxes; your returned quote is authoritative. A quote
can reject unavailable quantities. It does not reserve inventory or start a payment.

The licensed CSV contains `first_name`, `last_name`, `business_email` and
`linkedin_url`. No phone, company or title fields are promised. Email delivery,
response rates and cross-order uniqueness are not guaranteed. Apply the
[product licence](https://skipoledata.com/legal/data-license), permitted-purpose,
retention and access requirements; buying data is not permission to spam,
redistribute it or train a model.

## 1. Prospecting application with JavaScript

Install `npm install @skipole/sdk`, then copy
[`examples/prospecting.mjs`](examples/prospecting.mjs) into your server application.

```js
import { randomUUID } from "node:crypto";
import { prospectingWorkflow } from "./prospecting.mjs";

const workflow = prospectingWorkflow({ apiKey: process.env.SKIPOLE_API_KEY });
const intentKey = randomUUID(); // Persist with this user's exact purchase intent FIRST.
const quote = await workflow.quote({
  intentKey, quantity: 100, department: "sales",
});
// Return quote.approvalUrl and quote amount to this authenticated user's UI.
// Do not log the signed URL, visit Checkout as a bot, or pay automatically.
```

After the human signs into the same Skipole workspace, reviews the quote and pays:

```js
const order = await workflow.status(intentKey); // Use the SAME persisted intent.
if (order.csvAvailable) {
  const csvText = await workflow.csv(intentKey);
  // Process on the server or offer an authenticated download to the owner.
}
```

An HTTP 404 before Checkout means no order exists yet, not permission to create
another intent. A pending/blocked delivery is not a reason to pay or build again.
Respect rate limits and `Retry-After`; these helpers have no automatic retry loop.
An intentional new purchase gets a new UUID and fresh human approval.

## 2. Target a B2B audience instead of enriching an email

Use `department: "marketing"` or `"sales"` in the helper. You can also pass
`emailDomain` (Python: `email_domain`) when you intentionally need a particular
business-email-domain match. The backend supports department criteria and an
email-domain substring filter—not arbitrary geography, seniority or title filters.
The six website presets use this same engine, not six independent datasets.

Keep criteria with the persisted intent; display them beside the price. Never
silently change the signed request. If criteria or quantity change, request a new
reviewable quote according to the existing intent contract. No supplier match is
guaranteed in advance. Shortfall refunds use actual licensed records delivered.

## 3. Give an AI agent a useful, bounded job

Connect the [existing remote MCP server](claude/README.md) using the customer's
OAuth authorization, then use this instruction:

> Help me research a licensed sales audience. Ask for my quantity and permitted
> purpose. List the active products, then call `skipole_quote_purchase` with
> quantity 100, a fresh UUID I will retain, and criteria
> `{"departments":["sales"]}`. Show the criteria, exact price and approval link.
> Stop for my decision. Do not pay, place another order, retry supplier work or
> put contact records into the conversation. After payment, help me use My Orders
> or my workspace's authenticated REST retrieval for the existing purchase.

Tools are implemented and published, but this is an integration recipe, **not a
claim that a paid MCP/native SDK purchase has been independently tested**.
Model-context use, retention and onward disclosure must be permitted by the licence.

## 4. Replit or Vercel: keep REST on the server

Copy [`examples/rest-audience.mjs`](examples/rest-audience.mjs) into the server side
of your existing app. Store `SKIPOLE_API_KEY` in Replit Secrets or Vercel environment
settings. Call `quoteAudienceRest` only after your own authentication and workspace
ownership check, passing the user's persisted intent UUID and criteria.

The helper uses the verified API origin `https://skipole-data-platform.replit.app`:

- `POST /api/v1/customer/purchase-quotes` → price and signed `approvalUrl`.
- `GET /api/v1/customer/purchases/{idempotencyKey}` → existing owned order.
- `GET /api/v1/customer/orders/{orderId}/csv` → existing licensed CSV.

Render the returned approval link in a private page. After explicit payment and
completed fulfillment, call `readPurchasedCsvRest` with the same intent UUID.
Never wire an app's page load or deployment hook to approve a payment.

## 5. Python purchase and retrieval

Install `python -m pip install skipole-data`, then copy
[`examples/prospecting.py`](examples/prospecting.py) into your server project.

```python
import os
from uuid import uuid4
from prospecting import ProspectingWorkflow

workflow = ProspectingWorkflow(api_key=os.environ["SKIPOLE_API_KEY"])
intent_key = str(uuid4())  # Persist before quoting; reload it for later reads.
quote = workflow.quote(intent_key=intent_key, quantity=100, department="sales")
# Return quote["approvalUrl"] privately to the human. Wait for their payment.

# Run these lines later, after payment, using the persisted intent:
order = workflow.status(intent_key)
if order["csvAvailable"]:
    csv_text = workflow.csv(intent_key)  # str, not bytes; no new supplier export.
```

## Save, return and compare optional memberships

Use [Saved Searches](https://skipoledata.com/marketplace?utm_source=github#saved-searches)
to retain criteria and review a fresh quote when you need more data. Previous
deliveries remain in [My Orders](https://skipoledata.com/dashboard/orders).
Repeating criteria may return previously purchased records; no deduplication or
exclusive inventory is promised.

At the current rates, Builder's $29 monthly fee is offset versus PAYG above
2,900 purchased records/month. Scale's $99 fee is cheaper than Builder above
7,000/month. At equality the costs tie. Taxes and available capacity still apply;
memberships include no records. [Compare plans](https://skipoledata.com/pricing)
only if your expected usage makes them worthwhile.
