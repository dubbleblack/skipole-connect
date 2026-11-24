# ChatGPT directory submission handoff

**Status:** Owner-ready draft only. No ChatGPT app or directory submission has
been made, and no ChatGPT authentication or purchase journey is verified.

## Listing copy

**Name:** Skipole

**Short description**

> Skipole is an AI-native data broker for licensed Consumer Data, Consumer
> Intent, Business Data and B2B Intent. Discover products and review their
> current filters and permitted uses.

**Long description**

> Skipole helps developers and AI applications discover and use licensed
> audience data. Its live catalog describes Consumer Data, Consumer Intent,
> Business Data and B2B Intent, including product-specific fields, filters and
> permitted purposes. The remote MCP connection supports product discovery,
> signed quote requests and scoped access to an existing order. Any purchase
> requires the customer to review and approve hosted Checkout outside the agent.
> Paid REST commerce is Production verified; paid ChatGPT/MCP purchasing is
> not independently verified. Contact data is not consent to contact, and
> product-use restrictions remain in force.

Do not add promotional pricing to the directory copy; follow OpenAI's current
submission rules. Do not claim a paid ChatGPT transaction.

## Technical listing details

- Website: <https://skipoledata.com>
- Marketplace: <https://skipoledata.com/marketplace>
- MCP endpoint: <https://skipole-data-platform.replit.app/mcp>
- REST/OpenAPI guide: <https://github.com/dubbleblack/skipole-connect>
- Privacy: <https://skipoledata.com/privacy>
- Support: <mailto:support@skipoledata.com>
- Authentication: OAuth authorization code with PKCE; use live server discovery.
- Minimum scope for discovery/quotes: `catalog:read`.
- Owned-order status or retrieval requires separate customer consent to
  `orders:read`. Never include a key, token, or customer record in the listing.
- Current MCP tool scope and evidence: see the
  [public MCP tool inventory](../MCP-TOOL-INVENTORY.md). The current source
  exposes catalog/schema discovery, signed quote preparation, owned-order
  status/retrieval, usage reads, legacy credit estimates, and topic taxonomy
  search. It does not expose enrichment execution, audience builds, provider
  exports, or supplier-job refreshes.

## Owner actions before submission

1. Use OpenAI's [current app submission guide](https://developers.openai.com/apps-sdk/deploy/submission)
   and the correct verified developer organization.
2. Connect the exact remote server through the supported ChatGPT/MCP flow and
   test the tools the owner plans to expose.
3. Provide reviewer access only through OpenAI's secure review fields and only
   with a dedicated ordinary test account. Do not use founder access or another
   customer's delivered records.
4. Complete only the privacy, security, data-rights and testing attestations
   supported by actual evidence. The legacy supplier-facing tools are no longer
   publicly discoverable, but quote creation and topic search still have
   Production checks that require separate authorization. Do not claim they
   were live-tested based on mocked tests.
5. Submit only after the owner approves the exact package and required terms.
   Preserve the resulting receipt and review status; do not claim approval early.

No payment, supplier operation or external submission was performed for this
draft.
