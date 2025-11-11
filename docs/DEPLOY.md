# Deploy Guide

## Prereqs
- Cloudflare account with Workers + D1 + KV enabled
- `wrangler` (v4+) installed locally
- D1 + KV resources already created (see `worker/wrangler.toml` bindings)

## Steps
1. **Secrets**
   ```bash
   npx wrangler secret put JWT_SECRET --config worker/wrangler.toml
   npx wrangler secret put PEPPER --config worker/wrangler.toml
   # optional
   npx wrangler secret put ZAI_API_KEY --config worker/wrangler.toml
   ```
2. **Database schema + seed**
   ```bash
   npx wrangler d1 execute holo_work --config worker/wrangler.toml --file=sql/schema.sql --remote
   npx wrangler d1 execute holo_work --config worker/wrangler.toml --file=sql/seed.sql --remote
   ```
3. **Publish Worker**
   ```bash
   npx wrangler deploy --config worker/wrangler.toml
   ```
4. **Static UI**
   - Option A (Pages): deploy `ui/` as a Pages project; set API origin to the Worker subdomain and ensure CORS (already `*`).
   - Option B (Worker): serve `ui` via Wrangler Assets or add a static handler to `worker/src/index.ts`.
5. **Smoke tests**
   ```bash
   curl https://<worker-domain>/health
   curl https://<worker-domain>/api/rooms
   ```
6. **IoT simulator (prod)**
   ```bash
   INGEST_URL="https://<worker-domain>/api/iot/ingest" \
   DEVICE_ID="device-holo-01" \
   DEVICE_SECRET="DEVSECRET123" \
   python3 scripts/iot_sim.py
   ```
