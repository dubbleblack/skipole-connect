# Skipole Connect

Skipole Connect is the public developer distribution package for Skipole's REST API, remote MCP server, and SDKs. It is designed to use the existing Skipole customer identity, API-key authorization, credit ledger, and usage limits.

## Current service boundary

- The public catalog and public pricing routes expose metadata only.
- Customer API-key routes require a Skipole API key with the matching scope.
- The customer usage route requires `usage:read`.
- The synthetic demo route returns fabricated examples and never calls a data provider.
- The REST contract includes quote, credit-funded request, job-status, and CSV-export routes. These are controlled by the same backend capability, purpose, credit, and budget policies; no live provider capability is currently active.
- A quote does not call a provider. A provider request requires a signed quote, `data:write`, sufficient workspace credits, and an active capability policy. Enrichment is one lookup per request; batch fan-out is not exposed.
- Licensed-data website Checkout and encrypted CSV delivery have completed a real paid order. Public Marketing Professionals retail ($0.05 per delivered record, 40–100 requested records) remains disabled until its new Live Price and Production customer path are verified. Do not mistake the historical experimental price for public pricing.
- The current remote MCP endpoint is `https://skipole-data-platform.replit.app/mcp`. Claude's OAuth connection and read-only catalog and usage calls have been verified. Other client connections are not claimed as tested.
- The JavaScript and Python SDKs are versioned pre-release packages. Their builds and package contents are verified, but they have not been published to npm or PyPI.

Skipole owns the customer-facing identity. DubbleBlack LLC remains the product's billing and operating entity. This package contains no Stripe implementation, provider credentials, private provider schemas, or customer data.

## Packages

## Quickstart: find, buy and return

**Prepared developer cash flow:** see [Hosted purchases](./HOSTED-PURCHASES.md)
for the new SDK methods, signed customer approval links and scoped retrieval
of existing licensed deliveries. No prepaid credits are required. This source
implementation is not yet a verified Production paid developer round trip;
the historical catalog/usage verification below does not prove the new tools.

1. Browse [Marketing Professionals](https://skipoledata.com/marketplace#marketing-professionals).
   The page shows current availability; do not submit payment while the offer is unavailable.
2. Sign in, choose a quantity and review the full price before hosted Checkout.
3. When buying is enabled, pay once and download the licensed CSV from **My Orders**.
4. Return to the same page for another purchase. Repeat searches can contain records
   previously purchased; cross-order uniqueness is not promised.

No subscription or prepaid credits are required. MCP currently offers **read-only
catalog and usage**, not payment or licensed-data purchase tools. SDK provider
methods use a separate gated, credit-funded contract and do not replace website Checkout.

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

The JavaScript and Python clients expose the existing quote, request, job-status, and CSV-export endpoints. They do not retry paid operations automatically. Callers must retain and reuse the same idempotency key when checking the result of an uncertain request. Current provider policies keep the licensed operations unavailable until their metering, pricing, and budget configuration is active.

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
