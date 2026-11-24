# Import an existing Skipole audience into Clay

Skipole is an AI-native data broker. This guide covers read-only import of an
already purchased, delivered and authorized order; it does not claim a native
Clay purchase flow.

Use Clay's **HTTP API as Source** to read records from a Skipole B2B audience
order that is already paid, fulfilled, and available in My Orders. This is a
read-only import: it does not create a quote, Checkout session, payment, supplier
request, export job, or new purchase. Re-running or refreshing the source reads
the same delivered order.

The `/api/v1/customer/order-records` endpoint is deployed. An unauthenticated
Production request returns HTTP 401; a customer must use a key scoped to
`orders:read` for the workspace that owns the delivered order.

The source currently supports delivered B2B audience orders, including
Marketing Professionals. It returns only the licensed fields attached to that
order. The Marketing Professionals fields are `first_name`, `last_name`,
`business_email`, and `linkedin_url`. B2B intent orders return only their own
licensed output fields. Consumer and email-enrichment orders are not supported
by this source.

## 1. Create a read-only Skipole key

1. Sign in to the Skipole workspace that owns the completed order.
2. Open [Developer Access](https://skipoledata.com/dashboard/api-keys) and create
   an API key with only the `orders:read` scope.
3. Copy the key once and store it in a password manager until you add it to Clay.
   Do not put it in a URL, table cell, source code, browser client, chat, or log.

The key grants access to order status and already purchased delivery in its
owning Skipole workspace. It cannot charge a card or start supplier work.

## 2. Add the existing order as a Clay source

In Clay, create a table and choose **Import data from an HTTP API** / **HTTP API
as Source**:

- Method: `GET`
- URL:
  `https://skipole-data-platform.replit.app/api/v1/customer/order-records`
- Create or select Clay's saved **HTTP API (Headers)** account. Add:
  - Header name: `Authorization`
  - Header value: `Bearer YOUR_SKIPOLE_API_KEY`
- Save the header in Clay's account configuration, not in the URL or a visible
  table field. Only share the Clay workspace/account with people authorized to
  access that Skipole order.
- Query parameters:
  - `orderId` = the UUID of your delivered order from My Orders
  - `offset` = `$offset`
  - `limit` = `100`
- Results path: `items`
- Pagination: update the `offset` query parameter with Clay's `$offset` value;
  stop when the response's `hasMore` property is false.

Clay's HTTP API source supports offset pagination. The endpoint allows a page
size from 1 to 250; 100 is the recommended Clay page size.

## 3. Map the returned columns

The API returns one JSON object per licensed record in `items`. For a
Marketing Professionals order, map `first_name`, `last_name`,
`business_email`, and `linkedin_url` to the corresponding Clay columns. The
response's `fields` list names the exact fields returned for that order.

Example response shape (illustrative values only):

```json
{
  "orderId": "00000000-0000-4000-8000-000000000000",
  "capabilityId": "audience-advanced-search",
  "fields": ["first_name", "last_name", "business_email", "linkedin_url"],
  "offset": 0,
  "limit": 100,
  "totalRecords": 1,
  "hasMore": false,
  "items": [
    {
      "first_name": "Example",
      "last_name": "Person",
      "business_email": "person@example.invalid",
      "linkedin_url": "https://example.invalid/profile"
    }
  ]
}
```

## Access and licensing

Skipole checks the API key's `orders:read` scope and owning workspace on every
request. The endpoint serves only an existing, paid, delivered B2B order whose
encrypted delivery is still available. It returns `404` for another workspace's
order or an unavailable delivery. It does not provide anonymous links or extend
delivery retention. Existing CSV and REST retrieval remain available.

The source is read-only. Clay's repeat imports and refreshes cannot trigger a
new purchase or supplier operation. Observe the order's license and permitted
use, retain the data only as allowed, and do not use it for prohibited
eligibility decisions or unsolicited messaging.

This integration is an HTTP API setup guide, not an official Clay Marketplace
listing or endorsement.
