import json
import unittest
from io import BytesIO
from unittest.mock import patch
from urllib.error import HTTPError

from skipole import SkipoleApiError, SkipoleClient


class FakeResponse:
    status = 200

    def __init__(self, value):
        self._body = json.dumps(value).encode()

    def __enter__(self):
        return self

    def __exit__(self, *_args):
        return False

    def read(self):
        return self._body


class FakeCsvResponse(FakeResponse):
    def __init__(self, value):
        self._body = value.encode()


class SkipoleClientTests(unittest.TestCase):
    @patch("skipole.client.urlopen")
    def test_hosted_cash_quote_status_and_existing_csv(self, urlopen_mock):
        urlopen_mock.side_effect = [
            FakeResponse({"requiresCustomerPaymentApproval": True}),
            FakeResponse({"status": "delivered"}),
            FakeCsvResponse("business_email\r\nfixture@example.invalid"),
        ]
        client = SkipoleClient(api_key="non-secret-fixture")
        self.assertTrue(client.quote_hosted_purchase(quantity=40, idempotency_key="fixture")["requiresCustomerPaymentApproval"])
        self.assertEqual(client.get_order("fixture")["status"], "delivered")
        self.assertIn("fixture@example.invalid", client.download_order_csv("fixture"))
        requests = [call.args[0] for call in urlopen_mock.call_args_list]
        self.assertEqual([request.get_method() for request in requests], ["POST", "GET", "GET"])
        self.assertEqual(json.loads(requests[0].data), {"quantity": 40, "idempotencyKey": "fixture"})
        self.assertEqual(requests[2].get_header("Accept"), "text/csv")

    @patch("skipole.client.urlopen")
    def test_public_catalog_does_not_send_an_api_key(self, urlopen_mock):
        urlopen_mock.return_value = FakeResponse([])
        client = SkipoleClient()
        self.assertEqual(client.list_products(), [])
        request = urlopen_mock.call_args.args[0]
        self.assertEqual(request.full_url, "https://skipole-data-platform.replit.app/api/v1/catalog")
        self.assertNotIn("Authorization", request.headers)

    @patch("skipole.client.urlopen")
    def test_usage_key_is_sent_only_in_authorization_header(self, urlopen_mock):
        urlopen_mock.return_value = FakeResponse(
            {
                "creditsAvailable": "0",
                "periodStart": "2026-11-01T00:00:00Z",
                "usageByMetric": [],
                "rateLimit": {
                    "limitPerMinute": 60,
                    "currentWindowRequests": 1,
                    "remainingRequests": 59,
                    "resetsAt": "2026-11-04T00:01:00Z",
                },
            }
        )
        client = SkipoleClient(api_key="test-key-placeholder")
        result = client.get_usage()
        request = urlopen_mock.call_args.args[0]
        self.assertEqual(result.credits_available, "0")
        self.assertEqual(request.get_header("Authorization"), "Bearer test-key-placeholder")
        self.assertNotIn("test-key-placeholder", request.full_url)

    @patch("skipole.client.urlopen")
    def test_integration_source_is_optional_and_allowlisted(self, urlopen_mock):
        urlopen_mock.return_value = FakeResponse([])
        client = SkipoleClient(
            api_key="test-key-placeholder",
            integration_source="replit",
        )
        client.get_customer_catalog()
        request = urlopen_mock.call_args.args[0]
        self.assertEqual(
            request.get_header("X-skipole-integration-source"),
            "replit",
        )
        with self.assertRaises(ValueError):
            SkipoleClient(integration_source="unknown-platform")

    @patch("skipole.client.urlopen")
    def test_rate_limit_error_includes_retry_guidance_without_retry(self, urlopen_mock):
        error = HTTPError(
            "https://skipole-data-platform.replit.app/api/v1/customer/catalog",
            429,
            "Too Many Requests",
            {"Retry-After": "12"},
            BytesIO(b'{"error":"Organization API rate limit reached."}'),
        )
        urlopen_mock.side_effect = error
        client = SkipoleClient(api_key="test-key-placeholder")
        with self.assertRaises(SkipoleApiError) as context:
            client.get_customer_catalog()
        self.assertEqual(context.exception.status, 429)
        self.assertEqual(context.exception.retry_after_seconds, 12)
        self.assertEqual(urlopen_mock.call_count, 1)

    @patch("skipole.client.urlopen")
    def test_authentication_and_scope_errors_are_preserved(self, urlopen_mock):
        for status in (401, 403):
            urlopen_mock.side_effect = HTTPError(
                "https://skipole-data-platform.replit.app/api/v1/customer/catalog",
                status,
                "Access denied",
                {},
                BytesIO(b'{"error":"Access is not authorized."}'),
            )
            client = SkipoleClient(api_key="test-key-placeholder")
            with self.assertRaises(SkipoleApiError) as context:
                client.get_customer_catalog()
            self.assertEqual(context.exception.status, status)
            self.assertIn("not authorized", str(context.exception).lower())

    def test_non_https_remote_base_urls_are_rejected(self):
        with self.assertRaises(ValueError):
            SkipoleClient(base_url="http://example.com")

    @patch("skipole.client.urlopen")
    def test_provider_quote_posts_request_without_automatic_retry(self, urlopen_mock):
        urlopen_mock.return_value = FakeResponse({"amountMinor": 5, "fixtureOnly": True})
        client = SkipoleClient(api_key="test-key-placeholder")
        request_data = {
            "kind": "enrichment",
            "capabilityId": "enrichment-email",
            "purpose": "business_research",
            "request": {"method": "email", "email": "person@example.invalid"},
        }
        client.quote_provider_request(
            request=request_data,
            idempotency_key="7f63b4c7-e711-40f5-a857-f6b34c879995",
        )
        request = urlopen_mock.call_args.args[0]
        self.assertEqual(
            request.full_url,
            "https://skipole-data-platform.replit.app/api/v1/customer/provider-quotes",
        )
        self.assertEqual(request.get_method(), "POST")
        self.assertEqual(request.get_header("Authorization"), "Bearer test-key-placeholder")
        self.assertEqual(
            json.loads(request.data),
            {
                "request": request_data,
                "idempotencyKey": "7f63b4c7-e711-40f5-a857-f6b34c879995",
            },
        )
        self.assertEqual(urlopen_mock.call_count, 1)

    @patch("skipole.client.urlopen")
    def test_provider_request_posts_quote_and_idempotency_key(self, urlopen_mock):
        urlopen_mock.return_value = FakeResponse({"status": "delivered", "fixtureOnly": True})
        client = SkipoleClient(api_key="test-key-placeholder")
        request_data = {
            "kind": "enrichment",
            "capabilityId": "enrichment-email",
            "purpose": "business_research",
            "request": {"method": "email", "email": "person@example.invalid"},
        }
        client.create_provider_request(
            request=request_data,
            quote_token="signed-quote-placeholder",
            idempotency_key="7f63b4c7-e711-40f5-a857-f6b34c879995",
        )
        request = urlopen_mock.call_args.args[0]
        self.assertEqual(request.get_method(), "POST")
        self.assertEqual(
            json.loads(request.data),
            {
                "request": request_data,
                "quoteToken": "signed-quote-placeholder",
                "idempotencyKey": "7f63b4c7-e711-40f5-a857-f6b34c879995",
            },
        )

    @patch("skipole.client.urlopen")
    def test_job_status_encodes_id_and_export_returns_csv(self, urlopen_mock):
        urlopen_mock.side_effect = [
            FakeResponse({"status": "completed"}),
            FakeCsvResponse("company_name\nExample Co\n"),
        ]
        client = SkipoleClient(api_key="test-key-placeholder")
        client.get_job("job id")
        self.assertEqual(
            urlopen_mock.call_args_list[0].args[0].full_url,
            "https://skipole-data-platform.replit.app/api/v1/customer/jobs/job%20id",
        )
        self.assertEqual(
            client.export_job("job id", fields=["company_name"]),
            "company_name\nExample Co\n",
        )
        export_request = urlopen_mock.call_args_list[1].args[0]
        self.assertEqual(
            export_request.full_url,
            "https://skipole-data-platform.replit.app/api/v1/customer/jobs/job%20id/export",
        )
        self.assertEqual(export_request.get_header("Accept"), "text/csv")
        self.assertEqual(json.loads(export_request.data), {"fields": ["company_name"]})

    @patch("skipole.client.urlopen")
    def test_provider_errors_preserve_status_and_error_code(self, urlopen_mock):
        urlopen_mock.side_effect = HTTPError(
            "https://skipole-data-platform.replit.app/api/v1/customer/provider-requests",
            503,
            "Unavailable",
            {},
            BytesIO(b'{"error":"Capability inactive.","code":"capability_inactive"}'),
        )
        client = SkipoleClient(api_key="test-key-placeholder")
        with self.assertRaises(SkipoleApiError) as context:
            client.create_provider_request(
                request={},
                quote_token="signed-quote-placeholder",
                idempotency_key="7f63b4c7-e711-40f5-a857-f6b34c879995",
            )
        self.assertEqual(context.exception.status, 503)
        self.assertEqual(context.exception.code, "capability_inactive")


if __name__ == "__main__":
    unittest.main()
