# Native platform submissions

Skipole is a self-service GTM data marketplace for developers and AI agents.
**Your tools. Our data.**

This is the application copy and handoff for official native directories, not
proof of submission, acceptance, partnership or paid native verification.

## Shared listing fields

- **Name:** Skipole
- **Category:** GTM Data / Sales & Marketing Data
- **One-liner:** Self-service licensed B2B audience data for GTM teams, developers and AI agents.
- **Description:** Discover supported B2B audience configurations, request itemized pricing, approve a purchase in hosted Checkout and securely retrieve licensed records. Pay as you go without a mandatory subscription or sales call; optional memberships discount usage. A human customer must approve every payment. Existing licensed output includes first name, last name, business email and LinkedIn URL; do not promise phone, title, enrichment or email-deliverability guarantees. Paid REST commerce is Production verified; paid native MCP/SDK purchases are not independently verified.
- **Company:** DubbleBlack LLC
- **Website:** https://skipoledata.com
- **Purchase:** https://skipoledata.com/marketplace
- **Documentation:** https://github.com/dubbleblack/skipole-connect/blob/main/HOSTED-PURCHASES.md
- **Repository:** https://github.com/dubbleblack/skipole-connect
- **Privacy:** https://skipoledata.com/privacy
- **Support:** support@skipoledata.com
- **Security:** https://github.com/dubbleblack/skipole-connect/blob/main/SECURITY.md
- **Icon / Cursor Logotype URL:** https://raw.githubusercontent.com/dubbleblack/skipole-connect/main/cursor/assets/skipole-icon-512.png
- **Bundled icon:** `cursor/assets/skipole-icon-512.png` — official, unmodified 512×512 PNG.
- **Server:** https://skipole-data-platform.replit.app/mcp
- **Transport:** HTTPS Streamable HTTP
- **Authentication:** OAuth authorization code + PKCE; dynamic client registration
  is supported. Use live discovery metadata, not pasted tokens or invented client secrets.
- **Minimum scopes:** `catalog:read`; add `orders:read` for owned delivery and
  `usage:read` only for usage. Hosted cash purchasing does not need `data:write`.

## Cursor Marketplace

Official submission: https://cursor.com/marketplace/publish

The page requires the owner's Cursor sign-in and a plugin publisher application.
Submit the existing public repository. Its root `.cursor-plugin/marketplace.json`
points to `cursor/`, containing `.cursor-plugin/plugin.json`, `mcp.json`, a skill,
README, license and icon. This is the supported multi-plugin repository layout.

References checked:
- https://cursor.com/docs/reference/plugins
- https://cursor.com/marketplace/apollo
- https://cursor.com/marketplace/clay
- https://cursor.com/marketplace/zoominfo

Local package tests are not a Cursor application installation or OAuth session.
The owner must install through Cursor's supported repository/plugin interface,
complete OAuth and call `skipole_list_products` without making a purchase.
Do not claim marketplace discovery until Cursor returns an actual approved listing.

## Claude Connectors Directory

Official developer portal: https://claude.ai/directory/manage
Choose **MCP connector**, not a local extension or a skill-only plugin.

Use the shared fields above and a single universal server URL. Select required
OAuth sign-in and DCR where offered. Do not supply a made-up client ID or secret.
The portal syncs the actual tools from the server; do not upload fictitious tools.

Core workflow:
1. `skipole_list_products` discovers active products.
2. `skipole_quote_purchase` returns a signed price and human approval link only.
3. The human completes hosted Checkout outside the agent.
4. `skipole_get_order` and `skipole_download_order` retrieve an owned delivery.

Sample prompts:
- "Show the Skipole audiences currently available, without buying anything."
- "Quote a Marketing Professionals audience and show me the total and approval
  link. Do not pay, build an audience or contact the supplier."
- "Read the status of my existing Skipole order and retrieve its licensed CSV
  only if it is already delivered."

Allowed-link origins, if applicable: `https://skipoledata.com` only.
Never list `checkout.stripe.com` as our owned origin or bypass its human approval.

### Honest submission blockers

- Publish the narrow server metadata update adding tool titles and safety hints.
  Supplier-capable legacy operations are explicitly marked non-read-only and
  destructive; their permissions and behavior are unchanged.
- The directory portal requires a populated reviewer account and confirmation
  that every exposed tool has been tested. Existing Claude catalog/usage reads
  and paid REST verification do not satisfy this all-tools statement.
- The owner must authorize suitable reviewer access through the secure portal.
  Do not put passwords or tokens in this repository, chat or an application draft.
  Do not disclose a customer's historical contact records without authorization.
- Do not check unverified security, data-rights, tool-test or policy acknowledgments.
  Human-approved external Checkout is not autonomous financial execution, but
  Anthropic retains discretion under its Directory Policy.
- The agent has no authenticated Claude owner portal session and no submission
  receipt. A saved draft is not a submitted application or approved listing.

Official requirements:
https://claude.com/docs/connectors/building/submission
https://claude.com/docs/connectors/building/review-criteria
https://support.claude.com/en/articles/13145358-anthropic-software-directory-policy

## Replit Integrations

Official route: https://replit.com/partners — **Integration Partners**.
Use the complete proposal in `replit/partner-submission.md`.
The public form requires the owner's contact name and business city.
Its application is an intake for native integration review, not automatic listing.
Do not substitute the Solutions Partners consulting program.

The included `replit/.agents/skills/skipole-connect/SKILL.md` is a reusable
project skill supporting the existing service, not global Replit discovery.

## Evidence boundaries

No native listing, submitted application, paid SDK or paid MCP session is claimed
without its own receipt or observed result. Never run a payment, supplier build,
export, refresh or refund to complete an application or prove a capability.
