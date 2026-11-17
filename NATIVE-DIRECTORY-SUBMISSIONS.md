# Native platform submissions

Skipole is a self-service GTM data marketplace for developers and AI agents.
**Your tools. Our data.**

This is the application copy and handoff for official native directories. It
records owner-submitted applications separately from listings and approvals;
paid native purchasing is not claimed as verified.

## Shared listing fields

- **Name:** Skipole
- **Category:** GTM Data / Sales & Marketing Data
- **One-liner:** Self-service licensed data for businesses, marketers, developers and AI agents.
- **Description:** Discover four active audience capabilities—Consumer Data, Consumer Intent, Business Data and B2B Intent—then review the live product-specific filters and allowed purpose. PAYG is $0.05 per delivered record, with a $2.00 minimum order before applicable taxes. A customer reviews a signed quote, approves each payment through hosted Checkout and retrieves the owned delivery through authenticated CSV or REST. The live catalog and order-specific license control output fields, limits and permitted use. Paid REST commerce is Production verified; paid native MCP/SDK purchases are not independently verified.
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

The owner reports submitting the existing repository through the publisher
portal. Cursor completed Production OAuth and called `skipole_list_products`
without a purchase. This verifies read-only connectivity, not Marketplace
approval or paid purchase fulfillment. Do not resubmit; check the existing
publisher application for its current review result.

## Claude Connectors Directory

The live catalog exposes four audience capabilities—B2B, consumer, B2B intent
and B2C intent—for cash purchasing, with signed quotes and authenticated owned
order retrieval. Email enrichment remains unavailable and must not be advertised
as purchasable. Confirm the current server release before presenting these
capabilities to reviewers. Mocked REST/MCP, SDK and approval-screen checks do
not establish independently paid Production fulfillment. Do not check an
all-tools-tested attestation or claim a paid Claude session without its evidence.

Official developer portal: https://claude.ai/directory/manage
Choose **MCP connector**, not a local extension or a skill-only plugin.
No Claude directory submission receipt is available; the owner must submit from
the official portal after completing its tool-testing, reviewer-access and policy
confirmations. Do not attest untested tools. The owner-ready listing fields,
current tool inventory, test matrix and outstanding attestations are in
[`claude/SUBMISSION.md`](./claude/SUBMISSION.md).

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

- Confirm that the submitted deployment exposes the current tool titles and
  safety hints. Supplier-capable legacy operations are marked non-read-only and
  destructive; their permissions and behavior are unchanged.
- The directory portal requires a populated reviewer account and confirmation
  that every exposed tool has been tested. Verified Cursor catalog access
  and paid REST delivery do not satisfy this all-tools statement.
- The owner must authorize suitable reviewer access through the secure portal.
  Do not put passwords or tokens in this repository, chat or an application draft.
  Do not disclose a customer's historical contact records without authorization.
- Do not check unverified security, data-rights, tool-test or policy acknowledgments.
  Human-approved external Checkout is not autonomous financial execution, but
  Anthropic retains discretion under its Directory Policy.
- The agent has no authenticated Claude owner portal session and no submission
  receipt. A saved draft is not a submitted application or approved listing.

### Minimal reviewer access and confirmed evidence

- Use a dedicated ordinary, non-founder Skipole account and workspace. Start
  with `catalog:read` consent and `skipole_list_products` only.
- Complete normal OAuth. If the portal requires test credentials, the owner
  supplies them only through its secure reviewer fields, never through this
  repository or chat. Do not share founder access or a supplier/Stripe API key.
- Do not grant access to JMG's historical orders or licensed contact records.
  Populated order data and additional tool tests require separate owner approval.
- Confirmed evidence: Cursor completed Production OAuth and
  `skipole_list_products`; a separate paid REST transaction collected $2,
  delivered 40 licensed records and retrieved the authenticated CSV.
- That REST transaction is not a paid Claude, MCP or SDK test. Do not attest that
  every exposed tool is tested, or initiate a quote, payment, build or export
  merely to complete the application.

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

The owner has submitted the Integration Partner application. It is awaiting
review; do not submit it again. No native listing or approval is claimed.

The included `replit/.agents/skills/skipole-connect/SKILL.md` is a reusable
project skill supporting the existing service, not global Replit discovery.

## Evidence boundaries

The Cursor and Replit applications are owner-reported as submitted. The official
MCP Registry entry is active, but that is a discovery listing, not client approval.
No paid SDK or paid MCP session is claimed without its own observed result. Never
run a payment, supplier build, export, refresh or refund to complete an application
or prove a capability. See `DISTRIBUTION-LISTING-PACKS.md` for current channel
requirements and truthful submission copy.
