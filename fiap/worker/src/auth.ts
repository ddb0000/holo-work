import { HandlerContext, AuthUser, Env } from './types';
import {
  readJson,
  jsonResponse,
  HttpError,
  ensure,
  encodeText,
  base64UrlEncode,
  decodeBase64Url,
  getUserRecord,
  toBase64,
  fromBase64,
  timingSafeEqual,
} from './utils';
import { first } from './db';

const SALT_LENGTH = 16;
const PBKDF2_ITERATIONS = 200000;
const PBKDF2_LENGTH = 32;
const textEncoder = new TextEncoder();

interface JwtPayload {
  sub: string;
  email: string;
  role: 'user' | 'admin';
  exp: number;
  iat: number;
}

export async function hashPassword(password: string, pepper: string): Promise<string> {
  // Use simple SHA-256 instead of PBKDF2 for now
  const combined = password + pepper;
  const bytes = encodeText(combined);
  const ab = toArrayBuffer(bytes);
  const digest = await crypto.subtle.digest('SHA-256', ab);
  const hash = toBase64(new Uint8Array(digest));
  return `sha256:${hash}`;
}

export async function verifyPassword(password: string, pepper: string, hash: string): Promise<boolean> {
  // Handle new SHA-256 format
  if (hash.startsWith('sha256:')) {
    const stored = hash.slice(7);
    const combined = password + pepper;
    const bytes = encodeText(combined);
    const ab = toArrayBuffer(bytes);
    const digest = await crypto.subtle.digest('SHA-256', ab);
    const computed = toBase64(new Uint8Array(digest));
    return computed === stored;
  }
  
  // Handle old PBKDF2 format for backward compat
  const parts = hash.split('$');
  if (parts.length !== 4 || parts[0] !== 'pbkdf2') {
    return false;
  }
  const iterations = Number(parts[1]);
  if (!Number.isSafeInteger(iterations) || iterations <= 0) {
    return false;
  }
  const salt = fromBase64(parts[2]);
  const expected = fromBase64(parts[3]);
  const actual = await deriveKey(password, pepper, salt, iterations);
  return timingSafeEqual(actual, expected);
}

export async function handleRegister(ctx: HandlerContext): Promise<Response> {
  try {
    const body = await readJson<{ email?: string; password?: string }>(ctx.request);
    const email = body.email?.trim().toLowerCase();
    const password = body.password?.trim();
    ensure(email && email.includes('@'), 400, 'Valid email required');
    ensure(password && password.length >= 6, 400, 'Password must be at least 6 chars');

    const existing = await first<{ id: string }>(ctx.env.DB, 'SELECT id FROM users WHERE email = ?', [email]);
    ensure(!existing, 409, 'Email already registered');

    const id = crypto.randomUUID();
    const passHash = await hashPassword(password!, ctx.env.PEPPER);
    const createdAt = Date.now();
    await ctx.env.DB
      .prepare('INSERT INTO users (id, email, pass_hash, role, created_at) VALUES (?, ?, ?, ?, ?)')
      .bind(id, email, passHash, 'user', createdAt)
      .run();

    const user: AuthUser = { id, email, role: 'user' };
    const jwt = await issueJwt(user, ctx.env);
    return jsonResponse({ user, jwt });
  } catch (err) {
    console.error('[register]', err);
    throw err;
  }
}

export async function handleLogin(ctx: HandlerContext): Promise<Response> {
  try {
    const body = await readJson<{ email?: string; password?: string }>(ctx.request);
    const email = body.email?.trim().toLowerCase();
    const password = body.password?.trim();
    ensure(email && password, 400, 'Email and password required');

    const record = await first<{ id: string; email: string; role: 'user' | 'admin'; pass_hash: string }>(
      ctx.env.DB,
      'SELECT id, email, role, pass_hash FROM users WHERE email = ?',
      [email]
    );
    ensure(record, 401, 'Invalid credentials');
    const valid = await verifyPassword(password!, ctx.env.PEPPER, record!.pass_hash);
    ensure(valid, 401, 'Invalid credentials');

    const user: AuthUser = { id: record!.id, email: record!.email, role: record!.role };
    const jwt = await issueJwt(user, ctx.env);
    return jsonResponse({ user, jwt });
  } catch (err) {
    console.error('[login]', err);
    throw err;
  }
}

export async function handleMe(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const dbUser = await getUserRecord(ctx.env, ctx.user!.id);
  ensure(dbUser, 401, 'User not found');
  return jsonResponse({ user: { id: dbUser!.id, email: dbUser!.email, role: dbUser!.role } });
}

export async function authenticateRequest(request: Request, env: Env): Promise<AuthUser | null> {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return null;
  }
  const [, token] = authHeader.split(' ');
  if (!token) return null;
  const payload = await verifyJwt(token, env.JWT_SECRET);
  if (!payload) return null;
  return { id: payload.sub, email: payload.email, role: payload.role };
}

async function issueJwt(user: AuthUser, env: Env): Promise<string> {
  const ttl = Number(env.JWT_TTL_MINUTES ?? '15');
  const now = Math.floor(Date.now() / 1000);
  const payload: JwtPayload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    iat: now,
    exp: now + ttl * 60,
  };
  return signJwt(payload, env.JWT_SECRET);
}

async function signJwt(payload: JwtPayload, secret: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const headerBytes = encodeText(JSON.stringify(header));
  const payloadBytes = encodeText(JSON.stringify(payload));
  const encodedHeader = base64UrlEncode(headerBytes);
  const encodedPayload = base64UrlEncode(payloadBytes);
  const data = `${encodedHeader}.${encodedPayload}`;
  const keyBuffer = toArrayBuffer(encodeText(secret));
  const key = await crypto.subtle.importKey('raw', keyBuffer, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const dataBuffer = toArrayBuffer(encodeText(data));
  const signature = await crypto.subtle.sign('HMAC', key, dataBuffer);
  return `${data}.${base64UrlEncode(new Uint8Array(signature))}`;
}

async function verifyJwt(token: string, secret: string): Promise<JwtPayload | null> {
  const segments = token.split('.');
  if (segments.length !== 3) return null;
  const [encodedHeader, encodedPayload, encodedSignature] = segments;
  const data = `${encodedHeader}.${encodedPayload}`;
  const keyBuffer = toArrayBuffer(encodeText(secret));
  const key = await crypto.subtle.importKey('raw', keyBuffer, { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
  const signatureBuffer = toArrayBuffer(decodeBase64Url(encodedSignature));
  const dataBuffer = toArrayBuffer(encodeText(data));
  const valid = await crypto.subtle.verify('HMAC', key, signatureBuffer, dataBuffer);
  if (!valid) return null;
  try {
    const payload = JSON.parse(new TextDecoder().decode(decodeBase64Url(encodedPayload)));
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload as JwtPayload;
  } catch (err) {
    console.error('jwt parse failed', err);
    return null;
  }
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const ab = new ArrayBuffer(bytes.byteLength)
  new Uint8Array(ab).set(bytes)
  return ab
}

async function deriveKey(password: string, pepper: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
  const keyMaterial = await crypto.subtle.importKey('raw', toArrayBuffer(encodeText(password + pepper)), 'PBKDF2', false, [
    'deriveBits',
  ]);
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: toArrayBuffer(salt),
      iterations,
    },
    keyMaterial,
    PBKDF2_LENGTH * 8
  );
  return new Uint8Array(bits);
}
