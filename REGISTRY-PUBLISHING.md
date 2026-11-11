# Package publication and name ownership

**Publication status:** the distribution workflow is installed and has published
the [tested GitHub SDK prerelease](https://github.com/dubbleblack/skipole-connect/releases/tag/sdk-v0.1.0-alpha.1).
Its JavaScript archive, Python wheel/source archive and SHA256SUMS are public.
The official MCP Registry independently reports
[`io.github.dubbleblack/skipole-connect`](https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.dubbleblack%2Fskipole-connect)
version `0.1.0-alpha.1` as **active**. npm and PyPI remain unpublished.

Paid REST commerce is Production verified. Neither paid SDK nor paid MCP
native-client purchases are independently verified.

## Install the published GitHub packages today

- JavaScript: follow [install the released archive](javascript/README.md).
- Python: follow [install the released wheel](python/README.md).
- The manual **Publish developer distribution** GitHub Action tests both clients
  and publishes installable archives under this repository's controlled GitHub
  release namespace. It does not publish to npm/PyPI or contact a data supplier.

## npm — ownership required

`@skipole/sdk` is a proposed scope/package, not an asserted owned npm namespace.
An npm account with ownership of the `skipole` organization must establish
publisher access before its first release. GitHub repository ownership does not
establish npm scope ownership. Once verified, register the exact repository and
workflow as a trusted publisher, then publish with npm's OIDC workflow. Never
paste an npm token in an issue, guide, browser bundle or chat.

### Exact npm owner action

1. Confirm that your signed-in npm account controls the **`skipole` organization**
   and may publish **`@skipole/sdk`**. A public 404 is not ownership evidence.
2. Bootstrap the **actual tested package**, not a placeholder or another package,
   from the controlled npm account. After `npm login`, the first publication is:

   ```sh
   npm publish "https://github.com/dubbleblack/skipole-connect/releases/download/sdk-v0.1.0-alpha.1/skipole-sdk-0.1.0-alpha.1.tgz" --access public --tag alpha
   ```

3. Independently verify `@skipole/sdk@0.1.0-alpha.1` on npm. Do not republish that
   immutable version. In its npm package Settings → Trusted publishing, add:
   **GitHub owner `dubbleblack`**, **repository `skipole-connect`**,
   **workflow `distribution.yml`**, **environment blank**. Permit `npm publish`
   if direct publication is intended; newer configurations can default to
   stage-only publication.
4. The existing workflow's `publish_npm=true` input publishes a **future,
   newly versioned** release after trust is configured. Keep `release_sdk`,
   `publish_mcp` and `publish_pypi` false when publishing npm alone.

The workflow has no stored npm token and cannot bootstrap an unowned namespace.
The owner login is a registry authorization step, not another GitHub reconnect.

## PyPI — avoid the unrelated project

The existing PyPI project **`skipole` is unrelated to this product**.
Use **`skipole-data`** as the proposed distribution name; the source module stays
`skipole`. Availability is not ownership. An authorized PyPI account must reserve
the project/pending publisher and bind it to this repository and workflow before
publication. A pending publisher **does not reserve the name**; first successful
publication creates the project under that account. No registry account is configured in this
workspace, and no claim of PyPI ownership or publication is made.

Before registry release, rerun SDK tests and package-content checks. Never change
the live API or require membership merely to release a client library.

### Exact PyPI owner action — no API key required

In your own PyPI account, open
[Publishing](https://pypi.org/manage/account/publishing/) and add a **pending
GitHub publisher** with these exact values:

| Field | Value |
| --- | --- |
| PyPI project name | `skipole-data` |
| GitHub owner | `dubbleblack` |
| Repository | `skipole-connect` |
| Workflow filename | `distribution.yml` |
| Environment | Leave blank |

Confirm that the pending publisher is saved in **your account**. Then the
existing GitHub workflow can be dispatched with **`publish_pypi=true`** and
**`release_sdk=false`, `publish_mcp=false`, `publish_npm=false`**. Its OIDC identity
must match the owner-authorized publisher before PyPI accepts the upload.
Independently verify `https://pypi.org/pypi/skipole-data/0.1.0a1/json` after the
job succeeds. A failed or missing owner configuration is a blocker, not evidence
of publication.

## MCP Registry

The remote manifest uses `io.github.dubbleblack/skipole-connect`, verified through
the official publisher's GitHub Actions OIDC flow. It does not require DNS changes
or a new secret. The manual distribution workflow's `publish_mcp` option submits
metadata; only a successful Registry response establishes publication. A Registry
entry is discovery metadata, not official client approval or paid MCP verification.
