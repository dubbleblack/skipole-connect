# @skipole/sdk

Pre-release JavaScript client for Skipole's documented REST API.

[`@skipole/sdk` is the official npm package](https://www.npmjs.com/package/@skipole/sdk).
This documentation-only alpha update corrects installation guidance without
changing SDK API behavior. TypeScript declarations are bundled. The paid REST
commerce path is Production verified; an independently paid SDK round trip is not.

## Install from npm

Node 20+ is required:

```sh
npm install @skipole/sdk
```

To pin this documentation-only release, use
`npm install @skipole/sdk@0.1.0-alpha.3`. This remains prerelease software even
when selected by the `latest` distribution tag.

## Alternative: published GitHub archive

The original tested archive remains available unchanged:

```sh
npm install "https://github.com/dubbleblack/skipole-connect/releases/download/sdk-v0.1.0-alpha.1/skipole-sdk-0.1.0-alpha.1.tgz"
```

The [release page](https://github.com/dubbleblack/skipole-connect/releases/tag/sdk-v0.1.0-alpha.1)
includes SHA256SUMS. The package imports as `@skipole/sdk`.

## Alternatively, install from public source

Node 20+ and Git are required. From your application directory:

```sh
git clone https://github.com/dubbleblack/skipole-connect.git
cd skipole-connect/javascript
npm run build
npm pack --pack-destination ../..
cd ../..
npm install ./skipole-sdk-0.1.0-alpha.3.tgz
```

Multi-product quoting requires SDK `0.1.0-alpha.3` or later and the corresponding
server release. Pass `productRequest` using the product's discovered `kind`,
`capabilityId`, permitted `purpose` and exact request filters/input. The four
active audience capabilities use `quoteHostedPurchase`; legacy Business Data
`criteria` remain compatible. Although the SDK has a generic enrichment request
shape, email enrichment is not an active cash offer and cannot currently be
purchased. `downloadOrderCsv` retrieves only an existing delivery owned by the
authenticated workspace. These interface details are not evidence of
independently verified paid SDK fulfillment.

The API quote response carries `pricingTier`, `priceMinorPerRecord`,
`amountMinor`, `maximumChargeMinor`, `currency`, and `expiresAt`. These fields
are returned by the API after the matching server release is published. The
currently published npm package remains `0.1.0-alpha.3`; its immutable TypeScript
declaration does not yet include the newer quote fields. The repository source
declaration is updated for a future authorized SDK release. No new npm version
is being claimed here.

For the customer-approved purchase, use `quoteHostedPurchase`, present
`approvalUrl` to the customer, and use `getPurchase` / `downloadOrderCsv` after
payment. Copy the complete [hosted purchase example](../HOSTED-PURCHASES.md#javascript).
Never put a key in a browser bundle. No package install, quote or status read
automatically charges a customer or requests supplier data.

```js
import { SkipoleClient } from "@skipole/sdk";

const client = new SkipoleClient({
  apiKey: process.env.SKIPOLE_API_KEY,
});
const usage = await client.getUsage();
```

Keep customer API keys in server-side secrets. Do not expose them in browser code.

The client also exposes separate legacy credit-funded provider quote/request
endpoints, job polling, and CSV download. These are not the cash-priced audience
checkout path. Email-enrichment purchasing remains paused:

```js
const idempotencyKey = crypto.randomUUID();
const request = {
  kind: "enrichment",
  capabilityId: "enrichment-email",
  purpose: "business_research",
  // Replace this placeholder only with an identifier you are authorized to use.
  request: { method: "email", email: "contact@example.invalid" },
};
const quote = await client.quoteProviderRequest({
  request,
  idempotencyKey,
});

// This legacy provider operation remains separately gated and is not an active
// cash offer. Do not call it to buy email enrichment.
// The endpoint currently returns a policy-unavailable response until enabled.
const result = await client.createProviderRequest({
  request,
  quoteToken: quote.quoteToken,
  idempotencyKey,
});
```

The legacy quote call does not contact the supplier. These provider request/export
methods belong to the separately gated credit-funded API, not the one-time
customer Checkout flow. Keep the original idempotency key for any uncertain
outcome; the SDK never retries automatically. The SDK does not create Stripe
Checkout sessions. Customers can buy active catalog products through the
website or request a signed quote through the REST client, then retrieve only
their own delivered CSV. Business Data is for business research, not sales
outreach. A successful catalog or quote call does not prove that paid SDK
fulfillment has been independently verified.

## Build and test

```sh
npm run build
npm test
npm pack --dry-run
```

The build copies the source and type declarations into `dist/`, which is the package's published entry point. Future releases require explicit authorization and a new version; never republish the immutable verified release.

Licensed under Apache-2.0. See `LICENSE`.
