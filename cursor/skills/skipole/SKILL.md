---
name: skipole-connect
description: Guides coding agents integrating Skipole's documented REST API or remote MCP service. Use when a project needs Skipole catalog discovery, API-key setup, usage inspection, or developer-integration guidance.
---

# Skipole Connect

## Verify what is available

- Read the current public API reference and product statuses before implementing against a route.
- A `planned` catalog item is not a live data product.
- Public catalog and pricing calls return metadata only.
- Treat the synthetic demo as fabricated test content.
- Do not claim live enrichment, search, or exports. Those operations remain disabled until licensed products, provider access, pricing, and controls are operational.

## REST setup

- Use `@skipole/sdk` after it is published, or the local SDK source in the approved repository.
- Keep customer API keys on a trusted server in the host's secret manager.
- Never embed a key in browser code, logs, examples, screenshots, source control, or prompts.
- Request only the scopes the application needs: `catalog:read`, `demo:read`, or `usage:read`.
- Respect 401, 403, and 429 responses. Use `Retry-After` guidance; do not retry automatically without a bounded policy.
- The public catalog does not require a key. Customer catalog and synthetic demo access require their matching scopes.

## MCP setup

- Use the current remote MCP endpoint `https://skipole-data-platform.replit.app/mcp`. Do not claim that Cursor authentication or tool calls have been verified.
- The MCP service uses OAuth bearer tokens, not a REST API key in a custom header.
- Do not invent authorization URLs, token endpoints, scopes, or tool output.
- If OAuth metadata or the endpoint is unavailable, use the documented REST catalog and state the blocker.

## Billing and data safety

- Ask the customer before unusual cost or bulk personal-data operations.
- Estimate cost before a future paid request and enforce a customer budget.
- Never call an upstream data provider directly or expose provider credentials.
- Do not create payments, activate live billing, or represent synthetic values as real records.
