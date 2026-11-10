# Security policy

## Credential handling

- Never commit Skipole API keys, OAuth tokens, session cookies, Stripe credentials, provider credentials, or customer records.
- Store server-side API keys in the host's secret manager. Do not place them in browser code, screenshots, prompts, plugin manifests, or source-control history.
- The API key is sent only to Skipole over HTTPS using the `Authorization: Bearer` header.
- Revoke an exposed key immediately, then create a replacement.

## Data and billing boundaries

- Public catalog and pricing routes return metadata only.
- Synthetic demo content is fabricated and must not be represented as licensed data.
- Paid enrichment, search, and export calls are not available in this distribution.
- Never proxy requests to an upstream provider or expose provider credentials.
- Do not initiate payments or enable live billing from an SDK.

## Reporting

Report a suspected vulnerability privately to the Skipole maintainers. Do not include credentials or customer data in a report. A public security contact and response timeline require maintainer approval before release.

## Release status

This file is a draft package policy. A public repository, vulnerability contact, and release process have not been approved yet.
