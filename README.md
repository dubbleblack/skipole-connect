# Skipole Connect

<img src="cursor/assets/skipole-icon-512.png" width="80" height="80" alt="Skipole official icon">

**Paid REST purchasing is Production verified:** one customer-approved internal
test collected $2.00, automatically delivered 40 licensed Marketing records and
retrieved the CSV with authenticated REST access (HTTP 200). This is not a claim
of outside customers, paid SDK/MCP verification, or official platform approval.
Start with the [purchase quickstart](START-HERE.md).

Skipole Connect is the public developer distribution package for Skipole's REST API, remote MCP server, and SDKs. It uses the existing Skipole customer identity, scoped authorization, hosted Checkout, orders, and usage limits.

**Website purchasing is live:** [buy business-contact audiences](https://skipoledata.com/marketplace#marketing-professionals) at $0.05 per delivered record with a $2 minimum Checkout. The current conservative single-file delivery maximum is 3,965 records for the four licensed fields, or less if supplier allowance is lower. This is an operational delivery constraint, not a commercial package or enterprise-sales threshold. All plans share the same capacity checks; membership changes the unit price, not permitted volume. Shortfalls are refunded automatically. No subscription or prepaid credits are required.

## Current service boundary

- The public catalog and public pricing routes expose metadata only.
- Customer API-key routes require a Skipole API key with the matching scope.
- The customer usage route requires `usage:read`.
- The synthetic demo route returns fabricated examples and never calls a data provider.
- The REST contract includes customer-approved hosted purchase quotes, owned-order lookup and authenticated CSV retrieval. Existing legacy credit-funded request, job-status and export routes remain separately gated by their capability, purpose, credit and budget policies.
- A quote does not contact a supplier or charge a customer. The hosted cash flow requires explicit customer payment in Checkout, not prepaid credits. Legacy credit-funded provider requests require a signed quote, `data:write`, sufficient credits and an active policy; these are not the public cash-purchase path.
- Licensed-data website Checkout and encrypted CSV delivery have completed a real paid order. Public Marketing Professionals purchasing is active. A non-founder reached genuine Stripe Live Checkout at 40 × $0.05 = $2.00 without paying during verification. The historical experimental $5 order is unchanged.
- The remote MCP endpoint is `https://skipole-data-platform.replit.app/mcp`. Claude's OAuth connection and catalog/usage calls have been verified. Cash-quote and scoped-order tools are implemented and published. The complete paid REST path and authenticated CSV retrieval are Production verified. Paid MCP and SDK round trips remain independently unverified. Other native client connections are not claimed as tested.
- The JavaScript and Python SDKs are published pre-release packages: [`@skipole/sdk` on npm](https://www.npmjs.com/package/@skipole/sdk) and [`skipole-data` on PyPI](https://pypi.org/project/skipole-data/). Public JavaScript installation and import are verified; this is not independent paid SDK purchase verification.
- Tested installable SDK archives are [published as a GitHub prerelease](https://github.com/dubbleblack/skipole-connect/releases/tag/sdk-v0.1.0-alpha.1).
- The official MCP Registry reports [`io.github.dubbleblack/skipole-connect`](https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.dubbleblack%2Fskipole-connect) version `0.1.0-alpha.1` as active. Registry publication is not paid MCP verification or official client approval.

Skipole owns the customer-facing identity. DubbleBlack LLC remains the product's billing and operating entity. This package contains no Stripe implementation, provider credentials, private provider schemas, or customer data.

## Packages

## Quickstart: find, buy and return

**Build your first workflow:** [practical customer examples](./CUSTOMER-EXAMPLES.md)
cover prospecting apps, targeted audiences, AI agents, Replit/Vercel REST and
JavaScript/Python purchase-to-CSV retrieval using the published packages.
[Public launch copy and submission guidance](./LAUNCH.md) distinguish owned
GitHub publication from community posts that still require an authorized owner.

The audience engine supports department/domain criteria and saved configurations.
The live marketplace includes named Marketing, Sales, Engineering,
Finance, Human Resources and Operations search configurations. They are presets
of one licensed product, not six independently proven datasets. It does not
activate consumer, enrichment or intent datasets.
See [configured and repeat purchases](./HOSTED-PURCHASES.md#configurable-audiences-and-repeat-purchases)
for the additive SDK/MCP input and its publication boundary. Paid developer
REST fulfillment has completed the authorized internal paid verification.

**Customer-approved developer cash flow:** see [Hosted purchases](./HOSTED-PURCHASES.md)
for the new SDK methods, signed customer approval links and scoped retrieval
of existing licensed deliveries. No prepaid credits are required. This source
implementation has completed a paid Production REST round trip; SDK and MCP
paid round trips are not independently verified by that REST result.

Start with the [platform setup and purchase guide](./START-HERE.md) for Claude,
Cursor, Replit, Codex, Lovable and Vercel. The guides distinguish implemented
purchase tools from verified native-client sessions.

[Coding-agent instructions](AGENTS.md) describe the same verified REST flow
without granting an agent permission to pay, retry a supplier or expose records.

1. Browse [Marketing Professionals](https://skipoledata.com/marketplace#marketing-professionals).
   The page shows current availability; do not submit payment while the offer is unavailable.
2. Sign in, choose a quantity and review the full price before hosted Checkout.
3. Explicitly approve payment in hosted Checkout, then download the licensed CSV from **My Orders** after fulfillment.
4. Return to the same page for another purchase. Repeat searches can contain records
   previously purchased; cross-order uniqueness is not promised.

No subscription or prepaid credits are required for hosted cash purchases.
Verified MCP coverage is **catalog and usage**. The new quote and scoped retrieval
tools do not charge a card; a paid MCP round trip remains unverified. Legacy SDK
provider methods use a separate gated, credit-funded contract. Use the hosted
purchase methods for signed approval links and retrieval of existing paid deliveries.

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

The verified JavaScript release is `0.1.0-alpha.3`; pin it with
`npm install @skipole/sdk@0.1.0-alpha.3`. The default `latest` tag selects the
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
- `cursor/`: proposed Cursor plugin package. It is not submitted or listed.
- `lovable/`: REST and chat-context MCP setup guidance. It does not imply an official connector.
- `replit/`: example and agent instructions. It does not imply a Replit marketplace listing.

Customer SDKs may optionally send `X-Skipole-Integration-Source` using one of the documented values. This is self-reported attribution on authenticated API usage events only. It does not track installations, signups, payments, revenue, or wholesale costs.

The JavaScript and Python clients expose hosted purchase quotes, purchase-intent/order lookup and authenticated stored-CSV retrieval, alongside the legacy provider endpoints. They do not retry paid operations automatically. Retain the same idempotency key when checking an uncertain purchase; use a new key only for a deliberate repeat purchase. Live availability always follows the server's capability, pricing and budget controls.

## Package builds and tests

Additional host setup guides are in `codex/` and `vercel/`. They are not verified
native-client integrations or official listings. See `RELEASE-CHECKS.md` for the
public-commerce release gates, tested scope and remaining publication requirements.

Licensed Marketing Professionals website Checkout and authenticated CSV delivery
have been confirmed by the owner for the first paid order. Public purchasing is
still release-gated. The SDK credit-funded provider methods and read-only MCP
connection are not an alternative one-time Checkout flow.

From this directory:

```sh
node scripts/prepare-release.mjs
(cd javascript && npm run build && npm test && npm pack --dry-run)
(cd python && python scripts/prepare-release.py && PYTHONPATH=src python -m unittest discover -s tests && uv build --wheel --no-build-isolation --out-dir /tmp/skipole-wheels)
```

The release manifest is `release-manifest.json`. Package versions are pre-release versions, and the packages are not published.

## Security and publication

Read `SECURITY.md`, `LICENSE`, and the platform-specific README files before distributing anything. The integration packages use Apache-2.0. This license applies to this integration distribution only, not the Skipole backend or customer data. Source publication is authorized for `dubbleblack/skipole-connect`; registry uploads remain separate permission-gated actions.

The official website is `https://skipoledata.com`. The current API and MCP endpoints remain on the existing Replit application until any custom-domain endpoints are separately verified. No platform listing or partnership is implied.
