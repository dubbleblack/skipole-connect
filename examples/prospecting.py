"""Server-side recipe. Install: python -m pip install skipole-data

Buy directly: https://skipoledata.com/marketplace?utm_source=github&audience=sales#marketing-professionals
Importing this module never calls Skipole or the supplier.
"""
from skipole import SkipoleClient


class ProspectingWorkflow:
    def __init__(self, *, api_key: str):
        if not api_key:
            raise ValueError("Provide the owning workspace's server-side API key.")
        self.client = SkipoleClient(api_key=api_key)

    def quote(self, *, intent_key: str, quantity: int = 100,
              department: str = "sales", email_domain: str | None = None) -> dict:
        """Persist intent_key first; return approvalUrl to the authenticated human."""
        criteria = {"departments": [department]}
        if email_domain and email_domain.strip():
            criteria["emailDomain"] = email_domain.strip()
        return self.client.quote_hosted_purchase(
            quantity=quantity, idempotency_key=intent_key, criteria=criteria)

    def status(self, intent_key: str) -> dict:
        """May return HTTP 404 before Checkout. Never creates an order."""
        return self.client.get_purchase(intent_key)

    def csv(self, intent_key: str) -> str:
        """Return licensed CSV text only when an existing order has delivery."""
        order = self.client.get_purchase(intent_key)
        if not order["csvAvailable"]:
            raise RuntimeError("CSV is not available. Show status; do not rebuild or repay.")
        return self.client.download_order_csv(order["orderId"])
