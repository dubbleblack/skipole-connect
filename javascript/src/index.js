const DEFAULT_BASE_URL = "https://skipole-data-platform.replit.app";
const DEFAULT_TIMEOUT_MS = 15_000;
const INTEGRATION_SOURCES = new Set([
  "replit",
  "cursor",
  "lovable",
  "rest",
  "mcp",
  "javascript",
  "python",
]);

function parseRetryAfter(value) {
  if (!value) return null;
  const seconds = Number(value);
  return Number.isFinite(seconds) && seconds >= 0 ? seconds : null;
}

export class SkipoleApiError extends Error {
  constructor({ status, code, message, retryAfterSeconds = null }) {
    super(message || `Skipole API request failed with status ${status}.`);
    this.name = "SkipoleApiError";
    this.status = status;
    this.code = code ?? null;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

/**
 * Client for Skipole's documented REST surfaces.
 * This client does not submit paid data operations or automatically retry requests.
 */
export class SkipoleClient {
  constructor({
    apiKey,
    integrationSource,
    baseUrl = DEFAULT_BASE_URL,
    fetchImpl = globalThis.fetch,
    timeoutMs = DEFAULT_TIMEOUT_MS,
  } = {}) {
    if (typeof fetchImpl !== "function") {
      throw new TypeError("A Fetch-compatible implementation is required.");
    }
    if (!Number.isFinite(timeoutMs) || timeoutMs < 1) {
      throw new TypeError("timeoutMs must be a positive number.");
    }
    if (integrationSource && !INTEGRATION_SOURCES.has(integrationSource)) {
      throw new TypeError("integrationSource is not a supported Skipole source.");
    }
    this.apiKey = apiKey;
    this.integrationSource = integrationSource;
    this.baseUrl = new URL(baseUrl);
    this.fetchImpl = fetchImpl;
    this.timeoutMs = timeoutMs;
  }

  async #request(path, { method = "GET", body: requestBody, accept = "application/json" } = {}) {
    const url = new URL(path, this.baseUrl);
    const headers = { Accept: accept };
    if (requestBody !== undefined) headers["Content-Type"] = "application/json";
    if (this.apiKey) headers.Authorization = `Bearer ${this.apiKey}`;
    if (this.integrationSource) {
      headers["X-Skipole-Integration-Source"] = this.integrationSource;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    let response;
    try {
      response = await this.fetchImpl(url, {
        method,
        headers,
        ...(requestBody !== undefined ? { body: JSON.stringify(requestBody) } : {}),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }

    let responseBody;
    if (accept === "text/csv" && response.ok) {
      return response.text();
    }
    try {
      responseBody = await response.json();
    } catch {
      throw new SkipoleApiError({
        status: response.status,
        message: "Skipole returned a response that was not valid JSON.",
        retryAfterSeconds: parseRetryAfter(response.headers.get("retry-after")),
      });
    }

    if (!response.ok) {
      throw new SkipoleApiError({
        status: response.status,
        code: typeof responseBody?.code === "string" ? responseBody.code : null,
        message:
          typeof responseBody?.message === "string"
            ? responseBody.message
            : typeof responseBody?.error === "string"
              ? responseBody.error
              : `Skipole API request failed with status ${response.status}.`,
        retryAfterSeconds: parseRetryAfter(response.headers.get("retry-after")),
      });
    }
    return responseBody;
  }

  #get(path) {
    return this.#request(path);
  }

  #post(path, body, accept = "application/json") {
    return this.#request(path, { method: "POST", body, accept });
  }

  listProducts() {
    return this.#get("/api/v1/catalog");
  }

  getProduct(slug) {
    if (typeof slug !== "string" || slug.length === 0) {
      throw new TypeError("slug must be a non-empty string.");
    }
    return this.#get(`/api/v1/catalog/${encodeURIComponent(slug)}`);
  }

  listPricing() {
    return this.#get("/api/v1/pricing");
  }

  getCustomerCatalog() {
    return this.#get("/api/v1/customer/catalog");
  }

  getSyntheticDemo() {
    return this.#get("/api/v1/customer/demo");
  }

  getUsage() {
    return this.#get("/api/v1/customer/usage");
  }

  /**
   * Request a signed itemized quote. Quoting does not call a data provider.
   * The idempotency key must be a caller-generated UUID and reused for this
   * exact request; do not auto-retry a purchase with a new key.
   */
  quoteHostedPurchase({ quantity, idempotencyKey, criteria }) {
    return this.#post("/api/v1/customer/purchase-quotes", { quantity, idempotencyKey, ...(criteria ? { criteria } : {}) });
  }

  getOrder(orderId) {
    return this.#get(`/api/v1/customer/orders/${encodeURIComponent(orderId)}`);
  }

  getPurchase(idempotencyKey) {
    return this.#get(`/api/v1/customer/purchases/${encodeURIComponent(idempotencyKey)}`);
  }

  downloadOrderCsv(orderId) {
    return this.#request(`/api/v1/customer/orders/${encodeURIComponent(orderId)}/csv`, { accept: "text/csv" });
  }

  quoteProviderRequest({ request, idempotencyKey }) {
    return this.#post("/api/v1/customer/provider-quotes", {
      request,
      idempotencyKey,
    });
  }

  /**
   * Execute a previously quoted provider operation using workspace credits.
   * Availability is controlled by Skipole's live capability and budget policy.
   */
  createProviderRequest({ request, quoteToken, idempotencyKey }) {
    return this.#post("/api/v1/customer/provider-requests", {
      request,
      quoteToken,
      idempotencyKey,
    });
  }

  getJob(jobId) {
    if (typeof jobId !== "string" || jobId.length === 0) {
      throw new TypeError("jobId must be a non-empty string.");
    }
    return this.#get(`/api/v1/customer/jobs/${encodeURIComponent(jobId)}`);
  }

  /**
   * Download an authorized completed job as CSV. This operation can consume
   * credits and is never retried automatically.
   */
  exportJob(jobId, { fields } = {}) {
    if (typeof jobId !== "string" || jobId.length === 0) {
      throw new TypeError("jobId must be a non-empty string.");
    }
    if (!Array.isArray(fields) || fields.length === 0) {
      throw new TypeError("fields must be a non-empty array.");
    }
    return this.#post(
      `/api/v1/customer/jobs/${encodeURIComponent(jobId)}/export`,
      { fields },
      "text/csv",
    );
  }
}
