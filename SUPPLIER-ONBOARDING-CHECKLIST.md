# Supplier onboarding checklist

Use this checklist before enabling any supplier-backed product or changing its
permitted use. A supplier connection or a reseller label alone does not establish
customer-facing rights.

## Rights and permitted use

- [ ] Confirm the executed agreement and amendments are current and signed by
  authorized parties.
- [ ] Record the supplier's exact grant for resale, sublicensing, redistribution,
  and delivery to Skipole customers.
- [ ] Confirm whether records may be delivered by CSV, API, MCP, SDK, or embedded
  customer applications; do not infer one format from another.
- [ ] Map each product, returned field, filter, geography, and customer purpose
  to explicit supplier permission.
- [ ] Confirm restrictions on marketing, advertising, prospecting, enrichment,
  analytics, model use, onward transfer, and customer/client use.
- [ ] Confirm whether the grant permits personal-data processing and any required
  notices, consent, lawful-basis assessment, or customer attestations.
- [ ] Document prohibited uses, including eligibility decisions and any
  restricted industries or regulated purposes.
- [ ] Confirm retention, cache, deletion, correction, suppression, and data
  subject request requirements for Skipole and its customers.
- [ ] Verify that supplier documentation permits the exact output fields and
  schema; do not treat search filters or intent topics as delivered attributes.

## Commercial and operating controls

- [ ] Record the supplier's billable unit, no-match treatment, duplicate policy,
  shortfall rules, minimums, included allowance, and any overage basis.
- [ ] Confirm whether billing is based on requests, records built, records
  returned, or records delivered; reconcile Skipole metering to that definition.
- [ ] Confirm the supplier's rate limits, per-job ceilings, pagination, status
  semantics, export contract, and retry/idempotency behavior.
- [ ] Verify that order admission reserves the maximum bounded supplier exposure
  before customer Checkout, and that concurrent orders cannot double-reserve.
- [ ] Set product-specific spend limits and a positive contribution-margin
  threshold after payment fees and applicable supplier charges.
- [ ] Require verified customer payment before any billable supplier operation.
- [ ] Define recovery for timeouts and ambiguous outcomes so an unknown supplier
  result is not blindly retried or billed twice.
- [ ] Reconcile actual supplier-billable usage and customer-delivered records;
  preserve refunds and settlement corrections for shortfalls and failures.

## Security and assurance

- [ ] Store credentials only in the approved secret manager; restrict access and
  rotate them using the supplier's supported process.
- [ ] Validate authentication, TLS, response signatures where supported, schema,
  field allowlists, record caps, and error-body sanitization.
- [ ] Keep supplier payloads and personal records out of logs, analytics, and
  unapproved model contexts.
- [ ] Confirm incident notification, breach cooperation, support contacts, and
  security documentation in the executed agreement.
- [ ] Use synthetic or supplier-approved test data for contract tests. Do not
  use live records or incur supplier charges without explicit authorization.

## Release approval

- [ ] Product policy, price, filters, output fields, purposes, and restrictions
  match the verified supplier grant.
- [ ] Focused tests cover success, no-match, partial delivery, malformed data,
  outage, duplicate requests, recovery, and billing reconciliation.
- [ ] Public catalog, product page, API, MCP metadata, SDK docs, and terms describe
  the same active product and permitted use.
- [ ] Confirm the production configuration and release contain only the reviewed
  changes; keep unapproved products disabled.
- [ ] Record the owner approval and evidence reference before enabling live use.
