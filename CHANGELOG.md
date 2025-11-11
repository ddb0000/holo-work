# Changelog

## 2025-02-10
- bootstrap repo layout (worker/ui/sql/scripts/docs)
- add base docs + checklist + config files
- add D1 schema/seed, worker auth/rooms/iot/agent routes, rate-limit + JSON guards
- ship static UI (login/room/admin), CSS utility, ES modules
- add IoT simulator script + vitest coverage for hashing + agent heuristics
- replace Argon2 (blocked by WASM restrictions in local dev) with PBKDF2-SHA256 + peppered storage until WASM pipeline is in place
