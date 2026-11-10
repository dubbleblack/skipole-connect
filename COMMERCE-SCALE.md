# Commerce growth boundaries

The current approved public range is 40–100 requested records, not bulk volume.
Larger 1,000 / 10,000 / 100,000 / 1,000,000-record orders are a future capacity
goal, not an offer or an enterprise-sales requirement.

Extend the existing asynchronous order/job system rather than rebuilding it:

- Obtain supplier-confirmed request, export and account-budget capacity first.
- Show quantity and maximum financial exposure before explicit customer payment.
- Reserve the existing pooled allowance atomically and prohibit unauthorized overages.
- Create one supplier job, persist its identity, and poll that job without rebuilding.
- Confirm the supplier's persisted cap and actual records, never matching population.
- Validate the entire export and reconcile actual consumption before authenticated delivery.
- Scale encrypted storage and streaming CSV delivery without exposing supplier credentials.
- Reuse payment verification, replay protection and proportional shortfall refunds.

None of this future scale work gates the initial self-service product.
