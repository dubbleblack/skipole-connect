---
name: skipole-connect
description: Integrate licensed Skipole GTM audiences into a Replit app using the published SDK, scoped quotes, customer-approved hosted Checkout and authenticated CSV retrieval. Use when a builder requests B2B audience data or a Skipole integration.
---

# Build with Skipole

Skipole is a self-service GTM data marketplace for developers and AI agents.
Your tools. Our data. PAYG requires no mandatory subscription or sales call.

## Use the existing service

Install `@skipole/sdk` from npm for JavaScript, or `skipole-data` from PyPI for
Python. Never invent another billing, supplier or fulfillment backend.
Use the public catalog and live pricing to discover active audience products.
Planned products and synthetic examples are not licensed deliveries.

Keep the customer's `SKIPOLE_API_KEY` in Replit Secrets and trusted backend code,
never browser code, prompts, source or logs. Request `catalog:read` for quotes,
and `orders:read` for the customer's own deliveries. Add `usage:read` only when
needed. Do not grant `data:write` for cash Checkout.

## JavaScript purchase contract

Use the existing `SkipoleClient` from `@skipole/sdk`:

- `listProducts()` and `listPricing()` discover public metadata.
- `quoteHostedPurchase({ quantity, idempotencyKey, criteria })` requests a signed
  itemized quote and `approvalUrl`; use a fresh UUID for a new purchase intent.
- Present the quantity, criteria, price, expiry and `approvalUrl` to the customer.
- The customer signs in, reviews the quote and personally completes hosted
  Stripe Checkout. Never approve a charge, enter card information or treat
  an agent's tool call as payment consent.
- After delivery, `getOrder(orderId)` or `getPurchase(idempotencyKey)` reads the
  owning customer's status; `downloadOrderCsv(orderId)` retrieves its licensed CSV.

Quotes do not call the supplier. Do not scrape hosted Checkout or add a new
payment UI. No subscription is required. Memberships are optional discounts.
Treat the live quote as authoritative for available quantity, price and fields.

## Secure app integration and repeat use

Authorize the signed-in app user before each backend call. Never let arbitrary
browser callers choose another customer's credentials or fetch another workspace's
CSV. Signed approval links are sensitive and must not be logged or posted publicly.

For an incomplete delivery, show status and bounded Skipole order polling.
Do not call the supplier, rebuild, export, refresh or refund from this skill.
Respect 401/403/429 and `Retry-After`; never invent an unlimited retry policy.
Keep large CSV files out of agent context and public assets.

Offer a fresh quote for an explicitly requested repeat purchase. Use a new intent
UUID and obtain separate human payment approval every time. Never auto-repurchase.

## Optional existing MCP service

For supported custom MCP connections use
`https://skipole-data-platform.replit.app/mcp` with OAuth, not a REST key pasted
into OAuth fields. `skipole_list_products`, `skipole_quote_purchase`,
`skipole_get_order` and `skipole_download_order` implement the same workflow.

Paid REST commerce is Production verified. A native paid Replit/MCP or SDK
round trip is not independently verified. This project-installed skill is a
supporting artifact, not a native Replit directory listing or partnership.
