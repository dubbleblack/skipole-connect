# GitHub source release approval

Publish only the reviewed `integrations/skipole-connect` distribution, not the
whole Skipole application repository. Its Apache-2.0 license applies to these
integration packages, not the backend or licensed customer data.

## Exact GitHub access required

- An owner-approved repository name and destination account/organization.
- To create a new public repository: permission to create public repositories in
  that destination, or a repository created by its owner beforehand.
- For an existing destination: GitHub App installation access or a fine-grained
  token restricted to that repository with **Contents: read and write**.
  GitHub supplies **Metadata: read** automatically.
- If using an organization with SSO or approval rules, its administrator must
  approve the selected installation/token as required by that organization's policy.

No repository administration, organization administration, Actions/workflow,
secrets-management or billing permissions are required to push this source.
Do not request a broad classic `repo` token where repository-scoped access works.
Use the supported GitHub connection/secure credentials flow; never paste a token
into chat, documentation or source.

## Release contents and exclusions

Include the SDK source, tests, local build scripts, installation guides, license,
security policy, changelog, API description and draft MCP Registry manifest.
Exclude `.env*`, credentials, customer data, authenticated session material,
`node_modules`, Python caches, local build directories and unpublished archives.
Do not include internal fulfillment diagnostics, supplier schemas or the backend.

Keep registry install commands explicitly conditional on an actual npm/PyPI
release. GitHub source publication does not grant those publishers permission.
MCP remains catalog/usage read-only; SDK methods do not implement website Checkout.
Unverified host guides must remain labeled unverified, with no official listing
or partnership claims.

## Separate approvals, not GitHub prerequisites

- npm: approved release and authorized publish access to the `@skipole/sdk`
  package/scope; use the registry's required trusted publishing or secure token flow.
- PyPI: approved release and owner/maintainer access to the `skipole` project, or
  authorized creation if the name is available; use trusted publishing or a
  project-scoped secure publisher credential.
- MCP Registry: approved submission and verified ownership of `com.skipoledata`,
  with the current registry publisher validation passing.

None of these publications, repository creation or package uploads is initiated
by preparing this file, and none is required to start website sales.
