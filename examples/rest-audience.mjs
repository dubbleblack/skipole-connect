// Use inside an authenticated Replit or Vercel server, never a public client.
// Buy directly: https://skipoledata.com/marketplace?utm_source=github#marketing-professionals
const API_ORIGIN = "https://skipole-data-platform.replit.app";

async function request(apiKey, route, { body, csv = false, fetchImpl = fetch } = {}) {
  if (!apiKey) throw new Error("A server-side workspace API key is required.");
  const response = await fetchImpl(`${API_ORIGIN}${route}`, {
    method: body ? "POST" : "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: csv ? "text/csv" : "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) {
    const error = new Error(`Skipole returned HTTP ${response.status}. No automatic retry was attempted.`);
    error.status = response.status;
    error.retryAfter = response.headers.get("Retry-After");
    throw error;
  }
  return csv ? response.text() : response.json();
}

export function quoteAudienceRest({ apiKey, intentKey, quantity = 100,
  departments = ["marketing"], emailDomain, fetchImpl }) {
  return request(apiKey, "/api/v1/customer/purchase-quotes", {
    body: { quantity, idempotencyKey: intentKey, criteria: {
      departments, ...(emailDomain?.trim() ? { emailDomain: emailDomain.trim() } : {}),
    } },
    fetchImpl,
  });
}

export async function readPurchasedCsvRest({ apiKey, intentKey, fetchImpl }) {
  const order = await request(apiKey,
    `/api/v1/customer/purchases/${encodeURIComponent(intentKey)}`, { fetchImpl });
  if (!order.csvAvailable) throw new Error("Delivery is not ready. Show the status; do not start another purchase.");
  return request(apiKey, `/api/v1/customer/orders/${encodeURIComponent(order.orderId)}/csv`,
    { csv: true, fetchImpl });
}
