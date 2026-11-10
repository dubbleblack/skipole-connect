"""Typed, standard-library client for documented Skipole REST routes."""

from __future__ import annotations

import json
from dataclasses import dataclass
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urljoin
from urllib.request import Request, urlopen


DEFAULT_BASE_URL = "https://skipole-data-platform.replit.app"
DEFAULT_TIMEOUT_SECONDS = 15.0
INTEGRATION_SOURCES = {
    "replit",
    "cursor",
    "lovable",
    "rest",
    "mcp",
    "javascript",
    "python",
}


class SkipoleApiError(RuntimeError):
    """HTTP or response error returned while calling the Skipole API."""

    def __init__(
        self,
        status: int,
        message: str,
        *,
        code: str | None = None,
        retry_after_seconds: int | None = None,
    ) -> None:
        super().__init__(message)
        self.status = status
        self.code = code
        self.retry_after_seconds = retry_after_seconds


@dataclass(frozen=True)
class CustomerUsage:
    credits_available: str
    period_start: str
    usage_by_metric: list[dict[str, str]]
    rate_limit: dict[str, Any]


class SkipoleClient:
    """Client for public metadata and authenticated customer REST endpoints."""

    def __init__(
        self,
        *,
        api_key: str | None = None,
        integration_source: str | None = None,
        base_url: str = DEFAULT_BASE_URL,
        timeout_seconds: float = DEFAULT_TIMEOUT_SECONDS,
    ) -> None:
        if not base_url.startswith(("https://", "http://localhost", "http://127.0.0.1")):
            raise ValueError("base_url must use HTTPS, except for local development.")
        if timeout_seconds <= 0:
            raise ValueError("timeout_seconds must be positive.")
        if integration_source is not None and integration_source not in INTEGRATION_SOURCES:
            raise ValueError("integration_source is not a supported Skipole source.")
        self._api_key = api_key
        self._integration_source = integration_source
        self._base_url = base_url.rstrip("/") + "/"
        self._timeout_seconds = timeout_seconds

    def _request(
        self,
        path: str,
        *,
        method: str = "GET",
        body: dict[str, Any] | None = None,
        response_type: str = "json",
    ) -> Any:
        url = urljoin(self._base_url, path.lstrip("/"))
        headers = {"Accept": "application/json"}
        if self._api_key:
            headers["Authorization"] = f"Bearer {self._api_key}"
        if self._integration_source:
            headers["X-Skipole-Integration-Source"] = self._integration_source
        request_body = None
        if body is not None:
            headers["Content-Type"] = "application/json"
            request_body = json.dumps(body).encode("utf-8")
        if response_type == "csv":
            headers["Accept"] = "text/csv"
        request = Request(url, data=request_body, headers=headers, method=method)
        try:
            with urlopen(request, timeout=self._timeout_seconds) as response:
                body = response.read()
                if response_type == "csv":
                    return body.decode("utf-8")
                try:
                    return json.loads(body)
                except json.JSONDecodeError as error:
                    raise SkipoleApiError(
                        response.status,
                        "Skipole returned a response that was not valid JSON.",
                    ) from error
        except HTTPError as error:
            try:
                body = json.loads(error.read())
            except (json.JSONDecodeError, UnicodeDecodeError):
                body = {}
            raw_retry_after = error.headers.get("Retry-After")
            try:
                retry_after = int(raw_retry_after) if raw_retry_after is not None else None
            except ValueError:
                retry_after = None
            message = body.get("message") or body.get("error")
            raise SkipoleApiError(
                error.code,
                str(message or f"Skipole API request failed with status {error.code}."),
                code=body.get("code") if isinstance(body.get("code"), str) else None,
                retry_after_seconds=retry_after,
            ) from error
        except URLError as error:
            raise SkipoleApiError(
                0,
                "The Skipole API could not be reached. Check the network and retry.",
            ) from error

    def _get(self, path: str) -> Any:
        return self._request(path)

    def _post(
        self,
        path: str,
        body: dict[str, Any],
        *,
        response_type: str = "json",
    ) -> Any:
        return self._request(
            path,
            method="POST",
            body=body,
            response_type=response_type,
        )

    def list_products(self) -> list[dict[str, Any]]:
        """Return public catalog metadata. Product status indicates availability."""
        return self._get("/api/v1/catalog")

    def get_product(self, slug: str) -> dict[str, Any]:
        """Return one public catalog category by its slug."""
        if not slug:
            raise ValueError("slug must be a non-empty string.")
        return self._get(f"/api/v1/catalog/{quote(slug, safe='')}")

    def list_pricing(self) -> list[dict[str, Any]]:
        """Return active, verified public pricing plans."""
        return self._get("/api/v1/pricing")

    def get_customer_catalog(self) -> list[dict[str, Any]]:
        """Return catalog metadata using a key with catalog:read scope."""
        return self._get("/api/v1/customer/catalog")

    def get_synthetic_demo(self) -> dict[str, Any]:
        """Return a clearly marked fabricated example using demo:read scope."""
        return self._get("/api/v1/customer/demo")

    def get_usage(self) -> CustomerUsage:
        """Return workspace credits, current-month usage, and rate limits."""
        value = self._get("/api/v1/customer/usage")
        return CustomerUsage(
            credits_available=value["creditsAvailable"],
            period_start=value["periodStart"],
            usage_by_metric=value["usageByMetric"],
            rate_limit=value["rateLimit"],
        )

    def quote_hosted_purchase(self, *, quantity: int, idempotency_key: str) -> dict[str, Any]:
        """Get a cash quote and customer approval link. Never charges or calls a supplier."""
        return self._post("/api/v1/customer/purchase-quotes",
                          {"quantity": quantity, "idempotencyKey": idempotency_key})

    def get_order(self, order_id: str) -> dict[str, Any]:
        """Read a workspace-owned order, without supplier polling."""
        return self._get(f"/api/v1/customer/orders/{quote(order_id, safe='')}")

    def get_purchase(self, idempotency_key: str) -> dict[str, Any]:
        """Find the existing order for your original purchase intent; never creates one."""
        return self._get(f"/api/v1/customer/purchases/{quote(idempotency_key, safe='')}")

    def download_order_csv(self, order_id: str) -> str:
        """Read an existing licensed delivery. No credits, charge or supplier export."""
        return self._request(f"/api/v1/customer/orders/{quote(order_id, safe='')}/csv", response_type="csv")

    def quote_provider_request(
        self,
        *,
        request: dict[str, Any],
        idempotency_key: str,
    ) -> dict[str, Any]:
        """Request an itemized quote without calling the data provider."""
        return self._post(
            "/api/v1/customer/provider-quotes",
            {"request": request, "idempotencyKey": idempotency_key},
        )

    def create_provider_request(
        self,
        *,
        request: dict[str, Any],
        quote_token: str,
        idempotency_key: str,
    ) -> dict[str, Any]:
        """Execute a quoted operation using workspace credits.

        Skipole's backend policy controls capability availability. This method
        does not retry automatically; reuse the original idempotency key only
        when checking the result of the same request.
        """
        return self._post(
            "/api/v1/customer/provider-requests",
            {
                "request": request,
                "quoteToken": quote_token,
                "idempotencyKey": idempotency_key,
            },
        )

    def get_job(self, job_id: str) -> dict[str, Any]:
        """Get the status of a job in the API key's workspace."""
        if not job_id:
            raise ValueError("job_id must be a non-empty string.")
        return self._get(f"/api/v1/customer/jobs/{quote(job_id, safe='')}")

    def export_job(self, job_id: str, *, fields: list[str]) -> str:
        """Download an authorized completed job as CSV without auto-retry."""
        if not job_id:
            raise ValueError("job_id must be a non-empty string.")
        if not fields:
            raise ValueError("fields must contain at least one output field.")
        return self._post(
            f"/api/v1/customer/jobs/{quote(job_id, safe='')}/export",
            {"fields": fields},
            response_type="csv",
        )
