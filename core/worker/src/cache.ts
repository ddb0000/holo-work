type Entry<T = unknown> = { v: T; exp: number };
const store = new Map<string, Entry>();

export function cacheGet<T = unknown>(key: string): T | undefined {
  const entry = store.get(key);
  if (!entry) return undefined;
  if (entry.exp > Date.now()) {
    return entry.v as T;
  }
  store.delete(key);
  return undefined;
}

export function cacheSet<T = unknown>(key: string, value: T, ttlMs = 10_000) {
  store.set(key, { v: value, exp: Date.now() + ttlMs });
}
