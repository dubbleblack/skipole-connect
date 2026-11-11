# Connect Codex to Skipole

[Browse and buy licensed audiences](https://skipoledata.com/marketplace?utm_source=codex#marketing-professionals).
Paid REST commerce is Production verified; paid Codex/MCP purchases remain independently unverified.

[Website purchasing is live](https://skipoledata.com/marketplace#marketing-professionals):
Marketing Professionals at $0.05 per delivered record, $2 minimum Checkout.
The live quote enforces current supplier allowance and reliable delivery
capacity. No plan upgrade or sales call is required for supported quantities.
See [customer-approved hosted purchases](../HOSTED-PURCHASES.md) for signed quote
links and authenticated retrieval. Paid MCP/SDK round trips remain unverified;
the connection instructions below are not evidence of paid-flow verification.

This is a custom remote MCP connection, not an official Codex listing or partnership.
The instructions follow [OpenAI's MCP guide](https://developers.openai.com/codex/mcp).
An authenticated Codex session and tool call have not yet been verified.

With a current Codex CLI that supports remote HTTP MCP and OAuth:

```sh
codex mcp add skipole --url https://skipole-data-platform.replit.app/mcp
codex mcp login skipole
```

Complete the Skipole sign-in and consent flow in your browser. Review the scopes.
Never enter a Skipole API key as an OAuth client secret.
If registration or callback validation fails, stop and retain only the sanitized
error; do not invent a client ID or bypass consent.

Ask Codex to list Skipole products, then read your own usage if that scope was
approved. Neither operation purchases records. Confirm both work before describing
this client as verified. Do not request a build, export or payment during setup.

MCP chat context is not runtime access for an app Codex generates. Use server-side
REST requests or the local SDK for that app, and keep customer API keys in secrets.
Licensed website orders use one-time Checkout, not mandatory credits or subscriptions.
