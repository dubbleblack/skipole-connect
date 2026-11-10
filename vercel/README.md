# Use Skipole from a Vercel-hosted app

[Website purchasing is live](https://skipoledata.com/marketplace#marketing-professionals):
40–100 Marketing Professionals records at $0.05 per delivered record.
See [customer-approved hosted purchases](../HOSTED-PURCHASES.md) for signed quote
links and authenticated retrieval. Paid MCP/SDK round trips remain unverified;
the connection instructions below are not evidence of paid-flow verification.

This is a standard server-side REST integration, not a Vercel marketplace listing,
official connector or partnership. A deployment on Vercel has not been verified.

Use an existing server route in your app. For a Next.js App Router application,
the following public-catalog route can live in `app/api/skipole/catalog/route.ts`:

```ts
export async function GET() {
  const upstream = await fetch(
    "https://skipole-data-platform.replit.app/api/v1/catalog",
    { cache: "no-store" },
  );
  if (!upstream.ok) {
    return Response.json({ error: "Catalog unavailable" }, { status: 502 });
  }
  return Response.json(await upstream.json(), {
    headers: { "Cache-Control": "no-store" },
  });
}
```

The public catalog needs no key. Private usage requests must be authorized by
your app for the correct customer before forwarding that customer's key in the
`Authorization: Bearer ...` header. Configure keys as server-only host secrets,
never `NEXT_PUBLIC_*` values or browser code. Never log the key or contact data.

The SDK source can be used locally from `../javascript`; do not assume the npm
package exists until the approved release is published. Follow the JavaScript
SDK README for build and package checks.

This route neither charges customers nor calls a data supplier. Licensed website
orders use Skipole's signed-in one-time Checkout and My Orders. Separate provider
API methods remain policy gated; do not add automatic paid-operation retries.

Before claiming Vercel compatibility is verified, deploy this route in your own
authorized project and confirm a catalog read, error handling and tenant protection
for any private route. No new Vercel project is needed for Skipole's own launch.
