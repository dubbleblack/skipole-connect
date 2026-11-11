# Package publication and name ownership

Paid REST commerce is Production verified. Neither paid SDK nor paid MCP
native-client purchases are independently verified.

## Use the source packages today

- JavaScript: follow [build, pack and install](javascript/README.md).
- Python: follow [install from GitHub](python/README.md).
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
