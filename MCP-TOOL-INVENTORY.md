# Skipole public MCP tool inventory

This file describes the tools registered by the current workspace source. It
does not prove what a running Production deployment currently advertises. The
API Server must be published, then the owner should inspect `tools/list` in an
authenticated client to confirm the deployed inventory.

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
| `skipole_list_products` | `catalog:read` | Reads the active public catalog only. No records, quote, payment, or supplier request. | JSON catalog entries and their current product metadata. | MCP protocol discovery test; historical Production evidence in the release manifest records this tool as verified. Current deployment must be rechecked after publishing. |
| `skipole_get_schema` | `catalog:read` | Reads the configured product policy and schema only. No quote, payment, or supplier request. | Product-specific filters, output fields, permitted purposes, price metadata, and signed-quote requirements. | Focused MCP handler test with a licensed policy fixture; no live order or supplier operation. |
| `skipole_quote_purchase` | `catalog:read` | Records a quote event and reads current price/capacity state. It creates no order or Checkout session, charges nothing, and submits no supplier request. | Signed quote, amount, expiry, idempotency key, and customer approval link. The customer must review and approve hosted Checkout separately. | Hosted-commerce integration tests with mocked Stripe and policy fixtures; separate paid REST path is Production-verified, but paid MCP purchasing is not. |
| `skipole_get_order` | `orders:read` | Reads an existing order belonging to the authenticated workspace. No supplier poll, retry, export, refund, or payment. | Order status and delivery/refund summary, or a not-found response that does not disclose another workspace’s order. | Focused database-backed fixture integration test; no real customer order is read in this task. |
| `skipole_download_order` | `orders:read` | Reads an existing delivered order owned by the authenticated workspace. It never builds, refreshes, or exports from the supplier. Small deliveries may be returned inline; bulk deliveries return authenticated download locations. | Existing licensed CSV or authenticated download instructions. The caller must handle contact data under the order’s license. | Fixture integration tests cover small and bulk response behavior, authorization, repeat reads, and foreign-workspace denial. No customer records were accessed in this task. |
| `skipole_estimate_cost` | `catalog:read` | Estimates legacy credits. A typed legacy request may produce a signed provider-operation quote only where legacy policy permits; current public cash audience offers reject this path. It never submits a request, charges credits, starts Checkout, or calls a supplier. | Legacy estimated-credit fields or a provider quote without a hosted customer approval link. It is not the cash PAYG quote. | Focused MCP tests cover the synthetic estimate and verify an active cash audience cannot use the legacy quote path; the hosted approval link comes from `skipole_quote_purchase`. |
| `skipole_get_usage` | `usage:read` | Reads the authenticated workspace’s usage and legacy credit summary. No order or supplier access. | Workspace usage totals and shared rate-limit information. | Focused mocked MCP test verifies workspace binding; the release manifest records historical Production read-only verification. Current deployment must be rechecked after publishing. |
| `skipole_search` | `catalog:read` | Searches the public topic taxonomy through the configured provider topic-search endpoint. It is non-billable and does not request audience records or start a build, but it is an upstream network lookup. The MCP handler requires the active topic capability and `budgetCredits: 0`. | Topic labels, categories, and IDs for B2B/B2C intent configuration; not licensed audience records or purchased intent events. | Focused mocked topic-response test only. No upstream topic-search call was made in this task. |

### Quote and payment boundary

`skipole_quote_purchase` may return a signed hosted approval link. It does not
create a Stripe Checkout session or authorize an agent to spend. The customer
must open the link, review the current amount and request, and approve Checkout
through Skipole. Paid REST Production verification does not establish a paid
MCP-client transaction.

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

1. Publish the API Server and verify the public `tools/list` response contains
   exactly the eight tools above and none of the three removed operations.
2. In an authorized ordinary workspace, call `skipole_list_products`,
   `skipole_get_schema`, and `skipole_get_usage`; confirm the granted scopes
   match each call.
3. Inspect quote and owned-order tool responses without completing Checkout or
   reading another customer’s order. Use only a dedicated reviewer-owned
   delivered order if testing CSV retrieval.
4. Do not test `skipole_search` against the live upstream taxonomy unless the
   owner separately authorizes that upstream lookup.
5. Do not attest to a paid MCP purchase, supplier operation, third-party
   approval, or blanket testing of all tool effects without new evidence.
