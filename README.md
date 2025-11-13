# holo.work

Edge-first workspace hub for presence, chat, tasks, IoT telemetry, and heuristic nudges. The current **core** path is the a0.1 “Edge as Hell” stack: D1-only Workers, anonymized clients, and static Pages assets. The previous FIAP-focused build lives untouched under `/fiap`.

## Layout
- `core/`
  - `worker/`: Typescript router/auth/rooms/iot/agent code with no KV dependencies. Routes expose `/api/*`, including the aggregated `/api/rooms/:roomId/dashboard` endpoint.
  - `public/`: static Pages site (login/room/admin) that polls the dashboard every 30s, sends `Authorization: Bearer anon:<uid>` headers, and caches with ETags. Assets live under `public/assets/` for future avatar/tile sprites.
  - `sql/`: schema + seed that create `anon_users`, `presence`, and shared telemetry tables.
  - `scripts/`: the same `iot_sim.py` simulator pointing at the ingest endpoint.
- `fiap/`: the legacy build (KV-backed rate limits/assets, admin auth flow, FIAP PDF) referenced by `fiap/AGENTS.md`.

## Quickstart (core)
1. Install deps and bootstrap:
   ```bash
   cd core
   npm install
   npx wrangler d1 execute holo_work --file=sql/schema.sql
   npx wrangler d1 execute holo_work --file=sql/seed.sql
   ```
2. Set secrets (use `dev-pepper` locally so the seeded admin hash matches):
   ```bash
   npx wrangler secret put JWT_SECRET
   npx wrangler secret put PEPPER
   npx wrangler secret put ZAI_API_KEY # optional
   ```
3. Start the Worker API:
   ```bash
   npm run dev
   ```
4. Serve the UI from Pages (point the project at `core/public`).
5. Run the IoT simulator (adjust env for your Worker URL):
   ```bash
   export INGEST_URL="https://<your-worker>/api/iot/ingest"
   export DEVICE_ID="device-holo-01"
   export DEVICE_SECRET="<secret-from-admin>"
   python3 scripts/iot_sim.py
   ```

## Deploy
- Publish the Worker with `npm run deploy` from `core/`.
- Host the UI via Cloudflare Pages, pointing build output to `core/public` and routing `/api/*` to the Worker.

## Legacy FIAP build
The `/fiap` folder keeps the previous KV-backed version, including the old agent docs, assets, and rate limits. Follow `fiap/AGENTS.md` for that workflow.
