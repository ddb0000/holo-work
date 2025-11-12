export interface Env {
  DB: D1Database;
  KV: KVNamespace;
  JWT_SECRET: string;
  PEPPER: string;
  JWT_TTL_MINUTES?: string;
  ZAI_API_KEY?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

export interface HandlerContext {
  env: Env;
  request: Request;
  params: Record<string, string>;
  user: AuthUser | null;
  waitUntil: (promise: Promise<unknown>) => void;
}

export type Handler = (ctx: HandlerContext) => Promise<Response>;
