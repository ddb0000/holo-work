# Environment Checklist

## Required
- `JWT_SECRET`: 32+ char random string.
- `PEPPER`: short random string (dev: `dev-pepper` so seed admin hash matches).

## Optional
- `ZAI_API_KEY`: reserved for future asset generation.

## Local Dev
- Create `worker/.dev.vars`:
  ```
  JWT_SECRET=dev-jwt-secret-please-change
  PEPPER=dev-pepper
  ```
- Run `npm run dev` (Miniflare loads `.dev.vars`).

## Prod
- Use `wrangler secret put ... --config worker/wrangler.toml` per `docs/DEPLOY.md`.
