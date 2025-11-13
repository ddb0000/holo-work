# Changelog

## devlog
### 12-nov-25
- Edge-as-Hell a0.1: forked the old build into `/fiap` and introduced `/core` as the anonymous, KV-free experience with D1-only persistence.
- Replaced KV rate limits/assets with in-memory `ratelimit`/`cache`, added `/api/rooms/:roomId/dashboard`, and bumped the room poll cadence to 30s.
- Static UI and assets now live inside `core/public` (with `public/assets/` for future sprites) so Pages can serve them with immutable headers.
### 11-nov-25
- bootstrap repo layout (worker/ui/sql/scripts/docs)
- add base docs + checklist + config files
- add D1 schema/seed, worker auth/rooms/iot/agent routes, rate-limit + JSON guards
- ship static UI (login/room/admin), CSS utility, ES modules
- add IoT simulator script + vitest coverage for hashing + agent heuristics
- replace Argon2 (blocked by WASM restrictions in local dev) with PBKDF2-SHA256 + peppered storage until WASM pipeline is in place
