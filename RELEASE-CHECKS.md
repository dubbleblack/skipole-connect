# Marketing Professionals and developer distribution release

## Confirmed business milestone

The owner confirmed that the first live $5 audience order delivered ten licensed
records and that the authenticated four-column CSV download succeeded. There was
no shortfall refund or additional audience build during recovery.
This confirmation does not authorize another purchase or supplier request.

## Public-commerce release boundary

Preparation does not enable purchasing or mutate deployment configuration.
Before public activation, publish the reviewed standard-order changes and approve
the existing Marketing Professionals commerce policy for public operation:

- Keep the existing audience capability and dedicated Product. Public retail
  requires a new one-time USD Price of five cents per record; historical $5 pack
  Prices and transactions are immutable. No new Product, webhook or Checkout system.
- Enable only this proven licensed policy, with endpoint, license, pricing,
  fulfillment and metering verification set after review.
- Use 40–100 requested records at five USD cents per delivered record ($2–$5 prepaid),
  and the output allowlist exactly first_name, last_name, business_email, linkedin_url.
- Use actual `records_count` metering, never matching-population `counts`.
- Keep supplier budget terms verified, the budget enabled and overages forbidden.
  Use the existing supplier allowance and monetary limits; do not increase them
  as part of launch.
- Activate the existing Live data/payment/billing gates only in the approved
  release. Retain the verified Live webhook, encryption and trusted Checkout
  return-origin configuration. Leave unproven products disabled.

The public offer is not tied to a workspace or single-use approval. It creates a
fresh intent key for each new purchase; quote/Checkout retain the same key.
The existing paid-order worker builds once, polls the saved job and reads the
existing audience configuration to establish a completed audience with the exact purchased cap
and a bounded actual record count. It then exports once with a JSON fields array,
rejects incomplete or invalid CSV, encrypts permitted records and delivers through
authenticated My Orders. A repeated purchase is a separate intent, and may include
previously delivered records; deduplication across purchases is not promised.

Historical orders, approvals, recovery attempts and financial reconciliations are
not edited by this release. The completed historical audience remains excluded
from the standard worker.

## Verification scope

- Mocked public orders have no JMG approval: full, partial, zero, refund-outage,
  invalid-count and malformed-CSV outcomes use the standard worker, including
  full 40- and 100-record orders. A saved ten-record cap cannot satisfy a retail order.
- Full/partial/zero delivery validates actual records against saved configuration,
  ignores a large population count, sends the fields array and preserves single
  build/export and existing payment/refund ledger behavior under replay.
- Global and per-policy gates, invalid cap, ambiguous audience metadata, missing
  actual count and forbidden over-limit output fail closed.
- SDK unit tests are mocked HTTP contract tests, not native-host sign-in tests.
  JavaScript build/package contents and Python wheel contents are checked locally.
- Production public health/catalog and OAuth metadata can be checked without any
  data-supplier request. Such reads do not verify authenticated client behavior.

## Retail quantity evidence and supplier economics

The supplier's current [API reference](https://docs.datamoon.com/api) documents
saved record limits from 1 to 1,000,000, inherited by exports. This supports the
requested 40–100 range at the documented API-contract level, not proof that a new
live account order has been fulfilled. Each new retail order still must confirm
its own persisted cap and actual record count before export. No new live build
or export was performed to prepare this change.

The confirmed pooled contract is $500/month including 500,000 records; $0.001 per
record is an allocation at full utilization, not an additional per-record charge.
Above-allowance cost is $0.01/record, but overages remain forbidden. Retail usage
inside the included pool has zero incremental supplier cost, not a fabricated
one-cent charge. The existing shared record budget still reserves and reconciles
every actual supplier record; the $500 monthly commitment is separate from this
incremental order cost and is not claimed to have been paid/reconciled here.
Historical costs are not rewritten.

The minimum applies to quantity requested. It does not retain $2 for undelivered
data: shortfall refund = prepaid amount minus valid delivered records × $0.05.
Zero valid records means a full refund.

## Developer publication blockers

1. Approve a public GitHub destination and release the existing distribution source.
   Repository publication is separate from app publication; nothing is public
   merely because a README or registry manifest exists locally.
2. Establish authorized package-publisher access and name ownership before npm/PyPI
   releases. Until then use local source; installation commands for registry
   packages are explicitly post-publication instructions.
3. Verify ownership of the MCP Registry namespace and validate the existing remote
   manifest with the current publisher before submitting. No listing is claimed.
4. Claude's custom OAuth connection was previously verified for catalog and usage.
   Cursor, Replit Agent, Lovable, Codex and a Vercel-hosted deployment are not
   authenticated-client verified. Their setup guides must stay labeled unverified
   until an actual authorized connection and non-billable read succeeds. These
   optional checks do not block a truthful GitHub source release or website sales.
5. MCP is read-only catalog/usage. SDK paid provider methods use a separately gated
   credit-funded API; they do not create website Checkout or deliver paid website
   orders. Enabling this website product explicitly does not enable its generic
   credit-funded audience API. Do not market the SDKs as a completed no-credit
   paid-commerce API.

The existing canonical MCP/API origin remains the Replit deployment origin:
`https://skipole-data-platform.replit.app`. Production's custom-domain OAuth
metadata still advertises that issuer/resource. Do not silently replace the MCP
URL with the marketing domain or claim a verified custom-domain OAuth migration.
