export type SkipoleClientOptions = {
  /** A customer API key. Keep it in server-side secrets, never browser code. */
  apiKey?: string;
  /** Optional, self-reported integration source recorded on authenticated API usage events. */
  integrationSource?: "replit" | "cursor" | "lovable" | "rest" | "mcp" | "javascript" | "python";
  /** Skipole API origin, defaulting to the current Replit-hosted API. */
  baseUrl?: string | URL;
  /** Optional Fetch-compatible function, useful for tests and supported runtimes. */
  fetchImpl?: typeof fetch;
  /** Per-request timeout in milliseconds. Defaults to 15000. */
  timeoutMs?: number;
};

export type CatalogProduct = {
  slug: string;
  name: string;
  category: string;
  description: string;
  status: "planned" | "preview" | "active";
  attributes: string[];
  useCases: string[];
  billingUnit?: string | null;
  creditCost?: number | null;
  refreshFrequency?: string | null;
};

export type PricingPlan = {
  name: string;
  monthlyPrice: number | null;
  monthlyCredits: number | null;
  status: "draft" | "active";
};

export type CustomerUsage = {
  creditsAvailable: string;
  periodStart: string;
  usageByMetric: Array<{ metric: string; quantity: string; unit: string }>;
  rateLimit: {
    limitPerMinute: number;
    currentWindowRequests: number;
    remainingRequests: number;
    resetsAt: string;
  };
};

export type ProviderEnrichmentRequest = {
  kind: "enrichment";
  capabilityId: string;
  purpose: string;
  request:
    | { method: "email"; email: string; customId?: string; intent?: boolean | null; website?: string }
    | { method: "phone"; phone: string; customId?: string; website?: string }
    | { method: "md5"; md5: string; customId?: string; website?: string }
    | { method: "ip"; ip: string; customId?: string; website?: string }
    | { method: "vehicle"; vin: string; customId?: string; website?: string }
    | {
        method: "postal_identity";
        address: string;
        firstName?: string;
        lastName?: string;
        city?: string;
        state?: string;
        zip?: string;
        customId?: string;
        website?: string;
      };
};

export type ProviderAudienceRequest = {
  kind: "audience";
  capabilityId: string;
  purpose: string;
  request: {
    type: "advanced_search" | "b2b" | "b2c";
    limit: number;
    name?: string | null;
    website_id?: number | null;
    topic_ids?: Array<string | number>;
    filters?: Array<{
      field: string;
      operator: string;
      value: string | string[] | null;
      value_to?: string;
    }>;
  };
};

export type ProviderCommerceRequest =
  | ProviderEnrichmentRequest
  | ProviderAudienceRequest;

export type ProviderQuote = {
  capabilityId: string;
  quantity: number;
  unit: "record";
  creditsPerRecord: number;
  totalCredits: number;
  priceMinorPerRecord: number;
  amountMinor: number;
  currency: string;
  expiresAt: string;
  fixtureOnly: boolean;
  quoteToken: string;
  quoteId: string;
};

export type ProviderOperation = {
  duplicate: boolean;
  orderId: string | null;
  capabilityId: string;
  status: "submitted" | "processing" | "delivered" | "blocked" | "failed";
  jobId?: string | null;
  quantity?: number;
  creditsCharged?: number;
  returnedRecords?: number;
  records?: Array<Record<string, unknown>>;
  fixtureOnly?: boolean;
};

export type ProviderJob = {
  id: string;
  capabilityId: string;
  status: "submitted" | "processing" | "completed" | "failed" | "unknown";
  requestedRecords: number;
  completedRecords: number | null;
  downloadExpiresAt: string | null;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
};

export declare class SkipoleApiError extends Error {
  status: number;
  code: string | null;
  retryAfterSeconds: number | null;
}

export declare class SkipoleClient {
  constructor(options?: SkipoleClientOptions);
  listProducts(): Promise<CatalogProduct[]>;
  getProduct(slug: string): Promise<CatalogProduct>;
  listPricing(): Promise<PricingPlan[]>;
  getCustomerCatalog(): Promise<CatalogProduct[]>;
  getSyntheticDemo(): Promise<{
    synthetic: true;
    operation: string;
    request: Record<string, unknown>;
    response: Record<string, unknown>;
  }>;
  getUsage(): Promise<CustomerUsage>;
  quoteProviderRequest(input: {
    request: ProviderCommerceRequest;
    idempotencyKey: string;
  }): Promise<ProviderQuote>;
  createProviderRequest(input: {
    request: ProviderCommerceRequest;
    quoteToken: string;
    idempotencyKey: string;
  }): Promise<ProviderOperation>;
  getJob(jobId: string): Promise<ProviderJob>;
  exportJob(jobId: string, input: { fields: string[] }): Promise<string>;
}
