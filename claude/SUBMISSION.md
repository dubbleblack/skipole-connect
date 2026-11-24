# Claude Connectors Directory submission package

Prepared for the owner to submit at <https://claude.ai/directory/manage> by
choosing **MCP connector**. This is application copy, not evidence of a
submission, approval or paid MCP purchase.

## Listing fields

- **Name:** Skipole Connect
- **Category:** Data / Sales and Marketing
- **One-liner:** AI-native data broker for four licensed audience products: Consumer Data, Consumer Intent, Business Data and B2B Intent.
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
- **Scopes:** Start with `catalog:read`. Grant `usage:read` only if workspace usage is part of the review. Grant `orders:read` only when a dedicated reviewer account has its own existing delivery to inspect. The public MCP server does not request `data:write`.

## Current server tools and boundaries

The deployed server synchronizes its real tool list; do not upload a mock tool
list. The current workspace source registers these eight tools. Confirm that the
same list is live after the API Server is published; see the detailed
[tool-by-tool inventory](../MCP-TOOL-INVENTORY.md).

| Tool | Purpose and permission | Safe boundary |
| --- | --- | --- |
| `skipole_list_products` | Discover currently active products; `catalog:read` | Metadata only; no contact records or supplier build. |
| `skipole_get_schema` | Read one active product's filters, output fields, price and purchase rules; `catalog:read` | Metadata only; no quote, payment or supplier operation. |
| `skipole_quote_purchase` | Prepare a signed cash quote and customer approval link; `catalog:read` | Records a quote event and checks current price/capacity state. No order, Checkout, charge, or supplier request. Customer approval remains outside MCP. |
| `skipole_get_order` | Read existing order status; `orders:read` | Only the authenticated workspace's own order; no supplier poll or retry. |
| `skipole_download_order` | Retrieve an existing licensed CSV; `orders:read` | Only the authenticated workspace's own delivered order. Use a dedicated reviewer account, never JMG or another customer's data. |
| `skipole_estimate_cost` | Estimate legacy cost or prepare a legacy quote; `catalog:read` | Active cash audience offers reject the legacy quote path; no request is submitted and no hosted customer-approval link is returned. |
| `skipole_get_usage` | Read the workspace's usage and legacy credit summary; `usage:read` | Only the authenticated workspace. Do not expose another customer's billing information. |
| `skipole_search` | Search the public B2B/B2C topic taxonomy; `catalog:read` | Non-billable upstream topic lookup only. It does not return licensed audience records or start a build. |

The MCP server no longer registers `skipole_enrich`, `skipole_create_export`,
or `skipole_get_job_status`. Their underlying legacy services/routes were not
changed. This removes supplier execution and provider-refresh operations from
public tool discovery; it does not change REST commerce or fulfilment.

The current MCP catalog tool describes all four active audience offers and
states that paid native MCP fulfillment remains independently unverified.
Consumer and business intent criteria select the audience; intent events,
topics and scores are not promised as delivered columns. Email enrichment is
not active for new purchases.

## Test evidence and remaining owner tests

No Claude Directory submission receipt or dedicated reviewer-owned delivery is
available to this preparation. The owner must not attest to tests beyond the
evidence actually collected:

1. After API publication, connect through OAuth and verify the exact tool list
   and annotations in Claude.
2. With an ordinary account, test `skipole_list_products` and
   `skipole_get_schema` for each active offer. These return catalog metadata.
3. `skipole_get_usage` requires `usage:read`; test only against that account's
   own workspace.
4. `skipole_estimate_cost` is a legacy credit estimate, not the customer cash
   quote; active public cash offers reject its legacy quote path. Do not
   represent its result as a customer approval link.
5. Do not run `skipole_search` in Production without separate owner approval:
   it contacts the upstream topic-taxonomy endpoint, although it does not buy
   audience records or start a build.
6. `skipole_quote_purchase` creates a quote event and reads live price/capacity
   state, but does not start Checkout or a supplier request. Do not test it in
   Production without the owner's approval for that read/write quote action.
7. Test `skipole_get_order` or `skipole_download_order` only against an
   already-delivered order owned by a dedicated reviewer workspace. Never use
   JMG or another customer's order. If no reviewer-owned delivery exists, mark
   these tests unavailable.
8. Complete only truthful privacy, security, data-rights, and testing
   attestations through Claude's secure portal. Never put credentials or
   customer records in this repository or chat.

Claude may require every exposed tool to be tested. Such an attestation remains
**not supportable** until the owner completes the post-publication tests above
or Claude permits the unverified actions to be marked unavailable. The three
legacy supplier-facing tools are no longer publicly discoverable. No payment,
supplier operation, customer-data access, directory submission, or legal
acceptance was performed while preparing this package.
