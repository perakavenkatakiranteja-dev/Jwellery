# Aurelia Fine Jewels API

Small read-only API for the demo storefront.

- `GET /health` reports service health.
- `GET /api/products` returns the demo catalog. Optional filters: `category`, `metal`, and `gemstone`.

For Render, create a **Web Service** from this repository and set the root directory to `backend`. Use `npm start` as the start command; no build command or environment variables are required. Render provides `PORT` at runtime.

This starter has no database, authentication, payment processing, KYC, order persistence, or fulfillment integrations. Catalog entries are demo data.
