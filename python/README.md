# `skipole` Python SDK source

This is the versioned pre-release source for a Python client that uses Skipole's documented REST endpoints. Provider operations remain controlled by the backend capability and budget policy and are currently unavailable.

The public catalog and pricing routes need no API key. Customer catalog, synthetic demo, and usage routes require a customer API key with the relevant scope. Keep that key in server-side secrets and never place it in a browser app.

The client also exposes quote, credit-funded provider request, job status, and CSV export methods. A quote does not call the supplier. These separately gated methods require a valid signed quote, `data:write`, sufficient credits, and an active policy; they are not the one-time customer Checkout flow. The client does not automatically retry paid operations or create Stripe Checkout sessions. Customers buy licensed Marketing Professionals orders and download their CSV through the signed-in website when purchasing is enabled, without a subscription or prepaid credits. Catalog/usage success does not prove paid API availability.

No PyPI release has been made. It is licensed under Apache-2.0; the license file is copied from the integration package root before building. Do not publish this package without explicit release authorization.

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
