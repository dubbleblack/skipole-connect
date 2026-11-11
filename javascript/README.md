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
`npm install @skipole/sdk@0.1.0-alpha.2`. This remains prerelease software even
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
npm install ./skipole-sdk-0.1.0-alpha.2.tgz
```

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

The client also supports the existing provider quote and request endpoints, job polling, and CSV download:

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

// Execute only after reviewing the quote and receiving any required approval.
// The endpoint currently returns a policy-unavailable response until enabled.
const result = await client.createProviderRequest({
  request,
  quoteToken: quote.quoteToken,
  idempotencyKey,
});
```

The quote call does not contact the supplier. These provider request/export methods belong to the separately gated credit-funded API, not the one-time customer Checkout flow. Keep the original idempotency key for any uncertain outcome; the SDK never retries automatically. The SDK does not create Stripe Checkout sessions. Customers buy licensed Marketing Professionals orders and download their CSV through the signed-in website when purchasing is enabled, without a subscription or prepaid credits. A successful catalog or usage call does not prove that paid API operations are available.

## Build and test

```sh
npm run build
npm test
npm pack --dry-run
```

The build copies the source and type declarations into `dist/`, which is the package's published entry point. Future releases require explicit authorization and a new version; never republish the immutable verified release.

Licensed under Apache-2.0. See `LICENSE`.
