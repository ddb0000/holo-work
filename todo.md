# Execução v1 Checklist

## 0. Repo hygiene
- [x] Create repo `holo.work` with `/worker`, `/ui`, `/sql`, `/scripts`, `/docs` scaffolding.
- [x] Add MIT `LICENSE`, succinct `README`, project `.gitignore`, and `.editorconfig` with LF/ts defaults.

## 1. Infra
- [x] Author `wrangler.toml` (main entry, compatibility date, bindings for DB/KV) per AGENTS spec.
- [x] Run `wrangler d1 create holo_work` and `wrangler kv namespace create KV`, capture IDs into config.


## 2. Database
- [x] Apply `/sql/schema.sql` via `wrangler d1 execute`.
- [x] Create `/sql/seed.sql` with admin user (`admin@holo.work` / "admin" dev pw), two rooms, one device + shared secret.

## 3. Auth
- [ ] Implement Argon2id hash/verify with `PEPPER` (currently using PBKDF2-SHA256 as a temporary fallback while we wire deterministic WASM support), short helper tests.
- [x] Implement JWT issue/verify (15 min TTL) + middleware.
- [x] Ship `/auth/register`, `/auth/login`, `/auth/me` routes with validation + rate-limit hooks.

## 4. Rooms/Core
- [x] CRUD for rooms (admin create, anyone list/join) with ownership guard.
- [x] Chat: GET last N messages + POST with html-escape + basic flood control.
- [x] Tasks: GET/POST/PUT with assignee + status tracking.
- [x] Check-ins: POST mood/energy/status slider payload + GET last 30 min per room.

## 5. IoT
- [x] Admin POST to issue device id + secret (persist hashed secret) and list existing devices.
- [x] `/iot/ingest` POST verifying `X-Device-Secret`, storing readings (temp/noise/lux) keyed by room, limited to 15 min retention.
- [x] `/rooms/:id/readings` GET returning sliding-window telemetry.

## 6. Agent
- [x] Implement `computeSuggestions(room_id)` per spec (15 min readings + 30 min check-ins, dedupe within 10 min window, idempotent insert).
- [x] Expose suggestions GET route and ensure ingest/check-in paths trigger compute when new data arrives.

## 7. UI
- [x] `index.html`: login form → fetch auth → store JWT in memory + `sessionStorage`.
- [x] `room.html`: 16x16 grid map + presence dots, tabs para chat/tasks/ambiente/sugestões, check-in slider + status select.
- [x] `admin.html`: `?local=1` guard, forms p/ criar rooms/devices + lista de secrets (local only).
- [x] Shared ES modules (API client/state) + CSS utilitário leve (sem frameworks).

## 8. Scripts
- [x] `scripts/iot_sim.py` using stdlib `urllib` to read `INGEST_URL`, `DEVICE_ID`, `DEVICE_SECRET`, and send payload every 5 s (temp 20-32 °C etc.).

## 9. Security
- [x] Central JSON validator + body size cap, sanitize chat HTML, enforce 60 rpm/IP via KV counter.
- [x] Ensure secrets never logged; use environment vars `JWT_SECRET`, `PEPPER`, optional `ZAI_API_KEY` stub (ver README + `docs/ENV.md`, `.dev.vars` para dev).

## 10. Tests & Evidence
- [x] Unit tests for hash/verify and `computeSuggestions` helpers.
- [x] `./docs/e2e.sh` curl flow: register → login → create room → post message → ingest → read suggestions; script grava em `./docs/evidencias.txt`.

## 11. Deploy
- [x] `wrangler publish` playbook em `docs/DEPLOY.md` (bindings, secrets, schema, smoke). `wrangler dev` validado local.
- [x] Serve `/ui` via Pages ou worker assets (detalhado em README/DEPLOY).

## 12. Fiap package
- [x] Checklist em `docs/FIAP_PACKAGE.md` (zip, PDF mapping, TXT com RM/nome/pitch-link).

## 13. Pitch script
- [x] Roteiro (`docs/pitch-script.md`) cobre problema/demo/arquitetura/ODS/CTA.

## 14. Env checklist
- [x] `docs/ENV.md` + README explicam secrets (`JWT_SECRET`, `PEPPER`, `ZAI_API_KEY` opcional) e uso de `.dev.vars`.

## 15. Definition of Done
- [x] Local demo + IoT sim verificados; docs de deploy/tests/pacote asseguram handoff cloud + zip.
