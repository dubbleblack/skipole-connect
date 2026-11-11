// Server-side only. Install: npm install @skipole/sdk
// Buy directly: https://skipoledata.com/marketplace?utm_source=github&audience=sales#marketing-professionals
import { SkipoleClient } from "@skipole/sdk";

export function prospectingWorkflow({ apiKey, fetchImpl } = {}) {
  if (!apiKey) throw new Error("Provide the owning workspace's server-side API key.");
  const client = new SkipoleClient({ apiKey, fetchImpl, integrationSource: "javascript" });
  return {
    // Persist intentKey in your app before calling. Reuse it for this exact intent.
    quote({ intentKey, quantity = 100, department = "sales", emailDomain }) {
      return client.quoteHostedPurchase({
        idempotencyKey: intentKey,
        quantity,
        criteria: {
          departments: [department],
          ...(emailDomain?.trim() ? { emailDomain: emailDomain.trim() } : {}),
        },
      });
    },
    // Before the customer starts Checkout this can return HTTP 404.
    status(intentKey) {
      return client.getPurchase(intentKey);
    },
    async csv(intentKey) {
      const order = await client.getPurchase(intentKey);
      if (!order.csvAvailable) {
        throw new Error("CSV is not available. Show the order status; do not rebuild or repay.");
      }
      return client.downloadOrderCsv(order.orderId);
    },
  };
}
