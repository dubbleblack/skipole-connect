# Skipole for DeepSeek Harness

Skipole is an AI-native data broker. We source good data and make it easy to buy
and use. This default-off overlay is a connector example, not an official
DeepSeek listing or verified paid purchase flow.

This is a default-off Cordis overlay for DeepSeek Harness's official
`@deepseek-ai/dsh-mcp-client`. It connects to Skipole's existing remote MCP
endpoint over Streamable HTTP. It does not create a Skipole API key or a new
service.

## Authentication limitation

DeepSeek Harness's documented MCP client accepts static HTTP headers; it does
not complete Skipole's browser-based OAuth flow or refresh OAuth tokens. The
overlay reads a short-lived Skipole OAuth access token from the local
`SKIPOLE_MCP_ACCESS_TOKEN` environment variable. Keep that token out of source
control, logs, prompts and chat. Replace it when it expires.

Do not use a long-lived credential or copy a token into this repository. If
DeepSeek adds a supported OAuth flow or secure token provider, this manual
header configuration should be replaced.

## Enable the connection

1. Authorize Skipole through its existing OAuth flow with only the scopes you
   need: `catalog:read` for product discovery and customer-approved quotes;
   add `orders:read` only when you need to retrieve your own order.
2. Set the resulting short-lived bearer token in DeepSeek Harness's local
   process environment as `SKIPOLE_MCP_ACCESS_TOKEN`. Never commit the value.
3. Merge the single `insert` entry from `cordis.patch.yml` into
   `$DSH_HOME/profiles/<profile>/cordis.patch.yml` for one profile, or
   `$DSH_HOME/cordis.patch.yml` for every profile. Preserve unrelated entries.
4. Restart the Harness host and wait for the MCP tools to appear as
   `mcp__skipole__...`.

The overlay is off until installed. It uses no supplier operation by itself.

## Safe first use

- Call `skipole_list_products` and `skipole_get_schema` to discover active
  offers and their current permitted fields, filters and prices.
- Only when the customer asks to price a specific order, call
  `skipole_quote_purchase` with the discovered product schema and show the
  resulting criteria, amount and customer approval link. The quote does not
  charge, create an order, or call a supplier.
- Stop and let the customer open the approval link and complete the existing
  hosted Checkout. Do not treat a quote or link as payment authorization.
- After the customer completes payment, use `skipole_get_order` or
  `skipole_download_order` only with `orders:read` consent and the owning
  workspace's order ID.

Paid MCP fulfillment has not been independently verified. Do not claim that
the AI client completes payment or receives production data end to end. The
authenticated REST purchase and retrieval path is the independently verified
developer commerce path. Small CSV responses may be returned inline to the
authorized agent, so follow the customer's data-handling requirements.

## Distribution status

DeepSeek's official guide documents user Cordis overlays and MCP connections;
it does not describe a formal third-party plugin submission or approval
directory. This configuration is a GitHub-distributed interoperability
example, not an official DeepSeek listing or partnership.
