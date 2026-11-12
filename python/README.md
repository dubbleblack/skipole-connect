# `skipole-data` Python SDK

The official Python distribution is published on
[PyPI as `skipole-data`](https://pypi.org/project/skipole-data/).
**Do not install the unrelated `skipole` project from PyPI.**
The distribution name is `skipole-data`; its Python import remains `skipole`.

## Install from PyPI

Python 3.10+ is required:

```sh
python -m pip install skipole-data
```

```python
from skipole import SkipoleClient
```

This is an alpha SDK. A successful installation is not independent verification
of a paid SDK purchase. Paid REST commerce is Production verified; paid Python
SDK purchases remain independently unverified. Keep keys server-side and follow
the [customer-approved purchase example](https://github.com/dubbleblack/skipole-connect/blob/main/HOSTED-PURCHASES.md#python).

## Alternatively, install the existing GitHub wheel

This is the earlier tested GitHub prerelease archive:

```sh
python -m pip install "https://github.com/dubbleblack/skipole-connect/releases/download/sdk-v0.1.0-alpha.1/skipole_data-0.1.0a1-py3-none-any.whl"
```

The [release page](https://github.com/dubbleblack/skipole-connect/releases/tag/sdk-v0.1.0-alpha.1)
includes SHA256SUMS and a source archive. The Python import remains
`from skipole import SkipoleClient`. Paid Python SDK purchases are independently
unverified.

## Alternatively, install from public source

```sh
python -m pip install "git+https://github.com/dubbleblack/skipole-connect.git#subdirectory=python"
```

Python 3.10+ and Git are required. This uses the existing package build, not an
unrelated registry project. Keep the key server-side and follow the
[customer-approved purchase example](https://github.com/dubbleblack/skipole-connect/blob/main/HOSTED-PURCHASES.md#python).
Multi-product quoting requires SDK `0.1.0a3` or later and the corresponding server
release. Supply `product_request` to `quote_hosted_purchase` with the discovered
product kind, capability ID, permitted purpose and product-specific request.
All four audience profiles and email enrichment share this method and the
existing owned-order CSV retrieval. Legacy B2B criteria remain compatible.

The paid REST path is Production verified; an independently paid Python SDK
round trip is not.

This is the versioned pre-release Python client for Skipole's documented REST
endpoints. Customer-approved hosted REST purchasing is live. The separate legacy
credit-funded provider operations remain controlled by capability and budget policy.

The public catalog and pricing routes need no API key. Customer catalog, synthetic demo, and usage routes require a customer API key with the relevant scope. Keep that key in server-side secrets and never place it in a browser app.

The client also exposes legacy credit-funded provider request, job status, and export methods. Those separately gated methods require `data:write`, sufficient credits and an active policy; they are not cash Checkout. For cash purchasing, `quote_hosted_purchase` returns a signed customer approval link without a payment or supplier call. After the customer approves hosted payment and fulfillment completes, the existing owned-order CSV methods retrieve audience or email-enrichment deliveries. Cash purchasing requires neither membership nor prepaid credits. The SDK does not automatically retry purchases or create Stripe Checkout sessions. Catalog success does not prove independently paid SDK fulfillment.

It is licensed under Apache-2.0; the license file is copied from the integration package root before building. Further releases require owner authorization.

## Build and test

From this directory:

```sh
python scripts/prepare-release.py
PYTHONPATH=src python -m unittest discover -s tests
uv build --wheel --no-build-isolation --out-dir /tmp/skipole-wheels
```

```python
from skipole import SkipoleClient

client = SkipoleClient()
products = client.list_products()
print(products)
```
