# Cursor workflow examples

## Inspect what is currently available

Ask Cursor to call the public catalog endpoint, show each category's real status, and explain which items are planned versus active. Do not infer a product schema from category names.

## Add a server-side catalog reader

Ask Cursor to add a typed read-only client for `GET /api/v1/catalog`, handle HTTP errors, and display the catalog availability state in the app. No API key is needed for this public metadata endpoint.

## Prepare a customer usage panel

Ask Cursor to add a backend-only call to `GET /api/v1/customer/usage` using a customer key with `usage:read`. Store the key in the host's secret manager, require the app's own customer authorization, and handle 401, 403, and 429 responses.

## Estimate before a future data operation

Ask Cursor to check whether a product is actually active and whether verified pricing and a request schema are published. If any are missing, stop without sending records. The current enrichment, search, and export operations are disabled.

## Connect MCP only after release

Use `https://skipole-data-platform.replit.app/mcp` as the current remote endpoint. Claude's read-only connection has been verified; Cursor client compatibility still needs a real authorization and tool-call test.
