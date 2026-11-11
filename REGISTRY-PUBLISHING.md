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

## PyPI — avoid the unrelated project

The existing PyPI project **`skipole` is unrelated to this product**.
Use **`skipole-data`** as the proposed distribution name; the source module stays
`skipole`. Availability is not ownership. An authorized PyPI account must reserve
the project/pending publisher and bind it to this repository, workflow and release
environment before publication. No registry account is configured in this
workspace, and no claim of PyPI ownership or publication is made.

Before registry release, rerun SDK tests and package-content checks. Never change
the live API or require membership merely to release a client library.

## MCP Registry

The remote manifest uses `io.github.dubbleblack/skipole-connect`, verified through
the official publisher's GitHub Actions OIDC flow. It does not require DNS changes
or a new secret. The manual distribution workflow's `publish_mcp` option submits
metadata; only a successful Registry response establishes publication. A Registry
entry is discovery metadata, not official client approval or paid MCP verification.
