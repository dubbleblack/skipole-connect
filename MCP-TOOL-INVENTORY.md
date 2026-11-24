# Skipole public MCP tool inventory

An authenticated Cursor Production session verified exactly the eight tools
listed here, the schemas for all four active audience offers, and workspace
usage. This confirms authenticated tool discovery and those read-only calls; it
does not establish a paid MCP purchase, quote-tool round trip, or delivered MCP
order.

## Authentication boundary

The MCP route requires Skipole OAuth authorization-code flow with PKCE, validates
the signed token and active grant, checks the verified Clerk user’s workspace
membership, and applies the shared organization rate limit. The resource server
allows only `catalog:read`, `usage:read`, and `orders:read`. An owned order or
licensed delivery requires explicit `orders:read`; catalog or usage permission
does not grant order access.

## Public tools

| Tool | Scope | Side effects and provider calls | Expected result | Evidence |
| --- | --- | --- | --- | --- |
| `skipole_list_products` | `catalog:read` | Reads the active public catalog only. No records, quote, payment, or supplier request. | JSON catalog entries and their current product metadata. | Authenticated Cursor Production `tools/list`/catalog verification. |
| `skipole_get_schema` | `catalog:read` | Reads the configured product policy and schema only. No quote, payment, or supplier request. | Product-specific filters, output fields, permitted purposes, price metadata, and signed-quote requirements. | All four active audience schemas retrieved in authenticated Cursor Production. |
| `skipole_quote_purchase` | `catalog:read` | Stateful, non-destructive quote preparation: records a quote event and reads the authenticated workspace's verified pricing tier and local supplier-capacity/reservation state. It creates no order or Stripe Checkout session, charges nothing, and makes no supplier-record request or consumption. | Signed quote with the selected `pricingTier` (`payg`, `builder`, or `scale`), per-record rate, maximum charge, expiry, idempotency key, and customer approval link. The customer must review and separately approve hosted Checkout. | Mocked MCP/hosted-commerce tests cover quote signing, capacity and workspace-specific price resolution. Production paid REST is verified; a paid MCP round trip is not. |
| `skipole_get_order` | `orders:read` | Reads an existing order belonging to the authenticated workspace. No supplier poll, retry, export, refund, or payment. | Order status and delivery/refund summary, or a not-found response that does not disclose another workspace’s order. | Focused database-backed fixture integration test; no real customer order is read in this task. |
| `skipole_download_order` | `orders:read` | Reads an existing delivered order owned by the authenticated workspace. It never builds, refreshes, or exports from the supplier. Small deliveries may be returned inline; bulk deliveries return authenticated download locations. | Existing licensed CSV or authenticated download instructions. The caller must handle contact data under the order’s license. | Fixture integration tests cover small and bulk response behavior, authorization, repeat reads, and foreign-workspace denial. No customer records were accessed in this task. |
| `skipole_estimate_cost` | `catalog:read` | Legacy credit estimate / separately gated legacy provider-operation quote only. It is not used for the four active cash-priced audience products; it never submits a request, charges credits, starts Checkout, or calls a supplier. | Legacy credit estimate or, where an older provider policy allows, a legacy quote without the hosted cash approval link. For Consumer Data, Consumer Intent, Business Data and B2B Intent, use `skipole_quote_purchase` instead. | Focused MCP tests confirm active cash audience requests do not use this legacy quote path. |
| `skipole_get_usage` | `usage:read` | Reads the authenticated workspace’s usage and legacy credit summary. No order or supplier access. | Workspace usage totals and shared rate-limit information. | Authenticated Cursor Production workspace-usage call; source tests also verify workspace binding. |
| `skipole_search` | `catalog:read` | Searches the public topic taxonomy through the configured provider topic-search endpoint. It is non-billable and does not request audience records or start a build, but it is an upstream network lookup. The MCP handler requires the active topic capability and `budgetCredits: 0`. | Topic labels, categories, and IDs for B2B/B2C intent configuration; not licensed audience records or purchased intent events. | Focused mocked topic-response test only. No upstream topic-search call was made in this task. |

### Quote and payment boundary

`skipole_quote_purchase` may return a signed hosted approval link. It does not
create a Stripe Checkout session or authorize an agent to spend. The customer
must open the link, review the current amount and request, and approve Checkout
through Skipole. Paid REST Production verification does not establish a paid
MCP-client transaction.

### Select the correct price tool

For any of the four active cash-priced audience offers, the agent must call
`skipole_list_products`, read that offer's schema with `skipole_get_schema`, and
prepare its signed quote with `skipole_quote_purchase`. Do not call
`skipole_estimate_cost` for those products: it is a legacy credit tool, not a
cash price estimator, and it does not return the signed customer approval link.

The quote is calculated for the authenticated workspace. Its `pricingTier`,
`priceMinorPerRecord`, and `amountMinor` are the values to present; do not infer
an individual customer's rate from the public PAYG catalog. A verified active
Builder or Scale membership applies its record rate ($0.04 or $0.03); otherwise
the account receives PAYG ($0.05). Monthly membership fees, if any, are separate.
The quote's expiry and capacity result are account/request specific.

For a safe 1,000-record quote-only check, use an authorized ordinary test
workspace, a product schema that supports the chosen request, `quantity: 1000`,
and a matching `request.limit: 1000`; use a fresh UUID as `idempotencyKey`.
Inspect the returned tier, unit rate, amount, currency, and expiry. At current
published rates, the pre-tax expected data amounts are $50.00 PAYG, $40.00
Builder, or $30.00 Scale. Current capacity may reject 1,000; do not retry with
different criteria as a way to probe capacity. Quote preparation records a
quote event and reads current price/capacity state but does not create Checkout,
charge a payment, submit a supplier-record request, consume supplier records,
or fulfill an order. The procedure describes a check only; it must not be run
without any separate authorization required for Production quote creation.

Example Business Data arguments (use a fresh real UUID when making the
separately authorized call):

```json
{
  "quantity": 1000,
  "idempotencyKey": "fresh-uuid-required",
  "productRequest": {
    "kind": "audience",
    "capabilityId": "audience-advanced-search",
    "purpose": "business_research",
    "request": {
      "type": "advanced_search",
      "limit": 1000,
      "filters": [
        { "field": "business_email", "operator": "has_value", "value": null }
      ]
    }
  }
}
```

### Tools no longer registered for public discovery

The current public MCP server does not register:

- `skipole_enrich` — legacy enrichment execution, including fixture execution.
- `skipole_create_export` — legacy audience build and supplier export operation.
- `skipole_get_job_status` — previously refreshed provider job status and could
  contact the supplier as a side effect.

Their underlying legacy service modules and non-MCP routes were not removed or
changed by this update. The OAuth allowlist contains no `data:write` scope.
`catalog:read` does permit quote preparation, which stores a quote event, but
does not create Checkout or trigger supplier work.

## Verification still needed after publication

1. After publishing the current quote-guidance correction, refresh the existing
   Cursor OAuth connection and confirm `skipole_estimate_cost` explicitly
   directs active cash offers to `skipole_quote_purchase`.
2. Do not create the proposed 1,000-record Production quote until separately
   authorized. It would record a quote event and read capacity state, but would
   not start Checkout, charge, or request supplier records.
3. Test `skipole_get_order` / `skipole_download_order` only against a
   reviewer-owned order; never inspect another customer's order.
4. Do not test `skipole_search` against the live upstream taxonomy unless the
   owner separately authorizes that upstream lookup.
5. Do not attest to a paid MCP purchase, supplier operation, third-party
   approval, or blanket testing of all tool effects without new evidence.
