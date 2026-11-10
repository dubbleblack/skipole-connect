# Connect Claude to Skipole

[Website purchasing is live](https://skipoledata.com/marketplace#marketing-professionals):
40–100 Marketing Professionals records at $0.05 per delivered record.
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

Only catalog and usage reads are available as live operations. Data retrieval, enrichment, audience builds, and exports remain unavailable until the applicable product, price, license, and fulfillment gates are active.

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

Open [hosted Checkout availability](https://skipoledata.com/marketplace#marketing-professionals)
in your browser. After a successful purchase, download the CSV from **My Orders**.
MCP cannot approve a charge or purchase records.
