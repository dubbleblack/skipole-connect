# @skipole/sdk

Pre-release JavaScript client for Skipole's documented REST API.

The package is prepared for npm distribution but has not been published. It uses the existing Skipole API and customer API keys. Provider operations are gated by the live backend policy and are currently unavailable.

After an authorized npm release, install the package with:

```sh
# Only after a verified npm release. Until then, use the GitHub source quickstart.
npm install @skipole/sdk
```

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

The build copies the source and type declarations into `dist/`, which is the package's published entry point. No package release is authorized by this repository.

Licensed under Apache-2.0. See `LICENSE`.
