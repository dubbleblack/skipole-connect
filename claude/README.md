# Connect Claude to Skipole

Skipole is an AI-native data broker. We source good data and make it easy to buy
and use. The remote connector supports catalog discovery and scoped access; paid
MCP purchases remain independently unverified.

[Browse and buy licensed audiences](https://skipoledata.com/marketplace?utm_source=claude#marketing-professionals).
Paid REST commerce is Production verified; paid Claude/MCP purchases remain independently unverified.

[Website purchasing is live](https://skipoledata.com/marketplace#marketing-professionals):
four active offers are $0.05 per delivered record on Pay As You Go, with a
$2.00 minimum Checkout before applicable taxes. Each has its own purpose and
fields; Business Data is for business research, not sales outreach.
The live quote checks reserved supplier spend and reliable delivery
capacity. The included supplier allowance is not an inventory ceiling.
No plan upgrade or sales call is required for supported quantities.
See [customer-approved hosted purchases](../HOSTED-PURCHASES.md) for signed quote
links and authenticated retrieval. Paid MCP/SDK round trips remain unverified;
the connection instructions below are not evidence of paid-flow verification.

Skipole's current remote MCP endpoint is:

`https://skipole-data-platform.replit.app/mcp`

An authenticated Cursor Production session independently verified the current
eight-tool inventory, all four active product schemas, and workspace usage.
This confirms the server contract, not Claude client compatibility, paid MCP
fulfillment, or an official Claude directory listing or partnership.

## Connect

1. Open **Customize → Connectors** in Claude.
2. Choose **Add → Custom → Web**.
3. Enter the MCP URL above.
4. Choose OAuth sign-in and complete the Skipole authorization and consent page.
5. Review the requested scopes before approving.

If Claude asks how to identify its OAuth client, use Claude's published identity or automatic registration as appropriate for the workspace. Do not paste a Skipole API key into OAuth client fields.

The confirmed native-client evidence is Cursor's read-only catalog check.
The implemented hosted purchase tools
prepare a signed customer approval link and retrieve existing owned orders.
A paid Production MCP round trip remains unverified. The public MCP tool list,
scope, side-effect, and evidence details are in the
[MCP tool inventory](../MCP-TOOL-INVENTORY.md). Legacy enrichment execution,
audience build/export, and job-refresh tools are not registered for public MCP
discovery; their underlying services/routes were not changed.

## Official Connectors Directory submission

The native directory route is <https://claude.ai/directory/manage>, choosing
**MCP connector**. A custom connection and an official MCP Registry entry are
not Claude directory acceptance. Use the prepared listing fields, sample prompts
and honest remaining requirements in
[Native directory submissions](../NATIVE-DIRECTORY-SUBMISSIONS.md).
The owner-ready application fields, current tool inventory, test matrix and
uncompleted attestations are also collected in [SUBMISSION.md](./SUBMISSION.md).
The owner must verify that Claude syncs the current deployed tool titles and
safety annotations. Suitable reviewer access and truthful tool-test and policy
acknowledgments are still required through the secure portal. No submission
receipt or approved directory URL is claimed here.

## Claude Desktop

Use the remote connector above through **Settings → Connectors**, where supported
by your Desktop version and plan, and complete Skipole OAuth in your browser.
A custom connection does not establish that every Desktop version has been
tested. Do not put a private customer API key into an OAuth client field.

## Claude Code

Using a current Claude Code version with HTTP MCP support:

```sh
claude mcp add --transport http skipole https://skipole-data-platform.replit.app/mcp
claude
```

Run `/mcp` inside Claude Code to complete OAuth and inspect the available tools.
See the [official Claude Code MCP reference](https://code.claude.com/docs/en/mcp).
These are configuration instructions, not a claim of an end-to-end Claude Code
test, directory listing or partnership.

## Purchase licensed records

For Consumer Data, Consumer Intent, Business Data or B2B Intent, first call
`skipole_list_products`, then `skipole_get_schema`, and prepare the cash quote
with `skipole_quote_purchase`. Do not use `skipole_estimate_cost`; it handles
legacy credit estimates and does not return the cash approval link. The quote
reports the account's actual verified pricing tier and amount. Quote
preparation records a quote event but does not start Checkout, charge, or
request supplier records.

Use a fresh purchase-intent UUID. The customer must open the signed approval
link, review the criteria and account-specific amount, and explicitly approve
hosted payment. After delivery,
`skipole_get_order` and `skipole_download_order` retrieve your owned order with
`orders:read` consent. MCP cannot approve a charge on your behalf.
See [the purchase guide](../START-HERE.md) and [full contract](../HOSTED-PURCHASES.md).
