# Claude Connectors Directory submission package

Prepared for the owner to submit at <https://claude.ai/directory/manage> by
choosing **MCP connector**. This is application copy, not evidence of a
submission, approval or paid MCP purchase.

## Listing fields

- **Name:** Skipole Connect
- **Category:** Data / Sales and Marketing
- **One-liner:** Licensed audience data for businesses, marketers, developers and AI agents.
- **Description:** Discover four active audience offers—Consumer Data, Consumer Intent, Business Data and B2B Intent—then review the live product-specific filters and allowed purpose. A customer may request a signed quote and must approve each payment in Skipole's hosted Checkout. Retrieve only the authenticated workspace's existing delivered order through scoped access. Product-specific filters, licensed fields and permitted use are controlled by the live catalog and order license. Paid REST commerce is Production verified; paid Claude/MCP purchasing is not independently verified. Email enrichment is not available for new purchases.
- **Website:** <https://skipoledata.com>
- **Purchase:** <https://skipoledata.com/marketplace>
- **Documentation:** <https://github.com/dubbleblack/skipole-connect/blob/main/HOSTED-PURCHASES.md>
- **Repository:** <https://github.com/dubbleblack/skipole-connect>
- **Privacy:** <https://skipoledata.com/privacy>
- **Support:** <mailto:support@skipoledata.com>
- **Security:** <https://github.com/dubbleblack/skipole-connect/blob/main/SECURITY.md>
- **Remote server:** <https://skipole-data-platform.replit.app/mcp>
- **Transport:** HTTPS Streamable HTTP
- **Authentication:** OAuth 2.1 authorization code with PKCE and dynamic client registration. Use server discovery; do not invent client IDs or secrets.
- **Scopes:** Start with `catalog:read`. Grant `orders:read` only when the reviewer needs to read that account's own existing order. No paid cash purchase requires `data:write`; legacy tools still request their existing scopes.

## Current server tools and boundaries

The deployed server synchronizes its real tool list; do not upload a mock tool
list. The source currently registers these tools:

| Tool | Purpose and permission | Safe boundary |
| --- | --- | --- |
| `skipole_list_products` | Discover currently active products; `catalog:read` | Metadata only; no contact records or supplier build. |
| `skipole_get_schema` | Read one active product's filters, output fields, price and purchase rules; `catalog:read` | Metadata only; no quote, payment or supplier operation. |
| `skipole_quote_purchase` | Prepare a signed cash quote and customer approval link; `catalog:read` | A quote is not payment, Checkout or supplier fulfillment. It may reserve quote/capacity state; test only with explicit owner approval. |
| `skipole_get_order` | Read existing order status; `orders:read` | Only the authenticated workspace's own order; no supplier poll or retry. |
| `skipole_download_order` | Retrieve an existing licensed CSV; `orders:read` | Only the authenticated workspace's own delivered order. Use a dedicated reviewer account, never JMG or another customer's data. |
| `skipole_estimate_cost` | Estimate legacy credit costs; `catalog:read` | Does not submit a data request; legacy credit pricing is separate from the cash quote. |
| `skipole_get_usage` | Read the workspace's usage and credit summary; `usage:read` | Only the authenticated workspace. Do not expose another customer's billing information. |
| `skipole_search` | Search public topic taxonomy; `catalog:read` | Topic metadata only; no paid audience build. Do not claim that this is a purchased intent-data result. |
| `skipole_enrich` | Legacy enrichment operation; `data:write` | Licensed enrichment is paused. Do not enable it or submit live identifiers for directory testing. |
| `skipole_create_export` | Legacy audience build or job export; `data:write` | Can start supplier work or export data. Do not test without separate owner authorization. |
| `skipole_get_job_status` | Read/refresh a legacy job status; `usage:read` | Do not test with an unknown job; a refresh could contact the provider. |

The current MCP catalog tool describes all four active audience offers and
states that paid native MCP fulfillment remains independently unverified.
Consumer and business intent criteria select the audience; intent events,
topics and scores are not promised as delivered columns. Email enrichment is
not active for new purchases.

## Test evidence and remaining owner tests

No Claude owner session, reviewer account or Claude Directory submission receipt
is available to this preparation. The owner must not attest that all tools have
been tested until this checklist is complete:

1. In Claude, connect to the exact remote endpoint above through OAuth and
   inspect the actual synchronized tool list and safety annotations.
2. With a dedicated ordinary test account, test `skipole_list_products` and
   `skipole_get_schema` for each of the four active offers. These are metadata
   reads.
3. Test `skipole_estimate_cost` with a non-mutating metadata-only input if the
   portal requires it. Do not confuse the legacy credit estimate with the cash
   quote.
4. Test `skipole_search` only if its public-topic lookup is acceptable to the
   owner and the required scope is available. Do not run a paid audience build.
5. Only if the owner explicitly authorizes it, test `skipole_quote_purchase` with
   synthetic criteria and a dedicated test workspace. It creates an expiring
   quote and may reserve capacity, but it must not be paid or followed by a
   supplier operation.
6. Test `skipole_get_order` and `skipole_download_order` only against an existing
   already-delivered order owned by the dedicated reviewer workspace. Never
   disclose JMG or other customer records. If no reviewer-owned order exists,
   mark these tests unavailable instead of using customer data.
7. Do not call `skipole_enrich`, `skipole_create_export` or
   `skipole_get_job_status` for review until the owner separately authorizes the
   specific live operation and supplies a safe reviewer-owned resource. Do not
   make enrichment active for this submission.
8. Complete only truthful directory attestations for privacy, security, data
   rights, tool testing and policy compliance. The owner must authorize reviewer
   access through Claude's secure portal; never put credentials or customer
   records in this repository or chat.

Claude may require an attestation that every exposed tool was tested. That
attestation is currently **not supportable**: supplier-facing legacy tools are
exposed and have not been tested, and live supplier/customer-data tests are not
authorized here. Stop at that confirmation rather than claiming completion.
No payment, supplier request or customer data access was performed while
preparing this package.
