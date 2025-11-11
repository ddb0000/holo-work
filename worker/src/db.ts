export async function first<T>(db: D1Database, query: string, bindings: unknown[] = []): Promise<T | null> {
  const result = await db.prepare(query).bind(...bindings).first<T>();
  return (result as T) ?? null;
}

export async function all<T>(db: D1Database, query: string, bindings: unknown[] = []): Promise<T[]> {
  const { results } = await db.prepare(query).bind(...bindings).all<T>();
  return results as T[];
}

export async function run(db: D1Database, query: string, bindings: unknown[] = []) {
  return db.prepare(query).bind(...bindings).run();
}
