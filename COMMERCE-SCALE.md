# Commerce growth boundaries

The next website publication removes the launch-only 100-record ceiling.
All three plans share the supplier's documented maximum of 1,000,000 per build,
subject to the currently available authorized allowance and delivery capacity.
There is no enterprise-sales gate or mandatory membership. The $2 Checkout
minimum remains a minimum, not a maximum.

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
No additional supplier allowance, spend authorization, infrastructure, Price or
payment is created by changing the quantity limit. Impossible reservations are
rejected before hosted Checkout; uncertain supplier dispatches are never rebuilt.
An unusable bulk export uses the same order's full-refund path, retaining the
supplier consumption history and never repeating the export.
