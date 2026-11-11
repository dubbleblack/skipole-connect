# Skipole for coding agents

Skipole sells licensed business-contact audience records through a
customer-approved hosted purchase. Use the [quickstart](START-HERE.md) and
[hosted purchase contract](HOSTED-PURCHASES.md), not private supplier endpoints.

- Paid REST commerce is Production verified for an authorized internal
  40-record / $2.00 purchase and authenticated CSV retrieval.
- Paid SDK/MCP native-client purchases remain independently unverified. Public
  source, setup guides and Registry metadata are not platform endorsements.
- API origin: `https://skipole-data-platform.replit.app`.
- Use a customer-owned server-side key: `catalog:read` for purchase quotes,
  `orders:read` for owned orders and CSV. Never ask for a key in chat or expose
  one in a browser bundle.
- `POST /api/v1/customer/purchase-quotes` takes `quantity`, one persisted
  UUID `idempotencyKey`, and optional authorized department/domain `criteria`.
  It returns the signed `approvalUrl`; it does not charge or call a supplier.
- Present that link to the customer. Only the customer approves the exact
  price and completes hosted Checkout. Never pay or approve automatically.
- Reuse the intent for `GET /api/v1/customer/purchases/{idempotencyKey}`.
  Before Checkout creates an order, 404 is expected, not permission to buy again.
- Retrieve existing delivery with `GET /api/v1/customer/orders/{orderId}/csv`.
  A download does not create a supplier export. Keep licensed contact data in
  the authorized customer's application, not public logs or model context.
- Stop on blocked/ambiguous fulfillment; never create a duplicate purchase,
  rebuild, export, refund or supplier retry to resolve it.
- A deliberate repeat order needs a new intent, fresh price review and explicit
  customer payment. It may overlap previously purchased contacts.
- PAYG requires no membership; optional Builder/Scale memberships reduce unit
  price but do not increase supplier or delivery limits.
