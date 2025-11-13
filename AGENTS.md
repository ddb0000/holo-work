# agents.md — holo.work

## objetivo
Entregar a versão a0.1 “Edge as Hell”: worker D1-only com rate limit em memória, dashboard agregado, usuários anônimos e UI estática no Pages. A versão FIAP permanece sob `/fiap` (com KV e assets legados).

## layout do repo
```
/core                  # Edge-first build (a0.1+)
  /worker              # worker.ts router/auth/rooms/iot/agent + cache/ratelimit/dashboard helpers
    /src
    tsconfig.json
    wrangler.toml
  /public              # static UI para Pages (index/room/admin)
    /css
    /js
    /functions         # Pages Functions (index.ts reexport + _routes.json targeting /api/*)
    /assets            # place avatar/tile/atlas PNGs here
  /sql                 # schema + seed (anon_users/presence tables)
  /scripts             # iot_sim.py
  package.json
  tsconfig.json
/fiap                  # legacy KV-backed build (unchanged)
  /worker
  /ui
  /docs
  /scripts
  AGENTS.md            # FIAP-specific instructions
```

## padrões core
* TS targeting Workers runtime; zero extra runtimes or frameworks.
* UI: ES modules, fetch + canvas; keep CSS custom and minimal.
* Auth: JWT for admin routes, `Authorization: Bearer anon:<uid>` for everyone else (uid stored in localStorage).
* Rate limit + cache: in-memory `ratelimit.ts` + `cache.ts` modules replace KV throttles.
* Dashboard: `/api/rooms/:roomId/dashboard` aggregates chat/tasks/readings/suggestions/presence with ETag support and a 30s frontend poll.

## wrangler (core)
```toml
name = "holo-work-core"
main = "src/index.ts"
compatibility_date = "2025-11-10"
[[d1_databases]]
binding = "DB"
database_name = "holo_work"
database_id = "REPLACE"
[observability]
enabled = true
```
* Sem `[[kv_namespaces]]`.

## bootstrap (core)
1. Instale deps em `/core`: `npm install`.
2. Rode as migrações de `core/sql/schema.sql` e `core/sql/seed.sql` com `wrangler d1 execute`.
3. Configure segredos `JWT_SECRET`, `PEPPER` (use `dev-pepper` local) e `ZAI_API_KEY` (opcional). `core/scripts/iot_sim.py` usa `INGEST_URL`, `DEVICE_ID`, `DEVICE_SECRET`.

## rotas obrigatórias (core)
- `/health` (optional)
- `/api/auth/register`, `/api/auth/login`, `/api/auth/me`
- `/api/rooms` (lista, details, criar sala)
- `/api/rooms/:roomId/join`, `/api/rooms/:roomId/messages`, `/api/tasks/:taskId`, `/api/rooms/:roomId/tasks`, `/api/rooms/:roomId/checkins`, `/api/rooms/:roomId/readings`, `/api/rooms/:roomId/suggestions`
- `/api/rooms/:roomId/dashboard` (novo) agregando mensagens/tarefas/leitura/sugestões/presença com `Cache-Control` + `ETag`
- `/api/devices`, `/api/iot/ingest`

## lógica do agente
`computeSuggestions(room_id)` segue usando leituras (últimos 15min) + checkins (últimos 30min) e grava sugestões idempotentemente. Continua sendo acionado de `handleCheckin` + ingest hooks.

## UI core
* `index.html`: login (JWT) + info; `room.html` pode ser acessada diretamente e sobrescreve os headers com `anon:<uid>` quando não há token.
* `room.js` agora usa um único `apiFetch` para `/api/rooms/:roomId/dashboard`, roda poll a cada 30s e renderiza chat/tasks/ambiente/sugestões/presença em um só payload.
* `api.js` mantém token em sessionStorage, gera `uid` no localStorage, envia header `Authorization` apropriado e aplica cache com ETag/304.
* Assets servidos via `core/public/assets/` em vez de endpoints KV.

## iot_sim.py
Idem: lê `INGEST_URL`, `DEVICE_ID`, `DEVICE_SECRET` e envia telemetria a cada 5s com temperatura (20..32), ruído (40..75) e lux (50..600).

## envs
Registrar: `JWT_SECRET`, `PEPPER`, `ZAI_API_KEY` (opcional). Core não usa KV.

## deploy
1. `cd core && npm run dev` para validar local.
2. Gere segredos e cadastre:
   ```bash
   openssl rand -hex 32   # JWT_SECRET
   printf 'dev-pepper'    # PEPPER (mantém seed compatível)
   npx wrangler secret put JWT_SECRET
   npx wrangler secret put PEPPER
   ```
   Adicione as mesmas variáveis (e `ZAI_API_KEY` opcional) nas env vars do projeto Pages.
3. Pages-only deploy:
   - Root: `core/public`
   - Build command vazio, output `/`
   - Em **Functions**, garanta que `/api/*` use `public/functions/index.ts` (já reexporta o worker).
   - Configure o binding D1 `DB` apontando para o mesmo database.
4. Push em `main` -> Pages publica UI + API num deploy único, zero KV/custos.

## fiap-mode
O legado FIAP permanece em `/fiap`. Consulte `fiap/AGENTS.md` para manter aquela versão com KV, assets dinâmicos e requisitos escolares.
