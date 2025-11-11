# holo.work

Workspace hub blending lightweight presence, chat, tasks, IoT comfort readings, and an agent that nudges healthier rhythms. Built for Cloudflare Workers + D1 + KV with zero heavy frameworks.

## Stack
- API: Cloudflare Worker (TypeScript) + D1 (SQLite) + KV for rate limiting + counters
- UI: Static HTML/CSS/ES modules served via Pages or worker static handler
- IoT: Python simulator posting telemetry (temp/noise/lux)
- Auth: PBKDF2-SHA256 password hashing (peppered) until Argon2id is wired through a bundled WASM module that plays nicely with Workers local dev

## Quickstart
1. Install deps: `npm install`
2. Create CF resources:
   ```bash
   npx wrangler d1 create holo_work
   npx wrangler kv namespace create KV
   ```
3. Apply schema + seed:
   ```bash
   npx wrangler d1 execute holo_work --file=sql/schema.sql
   npx wrangler d1 execute holo_work --file=sql/seed.sql
   ```
4. Secrets (use `dev-pepper` locally so the seeded admin hash matches; no secrets are logged anywhere):
   ```bash
   npx wrangler secret put JWT_SECRET
   npx wrangler secret put PEPPER # dev-pepper
   npx wrangler secret put ZAI_API_KEY # optional
   ```
   - Local dev: drop the same values into `worker/.dev.vars` so Miniflare picks them up.
5. Dev server: `npm run dev`
6. IoT sim (after ingest route ready):
   ```bash
   export INGEST_URL="http://127.0.0.1:8787/api/iot/ingest"
   export DEVICE_ID="dev-device"
   export DEVICE_SECRET="DEVSECRET123"
   python3 scripts/iot_sim.py
   ```

## Repo map
```
worker/   # CF worker source
ui/       # static pages + assets
sql/      # schema + seed
scripts/  # supporting tools (iot simulator)
docs/     # PRD, checklist, evidence scripts
```

## Status
Track ongoing build in `docs/todo.md`. Major changes recorded in `CHANGELOG.md`.

## Figma
#### arq
https://www.figma.com/board/RnpSFs6Rj2zN0iZb2tXIOD/holo.work-%E2%80%94-arquitetura?node-id=0-1&p=f&t=VWsvSS78qQ1gCTcg-0

#### flow
https://www.figma.com/board/NNopmsqV4eYfyfd5nySpRw/holo.work-%E2%80%94-fluxo-principal?node-id=0-1&p=f&t=iG38V2JQwoyfJE1M-0

#### iot_ingestion
https://www.figma.com/board/mylZk4aj3JyOLpGGkBRlSu/holo.work-%E2%80%94-ingest%C3%A3o-iot?node-id=0-1&p=f&t=2DMRjlxAXgXkMxgB-0

#### agent flow
https://www.figma.com/board/3xvZqC9J1M4GLaLdsNPxiQ/holo.work-%E2%80%94-agente--heur%C3%ADstica-v1-?node-id=0-1&p=f&t=vpBNqo9dF7BoIBS6-0

#### endpoints
https://www.figma.com/board/z6YClh3FALBOUO9w3RJStd/holo.work-%E2%80%94-endpoints?node-id=0-1&p=f&t=pnMyQjh6VPEO661z-0

#### states
https://www.figma.com/board/jNwcCSkh9w1BCVxbgYzbte/holo.work-%E2%80%94-estados-de-presen%C3%A7a?node-id=0-1&p=f&t=a47lx0mnsAQObMfl-0

#### deploy
https://www.figma.com/board/QAiEky9luSHOt6u4moFLea/holo.work-%E2%80%94-deploy?node-id=0-1&p=f&t=t7kQnDRCOIKkI5cD-0