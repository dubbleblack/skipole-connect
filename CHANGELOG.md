# Changelog

## JavaScript 0.1.0-alpha.1 — npm publication

- Published the original tested GitHub archive through owner-approved npm staging, without rebuilding or changing SDK code.
- Verified unauthenticated public installation through the `alpha` tag, `SkipoleClient` import and bundled TypeScript declarations.
- Updated public installation instructions to `npm install @skipole/sdk@alpha`; the registry's `latest` tag still points to the staging placeholder.
- Paid SDK/MCP purchases and future npm OIDC publication remain independently unverified.

## Python 0.1.0a2 — PyPI documentation update

- Published `skipole-data` on PyPI through the owner's existing trusted publisher.
- Updated the PyPI description and public guides to use `python -m pip install skipole-data`.
- Python SDK code is unchanged; this alpha update corrects the pre-publication description.
- Paid SDK/MCP purchases remain independently unverified.
- npm and the existing GitHub/MCP releases were not republished.

## 0.1.0-alpha.1 (source release; npm/PyPI unpublished)

- Added versioned npm and Python package manifests with reproducible package build paths.
- Added the Apache-2.0 license for the integration packages only.
- Prepared a public REST API description and JavaScript and Python SDK packages.
- Added proposed Cursor, Lovable, and Replit distribution materials.
- Added Clerk-backed OAuth authorization code with PKCE, metadata, scoped access, and connected-app revocation for the MCP server.
- Production REST paid commerce completed an authorized internal $2 / 40-record order and authenticated CSV retrieval.
- Claude OAuth catalog/usage is verified; paid SDK/MCP native-client purchases remain independently unverified.
- Prepared controlled GitHub SDK archives and OIDC MCP Registry submission. Registry/platform status must be checked from the actual publication result.
