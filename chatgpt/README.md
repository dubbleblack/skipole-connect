# Skipole for ChatGPT

Skipole is an AI-native data broker. We source good data and make it easy to buy
and use. This guide does not claim a ChatGPT listing or paid MCP purchasing.

This repository does not contain a submitted or approved ChatGPT Directory app.
The existing remote MCP server is `https://skipole-data-platform.replit.app/mcp`.
Its OAuth connection and `skipole_list_products` tool were verified in Cursor,
not in ChatGPT. Paid MCP purchasing has not been independently verified.
The current workspace tool list and side-effect boundaries are documented in
[MCP-TOOL-INVENTORY.md](../MCP-TOOL-INVENTORY.md); verify the live list after the
API Server is published.

## Official directory submission

OpenAI's current submission flow accepts a packaged plugin that can include a
remote MCP connection, skills, or both:

- Submission guide: <https://developers.openai.com/plugins/deploy/submission>
- Directory guidance: <https://developers.openai.com/apps-sdk/app-submission-guidelines>

The owner must select the correct developer organization and verified identity,
prepare the required package, complete security/privacy checks, and submit it for
review. A public MCP endpoint or MCP Registry entry alone is not a ChatGPT
Directory listing. The directory copy must follow OpenAI's current listing rules;
the published guidance says not to advertise prices or promotions in the listing
description.

## Custom MCP connection

ChatGPT's custom-connector availability and controls depend on the workspace
plan and administrator settings. Use OpenAI's current workspace guidance rather
than relying on old **Plugins → Add custom MCP server** menu instructions. After
an owner-authorized test, verify OAuth consent and `skipole_list_products`
without requesting a quote, placing an order, or contacting a supplier.

The direct Skipole marketplace remains a separate human-approved purchase path.
This file does not claim ChatGPT authentication, tool use, a listing, or paid
commerce as verified.

## Synthetic, read-only discovery example

The public catalog is safe to read without credentials. This example retrieves
only product metadata; it creates no quote, Checkout session, order, or
supplier request:

```js
const response = await fetch("https://skipoledata.com/api/v1/catalog", {
  headers: { Accept: "application/json" },
});
if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
const products = await response.json();
console.log(products.map(({ slug, name, unitPriceMinor, currency }) => ({
  slug, name, unitPriceMinor, currency,
})));
```

Treat this as a generic HTTP example, not a verified ChatGPT tool call. Product
filters and output fields differ; inspect each live product's `cashPurchase`
metadata before constructing a request. Never place a customer API key in a
public plugin package or model prompt.
