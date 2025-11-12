# prd.md — holo.work (v1)

## visão

um espaço de trabalho híbrido leve (2d/pixel), com presença, chat e quadros de tarefas, que integra leituras iot (simuladas) e um agente de recomendação para ritmo saudável e pairing. web/mobile responsivo, cloudflare-first, dados em d1, eventos em kv. sem framework pesado.

## problema

trabalho distribuído fragmenta sinal: status, foco, conforto, saúde. reuniões viram ruído. precisamos de um hub que enxergue contexto e sugira ações práticas sem fricção.

## objetivos

* reduzir atrito de colaboração remota.
* dar visibilidade de conforto/ambiente via iot simulado.
* promover pausas e pairing guiados por dados.
* mvp executável em 1 click com wrangler.

## escopo (v1)

* espaços (rooms) com mapa 2d leve (tiles/png), presença, chat, tasks.
* check-in de humor/energia (1..5) e status (focus, solo, pair, afk).
* ingest de iot: temperatura, ruído, luminosidade (mock) por device.
* agente: recomenda pausas, pairing e sala mais “confortável”.
* auth: e-mail + senha com hash; roles: admin, user.
* admin web local (sem login externo) para CRUD rápido de rooms/devices.

fora do escopo v1: voz, video, 3d, calendário integrado, oauth.

## personas

* dev/design: quer foco, pairing rápido, status claro.
* gestor: quer visibilidade de conforto e carga do time.
* ops: quer quedas/alertas simples de ambiente.

## fluxos principais

1. login -> escolher room -> ver mapa/presenças -> chat/tasks -> check-in -> agente sugere ação.
2. admin local gera room, device e seeds de mapa.
3. iot_sim envia POST periódico em /api/iot/ingest.

## arquitetura

* ui: html+css+js (es modules), render 2d canvas/pixel; pwa básico.
* api: cloudflare worker (ts) com rotas rest, jwt, rate-limit kv.
* dados: d1 (sqlite). kv: sessions, rate, agent-cache, stream buffers.
* iot: script python envia leituras; worker valida device_secret.
* agente: função no worker que lê leituras+checkins e gera recomendações simples (regras + score).

```
[ui] <-> [/api/* worker] <-> [d1]
                      \-> [kv]
[iot_sim] -> [/api/iot/ingest]
```

## modelo de dados (mínimo)

* users(id, email, pass_hash, role, created_at)
* rooms(id, name, slug, map_seed, created_at)
* room_members(user_id, room_id, joined_at)
* messages(id, room_id, user_id, body, created_at)
* tasks(id, room_id, title, status, assignee_id, created_at)
* checkins(id, user_id, room_id, mood, energy, status, created_at)
* devices(id, room_id, name, kind, secret, created_at)
* readings(id, device_id, t_c, noise_db, lux, created_at)
* suggestions(id, room_id, user_id, kind, text, created_at)

## sql (d1/sqlite)

```sql
create table users (
  id text primary key,
  email text unique not null,
  pass_hash text not null,
  role text not null default 'user',
  created_at integer not null
);
create table rooms (
  id text primary key,
  name text not null,
  slug text unique not null,
  map_seed text,
  created_at integer not null
);
create table room_members (
  user_id text not null,
  room_id text not null,
  joined_at integer not null,
  primary key(user_id, room_id)
);
create table messages (
  id text primary key,
  room_id text not null,
  user_id text not null,
  body text not null,
  created_at integer not null
);
create table tasks (
  id text primary key,
  room_id text not null,
  title text not null,
  status text not null default 'todo',
  assignee_id text,
  created_at integer not null
);
create table checkins (
  id text primary key,
  user_id text not null,
  room_id text not null,
  mood integer,
  energy integer,
  status text, -- focus|solo|pair|afk
  created_at integer not null
);
create table devices (
  id text primary key,
  room_id text not null,
  name text not null,
  kind text not null, -- env
  secret text not null,
  created_at integer not null
);
create table readings (
  id text primary key,
  device_id text not null,
  t_c real,
  noise_db real,
  lux real,
  created_at integer not null
);
create table suggestions (
  id text primary key,
  room_id text not null,
  user_id text,
  kind text not null, -- pause|pair|move
  text text not null,
  created_at integer not null
);
```

## api (rest)

* auth

  * POST /api/auth/register {email, password}
  * POST /api/auth/login {email, password} -> {jwt}
  * GET  /api/auth/me -> user
* rooms

  * GET /api/rooms
  * POST /api/rooms (admin)
  * GET /api/rooms/:id
  * POST /api/rooms/:id/join
* messages

  * GET /api/rooms/:id/messages?cursor=...
  * POST /api/rooms/:id/messages {body}
* tasks

  * GET/POST /api/rooms/:id/tasks
  * PUT /api/tasks/:id {status, assignee_id}
* checkins

  * POST /api/rooms/:id/checkins {mood, energy, status}
  * GET  /api/rooms/:id/checkins?since=ts
* devices/iot

  * POST /api/devices (admin) -> {id, secret}
  * POST /api/iot/ingest {device_id, t_c, noise_db, lux, ts} header: X-Device-Secret
  * GET  /api/rooms/:id/readings?window=15m
* agente

  * GET /api/rooms/:id/suggestions

jwt no header Authorization. rate-limit por ip em kv. argon2id para hash.

## agente (heurística v1)

* se noise_db>65 e energy<3 -> move para sala X com menor ruído.
* se t_c>27 e mood<=2 -> pausa 5min + água.
* se 2 usuários com status focus>30min no mesmo room e tasks relacionadas -> sugerir pairing.
* se lux<200 -> ajustar iluminação (nota).

## segurança

* hash: argon2id; pepper em secret.
* jwt curto (15min) + refresh opcional em cookie httpOnly (v1 opcional).
* validação de input, limitar body 32KB, sane de html no chat.
* secrets: wrangler secret. no repo só nomes.

## nfr

* p50 api < 100ms; p95 < 300ms.
* primeiro byte ui < 200ms via pages.
* ingest suporta 10 req/s no free.

## telemetria

* counters no kv: logins, msgs, tasks_move, sugestões aceitas.

## critérios de sucesso

* demo com 2 rooms, 3 usuários, iot_sim rodando.
* sugestões aparecem reagindo a leituras e checkins.
* zip+pdf+pitch de 3min.

## env vars

* JWT_SECRET
* PEPPER
* DEVICE_INGEST_RATE_MAX (opcional)
* ZAI_API_KEY (geração de assets opcional)

## fiap mapping

1. banco: sql acima (>=4 entidades).
2. api: rotas rest (>=5 endpoints).
3. testes: plano e 3 execuções (unit simples + curl evidências).
4. mobile: pwa responsivo 3 telas (login, room, tasks).
5. segurança: hash, roles, validação, rate-limit.
6. iot: iot_sim + ingest + uso em sugestões e painel.

---
