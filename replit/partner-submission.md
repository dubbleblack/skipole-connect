# Replit Integration Partners application

**Status:** Prepared. No submitted application or approval is claimed by this file.
Use the original form at <https://replit.com/partners>, **Integration Partners**.
The contact name and business city must come from the authorized owner; never
invent them or infer them from a timezone. Do not publish private contact details.

## Public application fields

- Company / product: Skipole, owned by DubbleBlack LLC.
- Website: https://skipoledata.com
- Business support email: support@skipoledata.com
- Partnership type: Integration Partners (`integration`).
- Contact name: supplied by the owner in the application.
- Business city: supplied by the owner in the application.

## Proposal — ready to submit

Skipole is a self-service GTM data marketplace for developers and AI agents.
Your tools. Our data.

We request a first-class Skipole listing in Replit's native Integrations / Tools
directory, in GTM Data / Sales & Marketing Data, comparable in discoverability
and connection experience to Apollo. This is an integration-partner application,
not a Solutions Partner consulting application or a request to list a skill alone.

Skipole offers self-service licensed B2B audience data for GTM teams, developers
and AI agents. Users discover supported audiences, obtain an itemized signed
quote, review an approval link, personally complete hosted Stripe Checkout,
and retrieve licensed records through authenticated CSV and REST. PAYG needs no
subscription or sales call; optional Builder and Scale memberships discount usage.

Reuse our existing HTTPS Streamable HTTP MCP server and scoped OAuth with PKCE:
https://skipole-data-platform.replit.app/mcp
Public implementation, SDKs, examples and the supporting Replit Agent Skill:
https://github.com/dubbleblack/skipole-connect
Public product: https://skipoledata.com/marketplace
Privacy: https://skipoledata.com/privacy
Security and support: https://github.com/dubbleblack/skipole-connect/blob/main/SECURITY.md

The paid REST flow is Production verified: an explicitly authorized internal
purchase collected $2, delivered 40 licensed records and retrieved its CSV.
Paid native Replit, Cursor, Claude/MCP and native SDK purchase round trips are
not independently verified. We do not present internal tests as outside users.

The MCP cash workflow uses catalog:read for signed quotes and orders:read for
owned deliveries. Customers authenticate and explicitly consent to scopes.
Agents cannot approve or execute hosted payment. No supplier credentials are
exposed; existing supplier budgets, payment verification, idempotency, automatic
delivery, shortfall refunds and encrypted storage remain in the current system.
Authorized repeat purchases require a new quote and separate human approval.

We seek Replit's review of a selectable native GTM data integration using these
existing capabilities, with no new Replit-specific billing or supplier backend.
Please confirm the integration review and onboarding process and any additional
security or metadata requirements. We make no claim of approval or listing.
