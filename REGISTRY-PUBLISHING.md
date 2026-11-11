# Package publication and name ownership

**Publication status:** the distribution workflow is installed and has published
the [tested GitHub SDK prerelease](https://github.com/dubbleblack/skipole-connect/releases/tag/sdk-v0.1.0-alpha.1).
Its JavaScript archive, Python wheel/source archive and SHA256SUMS are public.
The official MCP Registry independently reports
[`io.github.dubbleblack/skipole-connect`](https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.dubbleblack%2Fskipole-connect)
version `0.1.0-alpha.1` as **active**.
[Python is published on PyPI as `skipole-data`](https://pypi.org/project/skipole-data/).
[`@skipole/sdk@0.1.0-alpha.2` is published on npm](https://www.npmjs.com/package/@skipole/sdk/v/0.1.0-alpha.2).
Default public installation, the client import and TypeScript declarations are
verified. The compiled SDK code is unchanged from the original tested archive.

Paid REST commerce is Production verified. Neither paid SDK nor paid MCP
native-client purchases are independently verified.

## Install the published packages today

- JavaScript: run `npm install @skipole/sdk`; see the [JavaScript guide](javascript/README.md).
- Python: run `python -m pip install skipole-data`; see the [Python guide](python/README.md).
- The manual **Publish developer distribution** GitHub Action tests both clients
  and publishes installable archives under this repository's controlled GitHub
  release namespace. It does not publish to npm/PyPI or contact a data supplier.

## npm — published; GitHub OIDC publication verified

The organization owner approved the original tested archive through npm's
browser-based staged publishing. The documentation-only alpha update corrected
the npm README and was published by the existing GitHub OIDC workflow with signed
provenance. Its `latest` tag selects the real SDK. Do not republish an immutable
version. This remains prerelease software, not independent paid SDK verification.

In the package's Settings → Trusted publishing, select GitHub Actions:

- Organization or user: **dubbleblack**
- Repository: **skipole-connect**
- Workflow filename: **distribution.yml**
- Environment: **leave blank**
- Allowed actions: enable **npm publish**, as used by the existing workflow

Under Publishing access, select **Require two-factor authentication and disallow
tokens**. The owner confirmed configuration and the subsequent OIDC publication
succeeded; saving a publisher alone would not establish that verification.
New configurations must complete their first successful workflow publication
within two days or be recreated before a later legitimate release. Do not issue
an unnecessary release merely to validate trust.

After configuration, delete the temporary staging secret from Replit Secrets and
revoke its token on npm. Never paste tokens, passwords or 2FA codes into chat,
source or logs. Future workflow releases need no stored npm token.

For an explicitly authorized future release with a new JavaScript version,
set only `publish_npm=true`; keep `release_sdk`, `publish_mcp`, `publish_pypi`
and `verify_pypi` false. The existing workflow retains its build/test safeguards.

## PyPI — avoid the unrelated project

The existing PyPI project **`skipole` is unrelated to this product**.
The official published distribution is **`skipole-data`**; the source module
stays `skipole`. The owner authorized the existing workflow through a PyPI
pending trusted publisher. The first successful publication created the project
under that account. Publication is independently verified through the public
PyPI API, not inferred from a GitHub job or name availability.

Before registry release, rerun SDK tests and package-content checks. Never change
the live API or require membership merely to release a client library.

### Existing owner-authorized PyPI publisher — no API key required

The owner configured the publisher through
[PyPI Publishing](https://pypi.org/manage/account/publishing/) with these values:

| Field | Value |
| --- | --- |
| PyPI project name | `skipole-data` |
| GitHub owner | `dubbleblack` |
| Repository | `skipole-connect` |
| Workflow filename | `distribution.yml` |
| Environment | Leave blank |

For an authorized future release, bump the Python version first: PyPI versions
are immutable. The existing workflow can then be dispatched with **`publish_pypi=true`** and
**`release_sdk=false`, `publish_mcp=false`, `publish_npm=false`**. Its OIDC identity
must match the owner-authorized publisher before PyPI accepts the upload.
Independently verify the new version through `https://pypi.org/pypi/skipole-data/json`
after the job succeeds. The same job performs a clean `pip install skipole-data`
and isolated import without calling Skipole or a supplier. Update its expected
installed version when preparing a new release. A failed owner configuration
is a blocker, not evidence of publication.

## MCP Registry

The remote manifest uses `io.github.dubbleblack/skipole-connect`, verified through
the official publisher's GitHub Actions OIDC flow. It does not require DNS changes
or a new secret. The manual distribution workflow's `publish_mcp` option submits
metadata; only a successful Registry response establishes publication. A Registry
entry is discovery metadata, not official client approval or paid MCP verification.
