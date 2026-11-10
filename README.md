# Skipole Connect

Skipole Connect is the public developer distribution package for Skipole's REST API, remote MCP server, and SDKs. It uses the existing Skipole customer identity, scoped authorization, hosted Checkout, orders, and usage limits.

**Website purchasing is live:** [buy Marketing Professionals](https://skipoledata.com/marketplace#marketing-professionals) at $0.05 per delivered record with a $2 minimum Checkout. The next website publication removes the temporary 100-record ceiling: up to 1,000,000 per supplier build, subject to remaining supplier allowance and delivery capacity. All plans share those limits; membership changes the unit price, not permitted volume. Shortfalls are refunded automatically. No subscription or prepaid credits are required.

## Current service boundary

- The public catalog and public pricing routes expose metadata only.
- Customer API-key routes require a Skipole API key with the matching scope.
- The customer usage route requires `usage:read`.
- The synthetic demo route returns fabricated examples and never calls a data provider.
- The REST contract includes customer-approved hosted purchase quotes, owned-order lookup and authenticated CSV retrieval. Existing legacy credit-funded request, job-status and export routes remain separately gated by their capability, purpose, credit and budget policies.
- A quote does not contact a supplier or charge a customer. The hosted cash flow requires explicit customer payment in Checkout, not prepaid credits. Legacy credit-funded provider requests require a signed quote, `data:write`, sufficient credits and an active policy; these are not the public cash-purchase path.
- Licensed-data website Checkout and encrypted CSV delivery have completed a real paid order. Public Marketing Professionals purchasing is active. A non-founder reached genuine Stripe Live Checkout at 40 × $0.05 = $2.00 without paying during verification. The historical experimental $5 order is unchanged.
- The remote MCP endpoint is `https://skipole-data-platform.replit.app/mcp`. Claude's OAuth connection and catalog/usage calls have been verified. Cash-quote and scoped-order tools are implemented and published, but a paid MCP or SDK round trip is not yet independently verified. Other native client connections are not claimed as tested.
- The JavaScript and Python SDKs are versioned pre-release packages. Their builds and package contents are verified, but they have not been published to npm or PyPI.

Skipole owns the customer-facing identity. DubbleBlack LLC remains the product's billing and operating entity. This package contains no Stripe implementation, provider credentials, private provider schemas, or customer data.

## Packages

## Quickstart: find, buy and return

The next website release expands the same audience engine with department/domain
criteria and saved configurations. It does not activate consumer, enrichment or
intent datasets. See [configured and repeat purchases](./HOSTED-PURCHASES.md#configurable-audiences-and-repeat-purchases)
for the additive SDK/MCP input and its publication boundary. Paid developer
fulfillment remains unverified until a real customer-approved purchase completes.

**Customer-approved developer cash flow:** see [Hosted purchases](./HOSTED-PURCHASES.md)
for the new SDK methods, signed customer approval links and scoped retrieval
of existing licensed deliveries. No prepaid credits are required. This source
implementation is not yet a verified Production paid developer round trip;
the historical catalog/usage verification below does not prove the new tools.

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

### Install reviewed SDK source

The public source is [dubbleblack/skipole-connect](https://github.com/dubbleblack/skipole-connect).
Until actual registry publication, do not use unverified `npm install @skipole/sdk`
or `pip install skipole` commands: those names might resolve to other publishers.

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
- `python/`: versioned `skipole` Python package source.
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
