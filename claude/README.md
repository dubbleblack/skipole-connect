# Connect Claude to Skipole

[Browse and buy licensed audiences](https://skipoledata.com/marketplace?utm_source=claude#marketing-professionals).
Paid REST commerce is Production verified; paid Claude/MCP purchases remain independently unverified.

[Website purchasing is live](https://skipoledata.com/marketplace#marketing-professionals):
Marketing Professionals at $0.05 per delivered record, $2 minimum Checkout.
The live quote enforces current supplier allowance and reliable delivery
capacity. No plan upgrade or sales call is required for supported quantities.
See [customer-approved hosted purchases](../HOSTED-PURCHASES.md) for signed quote
links and authenticated retrieval. Paid MCP/SDK round trips remain unverified;
the connection instructions below are not evidence of paid-flow verification.

Skipole's current remote MCP endpoint is:

`https://skipole-data-platform.replit.app/mcp`

The Claude OAuth connection has been verified for the read-only catalog and usage tools. No official Claude directory listing or partnership is implied.

## Connect

1. Open **Customize → Connectors** in Claude.
2. Choose **Add → Custom → Web**.
3. Enter the MCP URL above.
4. Choose OAuth sign-in and complete the Skipole authorization and consent page.
5. Review the requested scopes before approving.

If Claude asks how to identify its OAuth client, use Claude's published identity or automatic registration as appropriate for the workspace. Do not paste a Skipole API key into OAuth client fields.

Catalog and usage reads are verified. The implemented hosted purchase tools
prepare a signed customer approval link and retrieve existing owned orders.
A paid Production MCP round trip remains unverified. Legacy credit-funded
enrichment/build tools remain separately gated; they are not this cash flow.

## Official Connectors Directory submission

The native directory route is <https://claude.ai/directory/manage>, choosing
**MCP connector**. A custom connection and an official MCP Registry entry are
not Claude directory acceptance. Use the prepared listing fields, sample prompts
and honest remaining requirements in
[Native directory submissions](../NATIVE-DIRECTORY-SUBMISSIONS.md).
The narrow server update adds the tool titles and safety annotations required
for review; it must be published before testing that deployed metadata.
The owner must provide suitable reviewer access through the secure portal and
complete its truthful tool-test and policy acknowledgments. No submission receipt
or approved directory URL is claimed here.

## Claude Desktop

Use the remote connector above through **Settings → Connectors**, where supported
by your Desktop version and plan, and complete Skipole OAuth in your browser.
The verified Claude connection does not establish that every Desktop version has
been tested. Do not put a private customer API key into an OAuth client field.

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

Use `skipole_quote_purchase` with a quantity and a new purchase-intent UUID,
then open its signed approval link in your browser. Review the criteria and
amount and explicitly approve hosted payment. After delivery,
`skipole_get_order` and `skipole_download_order` retrieve your owned order with
`orders:read` consent. MCP cannot approve a charge on your behalf.
See [the purchase guide](../START-HERE.md) and [full contract](../HOSTED-PURCHASES.md).
