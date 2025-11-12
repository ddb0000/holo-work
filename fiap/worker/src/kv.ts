import { Env } from './types';

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

export async function consumeRateLimit(env: Env, key: string, limit: number, windowSeconds: number): Promise<RateLimitResult> {
  const windowKey = `${key}:${Math.floor(Date.now() / 1000 / windowSeconds)}`;
  const currentRaw = await env.KV.get(windowKey);
  const current = currentRaw ? Number(currentRaw) : 0;
  if (current >= limit) {
    return { allowed: false, remaining: 0 };
  }
  await env.KV.put(windowKey, String(current + 1), { expirationTtl: windowSeconds });
  return { allowed: true, remaining: Math.max(0, limit - current - 1) };
}

export async function throttle(env: Env, key: string, ttlSeconds: number): Promise<boolean> {
  const exists = await env.KV.get(key);
  if (exists) {
    return false;
  }
  await env.KV.put(key, '1', { expirationTtl: ttlSeconds });
  return true;
}

export async function incrementCounter(env: Env, key: string, ttlSeconds?: number) {
  const currentRaw = await env.KV.get(key);
  const current = currentRaw ? Number(currentRaw) : 0;
  const next = current + 1;
  await env.KV.put(key, String(next), ttlSeconds ? { expirationTtl: ttlSeconds } : undefined);
  return next;
}
