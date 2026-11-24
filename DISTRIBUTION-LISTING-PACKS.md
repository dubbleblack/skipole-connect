# Skipole distribution listing packs

Submission copy and technical facts for channels that can send developers or
workflow users to Skipole's existing marketplace. This is not evidence of
submission, approval, or paid native-client fulfillment. Do not upload licensed
customer records, credentials, API keys, or a real order as a demo.

## Source of truth

- **Website:** <https://skipoledata.com>
- **Marketplace:** <https://skipoledata.com/marketplace>
- **AI-readable guide:** <https://skipoledata.com/llms.txt>
- **OpenAPI:** <https://skipoledata.com/openapi.yaml>
- **Public catalog:** `GET https://skipole-data-platform.replit.app/api/v1/catalog`
- **REST base:** `https://skipole-data-platform.replit.app/api`
- **MCP server:** `https://skipole-data-platform.replit.app/mcp`
- **Public developer repository:** <https://github.com/dubbleblack/skipole-connect>
- **REST quickstart:** <https://github.com/dubbleblack/skipole-connect/blob/main/START-HERE.md>
- **OpenAPI:** <https://github.com/dubbleblack/skipole-connect/blob/main/openapi.yaml>
- **Purchase flow:** <https://github.com/dubbleblack/skipole-connect/blob/main/HOSTED-PURCHASES.md>
- **MCP tool inventory:** <https://github.com/dubbleblack/skipole-connect/blob/main/MCP-TOOL-INVENTORY.md>
- **Privacy:** <https://skipoledata.com/privacy>
- **Support:** <mailto:support@skipoledata.com>

The live catalog currently returns four active cash audience offers at
**$0.05 USD per delivered record** and a 40-record / **$2.00 minimum** before
applicable taxes. Quotes enforce current capacity and product-specific limits.
The only allowed purpose currently returned for Consumer Data and Consumer
Intent is `audience_marketing`; Business Data and B2B Intent use
`business_research`. Each product's catalog schema and the delivered order's
license determine the supported filters and output fields. Do not copy all
filter fields into an output-field promise.

## Product copy

**Business Data — Advanced audience search**  
Configure a B2B audience using only the filters returned by the active catalog
schema. The allowed use is `business_research`, not sales or marketing outreach.
Marketing, Sales, Engineering, Finance, Human Resources and Operations are
department presets of this product, not separate supplier products or
permissions. The currently listed output fields are first name, last name,
business email and LinkedIn URL.

**B2B Intent**  
Configure a B2B audience with the supported company/person criteria and
available intent event date, topic and score filters. The allowed use is
`business_research`. The live catalog defines the permitted filters and the
order policy defines the output fields.

**Consumer Data**  
Configure a consumer audience using the currently supported consumer filters,
such as location and demographic selections. The allowed use is
`audience_marketing`. Only the order's licensed output fields are delivered.

**Consumer Intent**  
Configure a consumer audience with the currently supported consumer filters
and searchable intent topics. The allowed use is `audience_marketing`.
Topic IDs are payload values, not customer-facing product names.

**Availability note:** Email Enrichment is not an active offer in the public
catalog and must not be described as purchasable. Paid MCP and paid SDK
transactions have not been independently verified.

## Ready-to-use general listing copy

> Skipole is a self-service marketplace for licensed business, consumer, and
> intent audience data. Browse the live catalog, choose a supported
> product-specific configuration, review a signed quote, and approve each
> purchase in hosted Checkout. Delivered records are available through the
> customer's authenticated Skipole order as CSV or REST. PAYG is $0.05 per
> delivered record; the live quote shows current capacity and total. No
> subscription or sales call is required. Product-specific filters, fields,
> permitted purposes, and retention are governed by the live catalog and order
> license.

### Short version

> Find licensed audience data, approve a signed purchase quote, then retrieve
> your delivered records through authenticated CSV or REST.

### Do not claim

- Paid MCP, paid SDK, ChatGPT, Claude, Cursor, Replit, Apify, RapidAPI, Make,
  Zapier, Postman, or Clay marketplace purchasing as independently verified.
- A directory listing, partner application, OAuth connection, read-only tool
  call, package installation, quote, or approval link as a paid transaction.
- Guaranteed result counts before the signed quote and supplier-capacity check.
- Consumer advertising, resale, eligibility, profiling, or other rights beyond
  the order's permitted `audience_marketing` purpose and applicable license.
- That all products have the same filters, exported fields, or quantity ceiling.

## Existing REST and delivery contract

1. `GET /v1/catalog` returns active product metadata, current unit price, and
   product-specific cash-purchase schemas.
2. `POST /v1/customer/purchase-quotes` requires the customer API-key
   `catalog:read` scope. The signed quote includes its itemized amount,
   per-record price, quantity, expiry, idempotency key, and approval URL.
   Creating the quote does not charge the customer or call the supplier.
3. The customer must open the approval URL and personally approve hosted
   Checkout. Do not have an integration silently approve or repeat payment.
4. `GET /v1/customer/orders/{orderId}` and
   `GET /v1/customer/orders/{orderId}/csv` require the owning workspace's
   `orders:read` key. Cross-workspace access is rejected.
5. `GET /v1/customer/order-records?orderId=…&offset=…&limit=…` is read-only,
   paginated JSON for an already-paid and delivered B2B order. Refreshing this
   source does not create a quote, payment, supplier request, export job, or
   new purchase.

The hosted quote response shape is:

```json
{
  "quoteToken": "signed-quote-token",
  "idempotencyKey": "purchase-intent-uuid",
  "amountMinor": "200",
  "priceMinorPerRecord": 5,
  "currency": "usd",
  "quantity": 40,
  "expiresAt": "2026-11-17T20:00:00.000Z",
  "approvalUrl": "https://skipoledata.com/marketplace#purchase-review",
  "requiresCustomerPaymentApproval": true
}
```

Values above are illustrative only; never reuse a sample token or assume the
sample amount/expiry. The REST quote schema is also in
[`openapi.yaml`](./openapi.yaml).

### Authentication

- REST API keys are customer-created, workspace-scoped and sent as
  `Authorization: Bearer …` over HTTPS. Keep the key in the platform's secure
  connection or secret store, not in a listing, URL, code sample, or shared
  public collection.
- Public catalog reads require no customer key. Customer quote creation uses
  `catalog:read`. Existing order and delivery reads require `orders:read`.
- MCP uses OAuth authorization code with PKCE and dynamic client registration.
  Read-only product discovery uses `catalog:read`; existing owned-order reads
  use explicit `orders:read` consent. Quotes produce customer approval links;
  no MCP tool approves hosted Checkout. Public MCP discovery no longer includes
  legacy enrichment, audience build/export, or supplier-job refresh tools.
- Do not share a founder key, supplier credential, Stripe credential, or key
  with more access than the specific read/purchase flow needs.

## Channel-specific packages and blockers

### Claude Connectors Directory

**Listing name:** Skipole Connect  
**Category:** Data / Sales and Marketing  
**Description:** Use the general listing copy above. Keep the explanation of
hosted Checkout and human payment approval. Do not claim a paid MCP flow.

**Owner action:** <https://claude.ai/directory/manage>. Review the synced tools,
test each exposed tool as the portal requires, provide only reviewer access the
owner authorizes, complete the required policy confirmations, and submit.
There is no submission receipt yet. Do not check an all-tools-tested box unless
every exposed tool has actually been tested.

### Postman API Network

**Workspace name:** Skipole — Licensed Data API  
**Collection description:** Discover four active audience products, inspect
their live schemas, request a signed quote, and retrieve records only from an
order owned by the authenticated workspace. A human must approve hosted
Checkout. Store the customer's Skipole API key in a private Postman
environment; never publish it with the public collection.

**Owner action:** Create/verify a public publisher workspace, import the current
OpenAPI or the prepared
[Postman collection](./postman/skipole-licensed-data.postman_collection.json),
review its synthetic examples and authentication, then publish through the
[Postman API Network](https://learning.postman.com/docs/postman-api-network/showcase/publish/overview).
Follow the [private environment and publication steps](./postman/README.md).
Postman is discovery and documentation, not a per-record payment rail.

### Lovable integration partnership

**Status:** The public [Lovable partner page](https://lovable.dev/partners/integration)
currently routes to the general partner program, which lists Experts and
Solution partners; no separate integration-directory submission form or
listing receipt is confirmed. Do not apply under the wrong partner track or
claim an official Lovable integration.

**Owner-ready copy:** Use the copy in [`lovable/SUBMISSION.md`](./lovable/SUBMISSION.md)
to ask Lovable which owner-controlled route is appropriate for a data/API
integration. The copy describes the verified REST path and explicitly states
that a native Lovable integration is not verified. No application was submitted.

### ChatGPT / Codex directory

**Listing name:** Skipole  
**Description:** Skipole is an AI-native data broker. Discover its licensed
Consumer Data, Consumer Intent, Business Data and B2B Intent products, review
supported filters, and prepare a human-approved purchase quote. Retrieve only
the authenticated user's existing delivered order.

**Owner action:** Use OpenAI's
[current submission guide](https://developers.openai.com/plugins/deploy/submission).
Prepare the required directory package with the verified developer identity,
privacy/security details and review evidence. Follow the current directory
guidelines; do not put prices/promotions in the listing description where
prohibited. An MCP endpoint or registry entry alone is not a directory
submission. No ChatGPT/Codex client or paid flow is verified.

### Glama and MCP community directories

**Name:** Skipole Connect  
**Server:** `https://skipole-data-platform.replit.app/mcp`  
**Transport:** HTTPS Streamable HTTP  
**Authentication:** OAuth authorization code + PKCE; discover metadata from the server.  
**Description:** Skipole is an AI-native data broker for licensed Consumer Data,
Consumer Intent, Business Data and B2B Intent. Discover products, request signed
quotes and retrieve only your workspace's delivered records. Every purchase
requires customer approval in hosted Checkout. Paid MCP purchasing
is not independently verified.

**Registry status:** Version `0.1.0-alpha.3` is active and latest. Its
100-character description is “AI-native data broker: Consumer Data, Consumer
Intent, Business Data, B2B Intent.” The Registry API confirms the published
metadata. Paid MCP purchasing remains unverified.

**Glama status:** The [existing Glama listing](https://glama.ai/mcp/connectors/io.github.dubbleblack/skipole-connect)
currently displays the four active offer names and states that paid MCP is
unverified. The public page returned HTTP 200 on 2026-11-24. Glama's
official guidance says a maintainer claims the existing listing through its
**Claim connector** flow; this repository belongs to the personal GitHub account
`dubbleblack`, so the owner can sign in with GitHub and claim it. Once claimed,
edit the description on that existing Glama listing; do not create a duplicate.
For organization-owned repositories Glama instead requires a root `glama.json`,
but that is not needed for this personal repository. The owner must perform the
claim and edit; no Glama login, third-party submission or terms acceptance was
performed here.
The listing is currently marked unhealthy after its two latest health checks
failed. The public page asks its author to claim the listing and configure a test
profile; it does not disclose whether the profile is missing or expired. The
health check needs a saved profile to initialize an MCP session and list tools.
Do not weaken Skipole authentication or grant customer-order access.

**Owner action:** Sign in to the existing listing, use **Claim connector**, then
set or refresh **Admin → Test Profile** using a dedicated ordinary Skipole
account authorized only for `catalog:read`. Glama's check only needs to
initialize and list tools; do not grant `orders:read`, `data:write`, founder
access, or access to customer orders. Re-run Glama's health check after saving.
Do not weaken Skipole authentication or create another listing. No code change
is indicated by the observed 401.

Suggested description to paste into the existing Glama listing editor:

> Skipole is a licensed-data marketplace with four active audience products:
> Consumer Data, Consumer Intent, Business Data and B2B Intent. Discover
> product-specific filters and permitted uses, request a signed quote, approve
> each payment in Skipole's hosted Checkout, and retrieve only your workspace's
> delivered records through scoped REST access. The current workspace source
> defines scoped catalog, usage, and owned-order tools. Verify the deployed
> Production tool list after API Server publication. Paid MCP purchasing is not
> independently verified. Email enrichment is paused.

**Owner action:** Claim the existing Glama listing, apply or keep the description
above, then configure a dedicated ordinary account with only `catalog:read` in
Admin → Test Profile and rerun Glama's health check. Do not grant
`orders:read`, `data:write`, founder access, or access to customer orders.
Directory presence is discovery, not paid verification.

### Make and Zapier

**Proposed workflow:** Discover an active product; create a signed quote; send
the approval URL to the customer; after payment is complete, retrieve only the
customer's owned order and deliver the permitted CSV/records into their own
workflow destination. Customer authentication must be stored in a private
platform connection. Repeated workflow runs must not silently create a new
purchase or supplier request.

**Status:** No public Make or Zapier app exists. A platform app and its review
are still required. These workflow tools should route the user to the existing
human-approved checkout rather than implement another billing rail.

### RapidAPI

**Not ready for paid publication.** RapidAPI plan pricing is request/quota
based, while Skipole's approved charge is per actually delivered record. A
single call can yield a variable count or a shortfall. Do not set a paid
per-request plan, because that would not preserve the customer price or refund
semantics. A free discovery listing that links to the Skipole quote flow may be
considered only after the owner confirms the platform's terms and the existing
purchase route remains the payment authority.

### Apify Store

**Not ready for publication.** Apify's Pay-per-event model can represent
per-record events, but the current Skipole path has no Apify buyer
authorization/settlement adapter or Actor. The documented 20% seller
commission would leave $0.04 from a $0.05 event before Apify platform usage;
after a $0.01 supplier overage it leaves $0.03 before platform usage and fixed
supplier costs. Do not start supplier work until the full customer maximum is
authorized. Owner review of platform terms and whether hosting/redistribution
fits the data license is also required.

### Cursor and Replit

- **Cursor:** Owner reports publisher submission; no listing or approval is
  confirmed. Cursor read-only OAuth and product listing are Production verified.
  Check the existing publisher application; do not resubmit.
- **Replit:** Owner submitted the Integration Partner application; it is
  awaiting review. Do not resubmit. A partner application is not a directory
  listing or approval.

### Clay

Clay supports a read-only HTTP API source for importing an already-delivered B2B
order. The current guide is [`clay/README.md`](./clay/README.md). This is not a
Clay Marketplace listing and cannot create a purchase.

## Official platform documentation

- [RapidAPI monetization](https://docs.rapidapi.com/docs/hub-listing-monetize-tab)
- [Apify Pay-per-event](https://docs.apify.com/actors/monetize/pay-per-event)
- [Claude submission requirements](https://claude.com/docs/connectors/building/submission)
- [Postman API Network preparation](https://learning.postman.com/docs/postman-api-network/showcase/prepare/overview)
- [OpenAI directory submission](https://developers.openai.com/plugins/deploy/submission)
- [Make community apps](https://developers.make.com/custom-apps-documentation/apps-marketplace/how-does-it-work)
- [Zapier publishing requirements](https://docs.zapier.com/integrations/publish/integration-publishing-requirements)
