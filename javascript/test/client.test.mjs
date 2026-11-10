import assert from "node:assert/strict";
import test from "node:test";
import { SkipoleApiError, SkipoleClient } from "../dist/index.js";

test("hosted purchase SDK only quotes, reads status and downloads an existing CSV", async () => {
  const requests = [];
  const client = new SkipoleClient({ apiKey: "non-secret-fixture", fetchImpl: async (url, options) => {
    requests.push({ url: String(url), options });
    return options.headers.Accept === "text/csv" ? new Response("business_email\r\nfixture@example.invalid")
      : Response.json({ approvalUrl: "https://skipoledata.com/marketplace#marketing-professionals", requiresCustomerPaymentApproval: true });
  } });
  assert.equal((await client.quoteHostedPurchase({ quantity: 40, idempotencyKey: "fixture-id" })).requiresCustomerPaymentApproval, true);
  await client.getOrder("fixture-id");
  assert.match(await client.downloadOrderCsv("fixture-id"), /fixture@example.invalid/);
  assert.equal(requests.length, 3);
  assert.equal(requests[0].options.method, "POST");
  assert.deepEqual(JSON.parse(requests[0].options.body), { quantity: 40, idempotencyKey: "fixture-id" });
  assert.equal(requests[1].options.method, "GET");
  assert.equal(requests[2].options.method, "GET");
  assert.match(requests[2].url, /customer\/orders\/fixture-id\/csv$/);
  assert.equal(requests[2].options.headers.Authorization, "Bearer non-secret-fixture");
});

test("configured audience criteria are forwarded with a fresh explicit purchase intent", async () => {
  let sent;
  const client = new SkipoleClient({ apiKey: "non-secret-fixture", fetchImpl: async (_url, options) => {
    sent = JSON.parse(options.body);
    return Response.json({ requiresCustomerPaymentApproval: true });
  } });
  const criteria = { departments: ["marketing", "sales"], emailDomain: "example.com" };
  await client.quoteHostedPurchase({ quantity: 100, idempotencyKey: "new-configured-intent", criteria });
  assert.deepEqual(sent, { quantity: 100, idempotencyKey: "new-configured-intent", criteria });
});

test("public catalog uses the documented path without sending an API key", async () => {
  let request;
  const client = new SkipoleClient({
    fetchImpl: async (url, options) => {
      request = { url: String(url), options };
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
  });
  assert.deepEqual(await client.listProducts(), []);
  assert.equal(request.url, "https://skipole-data-platform.replit.app/api/v1/catalog");
  assert.equal(request.options.method, "GET");
  assert.equal(request.options.headers.Authorization, undefined);
});

test("customer usage sends the key only in the authorization header", async () => {
  let request;
  const client = new SkipoleClient({
    apiKey: "test-key-placeholder",
    fetchImpl: async (url, options) => {
      request = { url: String(url), options };
      return new Response(JSON.stringify({ creditsAvailable: "0" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
  });
  await client.getUsage();
  assert.equal(request.url, "https://skipole-data-platform.replit.app/api/v1/customer/usage");
  assert.equal(request.options.headers.Authorization, "Bearer test-key-placeholder");
  assert.equal(request.url.includes("test-key-placeholder"), false);
});

test("integration source is an allowlisted optional usage label", async () => {
  let headers;
  const client = new SkipoleClient({
    apiKey: "test-key-placeholder",
    integrationSource: "replit",
    fetchImpl: async (_url, options) => {
      headers = options.headers;
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
  });
  await client.getCustomerCatalog();
  assert.equal(headers["X-Skipole-Integration-Source"], "replit");
  assert.throws(
    () => new SkipoleClient({ integrationSource: "unknown-platform" }),
    /not a supported Skipole source/,
  );
});

test("429 errors include a retry hint without retrying automatically", async () => {
  let calls = 0;
  const client = new SkipoleClient({
    apiKey: "test-key-placeholder",
    fetchImpl: async () => {
      calls += 1;
      return new Response(JSON.stringify({ error: "Rate limit reached." }), {
        status: 429,
        headers: { "content-type": "application/json", "retry-after": "17" },
      });
    },
  });
  await assert.rejects(client.getCustomerCatalog(), (error) => {
    assert.ok(error instanceof SkipoleApiError);
    assert.equal(error.status, 429);
    assert.equal(error.retryAfterSeconds, 17);
    return true;
  });
  assert.equal(calls, 1);
});

test("401 and 403 responses remain explicit API errors", async () => {
  for (const status of [401, 403]) {
    const client = new SkipoleClient({
      apiKey: "test-key-placeholder",
      fetchImpl: async () =>
        new Response(JSON.stringify({ error: "Access is not authorized." }), {
          status,
          headers: { "content-type": "application/json" },
        }),
    });
    await assert.rejects(client.getCustomerCatalog(), (error) => {
      assert.ok(error instanceof SkipoleApiError);
      assert.equal(error.status, status);
      assert.match(error.message, /not authorized/i);
      return true;
    });
  }
});

test("product slugs are URL-encoded", async () => {
  let requestedUrl;
  const client = new SkipoleClient({
    fetchImpl: async (url) => {
      requestedUrl = String(url);
      return new Response(JSON.stringify({ slug: "company profile" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
  });
  await client.getProduct("company profile");
  assert.equal(requestedUrl, "https://skipole-data-platform.replit.app/api/v1/catalog/company%20profile");
});

test("provider quotes use the workspace key and do not retry", async () => {
  let request;
  let calls = 0;
  const client = new SkipoleClient({
    apiKey: "test-key-placeholder",
    fetchImpl: async (url, options) => {
      calls += 1;
      request = { url: String(url), options };
      return new Response(JSON.stringify({ amountMinor: 5, fixtureOnly: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
  });
  const requestBody = {
    kind: "enrichment",
    capabilityId: "enrichment-email",
    purpose: "business_research",
    request: { method: "email", email: "person@example.invalid" },
  };
  await client.quoteProviderRequest({
    request: requestBody,
    idempotencyKey: "7f63b4c7-e711-40f5-a857-f6b34c879995",
  });
  assert.equal(request.url, "https://skipole-data-platform.replit.app/api/v1/customer/provider-quotes");
  assert.equal(request.options.method, "POST");
  assert.equal(request.options.headers.Authorization, "Bearer test-key-placeholder");
  assert.deepEqual(JSON.parse(request.options.body), {
    request: requestBody,
    idempotencyKey: "7f63b4c7-e711-40f5-a857-f6b34c879995",
  });
  assert.equal(calls, 1);
});

test("provider requests send the signed quote and caller idempotency key", async () => {
  let request;
  const client = new SkipoleClient({
    apiKey: "test-key-placeholder",
    fetchImpl: async (url, options) => {
      request = { url: String(url), options };
      return new Response(JSON.stringify({ status: "delivered", fixtureOnly: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
  });
  await client.createProviderRequest({
    request: { kind: "enrichment", capabilityId: "enrichment-email", purpose: "business_research", request: { method: "email", email: "person@example.invalid" } },
    quoteToken: "signed-quote-placeholder",
    idempotencyKey: "7f63b4c7-e711-40f5-a857-f6b34c879995",
  });
  assert.equal(request.options.method, "POST");
  assert.deepEqual(JSON.parse(request.options.body), {
    request: { kind: "enrichment", capabilityId: "enrichment-email", purpose: "business_research", request: { method: "email", email: "person@example.invalid" } },
    quoteToken: "signed-quote-placeholder",
    idempotencyKey: "7f63b4c7-e711-40f5-a857-f6b34c879995",
  });
});

test("job polling encodes the ID and export returns CSV", async () => {
  const calls = [];
  const client = new SkipoleClient({
    apiKey: "test-key-placeholder",
    fetchImpl: async (url, options) => {
      calls.push({ url: String(url), options });
      if (options.method === "GET") {
        return new Response(JSON.stringify({ id: "job-id", status: "completed" }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }
      return new Response("company_name\nExample Co\n", {
        status: 200,
        headers: { "content-type": "text/csv; charset=utf-8" },
      });
    },
  });
  await client.getJob("job id");
  assert.equal(await client.exportJob("job id", { fields: ["company_name"] }), "company_name\nExample Co\n");
  assert.equal(calls[0].url, "https://skipole-data-platform.replit.app/api/v1/customer/jobs/job%20id");
  assert.equal(calls[1].url, "https://skipole-data-platform.replit.app/api/v1/customer/jobs/job%20id/export");
  assert.equal(calls[1].options.headers.Accept, "text/csv");
  assert.deepEqual(JSON.parse(calls[1].options.body), { fields: ["company_name"] });
});

test("provider export preserves structured API errors", async () => {
  const client = new SkipoleClient({
    apiKey: "test-key-placeholder",
    fetchImpl: async () => new Response(JSON.stringify({
      error: "The provider capability is not enabled.",
      code: "capability_inactive",
    }), {
      status: 503,
      headers: { "content-type": "application/json" },
    }),
  });
  await assert.rejects(
    client.exportJob("job-id", { fields: ["company_name"] }),
    (error) => {
      assert.ok(error instanceof SkipoleApiError);
      assert.equal(error.status, 503);
      assert.equal(error.code, "capability_inactive");
      return true;
    },
  );
});
