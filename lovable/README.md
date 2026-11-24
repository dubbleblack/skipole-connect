# Skipole setup for Lovable

Skipole is an AI-native data broker. We source good data and make it easy to buy
and use. This guide covers server-side REST and chat-context MCP setup, not an
official Lovable listing or independently verified paid native purchases.

[Browse and buy licensed audiences](https://skipoledata.com/marketplace?utm_source=lovable#marketing-professionals).
Paid REST commerce is Production verified; a native paid Lovable integration is not independently verified.

[Website purchasing is live](https://skipoledata.com/marketplace#marketing-professionals):
four active offers are $0.05 per delivered record on Pay As You Go, with a
$2.00 minimum Checkout before applicable taxes.
The live quote enforces current supplier allowance and reliable delivery
capacity. No plan upgrade or sales call is required for supported quantities.
See [customer-approved hosted purchases](../HOSTED-PURCHASES.md) for signed quote
links and authenticated retrieval. Paid MCP/SDK round trips remain unverified;
the connection instructions below are not evidence of paid-flow verification.

This guide describes two different connection types. Neither is an official Lovable listing or partnership.

## REST in the generated application

For data used by the published app, call Skipole's REST API from server-side code. Add the customer's Skipole API key through the app host's secret manager, then make requests from a backend function or server route. Do not place the key in browser JavaScript, page configuration, or a chat prompt.

Start with `GET https://skipoledata.com/api/v1/catalog`, which is public and returns metadata only for products currently available for purchase. The live catalog currently lists four audience offers at $0.05 USD per delivered record before applicable taxes; each product has different filters and licensed output fields. Customer routes require a workspace-owned API key with the corresponding scope. Do not model paused enrichment or unavailable legacy search operations as working features.

## MCP in Lovable chat

A chat-context MCP connection can make tools and documentation available to Lovable's coding agent while the developer works. It does not automatically add a connector to the published app or provide runtime credentials to end users.

Skipole's current remote endpoint is `https://skipole-data-platform.replit.app/mcp`.
The current workspace source exposes catalog/schema discovery, quote preparation,
owned-order status/retrieval, usage reads, legacy credit estimates, and public
intent-topic lookup. See the [tool inventory](../MCP-TOOL-INVENTORY.md) for exact
scopes and side effects; this source inventory does not prove which tools are
available in Production. Cursor OAuth and read-only catalog access are verified.
Claude and Lovable client compatibility and usage calls are not independently
verified. This is not an official Lovable connector or partnership.

## Copyable prompt

> Add a server-side Skipole REST client to this project. Start with the public catalog endpoint `GET https://skipoledata.com/api/v1/catalog`, show each product's actual availability and product-specific fields, and handle an empty catalog. Do not create fake live records or implement paused enrichment. If a customer API key is needed later, read it only from a server-side secret named `SKIPOLE_API_KEY`, send it in the Bearer Authorization header, and never expose or log it in browser code. For chat context, the current remote MCP endpoint is `https://skipole-data-platform.replit.app/mcp`; Lovable's custom MCP feature is a personal chat connection, not a published-app integration or an official Skipole listing. No Lovable MCP session has been verified.

## Current limitations

- No official Lovable connector, marketplace entry, or Skipole integration partnership is claimed.
- Runtime licensed-data API access is separately gated; a chat MCP connection does not grant paid data access.
- The live catalog has four active offers. Each product's own schema, fields,
  purpose, and quantity ceiling apply; a signed quote confirms current capacity.
  Business Data is for business research, not sales outreach. New email
  enrichment purchases are paused.
- PAYG is $0.05 per delivered record with a $2.00 / 40-record minimum before
  taxes. The live signed quote shows the current capacity and total; a chat MCP
  connection does not authorize payment.
- No app runtime is created by a chat MCP connection.
