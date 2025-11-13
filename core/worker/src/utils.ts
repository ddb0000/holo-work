import { Env } from './types';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export class HttpError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function jsonResponse(data: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(data), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...init.headers,
    },
    status: init.status ?? 200,
  });
}

export function errorResponse(message: string, status = 400, details?: unknown): Response {
  return jsonResponse({ error: message, details }, { status });
}

export async function readJson<T>(request: Request, limit = 32 * 1024): Promise<T> {
  const lengthHeader = request.headers.get('content-length');
  if (lengthHeader && Number(lengthHeader) > limit) {
    throw new HttpError(413, 'Payload too large');
  }
  const buffer = await request.arrayBuffer();
  if (buffer.byteLength > limit) {
    throw new HttpError(413, 'Payload too large');
  }
  if (!buffer.byteLength) {
    return {} as T;
  }
  const text = decoder.decode(buffer);
  if (!text.trim()) {
    return {} as T;
  }
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new HttpError(400, 'Invalid JSON');
  }
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function nowMs(): number {
  return Date.now();
}

export function randomId(prefix: string): string {
  const fragment = crypto.randomUUID().replace(/-/g, '').slice(0, 8);
  return `${prefix}_${fragment}`;
}

export function getIp(request: Request): string {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for') ||
    'unknown'
  );
}

export async function sha256Hex(input: string): Promise<string> {
  const bytes = encoder.encode(input);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return bufferToHex(new Uint8Array(digest));
}

export async function etagHex(value: string): Promise<string> {
  return sha256Hex(value);
}

export function bufferToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function base64UrlEncode(data: Uint8Array): string {
  let str = '';
  data.forEach((byte) => {
    str += String.fromCharCode(byte);
  });
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export function encodeText(input: string): Uint8Array {
  return encoder.encode(input);
}

export function decodeBase64Url(input: string): Uint8Array {
  const padLength = (4 - (input.length % 4)) % 4;
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(padLength);
  const str = atob(normalized);
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i += 1) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}

export function minutesToMs(minutes: number): number {
  return minutes * 60 * 1000;
}

export function ensure(condition: unknown, status: number, message: string): asserts condition {
  if (!condition) {
    throw new HttpError(status, message);
  }
}

export function parseNumber(input: string | null, fallback: number): number {
  if (!input) return fallback;
  const parsed = Number(input);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export async function fetchJson<T>(request: Request): Promise<T> {
  return readJson<T>(request);
}

export async function getUserRecord(env: Env, id: string) {
  const result = await env.DB.prepare('SELECT id, email, role, created_at FROM users WHERE id = ?').bind(id).first();
  return result as { id: string; email?: string | null; role: 'user' | 'admin' | 'anon'; created_at: number } | null;
}

export function toBase64(bytes: Uint8Array): string {
  if (typeof btoa === 'function') {
    let binary = '';
    bytes.forEach((b) => {
      binary += String.fromCharCode(b);
    });
    return btoa(binary);
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Buffer is available in Node (tests)
  return Buffer.from(bytes).toString('base64');
}

export function fromBase64(input: string): Uint8Array {
  if (typeof atob === 'function') {
    const binary = atob(input);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Buffer is available in Node (tests)
  const buf = Buffer.from(input, 'base64');
  return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
}

export function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}
