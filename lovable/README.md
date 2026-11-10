# Skipole setup for Lovable

[Website purchasing is live](https://skipoledata.com/marketplace#marketing-professionals):
40–100 Marketing Professionals records at $0.05 per delivered record.
See [customer-approved hosted purchases](../HOSTED-PURCHASES.md) for signed quote
links and authenticated retrieval. Paid MCP/SDK round trips remain unverified;
the connection instructions below are not evidence of paid-flow verification.

This guide describes two different connection types. Neither is an official Lovable listing or partnership.

## REST in the generated application

For data used by the published app, call Skipole's REST API from server-side code. Add the customer's Skipole API key through the app host's secret manager, then make requests from a backend function or server route. Do not place the key in browser JavaScript, page configuration, or a chat prompt.

Start with `GET https://skipole-data-platform.replit.app/api/v1/catalog`, which is public and returns metadata only. Customer catalog, synthetic demo, and usage routes require an API key with the corresponding scope. Do not model unavailable enrichment or search operations as working features.

## MCP in Lovable chat

A chat-context MCP connection can make tools and documentation available to Lovable's coding agent while the developer works. It does not automatically add a connector to the published app or provide runtime credentials to end users.

Skipole's current remote endpoint is `https://skipole-data-platform.replit.app/mcp`. Claude's OAuth connection and read-only catalog and usage calls have been verified. Lovable compatibility has not been tested, and this is not an official Lovable connector.

## Copyable prompt

> Add a server-side Skipole REST client to this project. Start with the public catalog endpoint `GET https://skipole-data-platform.replit.app/api/v1/catalog`, show each product's actual availability status, and handle an empty catalog. Do not create fake live records or implement enrichment, search, or exports. If a customer API key is needed later, read it only from a server-side secret named `SKIPOLE_API_KEY`, send it in the Bearer Authorization header, and never expose or log it in browser code. For chat context, the current remote MCP endpoint is `https://skipole-data-platform.replit.app/mcp`; do not assume Lovable compatibility or an official listing.

## Current limitations

- No official Lovable connector or marketplace entry is claimed.
- Runtime licensed-data API access is separately gated; a chat MCP connection does not grant paid data access.
- Marketing Professionals public retail is $0.05 per delivered record: request 40–100 records, prepay $2–$5 and receive shortfall refunds. The earlier $5/ten-record delivery was experimental, not public retail pricing. Public release remains gated on the new Price and quantity/customer-path validation.
- No app runtime is created by a chat MCP connection.
