# agents.md — holo.work

## objetivo

gerar v1 funcional no nosso stack (cloudflare workers + d1 + kv + html/css/js), com admin local e iot_sim. evitar frameworks.

## layout do repo

```
/worker                 # api (ts)
  /src
    index.ts            # router
    auth.ts             # login/register/jwt
    rooms.ts            # rooms/messages/tasks
    iot.ts              # devices/ingest
    agent.ts            # sugestões
    db.ts               # d1 helpers
    kv.ts               # rate-limit/counters
  wrangler.toml
/sql
  schema.sql
  seed.sql
/ui                     # static pages (pages)
  index.html            # login
  room.html             # mapa/presença/chat/tasks
  admin.html            # admin local (sem auth externa)
  /css
  /js
/scripts
  iot_sim.py            # simulador
/docs
  PRD.md
  TODO.md
```

## padrões

* ts alvo: workers runtime. nenhuma lib além do que for estritamente necessário.
* ui: es modules, fetch, canvas 2d simples ou dom.
* css: utilitário leve (próprio). sem tailwind.
* commits: curtos, escopados.

## wrangler.toml (base)

```toml
name = "holo-work"
main = "worker/src/index.ts"
compatibility_date = "2025-11-10"

[[d1_databases]]
binding = "DB"
database_name = "holo_work"
database_id = "REPLACE"

[[kv_namespaces]]
binding = "KV"
id = "REPLACE"
```

## bootstrap

* criar tabelas com /sql/schema.sql via `wrangler d1 execute`.
* seeds mínimos: 1 admin, 2 rooms, 1 device com secret.

## rotas obrigatórias

implementar exatamente conforme prd (auth, rooms, messages, tasks, checkins, devices, iot/ingest, suggestions).

## lógica do agente

exportar `computeSuggestions(room_id)` que:

* busca últimos 15min de readings + últimos 30min de checkins.
* aplica heurísticas e grava em `suggestions` se ainda não existir similar em 10min.
* idempotente.

## ui

* index.html: login -> salvar jwt em memory + sessionStorage.
* room.html:

  * left: mapa e presenças (bolinhas com iniciais).
  * right tabs: chat, tasks, ambiente (temp/noise/lux), sugestões.
  * check-in top: slider mood/energy + select status.
* admin.html: forms simples para criar room/device e listar secrets (somente local, gated por `?local=1`).

## iot_sim.py

* lê env `INGEST_URL`, `DEVICE_ID`, `DEVICE_SECRET`.
* envia a cada 5s: t_c (20..32 com ruído), noise_db (40..75), lux (50..600).

## testes

* unit: função de hash/verify; função de agente.
* e2e: curl script: registrar, login, criar room (admin), postar msg, ingest, ler sugestões.
* evidências: salvar stdout para pdf.

## build ordem (one-shot)

1. schema + seed.
2. auth + jwt.
3. rooms + messages + tasks + checkins.
4. devices + ingest.
5. agent.
6. ui minimal.
7. iot_sim.
8. rate-limit + sane.
9. deploy.

## envs (names only)

JWT_SECRET, PEPPER, ZAI_API_KEY

## deploy

* `wrangler dev` local.
* `wrangler publish` prod.
* pages para `/ui` ou servir `/ui` estático via worker.

## geração de assets (opcional)

* endpoint `/api/assets/avatar?seed=xyz` → gera sprite 2d procedural (sem ia) v1.
* se `ZAI_API_KEY` existir, stub para futura geração com ia (não bloquear mvp).

## fiap-mode

* manter branch `fiap-mode` com mesmas rotas e pdf mapeando requisitos.

---
