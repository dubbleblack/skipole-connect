---
name: skipole
description: Discover licensed Skipole B2B audiences, request signed prices, present human-approved Checkout links and retrieve existing licensed orders. Use when a developer requests GTM data or a Skipole integration.
---

# Skipole

Skipole is a self-service GTM data marketplace for developers and AI agents.
Your tools. Our data. PAYG requires no subscription or sales call.

## Connect securely

Use the plugin's HTTPS MCP connection and Skipole OAuth. Let Cursor discover
the authorization endpoints and complete customer sign-in and scope consent in
the browser. Never embed API keys, OAuth tokens, client secrets or passwords in
the plugin, prompts, logs or source. REST API keys are not OAuth access tokens.

Request `catalog:read` for discovery/quotes, `usage:read` only for workspace usage,
and `orders:read` only for authorized existing order status and licensed retrieval.
Do not request `data:write` for the hosted-cash purchasing flow.

## Discover and quote

1. Call `skipole_list_products`. Only offer currently active licensed products.
   A planned product or synthetic example is not available licensed data.
2. For an audience purchase, call `skipole_quote_purchase` with the requested
   quantity, supported criteria and a new purchase-intent UUID. Reuse that UUID
   only for the exact same intent. Quotes do not charge or request supplier data.
3. Present the returned `approvalUrl` and itemized quantity, unit price, total,
   expiry and criteria. The live quote is authoritative for price and capacity.
   Do not use the legacy credit estimate as a retail cash quote.

## Human payment approval is mandatory

The customer must open the signed approval link, authenticate, review the quote
and complete genuine hosted Stripe Checkout personally. Never approve Checkout,
enter a payment method, charge a saved card, or simulate customer consent.
Requesting data is not payment authorization. Membership upgrades are optional.

## Retrieve and repeat

- Use `skipole_get_order` and `skipole_download_order` for the owning workspace,
  with `orders:read` consent, after payment and automatic delivery.
- An incomplete order is not a delivered CSV. Follow bounded status checks of
  Skipole's order only; never call a supplier, rebuild, export, refresh or refund.
- For bulk deliveries, use the authenticated download location rather than
  loading all contact rows into model context. Do not post records publicly.
- Each repeat purchase needs a fresh intent UUID, fresh quote and separate human
  payment approval. Do not silently repurchase or start a recurring purchase.

## Accuracy and limits

Licensed fields and available filters come from the actual contract, not imagined
email-enrichment, phone, job-title or deliverability guarantees. Keep customer
credentials and licensed records private. Handle 401/403/429 without bypassing
access controls or unbounded retries.

Paid REST commerce is Production verified. Paid native Cursor/MCP purchasing
is not independently verified. A plugin package is not an approved listing.
