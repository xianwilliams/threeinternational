# Connecting THREE’s store

The public site uses its own `/en/productdetail/2/{itemId}/US` product routes and `/en/shopping/` cart endpoints. The public pages do not establish the underlying commerce vendor. Do not assume Shopify from this redesign.

The frontend keeps original product IDs, one-time prices, Smart Ship prices, source URLs, and product metadata in `src/lib/catalog.json`. `StoreProvider` manages a local bag with separate entries for one-time and subscription purchases. Quantities are limited to 20 and stored input is validated. The UI explicitly says that selections do not transfer automatically.

A live integration needs an authorized server API for current catalog data, inventory, currency, taxes, shipping, subscriptions, and checkout sessions. The backend must recalculate prices and availability. Browser storage must never be treated as authoritative order data.

Before connecting checkout, confirm how THREE carries ambassador referral IDs, customer ownership, market selection, and attribution across navigation and checkout. Preserve those rules in a server-side checkout handoff. This preview does not change any existing account, referral, subscription, or order.

The original site exposes cart actions such as `additemtocartandgetalsobought` and `getdrawercartitems`. They were observed, not used to mutate a live cart. No credentials, private APIs, or real customer data are included here.

For release, replace local cart behavior with the approved integration, verify subscription consent and referral attribution with test orders, configure the real domain and metadata, and remove preview `noindex` only when the site is ready for public traffic.
