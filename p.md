nice. deploy is mostly green. couple fixes + the pixel-asset flow:

### 0) upgrade + bindings

```
npm i -g wrangler@4.47.0
```

drop the kv id into `worker/wrangler.toml` → `kv_namespaces` (id was printed: `077d828e...ae1`). keep `DB` binding name as `holo_work`. 

### 1) secrets / tokens (dev + prod)

local dev: set in `worker/.dev.vars`. prod: use wrangler secrets.

```
# randoms
openssl rand -base64 48 | tr -d '\n'   # use as JWT_SECRET
openssl rand -base64 48 | tr -d '\n'   # use as PEPPER

# prod
npx wrangler secret put JWT_SECRET --config worker/wrangler.toml
npx wrangler secret put PEPPER --config worker/wrangler.toml
# optional ai
npx wrangler secret put GEMINI_API_KEY --config worker/wrangler.toml
npx wrangler secret put OPENROUTER_API_KEY --config worker/wrangler.toml
```

readme notes using `dev-pepper` locally so the seeded admin hash matches. so: set `PEPPER=dev-pepper` in `.dev.vars` for local runs. 

### 2) seed error (remote txn)

remote `d1 execute` choked on `BEGIN TRANSACTION` in `sql/seed.sql`. fast fixes:

* **easiest**: run seed **locally** (no `--remote`) with config flag:

```
npx wrangler d1 execute holo_work --config worker/wrangler.toml --file=sql/schema.sql
npx wrangler d1 execute holo_work --config worker/wrangler.toml --file=sql/seed.sql
```

(readme shows local apply) 

* **or** make `sql/seed.nobegin.sql` (same file without `BEGIN/COMMIT`) and execute that with `--remote`. the current seed has `BEGIN TRANSACTION; ... COMMIT;`. 

### 3) 404 on `/api/assets/avatar`

route isn’t implemented yet; ui already calls it. add a tiny deterministic svg “pixel” identicon so we’ve got avatars for chat/presença and tiles later.

**worker/src/index.ts** (add before the default 404):

```ts
if (url.pathname === "/api/assets/avatar") {
  const seed = (url.searchParams.get("seed") || "anon").trim();
  const s = Math.max(16, Math.min(512, +(url.searchParams.get("s")||"128")));
  // 5x5 mirror grid → svg
  const h = new Uint32Array(5);
  let x=2166136261; for (let i=0;i<seed.length;i++) { x ^= seed.charCodeAt(i); x = Math.imul(x,16777619); }
  for (let i=0;i<5;i++){ x ^= x<<13; x ^= x>>>17; x ^= x<<5; h[i]=x>>>0; }
  const cell = Math.floor(s/5);
  const fg = `hsl(${h[0]%360} 70% 45%)`, bg = "#0f1220";
  let rects = `<rect width="${s}" height="${s}" fill="${bg}"/>`;
  for (let r=0;r<5;r++){
    for (let c=0;c<3;c++){
      const bit = (h[r]>>(c*3))&1;
      if (!bit) continue;
      const x1=c*cell, x2=(4-c)*cell, y=r*cell;
      const rr = `<rect x="%x" y="${y}" width="${cell}" height="${cell}" rx="${Math.floor(cell*0.15)}" fill="${fg}"/>`;
      rects += rr.replace("%x", String(x1)) + rr.replace("%x", String(x2));
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" width="${s}" height="${s}">${rects}</svg>`;
  return new Response(svg, { headers: { "content-type": "image/svg+xml", "cache-control":"public, max-age=31536000" }});
}
```

now the `/api/assets/avatar?seed=foo&s=128` calls in the log will return images. route exists in prd as “optional assets”, so this wires it for real. (prd/docs mention assets endpoint as optional; deploy doc shows static-ui note.) 

### 4) pixel art pipeline (tiles/sprites)

minimal, fast, reversible:

* folder: `ui/assets/tiles/`

  * `floor.png` `wall.png` `desk.png` `plant.png` etc, all **16×16** or **32×32**.
* atlas json (optional v1): `ui/assets/tiles/atlas.json` → name → x,y,w,h if packing later.
* render: keep the current 2d canvas map; load tiles once, draw by indices from a `map_seed` (string like `grid:16x16:hub`) → translate to a 2d int grid. map_seed already sits in `rooms.map_seed`. 

quick asset sources:

* aseprite export → 16×16 pngs
* kenney roguelike packs (cc0) → trim to 16×16

### 5) gemini/openrouter generate (v1 dev-mode)

wire a **dev-only** passthrough (rate-limited per ip in kv) for prototyping npc avatars/backgrounds:

**worker/src/index.ts** (sketch):

```ts
if (url.pathname==="/api/assets/generate" && req.method==="POST") {
  if (env.OPENROUTER_API_KEY) {
    const body = await req.json();
    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method:"POST",
      headers:{ "authorization":`Bearer ${env.OPENROUTER_API_KEY}`, "content-type":"application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages:[{role:"user", content: body.prompt }],
        modalities: ["image","text"],
        image_config: { aspect_ratio: "1:1" }
      })
    });
    const j = await r.json();
    return Response.json(j);
  }
  if (env.GEMINI_API_KEY) {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:streamGenerateContent?key=${env.GEMINI_API_KEY}`, {
      method:"POST", headers:{ "content-type":"application/json" },
      body: JSON.stringify({ contents:[{role:"user", parts:[{text: (await req.json()).prompt}]}], generationConfig:{ responseModalities:["IMAGE","TEXT"], imageConfig:{ image_size:"1K" }}})
    });
    return new Response(await r.text(), { headers:{ "content-type":"application/json" }});
  }
  return new Response("image gen not configured", { status: 501 });
}
```

policy: v1 dev → only for us; v2 → same but rate-limited and behind a feature flag; v3 → byo key path; v4 → paid tier with our key + byok fallback. matches the staged plan. (deploy doc already has secrets step; extend it to include these two keys.) 

### 6) end-to-end checklist

1. wrangler 4.47.0, bindings up to date.
2. local seed without `--remote` **or** remote seed without the transaction block.
3. secrets: set local `.dev.vars` (`PEPPER=dev-pepper`, `JWT_SECRET=<rand>`). prod via `wrangler secret`. 
4. add `/api/assets/avatar` route (above).
5. drop initial tiles in `ui/assets/tiles/*`, load them in `room.js` to render the map.
6. optional: `/api/assets/generate` for image-gen dev mode (kv rate limit later).

### 7) sanity probes

```
curl http://127.0.0.1:8787/api/rooms
curl -I "http://127.0.0.1:8787/api/assets/avatar?seed=dan&s=128"
```

deploy guide smoke calls are already listed. 

small `docs/ASSETS.md` with tile specs + palette so art stays coherent with the ui grid.

---

arq
https://www.figma.com/board/RnpSFs6Rj2zN0iZb2tXIOD/holo.work-%E2%80%94-arquitetura?node-id=0-1&p=f&t=VWsvSS78qQ1gCTcg-0
flow
https://www.figma.com/board/NNopmsqV4eYfyfd5nySpRw/holo.work-%E2%80%94-fluxo-principal?node-id=0-1&p=f&t=iG38V2JQwoyfJE1M-0
iot_ingestion
https://www.figma.com/board/mylZk4aj3JyOLpGGkBRlSu/holo.work-%E2%80%94-ingest%C3%A3o-iot?node-id=0-1&p=f&t=2DMRjlxAXgXkMxgB-0
agent flow
https://www.figma.com/board/3xvZqC9J1M4GLaLdsNPxiQ/holo.work-%E2%80%94-agente--heur%C3%ADstica-v1-?node-id=0-1&p=f&t=vpBNqo9dF7BoIBS6-0
endpoints
https://www.figma.com/board/z6YClh3FALBOUO9w3RJStd/holo.work-%E2%80%94-endpoints?node-id=0-1&p=f&t=pnMyQjh6VPEO661z-0
states
https://www.figma.com/board/jNwcCSkh9w1BCVxbgYzbte/holo.work-%E2%80%94-estados-de-presen%C3%A7a?node-id=0-1&p=f&t=a47lx0mnsAQObMfl-0
deploy
https://www.figma.com/board/QAiEky9luSHOt6u4moFLea/holo.work-%E2%80%94-deploy?node-id=0-1&p=f&t=t7kQnDRCOIKkI5cD-0