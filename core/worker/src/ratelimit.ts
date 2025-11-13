const buckets = new Map<string, { tokens: number; window: number }>();

export function allow(key: string, perMin = 60): boolean {
  const now = Date.now();
  const window = Math.floor(now / 60_000);
  const bucketKey = `${key}:${window}`;
  let bucket = buckets.get(bucketKey);
  if (!bucket || bucket.window !== window) {
    bucket = { tokens: perMin, window };
  }
  if (bucket.tokens <= 0) {
    buckets.set(bucketKey, bucket);
    return false;
  }
  bucket.tokens -= 1;
  buckets.set(bucketKey, bucket);
  return true;
}
