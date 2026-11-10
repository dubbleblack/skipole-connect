# Replit Integration Partner application draft

**Status:** Internal draft only. Not submitted.

## What Skipole does

Skipole is an AI-native data API product for authorized business data workflows. The current developer surface exposes public catalog metadata, customer catalog metadata, synthetic examples, and customer usage summaries. Live licensed data operations are not currently enabled.

## Why builders may use it

Replit builders can inspect catalog availability, add a server-side REST client, and prepare an application around verified product schemas when those schemas become operational.

## Authentication

The public catalog requires no key. Customer endpoints use a customer-owned Skipole API key stored in Replit Secrets and sent by trusted server code. Replit-hosted apps must not expose that key in browser bundles, logs, or generated client code.

## Pricing and architecture

Skipole uses its existing customer subscription, credit ledger, and shared request limits. No Replit-specific billing path is proposed. The current developer package does not expose paid data operations or upstream provider credentials.

## Security controls

- Customer keys are scoped, revocable, and stored as hashes by Skipole.
- Requests are authorized and rate-limited by Skipole.
- Synthetic examples are labeled as synthetic.
- Data-provider access remains disabled until licensing, credentials, verified pricing, and budget controls are in place.

## Request for Replit

If approved by Skipole's owner, request review for discoverability and agent-readable setup guidance. Do not state that Replit has endorsed or listed Skipole unless Replit confirms it.
