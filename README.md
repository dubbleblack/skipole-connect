# Skipole Connect

<img src="cursor/assets/skipole-icon-512.png" width="80" height="80" alt="Skipole official icon">

**Paid REST purchasing is Production verified:** one customer-approved internal
test collected $2.00, automatically delivered 40 Business Data records selected
with a Marketing department preset for the permitted business-research purpose,
and retrieved the CSV with authenticated REST access (HTTP 200). This is not a claim
of outside customers, paid SDK/MCP verification, or official platform approval.
Start with the [purchase quickstart](START-HERE.md).

Skipole is an AI-native data broker. We source good data and make it easy to buy and use. Skipole Connect is the public developer distribution package for Skipole's REST API, remote MCP server, and SDKs. It uses the existing Skipole customer identity, scoped authorization, hosted Checkout, orders, and usage limits.

**Website purchasing is live:** [browse the marketplace](https://skipoledata.com/marketplace) for four active audience capabilities: Consumer Data, Consumer Intent, Business Data, and B2B Intent. The live catalog currently lists PAYG at $0.05 per delivered record; a 40-record order is $2.00 before applicable taxes. Each product's quote enforces its current quantity and supplier-capacity limits. Customer-approved hosted Checkout and authenticated delivery are required. No subscription or prepaid credits are required.

## Current service boundary

- The public catalog and public pricing routes expose metadata only. The current catalog returns products available for purchase, not planned capabilities.
- Customer API-key routes require a Skipole API key with the matching scope.
- The customer usage route requires `usage:read`.
- The synthetic demo route returns fabricated examples and never calls a data provider.
- The REST contract includes customer-approved hosted purchase quotes, owned-order lookup and authenticated CSV retrieval. Existing legacy credit-funded request, job-status and export routes remain separately gated by their capability, purpose, credit and budget policies.
- A quote does not contact a supplier or charge a customer. The hosted cash flow requires explicit customer payment in Checkout, not prepaid credits. Legacy credit-funded provider requests require a signed quote, `data:write`, sufficient credits and an active policy; these are not the public cash-purchase path.
- Licensed-data website Checkout and encrypted CSV delivery have completed an internal paid order. The owner reports successful direct Consumer Data and Consumer Intent purchases; this repository does not verify that those orders came from outside customers. A non-founder previously reached genuine Stripe Live Checkout at 40 × $0.05 = $2.00 without paying during verification.
- The remote MCP endpoint is `https://skipole-data-platform.replit.app/mcp`. An authenticated Cursor Production session verified exactly eight tools, all four active audience schemas, and workspace usage; this confirms discovery and those read-only calls only. `skipole_quote_purchase` prepares an account-specific cash quote and records a quote event, but does not create Checkout, charge the customer, or request supplier records. Paid MCP and SDK fulfillment remain independently unverified. The owner reported Cursor and Replit submissions; current review outcomes, approvals, and public native listings are not independently confirmed.
- The JavaScript and Python SDKs are published pre-release packages: [`@skipole/sdk` on npm](https://www.npmjs.com/package/@skipole/sdk) and [`skipole-data` on PyPI](https://pypi.org/project/skipole-data/). Public JavaScript installation and import are verified; this is not independent paid SDK purchase verification.
- Tested installable SDK archives are [published as a GitHub prerelease](https://github.com/dubbleblack/skipole-connect/releases/tag/sdk-v0.1.0-alpha.1).
- The official MCP Registry currently reports [`io.github.dubbleblack/skipole-connect`](https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.dubbleblack%2Fskipole-connect) version `0.1.0-alpha.3` as active and latest. Its description is limited to 100 characters. Registry publication is discovery only, not paid MCP verification or official client approval.

Skipole owns the customer-facing identity. DubbleBlack LLC remains the product's billing and operating entity. This package contains no Stripe implementation, provider credentials, private provider schemas, or customer data.

## Packages

## Quickstart: find, buy and return

**Build your first workflow:** [practical customer examples](./CUSTOMER-EXAMPLES.md)
cover business-research apps, licensed audiences, AI agents, Replit/Vercel REST and
JavaScript/Python purchase-to-CSV retrieval using the published packages. The
[Clay guide](./clay/README.md) imports an existing delivered B2B order without
starting another purchase or supplier operation.
[Public launch copy and submission guidance](./LAUNCH.md) distinguish owned
GitHub publication from community posts that still require an authorized owner.

The live marketplace has four audience capabilities. Business Data also offers
Marketing, Sales, Engineering, Finance, Human Resources and Operations department
filters; these are configurations of one product, not separate supplier products
or permitted purposes. The Marketing department filter does not grant marketing
or sales-outreach rights.
Consumer Data and Consumer Intent use `audience_marketing`; Business Data and
B2B Intent use `business_research`. The live catalog remains authoritative for
per-product filters, output fields, quantity limits and current availability.
See [configured and repeat purchases](./HOSTED-PURCHASES.md#configurable-audiences-and-repeat-purchases)
for the additive SDK/MCP input and its publication boundary. Paid developer
REST fulfillment has completed the authorized internal paid verification.

**Customer-approved developer cash flow:** see [Hosted purchases](./HOSTED-PURCHASES.md)
for the new SDK methods, signed customer approval links and scoped retrieval
of existing licensed deliveries. No prepaid credits are required. This source
implementation has completed a paid Production REST round trip; SDK and MCP
paid round trips are not independently verified by that REST result.

Start with the [platform setup and purchase guide](./START-HERE.md) for Claude,
Cursor, Replit, Codex, Lovable and Vercel. The [distribution listing packs](./DISTRIBUTION-LISTING-PACKS.md)
separate available discovery from verified purchase flows and pending applications.
Clay's HTTP API as Source setup is available for existing delivered B2B orders;
refreshing it does not initiate a purchase.

[Coding-agent instructions](AGENTS.md) describe the same verified REST flow
without granting an agent permission to pay, retry a supplier or expose records.

1. Browse the [live audience marketplace](https://skipoledata.com/marketplace).
   The page shows the current product, availability and quote.
2. Sign in, choose a quantity and review the full price before hosted Checkout.
3. Explicitly approve payment in hosted Checkout, then download the licensed CSV from **My Orders** after fulfillment.
4. Return to the same page for another purchase. Repeat searches can contain records
   previously purchased; cross-order uniqueness is not promised.

No subscription or prepaid credits are required for hosted cash purchases.
Production-verified Cursor MCP coverage is **read-only product catalog
discovery**. Earlier read checks are not proof that the current workspace's new
tools are available in Production. The workspace tool list includes catalog and
schema reads, quote preparation, owned-order status and retrieval, usage reads,
legacy credit estimates, and topic-taxonomy search; see the
[public MCP tool inventory](./MCP-TOOL-INVENTORY.md) for scopes, effects, and
evidence. A quote does not charge or request supplier data, and order tools read
only an existing order belonging to the authorized workspace. Verify the deployed
tool list after API Server publication. A paid MCP round trip remains unverified.
Legacy SDK provider methods use a separate gated, credit-funded contract.
Use hosted-purchase methods for signed approval links and existing paid deliveries.

### Install the published SDK packages

Install JavaScript from npm and Python from PyPI. The tested
[GitHub prerelease](https://github.com/dubbleblack/skipole-connect/releases/tag/sdk-v0.1.0-alpha.1)
remains available as an alternative:

```sh
npm install @skipole/sdk
```

```sh
python -m pip install "skipole-data==0.1.0a3"
```

The verified JavaScript release is `0.1.0-alpha.4`; pin it with
`npm install @skipole/sdk@0.1.0-alpha.4`. The default `latest` tag selects the
real SDK, not npm's staging placeholder. This remains prerelease software.

### Alternatively, install reviewed SDK source

The public source is [dubbleblack/skipole-connect](https://github.com/dubbleblack/skipole-connect).
The Python distribution is `skipole-data`, not the unrelated PyPI project
`skipole`. For JavaScript, use the default npm installation or verified version above.

```sh
git clone https://github.com/dubbleblack/skipole-connect.git
cd skipole-connect/javascript
npm install
npm test
# From your application, install the local built JavaScript package:
# npm install /absolute/path/to/skipole-connect/javascript
```

Python source installation:

The PyPI name `skipole` already exists and has not been verified as ours.
Do not install it from PyPI. Check for an existing dependency of that name before
installing this source SDK, which currently uses the same distribution name.

```sh
python -m pip install "git+https://github.com/dubbleblack/skipole-connect.git#subdirectory=python"
```

See [Claude](claude/README.md), [Cursor](cursor/README.md),
[Replit](replit/README.md), [Codex](codex/README.md),
[Vercel](vercel/README.md) and [Lovable](lovable/README.md).

## Distribution contents

- `javascript/`: versioned `@skipole/sdk` npm package source.
- `python/`: published `skipole-data` distribution, imported as `skipole`; not the unrelated PyPI project.
- `openapi.yaml`: customer-safe public and authenticated REST routes, including gated provider commerce.
- `cursor/`: Cursor plugin package. The owner reports submitting the repository
  to the publisher portal; no public listing or approval is claimed.
- `lovable/`: REST and chat-context MCP setup guidance. It does not imply an official connector.
- `replit/`: example, agent instructions and submitted Integration Partner proposal.
  The application is awaiting review; it does not imply a Replit marketplace listing.

The website records first-touch acquisition source for supported values. Customer SDKs may optionally send `X-Skipole-Integration-Source`; that header is self-reported attribution on authenticated API usage events only, not proof of installation, signup, payment, revenue, or wholesale cost. New marketplace sources must be added to the attribution allowlist before campaign conversions can be reliably separated.

The JavaScript and Python clients expose hosted purchase quotes, purchase-intent/order lookup and authenticated stored-CSV retrieval, alongside the legacy provider endpoints. They do not retry paid operations automatically. Retain the same idempotency key when checking an uncertain purchase; use a new key only for a deliberate repeat purchase. Live availability always follows the server's capability, pricing and budget controls.

## Package builds and tests

Additional host setup guides are in `codex/` and `vercel/`. They are not verified
native-client integrations or official listings. See `RELEASE-CHECKS.md` for the
public-commerce release gates, tested scope and remaining publication requirements.

The direct audience marketplace is live. The public catalog currently lists four
active offers at $0.05 per delivered record. The paid REST path has one verified
internal $2.00 / 40-record transaction; this does not establish an outside
customer or paid SDK/MCP transaction. Enrichment is not in the active catalog.

From this directory:

```sh
node scripts/prepare-release.mjs
(cd javascript && npm run build && npm test && npm pack --dry-run)
(cd python && python scripts/prepare-release.py && PYTHONPATH=src python -m unittest discover -s tests && uv build --wheel --no-build-isolation --out-dir /tmp/skipole-wheels)
```

The release manifest is `release-manifest.json`. The pre-release packages are
published: npm `@skipole/sdk` latest `0.1.0-alpha.4` and PyPI `skipole-data`
`0.1.0a3`. Registry publication is not independent paid-purchase verification.

## Security and publication

Read `SECURITY.md`, `LICENSE`, and the platform-specific README files before distributing anything. The integration packages use Apache-2.0. This license applies to this integration distribution only, not the Skipole backend or customer data. Source publication is authorized for `dubbleblack/skipole-connect`; registry uploads remain separate permission-gated actions.

The official website is `https://skipoledata.com`. The current API and MCP
endpoints remain on the existing Replit application until any custom-domain
endpoints are separately verified. The official MCP Registry entry is active;
other directory applications and their review states are recorded in the
listing pack. No partnership or approval is implied.
