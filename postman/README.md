# Postman collection: owner import and publication

Import [`skipole-licensed-data.postman_collection.json`](./skipole-licensed-data.postman_collection.json)
into Postman. It uses the existing public OpenAPI paths and contains synthetic
filters only; it contains no API key, customer order ID, contact record or
supplier credential.

## Set up a private environment

1. In Postman, create a private/local environment such as **Skipole private**.
2. Set `baseUrl` to `https://skipole-data-platform.replit.app/api`.
3. Set `skipole_api_key` to a customer-created Skipole API key. Keep it in the
   environment's secret/current-value field; never put it in a collection,
   request URL, example, shared environment or public workspace.
4. Use `catalog:read` for customer catalog, topic search and signed quotes.
   Add `orders:read` only when retrieving an existing delivery. Public `GET
   /v1/catalog` and `GET /v1/pricing` do not need a key.
5. Set `orderId` only to an order owned by that same workspace. Do not use a
   third party's or JMG's order as an example.

Quote examples use the Postman `{{$guid}}` dynamic variable for a new purchase
intent on each request. A quote is not a payment, Checkout session, order or
supplier request. It returns a signed amount and a customer approval URL. The
customer must review and approve hosted Checkout themselves. Do not run a quote
unless the account owner has approved its quote/capacity-reservation effect.

Intent quote examples use `topicId=REPLACE_WITH_VALID_TOPIC_ID`. Replace this
placeholder only with a supported ID returned by the authenticated topic search.
The live product catalog and signed quote remain authoritative for filters,
allowed purposes, quantity limits, capacity and price. The current standard
PAYG rate is $0.05 per delivered record; Builder and Scale unit rates can differ.

## Publish the public collection

1. Sign into the owner's Postman account and create or select the authorized
   public workspace **Skipole — Licensed Data API**.
2. Import the JSON collection file. Review the requests, descriptions and
   synthetic bodies.
3. Ensure no API key or private environment value is included in the collection
   or workspace examples. Keep customer environments private.
4. Publish the collection through Postman's
   [API Network publishing flow](https://learning.postman.com/docs/postman-api-network/showcase/publish/overview).
   Publishing is a discovery/documentation action, not a payment rail or a claim
   that paid Postman-native purchasing is verified.
5. Save the resulting public collection/workspace URL and submission status for
   the distribution tracker.
