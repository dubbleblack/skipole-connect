# Commerce growth boundaries

The launch-only 100-record ceiling has been removed. The published release
enforces a conservative delivery-size admission check before payment.
All three plans share the supplier's documented maximum of 1,000,000 per build,
subject to the currently available authorized allowance and a calculated per-file
delivery maximum (3,965 records for the current four fields).
There is no enterprise-sales gate or mandatory membership. The $2 Checkout
minimum remains a minimum, not a maximum.

The per-file restriction is temporary, not Skipole's commercial maximum.
Multipart delivery is deferred in favor of subscriptions, sellable audience
configurations, developer distribution and repeat purchasing. It must not hold
up current supported purchases. No payment is accepted above current reliable
fulfillment capacity.

The existing asynchronous order/job system is retained:

- Check the existing authorized allowance, outstanding reservations and spend budget before Checkout.
- Show quantity and maximum financial exposure before explicit customer payment.
- Reserve the existing pooled allowance atomically and prohibit unauthorized overages.
- Create one supplier job, persist its identity, and poll that job without rebuilding.
- Confirm the supplier's persisted cap and actual records, never matching population.
- Validate the entire export and reconcile actual consumption before authenticated delivery.
- Stream and validate CSV into bounded compression in the existing encrypted order envelope; stream authenticated CSV downloads.
- Reuse payment verification, replay protection and proportional shortfall refunds.

The current delivery bounds are 512 MiB of source CSV and 32 MiB compressed.
The accepted delivery contract limits first/last names to 256 UTF-16 code units,
business email to 254 and LinkedIn URL to 2,048. These are enforced Skipole
validation limits, not supplier-verified field guarantees. Oversized values are
rejected, never truncated. Historical stored downloads are not rewritten.

Admission bounds UTF-8 at three bytes per UTF-16 code unit, accounts for quoted
CSV/escaping/formula prefixes/BOM/CRLF, and uses zlib's default-parameter
worst-case expansion bound with extra gzip slack, not an observed compression
ratio. For these fields: source bytes <= 61 + quantity * 8,459.
At 3,965 records, the source bound is 33,539,996 bytes and gzip bound is
33,550,298 bytes. The next record exceeds the 33,554,432-byte gzip ceiling.
The smaller of this calculated maximum, supplier cap, policy cap and currently
reservable allowance is displayed and enforced by website, hosted API and MCP
quotes, rechecked at approval and immediately before Checkout creation.
Requests are never silently split into extra supplier builds or payments.

No additional supplier allowance, spend authorization, infrastructure, Price or
payment is created by changing the quantity limit. Impossible reservations are
rejected before hosted Checkout; uncertain supplier dispatches are never rebuilt.
An unusable bulk export uses the same order's full-refund path, retaining the
supplier consumption history and never repeating the export.
